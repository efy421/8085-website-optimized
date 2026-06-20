/**
 * Webhook Service for Voice Agent Data Processing
 * Implements Task 6.6: Voice Agent Data Processing & Webhook Integration
 */

import { sanitizeCollectedData } from './sanitization';
import { validateAllFields } from './validation';

// Configuration - Using secure proxy instead of direct webhook
const PROXY_URL = '/.netlify/functions/secure-webhook-proxy';
const PROXY_AUTH_TOKEN = import.meta.env.VITE_PROXY_AUTH_TOKEN;
const MAX_RETRY_ATTEMPTS = 3;
const REQUEST_TIMEOUT = 10000; // 10 seconds
const RETRY_DELAY = 1000; // 1 second between retries

/**
 * Validates collected voice agent data with support for email-only submissions
 * @param {Object} collectedData - Data from voice agent client tools
 * @param {boolean} emailOnlyMode - Whether to validate for email-only submission
 * @returns {Object} - Validation result with isValid flag and errors
 */
export const validateCollectedData = (collectedData, emailOnlyMode = false) => {
  // Use comprehensive server-side validation (Task 7.4)
  const validation = validateAllFields(collectedData);
  
  if (emailOnlyMode) {
    // For premature endings, only email validation required
    const emailResult = validation.results.email;
    return {
      isValid: emailResult.valid,
      errors: emailResult.errors || [],
      isPartialSubmission: emailOnlyMode
    };
  } else {
    // Full validation for complete conversations
    return {
      isValid: validation.valid,
      errors: validation.errors,
      isPartialSubmission: emailOnlyMode
    };
  }
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formats collected data for webhook submission with support for partial data
 * @param {Object} collectedData - Raw data from voice agent
 * @param {Object} conversationMeta - Conversation metadata
 * @returns {Object} - Formatted payload for webhook
 */
export const formatDataForWebhook = (collectedData, conversationMeta = {}) => {
  const {
    conversationState = 'completed',
    endingReason = 'normal',
    isPartialSubmission = false,
    conversationDuration = 0
  } = conversationMeta;

  return {
    // Client information (only include non-null values)
    clientData: {
      ...(collectedData.name && { name: collectedData.name.trim() }),
      ...(collectedData.email && { email: collectedData.email.trim().toLowerCase() }),
      ...(collectedData.company && { company: collectedData.company.trim() }),
      ...(collectedData.employeeCount && { employeeCount: parseInt(collectedData.employeeCount) }),
      ...(collectedData.query && { query: collectedData.query.trim() }),
      ...(collectedData.conversationId && { conversationId: collectedData.conversationId.trim() })
    },
    
    // Metadata
    metadata: {
      timestamp: new Date().toISOString(),
      source: '8085.ai-voice-agent',
      version: '1.0.0',
      conversationId: collectedData.conversationId || generateConversationId(),
      collectionMethod: 'voice-conversation',
      conversationState,
      endingReason,
      isPartialSubmission,
      conversationDuration
    },
    
    // Data quality metrics
    quality: {
      completeness: calculateCompleteness(collectedData),
      collectionTime: Date.now(),
      validationStatus: validateCollectedData(collectedData, isPartialSubmission).isValid ? 'valid' : 'invalid',
      fieldsCollected: Object.keys(collectedData).filter(key => collectedData[key] && key !== 'conversationId').length, // Exclude hidden conversationId from visible count
      totalFields: 5, // Only visible fields (name, email, company, employeeCount, query)
      hasMinimumData: !!collectedData.email
    }
  };
};

// Generate unique conversation ID
const generateConversationId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 9);
  return `conv_${timestamp}_${randomStr}`;
};

// Calculate data completeness percentage (only visible fields)
const calculateCompleteness = (collectedData) => {
  const visibleFields = ['name', 'email', 'query', 'company', 'employeeCount']; // Exclude hidden conversationId
  const collectedCount = visibleFields.filter(field => collectedData[field]).length;
  return Math.round((collectedCount / visibleFields.length) * 100);
};

/**
 * Submits data to webhook with retry logic and support for partial submissions
 * @param {Object} collectedData - Data collected from voice conversation
 * @param {Object} options - Submission options
 * @returns {Promise<Object>} - Submission result
 */
