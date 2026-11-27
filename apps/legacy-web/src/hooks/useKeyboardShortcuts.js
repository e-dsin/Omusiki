// hooks/useKeyboardShortcuts.js
import { useEffect, useCallback, useRef } from 'react';
import { usePlayer } from '../contexts/EnhancedPlayerContext';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '../contexts/ToastContext';

/**
 * Hook pour gérer les raccourcis clavier globaux d'OMusiki
 */
export const useKeyboardShortcuts = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    changeVolume,
    volume,
    isPlayerVisible,
    openPlayer,
    closePlayer,
  } = usePlayer();

  const { toggleTheme } = useTheme();
  const { toggleFavorite } = useFavorites();
  const { info } = useToast();

  const volumeStep = 0.1;
  const seekStep = 10; // secondes

  // Référence pour éviter les répétitions trop rapides
  const lastKeyTime = useRef({});
  const debounceTime = 100; // ms

  const shortcuts = {
    // Lecture/Pause
    Space: {
      action: togglePlay,
      description: 'Lecture/Pause',
      condition: () => currentSong && isPlayerVisible,
      preventDefault: true,
    },

    // Navigation
    ArrowRight: {
      action: playNext,
      description: 'Piste suivante',
      condition: () => currentSong && isPlayerVisible,
      preventDefault: true,
    },
    ArrowLeft: {
      action: playPrevious,
      description: 'Piste précédente',
      condition: () => currentSong && isPlayerVisible,
      preventDefault: true,
    },

    // Volume
    ArrowUp: {
      action: () => changeVolume(Math.min(1, volume + volumeStep)),
      description: 'Augmenter le volume',
      condition: () => currentSong && isPlayerVisible,
      preventDefault: true,
    },
    ArrowDown: {
      action: () => changeVolume(Math.max(0, volume - volumeStep)),
      description: 'Diminuer le volume',
      condition: () => currentSong && isPlayerVisible,
      preventDefault: true,
    },

    // Favoris
    KeyL: {
      action: () => currentSong && toggleFavorite(currentSong),
      description: 'Ajouter/Retirer des favoris',
      condition: () => currentSong,
      modifiers: ['ctrl'],
    },

    // Interface
    KeyT: {
      action: toggleTheme,
      description: 'Basculer le thème',
      modifiers: ['ctrl'],
    },

    // Player
    Escape: {
      action: closePlayer,
      description: 'Fermer le player',
      condition: () => isPlayerVisible,
      preventDefault: true,
    },

    // Aide
    KeyH: {
      action: () => showShortcutsHelp(),
      description: 'Afficher les raccourcis',
      modifiers: ['ctrl'],
    },

    // Recherche
    KeyF: {
      action: () => focusSearchInput(),
      description: 'Rechercher',
      modifiers: ['ctrl'],
      preventDefault: true,
    },

    // Volume spécifique
    Digit0: {
      action: () => changeVolume(0),
      description: 'Volume à 0%',
      condition: () => currentSong && isPlayerVisible,
    },
    Digit5: {
      action: () => changeVolume(0.5),
      description: 'Volume à 50%',
      condition: () => currentSong && isPlayerVisible,
    },
    Digit9: {
      action: () => changeVolume(1),
      description: 'Volume à 100%',
      condition: () => currentSong && isPlayerVisible,
    },

    // Navigation rapide
    KeyM: {
      action: () => changeVolume(volume === 0 ? 0.5 : 0),
      description: 'Mute/Unmute',
      condition: () => currentSong && isPlayerVisible,
    },
  };

  const checkModifiers = (event, requiredModifiers = []) => {
    if (!requiredModifiers.length) return true;

    return requiredModifiers.every(modifier => {
      switch (modifier) {
        case 'ctrl':
          return event.ctrlKey || event.metaKey;
        case 'shift':
          return event.shiftKey;
        case 'alt':
          return event.altKey;
        default:
          return false;
      }
    });
  };

  const handleKeyDown = useCallback(
    event => {
      // Ignorer si l'utilisateur tape dans un input
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.contentEditable === 'true')
      ) {
        // Exception pour Escape qui ferme le player même dans les inputs
        if (event.code !== 'Escape') return;
      }

      const shortcut = shortcuts[event.code];
      if (!shortcut) return;

      // Vérifier les conditions
      if (shortcut.condition && !shortcut.condition()) return;

      // Vérifier les modifiers
      if (!checkModifiers(event, shortcut.modifiers)) return;

      // Debounce pour éviter les répétitions trop rapides
      const now = Date.now();
      const lastTime = lastKeyTime.current[event.code] || 0;
      if (now - lastTime < debounceTime) return;
      lastKeyTime.current[event.code] = now;

      // Prévenir le comportement par défaut si nécessaire
      if (shortcut.preventDefault) {
        event.preventDefault();
      }

      // Exécuter l'action
      try {
        shortcut.action();
      } catch (error) {
        console.error("Erreur lors de l'exécution du raccourci:", error);
      }
    },
    [shortcuts, volume, currentSong, isPlayerVisible]
  );

  // Fonctions utilitaires
  const focusSearchInput = () => {
    const searchInput = document.querySelector(
      'input[placeholder*="Rechercher"]'
    );
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  };

  const showShortcutsHelp = () => {
    const helpContent = Object.entries(shortcuts)
      .map(([key, shortcut]) => {
        const modifierText = shortcut.modifiers
          ? shortcut.modifiers
              .map(m =>
                m === 'ctrl'
                  ? navigator.platform.includes('Mac')
                    ? '⌘'
                    : 'Ctrl'
                  : m
              )
              .join(' + ') + ' + '
          : '';
        const keyText = key
          .replace('Key', '')
          .replace('Digit', '')
          .replace('Arrow', '');
        return `${modifierText}${keyText}: ${shortcut.description}`;
      })
      .join('\n');

    info(`Raccourcis clavier:\n\n${helpContent}`, 8000);
  };

  // Attacher les événements
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    shortcuts,
    showShortcutsHelp,
    focusSearchInput,
  };
};

