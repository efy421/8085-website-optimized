// Development/Production Logging Utility
const isDev = import.meta.env.MODE === 'development';

export const log = {
  info: (...args) => isDev && console.log(...args),
  warn: (...args) => isDev && console.warn(...args),
  error: (...args) => console.error(...args), // Always log errors
  debug: (...args) => isDev && console.debug(...args)
};

// For validation/sanitization debugging
export const logValidation = (message, data) => {
  if (isDev) {
    console.log(`[VALIDATION] ${message}:`, data);
  }
};

// For webhook/security debugging  
export const logSecurity = (message, data) => {
  if (isDev) {
    console.log(`[SECURITY] ${message}:`, data);
  }
};