export const submitToWebhook = async (rawCollectedData, options = {}) => {
  const { 
    onProgress, 
    onRetry,
    emailOnlyMode = false,
    conversationMeta = {}
  } = options;
  
  // Validate proxy configuration
  if (!PROXY_AUTH_TOKEN) {
    throw new Error('Proxy authentication not configured');
  }
  
  // CRITICAL: Sanitize all collected data before processing
  const collectedData = sanitizeCollectedData(rawCollectedData);
  
  // Validate sanitized data based on submission mode
  const validation = validateCollectedData(collectedData, emailOnlyMode);
  if (!validation.isValid) {
    throw new Error(`Data validation failed: ${validation.errors.join(', ')}`);
  }
  
  // Format data for submission with conversation metadata
  const payload = formatDataForWebhook(collectedData, {
    ...conversationMeta,
    isPartialSubmission: emailOnlyMode
  });
  
  // Submit with retry logic using secure proxy
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      const progressMessage = emailOnlyMode 
        ? (attempt === 1 ? 'Saving your information...' : `Retry attempt ${attempt}...`)
        : (attempt === 1 ? 'Submitting data...' : `Retry attempt ${attempt}...`);
        
      onProgress?.(progressMessage);
      
      const result = await submitDataSecurely(payload, attempt);
      
      // Success
      return {
        success: true,
        data: result,
        attempts: attempt,
        timestamp: new Date().toISOString(),
        isPartialSubmission: emailOnlyMode
      };
      
    } catch (error) {
      lastError = error;
      
      if (attempt < MAX_RETRY_ATTEMPTS) {
        onRetry?.(attempt, error.message);
        await sleep(RETRY_DELAY * attempt);
      } else {
        const failureMessage = emailOnlyMode 
          ? 'Failed to save information after all retries'
          : 'Submission failed after all retries';
        onProgress?.(failureMessage);
      }
    }
  }
  
  throw new Error(`Secure webhook submission failed after ${MAX_RETRY_ATTEMPTS} attempts: ${lastError.message}`);
};

// Sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Error types for webhook operations
export const WebhookError = {
  VALIDATION_ERROR: 'validation_error',
  NETWORK_ERROR: 'network_error',
  TIMEOUT_ERROR: 'timeout_error',
  SERVER_ERROR: 'server_error',
  CONFIG_ERROR: 'config_error'
};

/**
 * Categorizes error type for better handling
 */
export const categorizeError = (error) => {
  const message = error.message.toLowerCase();
  
  if (message.includes('validation')) return WebhookError.VALIDATION_ERROR;
  if (message.includes('network') || message.includes('failed to fetch')) return WebhookError.NETWORK_ERROR;
  if (message.includes('timeout')) return WebhookError.TIMEOUT_ERROR;
  if (message.includes('http 5') || message.includes('server')) return WebhookError.SERVER_ERROR;
  if (message.includes('not configured')) return WebhookError.CONFIG_ERROR;
  
  return WebhookError.SERVER_ERROR;
};

/**
 * Performs secure HTTP POST request to proxy with authentication
 */
const submitDataSecurely = async (payload, attempt) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PROXY_AUTH_TOKEN}`,
        'User-Agent': '8085.ai-voice-agent/1.0.0',
        'X-Attempt': attempt.toString(),
        'X-Timestamp': new Date().toISOString()
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorData}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - proxy did not respond within 10 seconds');
    }
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error - unable to connect to secure proxy');
    }
    
    throw error;
  }
};

/**
 * Checks if collected data has minimum required information (email) for webhook submission
 * @param {Object} collectedData - Data from voice agent
 * @returns {boolean} - True if email is present and valid
 */
export const hasMinimumDataForSubmission = (collectedData) => {
  return !!(collectedData?.email && isValidEmail(collectedData.email));
};

/**
 * Determines if webhook should be called based on conversation ending and data collected
 * @param {Object} collectedData - Data from voice agent
 * @param {string} endingReason - How the conversation ended
 * @returns {Object} - Decision object with shouldSubmit flag and submission mode
 */
export const shouldSubmitWebhook = (collectedData, endingReason = 'normal') => {
  const hasEmail = hasMinimumDataForSubmission(collectedData);
  const hasAllData = Object.values(collectedData).every(value => value !== null && value !== undefined);
  const isPrematureEnding = endingReason !== 'normal' && endingReason !== 'completed';
  
  if (!hasEmail) {
    // No email collected - never submit
    return {
      shouldSubmit: false,
      emailOnlyMode: false,
      reason: 'No email collected'
    };
  }
  
  if (hasAllData || endingReason === 'completed') {
    // Complete data or normal completion - full submission
    return {
      shouldSubmit: true,
      emailOnlyMode: false,
      reason: 'Complete conversation data'
    };
  }
  
  if (hasEmail && isPrematureEnding) {
    // Has email but conversation ended prematurely - partial submission
    return {
      shouldSubmit: true,
      emailOnlyMode: true,
      reason: 'Premature ending with email collected'
    };
  }
  
  // Default case - full submission if we have email
  return {
    shouldSubmit: hasEmail,
    emailOnlyMode: !hasAllData,
    reason: hasEmail ? 'Partial data with email' : 'No minimum data'
  };
};

/**
 * Conversation ending reason constants
 */
export const ConversationEndReason = {
  NORMAL: 'normal',
  COMPLETED: 'completed',
  USER_CLOSED: 'user_closed',
  CONNECTION_LOST: 'connection_lost',
  BROWSER_CLOSE: 'browser_close',
  TIMEOUT: 'timeout',
  ERROR: 'error',
  NETWORK_ERROR: 'network_error',
  PREMATURE_CLOSE: 'premature_close'
};
