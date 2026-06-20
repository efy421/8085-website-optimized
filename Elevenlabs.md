# ElevenLabs Conversational AI Integration Documentation

## Overview

ElevenLabs Conversational AI is a comprehensive platform for deploying customized, conversational voice agents that can be integrated in minutes rather than months. The platform combines several key technologies:

- **Speech to Text (ASR)**: Fine-tuned transcription model
- **Large Language Models**: Support for Gemini, Claude, OpenAI, and custom LLMs
- **Text to Speech**: Low-latency, human-like TTS with 5k+ voices across 31 languages
- **Turn-Taking Logic**: Custom model that understands natural conversation flow and interruption handling

## Key Features

### Core Capabilities
- **Ultra-low latency**: Optimized for real-time conversations
- **Natural conversations**: Advanced turn-taking and interruption handling
- **Scalable**: Can handle thousands of calls per day
- **Multi-language**: Support for 31+ languages
- **Customizable**: Full control over voice, personality, and behavior

### Pricing
- **Free Tier**: 15 minutes of conversation per month
- **Paid Plans**: $0.08/minute for additional usage
- **Silence Optimization**: Extended silence periods charged at 5% of usual rate
- **Enterprise**: Custom pricing for 6+ hours daily usage

## React SDK Integration

### Installation
```bash
npm install @elevenlabs/react-sdk
```

### Basic Usage
```javascript
import { useConversation } from '@elevenlabs/react-sdk';

const { startSession, endSession, status, isSpeaking } = useConversation({
  onConnect: () => console.log('Connected'),
  onDisconnect: () => console.log('Disconnected'), 
  onMessage: (message) => console.log('Message:', message),
  onError: (error) => console.error('Error:', error),
  onModeChange: (mode) => console.log('Mode changed:', mode)
});
```

### Session Management
```javascript
// Start conversation with public agent
const conversationId = await startSession({ agentId: 'your-agent-id' });

// Start conversation with private agent (requires signed URL)
const conversationId = await startSession({ url: 'signed-websocket-url' });

// End conversation
await endSession();
```

## Agent Configuration

### Supported LLMs
- **Recommended**: GPT-4o mini, Claude 3.5 Sonnet
- **Avoid**: Gemini 1.5 Flash (struggles with function calls)
- **Supported**: Gemini, Claude, OpenAI, and custom LLMs

### Audio Configuration
**Supported Output Formats**:
- PCM: 8 kHz, 16 kHz, 22.05 kHz, 24 kHz, 44.1 kHz

**Input Requirements**:
- Microphone access required
- Default sample rate: 16,000 Hz
- Consider explaining microphone access to users

## Tools Integration

### Client Tools
Client tools enable agents to execute client-side functions and interact with the user interface.

**Use Cases**:
- Triggering UI events (alerts, modals, notifications)
- DOM manipulation for dynamic content updates
- Browser events and client-side state changes
- Real-time user interface feedback

**Implementation Example**:
```javascript
// Register client tools before starting conversation
const clientTools = {
  collect_name: (params) => {
    // Handle name collection
    setCollectedName(params.name);
    return { success: true, name: params.name };
  },
  collect_email: (params) => {
    // Handle email collection with validation
    if (validateEmail(params.email)) {
      setCollectedEmail(params.email);
      return { success: true, email: params.email };
    }
    return { success: false, error: 'Invalid email format' };
  }
};

// Start session with client tools
await startSession({ 
  agentId: 'your-agent-id',
  clientTools: clientTools 
});
```

**Best Practices**:
- Ensure tool and parameter names match agent configuration
- Include comprehensive error handling
- Use descriptive tool names and descriptions
- Avoid abbreviations or acronyms
- Enable "Wait for response" option when agent needs data back

### Server Tools / Webhooks
Server tools enable agents to make API calls to external services.

**Configuration**:
- Set up via ElevenLabs UI under Agent settings
- Choose "Webhook" as Tool Type
- Configure endpoint URL, headers, and request format
- Store API keys as secrets for security

### Post-Call Webhooks
Webhooks that trigger after conversation completion with comprehensive call data.

**Configuration**:
- Enable via Conversational AI settings page
- Must return 200 status code for success
- Auto-disabled after 10 consecutive failures over 7+ days
- HMAC signature validation for security

**Webhook Payload includes**:
- Full conversation transcript
- Analysis results and summary
- Metadata and timing information
- Dynamic variables and custom data
- Call success/failure status

**Security**:
```javascript
// HMAC signature validation example
const crypto = require('crypto');

function validateWebhook(signature, timestamp, body, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(timestamp + '.' + body)
    .digest('hex');
  
  return signature === `v1=${expectedSignature}`;
}
```

**Static Egress IPs for Whitelisting**:
- 34.64.156.191
- 34.64.156.195
- 34.64.156.201

## API Integration

### Authentication
- **Public Agents**: Only agent ID required
- **Private Agents**: API key + signed URL generation required
- **Signed URLs**: Generate server-side for private agents

### Connection Management
```javascript
// Connection status monitoring
const { status } = useConversation();
// Possible values: 'disconnected', 'connecting', 'connected'

// Mode change handling  
const { isSpeaking } = useConversation();
// Tracks when agent is speaking vs listening
```

