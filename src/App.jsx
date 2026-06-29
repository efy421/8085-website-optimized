import { useEffect, useState } from 'react';
import { ConfigProvider } from './lib/config.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './components/landing/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setShowPrivacyPolicy(window.location.hash === '#privacy-policy');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ConfigProvider>
      <ErrorBoundary fallbackId="main-app">
        <div className="app-root">
          {showPrivacyPolicy ? (
            <PrivacyPolicy />
          ) : (
            <LandingPage />
          )}
        </div>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
