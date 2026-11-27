import React from 'react';
import HomeTab from '../components/Tabs/HomeTab.jsx';

const MainLayout = () => {
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    background:
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%)',
    fontFamily: 'Montserrat, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  };

  // Aurora background effects
  const auroraOverlay1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
    background:
      'radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const auroraOverlay2 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'radial-gradient(circle at 60% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 40%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 40%)',
    pointerEvents: 'none',
    zIndex: 1,
    animation: 'aurora-move 20s ease-in-out infinite alternate',
  };

  const gradientOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, transparent 30%, rgba(236, 72, 153, 0.1) 70%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const mainContentStyle = {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    zIndex: 2,
    width: '100%',
  };

  const contentContainerStyle = {
    width: '100%',
    minHeight: '100vh',
  };

  // Inject aurora animation if not already present
  if (!document.querySelector('#aurora-styles')) {
    const style = document.createElement('style');
    style.id = 'aurora-styles';
    style.textContent = `
      @keyframes aurora-move {
        0% { transform: translateX(0) translateY(0) rotate(0deg); }
        25% { transform: translateX(10px) translateY(-10px) rotate(1deg); }
        50% { transform: translateX(-5px) translateY(10px) rotate(-1deg); }
        75% { transform: translateX(-10px) translateY(-5px) rotate(0.5deg); }
        100% { transform: translateX(5px) translateY(5px) rotate(-0.5deg); }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div style={containerStyle}>
      <div style={auroraOverlay1}></div>
      <div style={auroraOverlay2}></div>
      <div style={gradientOverlay}></div>

      <main style={mainContentStyle}>
        <div style={contentContainerStyle}>
          <HomeTab />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
