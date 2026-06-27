import React, { useEffect, useState } from 'react';
import { ConfigProvider } from './lib/config.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './components/landing/LandingPage';
import VoiceAgentOverlay from './components/VoiceAgentOverlay';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [isVoiceAgentVisible, setIsVoiceAgentVisible] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setShowPrivacyPolicy(window.location.hash === '#privacy-policy');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartConversation = () => {
    setIsVoiceAgentVisible(true);
  };

  const handleCloseVoiceAgent = () => {
    setIsVoiceAgentVisible(false);
  };

  return (
    <ConfigProvider>
      <ErrorBoundary fallbackId="main-app">
        <div className="app-root">
          {showPrivacyPolicy ? (
            <PrivacyPolicy />
          ) : (
            <LandingPage onStartConversation={handleStartConversation} />
          )}
        </div>

        <VoiceAgentOverlay
          isVisible={isVoiceAgentVisible}
          onClose={handleCloseVoiceAgent}
        />
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
