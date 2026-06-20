/**
 * Secure ElevenLabs API Service
 * Routes requests through Netlify proxy to protect API keys
 */

// Generate secure authentication token
const generateAuthToken = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Get proxy authentication token
const getProxyAuthToken = () => {
  return import.meta.env.VITE_PROXY_AUTH_TOKEN || 'development-token-replace-in-production';
};

class ElevenLabsProxyService {
  constructor() {
    this.baseUrl = '/.netlify/functions/elevenlabs-proxy';
    this.authToken = getProxyAuthToken();
  }

  // Generic proxy request method
  async makeProxyRequest(endpoint, options = {}) {
    const { method = 'POST', data, agentId, headers = {} } = options;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`,
          'X-Request-ID': generateAuthToken().substring(0, 16),
          ...headers
        },
        body: JSON.stringify({ endpoint, method, data, agentId })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('ElevenLabs proxy request failed:', error);
      throw error;
    }
  }

  // Conversation methods
  async startConversation(agentId, options = {}) {
    return await this.makeProxyRequest(
      'https://api.elevenlabs.io/v1/convai/conversation',
      { method: 'POST', data: options, agentId }
    );
  }

  async endConversation(conversationId, agentId) {
    return await this.makeProxyRequest(
      `https://api.elevenlabs.io/v1/convai/conversation/${conversationId}/end`,
      { method: 'POST', agentId }
    );
  }
}

// Export singleton instance
export const elevenLabsProxy = new ElevenLabsProxyService();
export default elevenLabsProxy;