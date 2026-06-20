/**
 * Centralized Error Handler - Task 7.8
 */

import { ErrorTypes, UserMessages, ErrorSeverityMap } from './errorTypes.js';
import { log } from '../logger.js';

class ErrorHandler {
  constructor() {
    this.errorCounts = new Map();
    this.lastErrors = [];
    this.maxStoredErrors = 10;
  }

  handleError(error, context = 'unknown', metadata = {}) {
    const errorInfo = this.classifyError(error, context);
    const sanitizedError = this.sanitizeError(errorInfo, metadata);
    
    this.logError(sanitizedError, context, metadata);
    this.trackError(errorInfo.type);
    this.storeError(sanitizedError);
    
    return {
      userMessage: sanitizedError.userMessage,
      errorId: sanitizedError.id,
      severity: sanitizedError.severity,
      type: sanitizedError.type
    };
  }

  classifyError(error, context) {
    const errorMessage = error?.message || error || 'Unknown error';
    const errorLower = errorMessage.toLowerCase();

    if (errorLower.includes('validation') || errorLower.includes('invalid')) {
      return { type: ErrorTypes.VALIDATION_ERROR, originalError: error };
    }
    if (errorLower.includes('unauthorized') || errorLower.includes('auth')) {
      return { type: ErrorTypes.AUTHENTICATION_ERROR, originalError: error };
    }
    if (context.includes('voice') || context.includes('elevenlabs')) {
      return { type: ErrorTypes.VOICE_AGENT_ERROR, originalError: error };
    }
    if (context.includes('webhook')) {
      return { type: ErrorTypes.WEBHOOK_ERROR, originalError: error };
    }
    if (errorLower.includes('network') || errorLower.includes('fetch')) {
      return { type: ErrorTypes.NETWORK_ERROR, originalError: error };
    }

    return { type: ErrorTypes.UNKNOWN_ERROR, originalError: error };
  }

  sanitizeError(errorInfo, metadata) {
    const id = this.generateErrorId();
    const severity = ErrorSeverityMap[errorInfo.type] || ErrorSeverity.HIGH;
    
    return {
      id,
      type: errorInfo.type,
      severity,
      userMessage: UserMessages[errorInfo.type],
      timestamp: new Date().toISOString(),
      // Remove stack trace and sensitive data
      sanitizedMessage: this.stripSensitiveInfo(errorInfo.originalError?.message || 'Unknown error')
    };
  }

  logError(sanitizedError, context, metadata) {
    // Always log errors for Netlify Functions visibility
    console.error(`[ERROR-${sanitizedError.id}]`, {
      type: sanitizedError.type,
      severity: sanitizedError.severity,
      context,
      timestamp: sanitizedError.timestamp,
      // Safe metadata only
      safeMetadata: this.sanitizeMetadata(metadata)
    });
  }

  stripSensitiveInfo(message) {
    return message?.replace(/api[_-]?key[s]?[:\s=]+[^\s]+/gi, '[API_KEY_REDACTED]')
                   .replace(/token[s]?[:\s=]+[^\s]+/gi, '[TOKEN_REDACTED]')
                   .replace(/password[s]?[:\s=]+[^\s]+/gi, '[PASSWORD_REDACTED]') || 'Unknown error';
  }

  generateErrorId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  trackError(type) {
    this.errorCounts.set(type, (this.errorCounts.get(type) || 0) + 1);
  }

  storeError(error) {
    this.lastErrors.unshift(error);
    if (this.lastErrors.length > this.maxStoredErrors) {
      this.lastErrors.pop();
    }
  }

  sanitizeMetadata(metadata) {
    const safe = { ...metadata };
    delete safe.apiKey;
    delete safe.token;
    delete safe.password;
    return safe;
  }
}

export const errorHandler = new ErrorHandler();
export { ErrorHandler };
