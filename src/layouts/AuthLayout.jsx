import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px 24px',
    background:
      'linear-gradient(135deg, #1a365d 0%, #2d3748 50%, #1a202c 100%)',
    position: 'relative',
    fontFamily: 'Montserrat, sans-serif',
  };

  const auroraOverlay1 = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    background:
      'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
    pointerEvents: 'none',
  };

  const auroraOverlay2 = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    pointerEvents: 'none',
  };

  const mainContainerStyle = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const titleContainerStyle = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const subtitleStyle = {
    color: 'white',
    fontSize: '18px',
    opacity: 0.8,
    fontFamily: 'Montserrat, sans-serif',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  return (
    <div style={containerStyle}>
      <div style={auroraOverlay1}></div>
      <div style={auroraOverlay2}></div>

      <div style={mainContainerStyle}>
        <div style={titleContainerStyle}>
          <h1 style={titleStyle}>Ô musiki</h1>
          {(title || subtitle) && (
            <p style={subtitleStyle}>{title || subtitle}</p>
          )}
        </div>

        <div style={cardStyle}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
