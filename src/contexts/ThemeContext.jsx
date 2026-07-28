// contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Définition des thèmes
export const THEMES = {
  dark: {
    name: 'dark',
    displayName: 'Sombre',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      background: {
        primary:
          'linear-gradient(135deg, #1a365d 0%, #2d3748 50%, #1a202c 100%)',
        secondary: 'rgba(0,0,0,0.95)',
        card: 'rgba(255,255,255,0.05)',
        cardHover: 'rgba(255,255,255,0.1)',
        glass: 'rgba(255,255,255,0.1)',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255,255,255,0.8)',
        muted: 'rgba(255,255,255,0.6)',
        inverse: '#000000',
      },
      border: {
        primary: 'rgba(255,255,255,0.1)',
        secondary: 'rgba(255,255,255,0.2)',
        focus: 'rgba(139, 92, 246, 0.5)',
      },
      shadow: {
        card: '0 20px 60px rgba(0,0,0,0.4)',
        player: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        toast: '0 20px 40px rgba(0,0,0,0.3)',
      },
    },
  },
  light: {
    name: 'light',
    displayName: 'Clair',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      background: {
        primary:
          'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        secondary: 'rgba(255,255,255,0.95)',
        card: 'rgba(255,255,255,0.8)',
        cardHover: 'rgba(255,255,255,0.9)',
        glass: 'rgba(255,255,255,0.7)',
      },
      text: {
        primary: '#1a202c',
        secondary: 'rgba(26, 32, 44, 0.8)',
        muted: 'rgba(26, 32, 44, 0.6)',
        inverse: '#ffffff',
      },
      border: {
        primary: 'rgba(0,0,0,0.1)',
        secondary: 'rgba(0,0,0,0.2)',
        focus: 'rgba(139, 92, 246, 0.5)',
      },
      shadow: {
        card: '0 20px 60px rgba(0,0,0,0.1)',
        player: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        toast: '0 20px 40px rgba(0,0,0,0.15)',
      },
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Charger le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('omusiki_theme');
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Détecter la préférence système
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setCurrentTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Sauvegarder le thème dans localStorage
  useEffect(() => {
    localStorage.setItem('omusiki_theme', currentTheme);

    // Appliquer le thème au document
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Mettre à jour la couleur de la barre d'état mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        currentTheme === 'dark' ? '#1a202c' : '#f8fafc'
      );
    }
  }, [currentTheme]);

  // Écouter les changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = e => {
      // Ne changer automatiquement que si l'utilisateur n'a pas de préférence sauvegardée
      if (!localStorage.getItem('omusiki_theme')) {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = async () => {
    setIsTransitioning(true);

    // Animation de transition douce
    document.documentElement.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      setCurrentTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
      setIsTransitioning(false);

      // Nettoyer la transition
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
    }, 150);
  };

  const setTheme = themeName => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const theme = THEMES[currentTheme];

  const contextValue = {
    currentTheme,
    theme,
    isTransitioning,
    toggleTheme,
    setTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook pour obtenir les styles thématiques
export const useThemedStyles = () => {
  const { theme } = useTheme();

  return {
    // Styles de base
    background: {
      primary: theme.colors.background.primary,
      secondary: theme.colors.background.secondary,
      card: theme.colors.background.card,
      cardHover: theme.colors.background.cardHover,
      glass: theme.colors.background.glass,
    },

    // Texte
    text: {
      primary: { color: theme.colors.text.primary },
      secondary: { color: theme.colors.text.secondary },
      muted: { color: theme.colors.text.muted },
      inverse: { color: theme.colors.text.inverse },
    },

    // Bordures
    border: {
      primary: { border: `1px solid ${theme.colors.border.primary}` },
      secondary: { border: `1px solid ${theme.colors.border.secondary}` },
      focus: { borderColor: theme.colors.border.focus },
    },

    // Ombres
    shadow: {
      card: { boxShadow: theme.colors.shadow.card },
      player: { boxShadow: theme.colors.shadow.player },
      toast: { boxShadow: theme.colors.shadow.toast },
    },

    // Boutons
    button: {
      primary: {
        background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        color: theme.colors.text.inverse,
        border: 'none',
      },
      secondary: {
        background: theme.colors.background.glass,
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.border.primary}`,
      },
      ghost: {
        background: 'transparent',
        color: theme.colors.text.secondary,
        border: 'none',
      },
    },

    // Cards
    card: {
      background: theme.colors.background.card,
      border: `1px solid ${theme.colors.border.primary}`,
      boxShadow: theme.colors.shadow.card,
      backdropFilter: 'blur(15px)',
    },

    // Glass effect
    glass: {
      background: theme.colors.background.glass,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${theme.colors.border.primary}`,
    },
  };
};

// Composant bouton de basculement de thème
export const ThemeToggle = ({ size = 24, className = '' }) => {
  const { isDark, toggleTheme, isTransitioning } = useTheme();
  const styles = useThemedStyles();

  const buttonStyle = {
    ...styles.button.ghost,
    ...styles.border.primary,
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const iconStyle = {
    transition: 'all 0.3s ease',
    transform: isTransitioning
      ? 'scale(0) rotate(180deg)'
      : 'scale(1) rotate(0deg)',
  };

  return (
    <button
      style={buttonStyle}
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={className}
      title={`Basculer vers le thème ${isDark ? 'clair' : 'sombre'}`}
      onMouseEnter={e => {
        e.target.style.background = styles.background.cardHover;
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={e => {
        e.target.style.background = 'transparent';
        e.target.style.transform = 'scale(1)';
      }}
    >
      <div style={iconStyle}>
        {isDark ? (
          // Icône soleil pour passer au mode clair
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          // Icône lune pour passer au mode sombre
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>
    </button>
  );
};

// Composant sélecteur de thème avec options
export const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();
  const styles = useThemedStyles();

  const selectorStyle = {
    display: 'flex',
    gap: '8px',
    padding: '4px',
    ...styles.glass,
    borderRadius: '12px',
  };

  const optionStyle = themeName => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    background:
      currentTheme === themeName
        ? `linear-gradient(45deg, ${styles.theme?.colors.primary}, ${styles.theme?.colors.secondary})`
        : 'transparent',
    color:
      currentTheme === themeName
        ? styles.theme?.colors.text.inverse
        : styles.theme?.colors.text.secondary,
  });

  return (
    <div style={selectorStyle}>
      {Object.entries(THEMES).map(([key, theme]) => (
        <button
          key={key}
          style={optionStyle(key)}
          onClick={() => setTheme(key)}
          onMouseEnter={e => {
            if (currentTheme !== key) {
              e.target.style.background = styles.background.cardHover;
            }
          }}
          onMouseLeave={e => {
            if (currentTheme !== key) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          {theme.displayName}
        </button>
      ))}
    </div>
  );
};

// CSS variables pour une intégration plus facile
export const injectThemeCSS = () => {
  const css = `
    :root {
      --transition-theme: all 0.3s ease;
    }
    
    [data-theme="dark"] {
      --color-primary: #8B5CF6;
      --color-secondary: #EC4899;
      --bg-primary: #1a202c;
      --bg-secondary: rgba(0,0,0,0.95);
      --bg-card: rgba(255,255,255,0.05);
      --text-primary: #ffffff;
      --text-secondary: rgba(255,255,255,0.8);
      --border-primary: rgba(255,255,255,0.1);
    }
    
    [data-theme="light"] {
      --color-primary: #8B5CF6;
      --color-secondary: #EC4899;
      --bg-primary: #f8fafc;
      --bg-secondary: rgba(255,255,255,0.95);
      --bg-card: rgba(255,255,255,0.8);
      --text-primary: #1a202c;
      --text-secondary: rgba(26, 32, 44, 0.8);
      --border-primary: rgba(0,0,0,0.1);
    }
    
    * {
      transition: var(--transition-theme);
    }
  `;

  if (!document.querySelector('#theme-css')) {
    const style = document.createElement('style');
    style.id = 'theme-css';
    style.textContent = css;
    document.head.appendChild(style);
  }
};

export default ThemeProvider;
