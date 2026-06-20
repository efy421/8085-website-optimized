/**
 * Netlify Function: ElevenLabs API Proxy
 * Securely proxies requests to ElevenLabs API to protect API keys
 */

import crypto from 'crypto';

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? 'https://8085.ai' : '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400'
};

// Rate limiting storage (in-memory for demo, use Redis in production)
const rateLimitStore = new Map();

// Rate limiting function
const checkRateLimit = (clientId, maxRequests = 100, windowMs = 60000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(clientId)) {
    rateLimitStore.set(clientId, []);
  }
  
  const requests = rateLimitStore.get(clientId);
  const validRequests = requests.filter(time => time > windowStart);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitStore.set(clientId, validRequests);
  return true;
};

// Authentication function
const authenticateRequest = (event) => {
  const authHeader = event.headers.authorization;
  const expectedToken = process.env.PROXY_AUTH_TOKEN;  
  if (!expectedToken) {
    throw new Error('Proxy authentication not configured');
  }
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
};

// Get client identifier for rate limiting
const getClientId = (event) => {
  return event.headers['x-forwarded-for'] || 
         event.headers['x-real-ip'] || 
         'unknown';
};

// Proxy function for ElevenLabs Conversational AI
export async function handler(event, context) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Authenticate request
    if (!authenticateRequest(event)) {
      return {
        statusCode: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // Rate limiting
    const clientId = getClientId(event);
    if (!checkRateLimit(clientId)) {      return {
        statusCode: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Rate limit exceeded' })
      };
    }

    // Parse request body
    const requestBody = JSON.parse(event.body || '{}');
    const { endpoint, method = 'POST', data, agentId } = requestBody;

    // Validate required fields
    if (!endpoint) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Endpoint is required' })
      };
    }

    // Get ElevenLabs API key from environment
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'API configuration error' })
      };
    }

    // Validate endpoint to prevent SSRF attacks
    const allowedEndpoints = [
      'https://api.elevenlabs.io/v1/convai/conversation',
      'https://api.elevenlabs.io/v1/convai/conversation/end',
      'https://api.elevenlabs.io/v1/convai/agents'
    ];
    
    if (!allowedEndpoints.some(allowed => endpoint.startsWith(allowed))) {
      return {
        statusCode: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Endpoint not allowed' })
      };
    }

    // Prepare request to ElevenLabs API
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': '8085.ai-proxy/1.0'
    };

    // Add agent ID to headers if provided
    if (agentId) {
      headers['XI-Agent-ID'] = agentId;
    }
    // Make request to ElevenLabs API
    const response = await fetch(endpoint, {
      method: method,
      headers: headers,
      body: data ? JSON.stringify(data) : undefined
    });

    // Get response data
    const responseData = await response.text();
    let parsedData;
    
    try {
      parsedData = JSON.parse(responseData);
    } catch {
      parsedData = { data: responseData };
    }

    // Return proxied response
    return {
      statusCode: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedData)
    };

  } catch (error) {
    console.error('ElevenLabs proxy error:', error);
    
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}