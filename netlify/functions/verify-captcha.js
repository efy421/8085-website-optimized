const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_CONVERSATIONS_PER_HOUR = 5;
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const data = rateLimitMap.get(ip) || { count: 0, firstRequest: now };
  
  if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
    data.count = 1;
    data.firstRequest = now;
  } else {
    data.count++;
  }
  
  rateLimitMap.set(ip, data);
  return data.count <= MAX_CONVERSATIONS_PER_HOUR;
}

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { token } = JSON.parse(event.body);
    const clientIP = event.headers['x-forwarded-for'] || 'unknown';

    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Token required' }) };
    }

    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          error: 'Rate limit exceeded',
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        }),
      };
    }
    // Verify with Google reCAPTCHA
    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'CAPTCHA verification failed',
          details: verifyData['error-codes'],
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        score: verifyData.score,
        action: verifyData.action,
        hostname: verifyData.hostname,
      }),
    };

  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};