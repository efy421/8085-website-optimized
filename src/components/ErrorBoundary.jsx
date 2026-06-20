/**
 * React Error Boundary Component - Task 7.8
 */

import React from 'react';
import { errorHandler } from '../lib/errors/errorHandler.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Handle error with centralized system
    const processedError = errorHandler.handleError(
      error,
      'react-boundary',
      { 
        componentStack: errorInfo.componentStack?.substring(0, 200),
        errorBoundary: this.props.fallbackId || 'unknown'
      }
    );

    this.setState({ 
      errorInfo: processedError 
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            {this.state.errorInfo?.userMessage || "We're working to fix this issue."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
