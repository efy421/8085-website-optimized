import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import VoiceAgentOverlay from './VoiceAgentOverlay';

const useVoiceAgentMock = vi.fn();
const verifyUserMock = vi.fn();

vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    fromTo: vi.fn(),
    killTweensOf: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock('../lib/useVoiceAgent', () => ({
  useVoiceAgent: () => useVoiceAgentMock(),
}));

vi.mock('../services/captchaService', () => ({
  default: {
    verifyUser: (...args) => verifyUserMock(...args),
  },
}));

vi.mock('./SoundWaveAnimation', () => ({
  default: () => <div data-testid="sound-wave-animation" />,
}));

const createVoiceAgentMock = (overrides = {}) => ({
  isInitialized: false,
  collectedData: {
    name: null,
    email: null,
    query: null,
    company: null,
    employeeCount: null,
    conversationId: null,
  },
  collectedFieldCount: 0,
  conversationId: null,
  error: null,
  status: 'disconnected',
  isSpeaking: false,
  conversationState: {
    isActive: false,
    startTime: null,
    endTime: null,
    endReason: null,
    hasEnded: false,
  },
  startConversation: vi.fn().mockResolvedValue('conv_test_123'),
  endConversation: vi.fn().mockResolvedValue(undefined),
  setVolume: vi.fn(),
  resetCollectedData: vi.fn(),
  hasCollectedData: false,
  hasEmailForSubmission: vi.fn(() => false),
  getConversationDuration: vi.fn(() => 0),
  getFormattedData: vi.fn(() => ''),
  ...overrides,
});

describe('VoiceAgentOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts the Ada conversation after consent and CAPTCHA verification', async () => {
    const startConversation = vi.fn().mockResolvedValue('conv_test_123');

    useVoiceAgentMock.mockReturnValue(
      createVoiceAgentMock({
        startConversation,
      }),
    );
    verifyUserMock.mockResolvedValue({ allowed: true, requiresChallenge: false });

    render(<VoiceAgentOverlay isVisible onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /i agree & continue/i, hidden: true }));
    fireEvent.click(screen.getByRole('button', { name: /start conversation/i, hidden: true }));

    await waitFor(() => {
      expect(verifyUserMock).toHaveBeenCalledWith('voice_agent_start');
      expect(startConversation).toHaveBeenCalledWith('agent_01jvd0y127fg8t4x9ba5h2g4r5');
    });
  });

  it('ends an active conversation before closing the overlay', async () => {
    const endConversation = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();

    useVoiceAgentMock.mockReturnValue(
      createVoiceAgentMock({
        isInitialized: true,
        status: 'connected',
        endConversation,
      }),
    );

    render(<VoiceAgentOverlay isVisible onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close voice agent/i, hidden: true }));

    await waitFor(() => {
      expect(endConversation).toHaveBeenCalledWith('user_closed');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
