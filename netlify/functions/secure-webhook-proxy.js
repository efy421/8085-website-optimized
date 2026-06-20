// Secure Webhook Proxy - Task 7.2

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PROXY_SECRET = process.env.PROXY_SECRET;
const rateLimitStore = new Map();

export const handler = async (event, _context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    if (!WEBHOOK_URL || !PROXY_SECRET || !process.env.WEBHOOK_USERNAME || !process.env.WEBHOOK_PASSWORD) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Config error' }) };
    }

    // Rate limiting
    const clientIP = event.headers['x-forwarded-for'] || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Rate limited' }) };
    }

    // Auth
    const authHeader = event.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    // Validate & sanitize
    let data;
    try { data = JSON.parse(event.body); } 
    catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }
    const sanitized = sanitizePayload(data);
    if (!sanitized) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid data' }) };
    }

    // Forward to webhook with basic auth
    const basicAuth = Buffer.from(`${process.env.WEBHOOK_USERNAME}:${process.env.WEBHOOK_PASSWORD}`).toString('base64');
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`
      },
      body: JSON.stringify(sanitized)
    });

    if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
    
    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};

// Helper functions
function checkRateLimit(ip) {
  const now = Date.now();
  const data = rateLimitStore.get(ip) || { count: 0, resetTime: now + 60000 };
  
  if (now > data.resetTime) {
    data.count = 0;
    data.resetTime = now + 60000;
  }
  
  if (data.count >= 10) return false;
  
  data.count++;
  rateLimitStore.set(ip, data);
  return true;
}

function sanitizePayload(data) {
  if (!data?.clientData?.email) return null;
  
  return {
    clientData: {
      name: data.clientData.name?.substring(0, 100)?.trim(),
      email: data.clientData.email?.substring(0, 254)?.trim()?.toLowerCase(),
      company: data.clientData.company?.substring(0, 200)?.trim(),
      employeeCount: parseInt(data.clientData.employeeCount) || undefined,
      query: data.clientData.query?.substring(0, 1000)?.trim(),
      conversationId: data.clientData.conversationId?.substring(0, 100)?.trim()
    },
    metadata: {
      timestamp: new Date().toISOString(),
      source: '8085.ai-secure-proxy',
      conversationId: data.metadata?.conversationId?.substring(0, 100)?.trim()
    }
  };
}