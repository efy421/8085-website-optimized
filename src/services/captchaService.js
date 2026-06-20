/**
 * CAPTCHA Service for Voice Agent Protection
 */

class CaptchaService {
  constructor() {
    this.siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    this.isLoaded = false;
    this.loadPromise = null;
  }

  async loadRecaptcha() {
    if (this.loadPromise) return this.loadPromise;
    
    this.loadPromise = new Promise((resolve, reject) => {
      if (window.grecaptcha) {
        this.isLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        window.grecaptcha.ready(() => {
          this.isLoaded = true;
          resolve();
        });
      };
      
      script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  async executeRecaptcha(action = 'voice_agent_start') {
    await this.loadRecaptcha();
    
    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    const token = await window.grecaptcha.execute(this.siteKey, { action });
    return { token };
  }
  async verifyToken(token) {
    const response = await fetch('/.netlify/functions/verify-captcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`Verification failed: ${response.status}`);
    }

    return await response.json();
  }

  async verifyUser(action = 'voice_agent_start') {
    try {
      const { token } = await this.executeRecaptcha(action);
      const result = await this.verifyToken(token);
      
      const allowed = result.score >= 0.5;
      const requiresChallenge = result.score < 0.5 && result.score >= 0.1;
      
      return {
        allowed,
        score: result.score,
        requiresChallenge,
        action: result.action
      };
    } catch (error) {
      console.error('CAPTCHA verification failed:', error);
      return {
        allowed: false,
        score: 0,
        requiresChallenge: false,
        error: error.message
      };
    }
  }
}

export default new CaptchaService();