### Audio Controls
```javascript
// Volume control
conversation.setOutputVolume({ volume: 0.8 }); // 0-1 range

// Audio data access
const inputVolume = conversation.getInputVolume();
const outputVolume = conversation.getOutputVolume();
const inputFrequencyData = conversation.getInputByteFrequencyData();
const outputFrequencyData = conversation.getOutputByteFrequencyData();
```

## Implementation Recommendations

### Security Best Practices
1. **Never expose API keys** in client-side code
2. **Use signed URLs** for private agents via server endpoint
3. **Validate webhook signatures** using HMAC
4. **Whitelist IP addresses** for webhook endpoints
5. **Store secrets securely** using environment variables

### Performance Optimization
1. **Explain microphone access** before starting conversation
2. **Handle connection states** gracefully
3. **Implement error recovery** for network issues
4. **Use appropriate audio formats** for your use case
5. **Monitor conversation status** for UI feedback

### User Experience
1. **Request microphone permission** explicitly
2. **Provide visual feedback** for speaking/listening states
3. **Handle interruptions** gracefully
4. **Show connection status** to users
5. **Implement smooth transitions** between states

## Error Handling

### Common Issues
- **Microphone access denied**: Handle gracefully with user guidance
- **Network connectivity**: Implement retry logic
- **Agent not found**: Validate agent ID configuration
- **Tool execution errors**: Provide fallback behaviors
- **Webhook failures**: Implement monitoring and alerting

### Error Recovery
```javascript
const { startSession } = useConversation({
  onError: (error) => {
    console.error('Conversation error:', error);
    
    // Implement retry logic
    if (error.type === 'network') {
      setTimeout(() => retryConnection(), 2000);
    }
    
    // Show user-friendly error messages
    showErrorToUser(getReadableError(error));
  }
});
```

## Integration Architecture for design-8085-ai

### Current Integration Plan
1. **Voice Agent Overlay**: Already implemented (Task 6.1)
2. **SDK Integration**: Install and configure React SDK (Task 6.2)
3. **Character Integration**: Implement Chloe's personality and prompts (Task 6.3)
4. **Client Tools**: Implement data collection tools (Task 6.4)
5. **UI/UX Features**: Sound wave animations and visual feedback (Task 6.5)
6. **Webhook Integration**: Send collected data to external endpoint (Task 6.6)

### Proposed Client Tools for Chloe
```javascript
const chloeClientTools = {
  collect_name: (params) => {
    // Collect and validate user's name
    updateCollectedData('name', params.name);
    return { success: true, data: params.name };
  },
  
  collect_email: (params) => {
    // Collect and validate email address
    if (validateEmail(params.email)) {
      updateCollectedData('email', params.email);
      return { success: true, data: params.email };
    }
    return { success: false, error: 'Invalid email format' };
  },
  
  collect_query: (params) => {
    // Collect user's main question or problem
    updateCollectedData('query', params.query);
    return { success: true, data: params.query };
  },
  
  collect_company: (params) => {
    // Collect company/organization name
    updateCollectedData('company', params.company);
    return { success: true, data: params.company };
  },
  
  collect_employee_count: (params) => {
    // Collect company size information
    const count = parseInt(params.count);
    if (count > 0) {
      updateCollectedData('employeeCount', count);
      return { success: true, data: count };
    }
    return { success: false, error: 'Invalid employee count' };
  }
};
```

### Webhook Endpoint Integration
Target webhook: `https://n8n.workflow.com/get-client-data-webhook/`

Expected payload format:
```javascript
{
  conversationId: string,
  collectedData: {
    name?: string,
    email?: string,
    query?: string,
    company?: string,
    employeeCount?: number
  },
  conversationSummary: string,
  timestamp: string
}
```

## Testing and Development

### Development Setup
1. Create ElevenLabs account and get agent ID
2. Configure agent with appropriate voice and personality
3. Set up client tools in agent configuration
4. Test with public agent first, then private if needed
5. Implement webhook endpoint for testing

### Testing Checklist
- [ ] Microphone permission handling
- [ ] Connection establishment and disconnection
- [ ] Speaking/listening mode transitions
- [ ] Client tool execution and data collection
- [ ] Error handling and recovery
- [ ] Audio quality and latency
- [ ] Cross-browser compatibility
- [ ] Mobile device support
- [ ] Webhook data transmission
- [ ] Security validation

## Resources and Links

- **Main Documentation**: https://elevenlabs.io/docs/conversational-ai/overview
- **React SDK**: https://elevenlabs.io/docs/conversational-ai/libraries/react
- **Client Tools**: https://elevenlabs.io/docs/conversational-ai/customization/tools/client-tools
- **Post-call Webhooks**: https://elevenlabs.io/docs/conversational-ai/workflows/post-call-webhooks
- **ElevenLabs Platform**: https://elevenlabs.io/conversational-ai
- **GitHub Examples**: https://github.com/elevenlabs (check for example repositories)

## Next Steps for Implementation

1. **Install React SDK**: `npm install @elevenlabs/react-sdk`
2. **Create agent configuration** in ElevenLabs UI
3. **Implement conversation hook** in React components
4. **Set up client tools** for data collection
5. **Integrate with existing overlay system**
6. **Test conversation flow** and error handling
7. **Implement webhook integration** for data processing
8. **Add visual feedback** and sound wave animations
9. **Conduct comprehensive testing** across devices and browsers
10. **Deploy and monitor** production usage