// Composant d'aide pour les raccourcis
export const KeyboardShortcutsHelp = ({ isVisible, onClose }) => {
  const { isDark } = useTheme();

  if (!isVisible) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const modalStyle = {
    background: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    padding: '32px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    color: isDark ? 'white' : '#1a202c',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '24px',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const sectionStyle = {
    marginBottom: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26, 32, 44, 0.9)',
  };

  const shortcutItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '4px',
    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
  };

  const keyStyle = {
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    fontFamily: 'monospace',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: isDark ? 'white' : '#1a202c',
  };

  const shortcuts = [
    {
      category: 'Lecture',
      items: [
        { key: 'Espace', description: 'Lecture/Pause' },
        { key: '→', description: 'Piste suivante' },
        { key: '←', description: 'Piste précédente' },
        { key: 'M', description: 'Mute/Unmute' },
      ],
    },
    {
      category: 'Volume',
      items: [
        { key: '↑', description: 'Augmenter le volume' },
        { key: '↓', description: 'Diminuer le volume' },
        { key: '0', description: 'Volume à 0%' },
        { key: '5', description: 'Volume à 50%' },
        { key: '9', description: 'Volume à 100%' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { key: 'Ctrl + F', description: 'Rechercher' },
        { key: 'Ctrl + L', description: 'Ajouter aux favoris' },
        { key: 'Ctrl + T', description: 'Basculer le thème' },
        { key: 'Echap', description: 'Fermer le player' },
        { key: 'Ctrl + H', description: 'Afficher cette aide' },
      ],
    },
  ];

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={{ ...modalStyle, position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button style={closeButtonStyle} onClick={onClose}>
          ✕
        </button>

        <h2 style={titleStyle}>Raccourcis Clavier</h2>

        {shortcuts.map((section, index) => (
          <div key={index} style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{section.category}</h3>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} style={shortcutItemStyle}>
                <span>{item.description}</span>
                <span style={keyStyle}>{item.key}</span>
              </div>
            ))}
          </div>
        ))}

        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            background: isDark
              ? 'rgba(139, 92, 246, 0.1)'
              : 'rgba(139, 92, 246, 0.05)',
            borderRadius: '8px',
            border: `1px solid ${
              isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'
            }`,
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(26, 32, 44, 0.8)',
              lineHeight: '1.5',
            }}
          >
            💡 <strong>Astuce :</strong> Les raccourcis fonctionnent uniquement
            quand le player est ouvert, sauf pour la recherche et le basculement
            de thème qui sont globaux.
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook pour afficher/masquer l'aide des raccourcis
export const useShortcutsModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible(prev => !prev);

  return {
    isVisible,
    show,
    hide,
    toggle,
    KeyboardShortcutsHelp: () => (
      <KeyboardShortcutsHelp isVisible={isVisible} onClose={hide} />
    ),
  };
};

// Composant d'indicateur de raccourci (pour les boutons)
export const ShortcutHint = ({ shortcut, children, ...props }) => {
  const hintStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
  };

  const tooltipStyle = {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.9)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    whiteSpace: 'nowrap',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease',
    marginBottom: '4px',
  };

  return (
    <div
      style={hintStyle}
      title={`Raccourci: ${shortcut}`}
      onMouseEnter={e => {
        const tooltip = e.currentTarget.querySelector('.shortcut-tooltip');
        if (tooltip) tooltip.style.opacity = '1';
      }}
      onMouseLeave={e => {
        const tooltip = e.currentTarget.querySelector('.shortcut-tooltip');
        if (tooltip) tooltip.style.opacity = '0';
      }}
      {...props}
    >
      {children}
      <div className="shortcut-tooltip" style={tooltipStyle}>
        {shortcut}
      </div>
    </div>
  );
};

export default useKeyboardShortcuts;
