/**
 * Error Classification System - Task 7.8
 * Centralized error types and severity levels
 */

// Error Categories
export const ErrorTypes = {
  // User Input Errors
  VALIDATION_ERROR: 'validation_error',
  AUTHENTICATION_ERROR: 'authentication_error',
  AUTHORIZATION_ERROR: 'authorization_error',
  
  // System Errors
  NETWORK_ERROR: 'network_error',
  API_ERROR: 'api_error',
  CONFIG_ERROR: 'config_error',
  
  // Application Errors
  VOICE_AGENT_ERROR: 'voice_agent_error',
  ANIMATION_ERROR: 'animation_error',
  WEBHOOK_ERROR: 'webhook_error',
  
  // Security Errors
  RATE_LIMIT_ERROR: 'rate_limit_error',
  CAPTCHA_ERROR: 'captcha_error',
  
  // Unknown/Unexpected
  UNKNOWN_ERROR: 'unknown_error'
};

// Severity Levels
export const ErrorSeverity = {
  LOW: 'low',           // Minor issues, app continues
  MEDIUM: 'medium',     // Feature unavailable, partial functionality
  HIGH: 'high',         // Major feature broken, significant impact
  CRITICAL: 'critical'  // App unusable, security risk
};

// User-facing error messages (generic, no technical details)
export const UserMessages = {
  [ErrorTypes.VALIDATION_ERROR]: "Please check your input and try again.",
  [ErrorTypes.AUTHENTICATION_ERROR]: "Authentication failed. Please try again.",
  [ErrorTypes.AUTHORIZATION_ERROR]: "You don't have permission to perform this action.",
  [ErrorTypes.NETWORK_ERROR]: "Connection issue. Please check your internet and try again.",
  [ErrorTypes.API_ERROR]: "Service temporarily unavailable. Please try again later.",
  [ErrorTypes.CONFIG_ERROR]: "Configuration error. Please contact support.",
  [ErrorTypes.VOICE_AGENT_ERROR]: "Voice service is temporarily unavailable.",
  [ErrorTypes.ANIMATION_ERROR]: "Display issue detected. Page may need refresh.",
  [ErrorTypes.WEBHOOK_ERROR]: "Data submission failed. Please try again.",
  [ErrorTypes.RATE_LIMIT_ERROR]: "Please wait a moment before trying again.",
  [ErrorTypes.CAPTCHA_ERROR]: "Verification failed. Please try again.",
  [ErrorTypes.UNKNOWN_ERROR]: "Something went wrong. Please try again or contact support."
};

// Error severity mapping
export const ErrorSeverityMap = {
  [ErrorTypes.VALIDATION_ERROR]: ErrorSeverity.LOW,
  [ErrorTypes.AUTHENTICATION_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorTypes.AUTHORIZATION_ERROR]: ErrorSeverity.HIGH,
  [ErrorTypes.NETWORK_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorTypes.API_ERROR]: ErrorSeverity.HIGH,
  [ErrorTypes.CONFIG_ERROR]: ErrorSeverity.CRITICAL,
  [ErrorTypes.VOICE_AGENT_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorTypes.ANIMATION_ERROR]: ErrorSeverity.LOW,
  [ErrorTypes.WEBHOOK_ERROR]: ErrorSeverity.HIGH,
  [ErrorTypes.RATE_LIMIT_ERROR]: ErrorSeverity.LOW,
  [ErrorTypes.CAPTCHA_ERROR]: ErrorSeverity.MEDIUM,
  [ErrorTypes.UNKNOWN_ERROR]: ErrorSeverity.HIGH
};
