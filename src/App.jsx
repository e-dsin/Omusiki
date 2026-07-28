import React, { useContext, useEffect } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { EnhancedPlayerProvider } from './contexts/EnhancedPlayerContext';
import AuthPage from './components/Auth/AuthPage';
import MainLayout from './layouts/MainLayout';

// App Content Component
function AppContent() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    const loadingContainerStyle = {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(135deg, #1a365d 0%, #2d3748 50%, #1a202c 100%)',
      fontFamily: 'Montserrat, sans-serif',
    };

    const loadingContentStyle = {
      textAlign: 'center',
    };

    const spinnerStyle = {
      width: '64px',
      height: '64px',
      border: '4px solid rgba(139, 92, 246, 0.3)',
      borderTop: '4px solid #8B5CF6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px auto',
    };

    const loadingTextStyle = {
      color: 'white',
      fontSize: '18px',
      fontFamily: 'Montserrat, sans-serif',
    };

    // Add spinner animation
    const spinnerKeyframes = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    // Inject styles if not already present
    if (!document.querySelector('#spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'spinner-styles';
      style.textContent = spinnerKeyframes;
      document.head.appendChild(style);
    }

    return (
      <div style={loadingContainerStyle}>
        <div style={loadingContentStyle}>
          <div style={spinnerStyle}></div>
          <p style={loadingTextStyle}>Chargement...</p>
        </div>
      </div>
    );
  }

  return user ? <MainLayout /> : <AuthPage />;
}

// Root App Component with Providers
function App() {
  useEffect(() => {
    // Add Google Fonts dynamically if not already loaded
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';

    // Check if font link already exists
    const existingLink = document.querySelector('link[href*="Montserrat"]');
    if (!existingLink) {
      document.head.appendChild(link);
    }
  }, []);

  return (
    <AuthProvider>
      <EnhancedPlayerProvider>
        <AppContent />
      </EnhancedPlayerProvider>
    </AuthProvider>
  );
}

export default App;
