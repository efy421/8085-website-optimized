# Netlify Environment Variables Configuration
# Set these in Netlify Admin Panel > Site Settings > Environment Variables

## Webhook Configuration (NEW)
WEBHOOK_URL=https://n8n.212345678.xyz/webhook-test/72b3df4f-a5e1-4014-ad7f-fc7406406516
WEBHOOK_USERNAME=abdu
WEBHOOK_PASSWORD=12345

## Security Configuration
PROXY_SECRET=generate-secure-random-string-for-production

## ElevenLabs Configuration  
ELEVENLABS_API_KEY=your-main-elevenlabs-api-key

## Deployment Instructions
1. Go to Netlify Admin Panel
2. Navigate to Site Settings > Environment Variables
3. Add each variable above with its value
4. Deploy the site for changes to take effect

## Testing
- Proxy endpoint: /.netlify/functions/secure-webhook-proxy
- Webhook forwards to: n8n.212345678.xyz with basic auth
- Authentication: Bearer token from client
- Rate limit: 10 requests/minute per IP