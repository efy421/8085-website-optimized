import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useVoiceAgent } from '../lib/useVoiceAgent';
import { formatSafeDisplayValue } from '../lib/sanitization';
import {
  submitToWebhook,
  shouldSubmitWebhook,
  ConversationEndReason,
} from '../lib/webhookService';
import captchaService from '../services/captchaService';
import { errorHandler } from '../lib/errors/errorHandler';
import SoundWaveAnimation from './SoundWaveAnimation';
import '../styles/voice-agent-overlay.css';

const createInitialWebhookState = () => ({
  isSubmitting: false,
  hasSubmitted: false,
  submissionSuccess: null,
  submissionMessage: '',
  showResult: false,
});

const createInitialCaptchaState = () => ({
  isVerifying: false,
  isVerified: false,
  verificationFailed: false,
  requiresChallenge: false,
  error: null,
});

const VoiceAgentOverlay = ({ isVisible, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const backgroundRef = useRef(null);
  const infoContainerRef = useRef(null);
  const dataItemsRef = useRef([]);
  const [lastDataUpdate, setLastDataUpdate] = useState(null);
  
  // GDPR Consent state
  const [consentState, setConsentState] = useState({
    hasConsented: false,
    showConsentForm: true,
    consentTimestamp: null
  });
  
  // Privacy details expansion state
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  
  // Webhook submission state
  const [webhookState, setWebhookState] = useState(createInitialWebhookState);
  
  // CAPTCHA verification state
  const [captchaState, setCaptchaState] = useState(createInitialCaptchaState);
  
  // Voice agent integration with actual agent ID
  const voiceAgent = useVoiceAgent();
  const agentId = 'agent_01jvd0y127fg8t4x9ba5h2g4r5';

  // Enhanced avatar glow animation based on speaking state
  useEffect(() => {
    const avatarGlow = document.querySelector('.avatar-glow');
    if (avatarGlow) {
      if (voiceAgent.isSpeaking) {
        gsap.to(avatarGlow, {
          scale: 1.3,
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Pulsing effect while speaking
        gsap.to(avatarGlow, {
          scale: 1.1,
          duration: 1.5,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1
        });
      } else {
        gsap.killTweensOf(avatarGlow);
        gsap.to(avatarGlow, {
          scale: 1,
          opacity: 0.6,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    }
  }, [voiceAgent.isSpeaking]);

  // Status text animation
  useEffect(() => {
    const statusText = document.querySelector('.status-text');
    if (statusText) {
      gsap.fromTo(statusText,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [voiceAgent.status, voiceAgent.error, voiceAgent.isSpeaking]);

  // Animate new data collection
  useEffect(() => {
    // Detect new data collection and animate
    const currentDataKeys = Object.keys(voiceAgent.collectedData).filter(
      (key) => key !== 'conversationId' && voiceAgent.collectedData[key],
    );
    const lastDataKeys = lastDataUpdate
      ? Object.keys(lastDataUpdate).filter((key) => key !== 'conversationId' && lastDataUpdate[key])
      : [];
    
    if (currentDataKeys.length > lastDataKeys.length) {
      // New data was collected - animate the info container
      if (infoContainerRef.current) {
        gsap.fromTo(infoContainerRef.current, 
          { scale: 1, boxShadow: "0 0 0 rgba(34, 197, 94, 0)" },
          { 
            scale: 1.02, 
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
          }
        );
      }
      
      // Animate new data items
      const newDataItems = dataItemsRef.current.slice(lastDataKeys.length);
      newDataItems.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, x: -20, scale: 0.9 },
            { 
              opacity: 1, 
              x: 0, 
              scale: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: "back.out(1.7)"
            }
          );
        }
      });
    }
    
    setLastDataUpdate({...voiceAgent.collectedData});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceAgent.collectedData, voiceAgent.hasCollectedData]);

  // Helper function to get user-visible data (exclude conversationId)
  const getUserVisibleData = () => {
    const { conversationId: _conversationId, ...visibleData } = voiceAgent.collectedData;
    return visibleData;
  };

  const visibleCollectedCount = voiceAgent.collectedFieldCount;

  // Helper functions for data formatting
  const formatDataLabel = (key) => {
    const labels = {
      name: 'Name',
      email: 'Email',
      query: 'Question',
      company: 'Company',
      employeeCount: 'Team Size'
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const formatDataValue = (key, value) => {
    return formatSafeDisplayValue(key, value);
  };

  const getDataIcon = (key) => {
    const icons = {
      name: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>,
      email: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>,
      query: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>,
      company: <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>,
      employeeCount: <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1H4zM8 10c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm8 0c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm0 2c-1.33 0-4 .67-4 2v1h8v-1c0-1.33-2.67-2-4-2z"/>
    };
    return icons[key] || <path d="M13 7h-2v4H9v2h2v4h2v-4h2v-2h-2V7z"/>;
  };

  // Webhook submission functions with support for premature endings
  const handleWebhookSubmission = async (endReason = ConversationEndReason.NORMAL) => {
    // Determine if webhook should be submitted and in what mode
    const decision = shouldSubmitWebhook(voiceAgent.collectedData, endReason);
    
    if (!decision.shouldSubmit) {
      return { submitted: false, reason: decision.reason };
    }

    // Set appropriate loading message based on submission type
    const loadingMessage = decision.emailOnlyMode 
      ? 'Saving your information...' 
      : 'Processing your information...';

    setWebhookState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      submissionMessage: loadingMessage
    }));

    try {
      // Prepare conversation metadata
      const conversationMeta = {
        conversationState: voiceAgent.conversationState.isActive ? 'active' : 'ended',
        endingReason: endReason,
        conversationDuration: voiceAgent.getConversationDuration()
      };

      await submitToWebhook(voiceAgent.collectedData, {
        onProgress: (message) => {
          setWebhookState(prev => ({ ...prev, submissionMessage: message }));
        },
        onRetry: (attempt, _error) => {
          setWebhookState(prev => ({ 
            ...prev, 
            submissionMessage: `Retrying... (attempt ${attempt})` 
          }));
        },
        emailOnlyMode: decision.emailOnlyMode,
        conversationMeta
      });

      // Success state with appropriate message
      const successMessage = decision.emailOnlyMode 
        ? 'Information saved successfully!' 
        : 'Information submitted successfully!';
      
      setWebhookState(prev => ({
        ...prev,
        isSubmitting: false,
        hasSubmitted: true,
        submissionSuccess: true,
        submissionMessage: successMessage,
        showResult: true
      }));

      // Show success animation and auto-close
      showResultAnimation(true);
      
      return { submitted: true, mode: decision.emailOnlyMode ? 'partial' : 'full' };
      
    } catch (error) {
      // Use centralized error handler - Task 7.8
      const processedError = errorHandler.handleError(
        error, 
        'voice-agent-webhook',
        { mode: decision.emailOnlyMode ? 'email-only' : 'full-data' }
      );

      // Error state with generic user message
      setWebhookState(prev => ({
        ...prev,
        isSubmitting: false,
        hasSubmitted: true,
        submissionSuccess: false,
        submissionMessage: processedError.userMessage,
        showResult: true
      }));

      // Show error animation with retry option
      showResultAnimation(false);
      
      return { submitted: false, reason: 'error', error: processedError.userMessage };
    }
  };

  // Show result animation (success or error)
  const showResultAnimation = (_isSuccess) => {
    // Just set the state - the JSX will handle the rendering
    setWebhookState(prev => ({
      ...prev,
      showResult: true
    }));

    // Auto-close after 4 seconds
    setTimeout(() => {
      handleResultAnimationComplete();
    }, 4000);
  };

  // Handle result animation completion
  const handleResultAnimationComplete = () => {
    // Reset webhook state and close overlay
    setWebhookState({
      isSubmitting: false,
      hasSubmitted: false,
      submissionSuccess: null,
      submissionMessage: '',
      showResult: false
    });
    
    // Close overlay
    onClose();
  };

  // GDPR Consent handlers
  const handleConsentGiven = () => {
    setConsentState({
      hasConsented: true,
      showConsentForm: false,
      consentTimestamp: new Date().toISOString()
    });
  };

  const handleConsentDeclined = () => {
    void requestOverlayClose();
  };

  // Handle premature conversation ending when overlay closes
  const handlePrematureClose = async (reason = ConversationEndReason.USER_CLOSED) => {
    if (voiceAgent.isInitialized) {
      try {
        // End conversation with specified reason
        await voiceAgent.endConversation(reason);
        
        // Check if we should submit webhook for partial data
        if (voiceAgent.hasEmailForSubmission()) {
          await handleWebhookSubmission(reason);
        }
      } catch (error) {
        // Use centralized error handler - Task 7.8
        errorHandler.handleError(error, 'voice-agent-close', { reason });
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestOverlayClose = async (reason = ConversationEndReason.USER_CLOSED) => {
    await handlePrematureClose(reason);
    onClose();
  };

  // Handle natural conversation ending (not user-initiated close)
  useEffect(() => {
    const handleConversationEnd = async () => {
      // Check if conversation just ended naturally
      if (voiceAgent.conversationState.hasEnded && 
          !voiceAgent.conversationState.isActive && 
          voiceAgent.conversationState.endReason !== ConversationEndReason.USER_CLOSED &&
          !webhookState.hasSubmitted) {
        
        await handleWebhookSubmission(voiceAgent.conversationState.endReason || ConversationEndReason.COMPLETED);
      }
    };

    handleConversationEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceAgent.conversationState.hasEnded, voiceAgent.conversationState.isActive]);

  // Handle browser/tab close events
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (voiceAgent.isInitialized && voiceAgent.hasEmailForSubmission()) {
        // Prevent default to allow webhook submission
        event.preventDefault();
        event.returnValue = '';
        
        // Attempt to submit data before page unload
        
        // Use sendBeacon for reliable data transmission during unload
        if (navigator.sendBeacon && window.fetch) {
          try {
            const decision = shouldSubmitWebhook(voiceAgent.collectedData, ConversationEndReason.BROWSER_CLOSE);
            
            if (decision.shouldSubmit) {
              const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
              const payload = {
                clientData: {
                  ...(voiceAgent.collectedData.email && { email: voiceAgent.collectedData.email.trim().toLowerCase() }),
                  ...(voiceAgent.collectedData.name && { name: voiceAgent.collectedData.name.trim() }),
                  ...(voiceAgent.collectedData.company && { company: voiceAgent.collectedData.company.trim() }),
                  ...(voiceAgent.collectedData.employeeCount && { employeeCount: parseInt(voiceAgent.collectedData.employeeCount) }),
                  ...(voiceAgent.collectedData.query && { query: voiceAgent.collectedData.query.trim() })
                },
                metadata: {
                  timestamp: new Date().toISOString(),
                  source: '8085.ai-voice-agent',
                  conversationState: 'interrupted',
                  endingReason: ConversationEndReason.BROWSER_CLOSE,
                  isPartialSubmission: decision.emailOnlyMode
                }
              };
              
              // Use sendBeacon for reliable transmission during page unload
              navigator.sendBeacon(webhookUrl, JSON.stringify(payload));
            }
          } catch (error) {
            console.error('Failed to send data during page unload:', error);
          }
        }
      }
    };

    // Add event listeners when overlay is visible and conversation is active
    if (isVisible && voiceAgent.isInitialized) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, voiceAgent.isInitialized, voiceAgent.hasEmailForSubmission, voiceAgent.collectedData]);
  const handleStartConversation = async () => {
    if (!consentState.hasConsented) {
      setCaptchaState({
        ...createInitialCaptchaState(),
        verificationFailed: true,
        error: 'Privacy consent is required before starting the conversation.',
      });
      return;
    }

    setCaptchaState({
      ...createInitialCaptchaState(),
      isVerifying: true,
    });
    
    try {
      const verification = await captchaService.verifyUser('voice_agent_start');

      if (!verification.allowed) {
        if (verification.requiresChallenge) {
          setCaptchaState({
            ...createInitialCaptchaState(),
            requiresChallenge: true,
            error: 'Security verification required. Please complete the challenge.',
          });
          return;
        }

        setCaptchaState({
          ...createInitialCaptchaState(),
          verificationFailed: true,
          error: verification.error || 'Access denied. Please try again later.',
        });
        return;
      }

      setCaptchaState({
        ...createInitialCaptchaState(),
        isVerified: true,
      });
    } catch (error) {
      console.error('CAPTCHA verification failed:', error);
      setCaptchaState({
        ...createInitialCaptchaState(),
        verificationFailed: true,
        error: 'Security verification failed. Please refresh and try again.',
      });
      return;
    }

    try {
      await voiceAgent.startConversation(agentId);
    } catch (error) {
      errorHandler.handleError(error, 'voice-agent-start');
    }
  };

  const handleEndConversation = async () => {
    try {
      await voiceAgent.endConversation(ConversationEndReason.COMPLETED);
      
      // Always attempt webhook submission for completed conversations
      if (voiceAgent.hasCollectedData || voiceAgent.hasEmailForSubmission()) {
        await handleWebhookSubmission(ConversationEndReason.COMPLETED);
      }
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      return;
    }

    voiceAgent.resetCollectedData();
    setWebhookState(createInitialWebhookState());
    setCaptchaState(createInitialCaptchaState());
    setShowPrivacyDetails(false);
    setLastDataUpdate(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, voiceAgent.resetCollectedData]);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isVisible) {
      // Show overlay with entrance animation
      gsap.set(overlayRef.current, { display: 'flex' });
      
      // Animate backdrop blur
      gsap.fromTo(backgroundRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.6, 
          ease: 'power2.out' 
        }
      );

      // Animate content container
      gsap.fromTo(contentRef.current,
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 50 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.2 
        }
      );

    } else {
      // Exit animation
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 0.4,
        ease: 'power2.in'
      });

      gsap.to(backgroundRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
        }
      });
    }
  }, [isVisible]);

  // Handle keyboard events and focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isVisible) {
        event.preventDefault();
        void requestOverlayClose();
        return;
      }

      if (event.key === 'Tab' && isVisible && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    let previouslyFocusedElement = null;

    if (isVisible) {
      previouslyFocusedElement = document.activeElement;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus first focusable element when opening
      setTimeout(() => {
        const focusable = contentRef.current?.querySelector(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        focusable?.focus();
      }, 100);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previouslyFocusedElement?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, requestOverlayClose]);

  const handleBackdropClick = async (e) => {
    if (e.target === e.currentTarget) {
      await requestOverlayClose();
    }
  };

  const handleCloseButtonClick = async () => {
    await requestOverlayClose();
  };

  return (
    <div 
      ref={overlayRef}
      className="voice-agent-overlay"
      onClick={handleBackdropClick}
      style={{ display: 'none' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-agent-title"
      aria-describedby="voice-agent-description"
    >
      {/* Blurred background */}
      <div ref={backgroundRef} className="overlay-background" />
      
      {/* Content container */}
      <div ref={contentRef} className="overlay-content">
        <div className="voice-agent-container">
          {/* Header */}
          <div className="voice-agent-header">
            <h2 id="voice-agent-title" className="voice-agent-title">
              Talk with Ada
            </h2>
            <button 
              className="close-button"
              onClick={handleCloseButtonClick}
              aria-label="Close voice agent"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Main content area */}
          <div className="voice-agent-main">
            {/* GDPR Consent Form */}
            {consentState.showConsentForm ? (
              <div className="consent-form">
                <div className="consent-content">
                  <div className="consent-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                    </svg>
                  </div>
                  <h3>Privacy & Data Collection</h3>
                  <p>
                    To provide personalized assistance, Ada will collect your name, email, 
                    company information, and conversation details. This data helps us respond 
                    to your inquiry effectively.
                  </p>
                  <div className="consent-details">
                    {showPrivacyDetails ? (
                      <div className="privacy-full-text">
                        <div className="privacy-header">
                          <h4>Privacy Policy Details</h4>
                          <button 
                            type="button"
                            onClick={() => setShowPrivacyDetails(false)}
                            className="privacy-close-btn"
                          >
                            ×
                          </button>
                        </div>
                        <div className="privacy-content">
                          <section>
                            <h5>Data We Collect</h5>
                            <p>Name, email address, company name, employee count, your questions and conversation content, conversation ID for technical purposes.</p>
                          </section>
                          <section>
                            <h5>Purpose</h5>
                            <p>We use this data to respond to business inquiries, provide personalized assistance, follow up on opportunities, and improve our services.</p>
                          </section>
                          <section>
                            <h5>Storage & Retention</h5>
                            <p>Data is stored securely and retained for up to 24 months. We may retain data longer if required by law.</p>
                          </section>
                          <section>
                            <h5>Your Rights</h5>
                            <p>You can access, correct, or delete your data by emailing privacy@8085.ai. We respond within 30 days.</p>
                          </section>
                        </div>
                      </div>
                    ) : (
                      <ul>
                        <li>Data collected: Name, email, company, conversation content</li>
                        <li>Purpose: Business inquiries and communication</li>
                        <li>Storage: Up to 24 months</li>
                        <li>Your rights: Access, correct, or delete your data</li>
                      </ul>
                    )}
                  </div>
                  <div className="consent-actions">
                    <button 
                      className="voice-button primary"
                      onClick={handleConsentGiven}
                    >
                      I Agree & Continue
                    </button>
                    <button 
                      className="voice-button secondary"
                      onClick={handleConsentDeclined}
                    >
                      Decline
                    </button>
                  </div>
                  <div className="privacy-link">
                    <button 
                      type="button" 
                      onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                      className="privacy-toggle-btn"
                    >
                      {showPrivacyDetails ? 'Hide' : 'View'} Privacy Policy
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
            <div className="agent-avatar-container">
              <div className="agent-avatar">
                <img 
                  src="/images/contact-avatar-chloe.png" 
                  alt="Ada AI Assistant" 
                  className="avatar-image"
                />
                <div className="avatar-glow"></div>
              </div>
              
              {/* Sound wave animation when speaking */}
              {voiceAgent.isInitialized && (
                <SoundWaveAnimation 
                  isActive={voiceAgent.isSpeaking} 
                  className="mt-4"
                />
              )}
            </div>

            <div className="agent-status">
              <p id="voice-agent-description" className="status-text">
                {voiceAgent.error ? (
                  <span className="error-text">Error: {voiceAgent.error}</span>
                ) : voiceAgent.isInitialized ? (
                  voiceAgent.isSpeaking ? (
                    "🎤 Ada is speaking..."
                  ) : (
                    "👂 Ada is listening..."
                  )
                ) : (
                  "Hi! I'm Ada, your AI assistant. Ready to help with your questions about 8085.ai."
                )}
              </p>
              
              {voiceAgent.status && (
                <div className="connection-status">
                  Status: {voiceAgent.status}
                </div>
              )}
            </div>

            {/* Information display area - populated by client tools */}
            <div className="collected-info">
              <div ref={infoContainerRef} className="info-container">
                <h3 className="info-title">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 7h-2v4H9v2h2v4h2v-4h2v-2h-2V7zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                  Conversation Details
                </h3>
                <div className="info-content">
                  {voiceAgent.hasCollectedData ? (
                    <div className="collected-data-display">
                      {Object.entries(getUserVisibleData()).map(([key, value], index) => 
                        value && (
                          <div 
                            key={key} 
                            ref={el => dataItemsRef.current[index] = el}
                            className="data-item"
                          >
                            <div className="data-item-content">
                              <span className="data-label">
                                <svg className="data-icon" viewBox="0 0 24 24" fill="currentColor">
                                  {getDataIcon(key)}
                                </svg>
                                {formatDataLabel(key)}:
                              </span>
                              <span className="data-value">{formatDataValue(key, value)}</span>
                            </div>
                            <div className="data-checkmark">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            </div>
                          </div>
                        )
                      )}
                      
                      {/* Data completeness indicator */}
                      <div className="data-completeness">
                        <div className="completeness-bar">
                          <div 
                            className="completeness-fill"
                            style={{ 
                              width: `${(visibleCollectedCount / 5) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="completeness-text">
                          {visibleCollectedCount} / 5 details collected
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="info-placeholder">
                      <svg className="placeholder-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                      </svg>
                      <p>Information will appear here as we chat...</p>
                      <div className="expected-info">
                        <span>I&apos;ll collect: Name • Email • Company • Team Size • Your Question</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Control buttons */}
            <div className="voice-controls">
              {!voiceAgent.isInitialized ? (
                <button 
                  className="voice-button primary" 
                  onClick={handleStartConversation}
                  disabled={voiceAgent.status === 'connecting' || webhookState.isSubmitting || captchaState.isVerifying}
                >
                  <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  <span>
                    {captchaState.isVerifying ? 'Verifying Security...' :
                     voiceAgent.status === 'connecting' ? 'Connecting...' : 
                     'Start Conversation'}
                  </span>
                </button>
              ) : (
                <button 
                  className="voice-button secondary" 
                  onClick={handleEndConversation}
                  disabled={webhookState.isSubmitting}
                >
                  <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                  </svg>
                  <span>End Conversation</span>
                </button>
              )}
              
              <button 
                className="voice-button secondary" 
                onClick={handleCloseButtonClick}
                disabled={webhookState.isSubmitting}
              >
                <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                <span>Close</span>
              </button>
            </div>

            {/* CAPTCHA verification status */}
            {captchaState.error && (
              <div className="captcha-status error">
                <div className="status-icon">🔒</div>
                <p className="status-message">{captchaState.error}</p>
                {captchaState.verificationFailed && (
                  <button 
                    className="voice-button primary small" 
                    onClick={() => {
                      setCaptchaState(createInitialCaptchaState());
                    }}
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}

            {/* Webhook submission status */}
            {webhookState.isSubmitting && (
              <div className="submission-status">
                <div className="submission-spinner">
                  <div className="spinner"></div>
                </div>
                <p className="submission-message">{webhookState.submissionMessage}</p>
              </div>
            )}

            {/* Result Animation Overlay */}
            {webhookState.showResult && (
              <div className="result-animation-container">
                <div className="result-content">
                  <div className="result-emoji">
                    {webhookState.submissionSuccess ? '✅' : '❌'}
                  </div>
                  <h3 className="result-title">
                    {webhookState.submissionSuccess ? 'Success!' : 'Oops!'}
                  </h3>
                  <p className="result-message">{webhookState.submissionMessage}</p>
                  {!webhookState.submissionSuccess && (
                    <button 
                      className="voice-button primary small" 
                      onClick={() => handleWebhookSubmission(ConversationEndReason.NORMAL)}
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}
            </>
            )}
          </div>

          {/* Footer */}
          <div className="voice-agent-footer">
            <p className="privacy-note">
              Your conversation is private and secure. We&apos;ll only use the information to help you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentOverlay;
