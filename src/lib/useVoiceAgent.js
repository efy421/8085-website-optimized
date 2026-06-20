import { useState, useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { sanitizeName, sanitizeEmail, sanitizeQuery, sanitizeCompany, sanitizeEmployeeCount } from './sanitization';

const VISIBLE_COLLECTED_FIELDS = ['name', 'email', 'query', 'company', 'employeeCount'];
const NON_RETRYABLE_START_ERRORS = new Set([
  'NotAllowedError',
  'PermissionDeniedError',
  'NotFoundError',
  'DevicesNotFoundError',
]);

const getConversationErrorMessage = (error) => {
  if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
    return 'Microphone permission was denied. Please allow microphone access and try again.';
  }

  if (error?.name === 'NotFoundError' || error?.name === 'DevicesNotFoundError') {
    return 'No microphone was found. Connect a microphone and try again.';
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }

  if (typeof error?.message === 'string' && error.message.trim().length > 0) {
    return error.message;
  }

  return 'Ada could not connect right now. Please refresh and try again.';
};

const isRetryableConversationError = (error) => !NON_RETRYABLE_START_ERRORS.has(error?.name);

export const useVoiceAgent = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [collectedData, setCollectedData] = useState({
    name: null,
    email: null,
    query: null,
    company: null,
    employeeCount: null,
    conversationId: null,
  });
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const [conversationState, setConversationState] = useState({
    isActive: false,
    startTime: null,
    endTime: null,
    endReason: null,
    hasEnded: false,
  });

  const clientTools = {
    collect_name: (...args) => {
      try {
        let name = args[0]?.name || args[0]?.value || args[0] || args[1];
        if (typeof name === 'object') name = Object.values(name)[0];

        const sanitizedName = sanitizeName(name);
        if (sanitizedName) {
          setCollectedData((prev) => ({ ...prev, name: sanitizedName }));
          return { success: true, data: sanitizedName };
        }
        return { success: false, error: 'Valid name is required' };
      } catch {
        return { success: false, error: 'Failed to collect name' };
      }
    },

    collect_email: (...args) => {
      try {
        let email = args[0]?.email || args[0]?.value || args[0] || args[1];
        if (typeof email === 'object') email = Object.values(email)[0];

        const sanitizedEmail = sanitizeEmail(email);
        if (sanitizedEmail) {
          setCollectedData((prev) => ({ ...prev, email: sanitizedEmail }));
          return { success: true, data: sanitizedEmail };
        }
        return { success: false, error: 'Valid email required' };
      } catch {
        return { success: false, error: 'Failed to collect email' };
      }
    },

    collect_query: (...args) => {
      try {
        let query = args[0]?.query || args[0]?.value || args[0] || args[1];
        if (typeof query === 'object') query = Object.values(query)[0];

        const sanitizedQuery = sanitizeQuery(query);
        if (sanitizedQuery) {
          setCollectedData((prev) => ({ ...prev, query: sanitizedQuery }));
          return { success: true, data: sanitizedQuery };
        }
        return { success: false, error: 'Query is required' };
      } catch {
        return { success: false, error: 'Failed to collect query' };
      }
    },

    collect_company: (...args) => {
      try {
        let company = args[0]?.company || args[0]?.value || args[0] || args[1];
        if (typeof company === 'object') company = Object.values(company)[0];

        const sanitizedCompany = sanitizeCompany(company);
        if (sanitizedCompany) {
          setCollectedData((prev) => ({ ...prev, company: sanitizedCompany }));
          return { success: true, data: sanitizedCompany };
        }
        return { success: false, error: 'Company name required' };
      } catch {
        return { success: false, error: 'Failed to collect company' };
      }
    },

    collect_employee_count: (...args) => {
      try {
        let count = args[0]?.count || args[0]?.employee_count || args[0]?.value || args[0] || args[1];
        if (typeof count === 'object') count = Object.values(count)[0];

        const sanitizedCount = sanitizeEmployeeCount(count);
        if (sanitizedCount) {
          setCollectedData((prev) => ({ ...prev, employeeCount: sanitizedCount }));
          return { success: true, data: sanitizedCount };
        }
        return { success: false, error: 'Valid employee count required' };
      } catch {
        return { success: false, error: 'Failed to collect employee count' };
      }
    },

    collect_conversation_id: () => {
      try {
        const currentConversationId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

        if (!conversationId) {
          setConversationId(currentConversationId);
        }

        setCollectedData((prev) => ({ ...prev, conversationId: currentConversationId }));

        return { success: true, data: currentConversationId };
      } catch {
        return { success: false, error: 'Failed to collect conversation ID' };
      }
    },
  };

  const conversation = useConversation({
    clientTools,
    onConnect: () => {
      setIsInitialized(true);
      setError(null);
      setConversationState((prev) => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
        hasEnded: false,
        endReason: null,
      }));
    },
    onDisconnect: () => {
      setIsInitialized(false);
      setConversationState((prev) => ({
        ...prev,
        isActive: false,
        endTime: Date.now(),
        hasEnded: true,
        endReason: prev.endReason || 'connection_lost',
      }));
    },
    onMessage: () => {},
    onError: (conversationError) => {
      const message = getConversationErrorMessage(conversationError);
      console.error('Voice error:', conversationError);
      setError(message);
      setIsInitialized(false);
      setConversationState((prev) => ({
        ...prev,
        isActive: false,
        endTime: Date.now(),
        hasEnded: true,
        endReason: 'error',
      }));
    },
  });

  const startConversation = useCallback(async (agentId) => {
    const maxRetries = 3;
    const ringSound = new Audio('/sounds/dialing-sound.mp3');
    ringSound.loop = true;

    const stopRingSound = () => {
      ringSound.pause();
      ringSound.currentTime = 0;
    };

    try {
      ringSound.play().catch(() => {});
    } catch {}

    for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
      try {
        setError(null);

        await navigator.mediaDevices.getUserMedia({ audio: true });

        const id = await conversation.startSession({ agentId });
        setConversationId(id);

        stopRingSound();
        return id;
      } catch (conversationError) {
        const userError = getConversationErrorMessage(conversationError);

        if (attempt === maxRetries || !isRetryableConversationError(conversationError)) {
          stopRingSound();
          setError(userError);
          throw new Error(userError);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    stopRingSound();
    throw new Error('Ada could not start the conversation.');
  }, [conversation]);

  const endConversation = useCallback(async (endReason = 'normal') => {
    try {
      await conversation.endSession();
      setConversationId(null);
      setIsInitialized(false);
      setConversationState((prev) => ({
        ...prev,
        isActive: false,
        endTime: Date.now(),
        hasEnded: true,
        endReason,
      }));
    } catch {
      setError('Ada could not end the conversation cleanly.');
    }
  }, [conversation]);

  const setVolume = useCallback((volume) => {
    try {
      conversation.setVolume({ volume: Math.max(0, Math.min(1, volume)) });
    } catch (volumeError) {
      console.error('Failed to set volume:', volumeError);
    }
  }, [conversation]);

  const resetCollectedData = useCallback(() => {
    setCollectedData({
      name: null,
      email: null,
      query: null,
      company: null,
      employeeCount: null,
      conversationId: null,
    });
    setConversationId(null);
    setError(null);
    setIsInitialized(false);
    setConversationState({
      isActive: false,
      startTime: null,
      endTime: null,
      endReason: null,
      hasEnded: false,
    });
  }, []);

  const getConversationDuration = useCallback(() => {
    if (!conversationState.startTime) return 0;
    const endTime = conversationState.endTime || Date.now();
    return Math.round((endTime - conversationState.startTime) / 1000);
  }, [conversationState]);

  const hasEmailForSubmission = useCallback(() => !!(collectedData.email && collectedData.email.trim().length > 0), [collectedData.email]);

  const collectedFieldCount = VISIBLE_COLLECTED_FIELDS.filter((field) => Boolean(collectedData[field])).length;

  return {
    isInitialized,
    collectedData,
    collectedFieldCount,
    conversationId,
    error,
    status: conversation.status,
    isSpeaking: conversation.isSpeaking,
    conversationState,
    startConversation,
    endConversation,
    setVolume,
    resetCollectedData,
    hasCollectedData: collectedFieldCount > 0,
    hasEmailForSubmission,
    getConversationDuration,
    getFormattedData: () => {
      const formatted = [];
      if (collectedData.name) formatted.push(`Name: ${collectedData.name}`);
      if (collectedData.email) formatted.push(`Email: ${collectedData.email}`);
      if (collectedData.company) formatted.push(`Company: ${collectedData.company}`);
      if (collectedData.employeeCount) formatted.push(`Team Size: ${collectedData.employeeCount}`);
      if (collectedData.query) formatted.push(`Query: ${collectedData.query}`);
      return formatted.join('\n');
    },
  };
};
