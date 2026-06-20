/**
 * Error Monitoring - Task 7.8
 */

import { errorHandler } from './errors/errorHandler.js';

class ErrorMonitor {
  constructor() {
    this.criticalErrors = [];
    this.alertThreshold = 5; // errors per minute
    this.lastAlert = 0;
  }

  // Global error handler for unhandled errors
  setupGlobalHandlers() {
    window.onerror = (message, source, lineno, colno, error) => {
      errorHandler.handleError(error || message, 'global-error', {
        source: source?.split('/').pop(),
        line: lineno
      });
    };

    window.onunhandledrejection = (event) => {
      errorHandler.handleError(event.reason, 'unhandled-promise');
    };
  }

  // Track critical errors for alerting
  trackCritical(errorInfo) {
    if (errorInfo.severity === 'critical') {
      this.criticalErrors.push({
        ...errorInfo,
        timestamp: Date.now()
      });
      
      this.checkAlertThreshold();
    }
  }

  checkAlertThreshold() {
    const now = Date.now();
    const recent = this.criticalErrors.filter(e => now - e.timestamp < 60000);
    
    if (recent.length >= this.alertThreshold && now - this.lastAlert > 300000) {
      this.sendAlert(recent);
      this.lastAlert = now;
    }
  }

  sendAlert(errors) {
    // For Netlify, log critical alerts that show in function logs
    console.error('[CRITICAL ALERT]', {
      errorCount: errors.length,
      types: [...new Set(errors.map(e => e.type))],
      timestamp: new Date().toISOString()
    });
  }
}

export const errorMonitor = new ErrorMonitor();

// Auto-setup on import
if (typeof window !== 'undefined') {
  errorMonitor.setupGlobalHandlers();
}
