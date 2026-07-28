// src/components/Toast/ToastSystem.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, Music, Heart, Share2, Plus, X } from 'lucide-react';

// Context pour les toasts
const ToastContext = createContext();

// Provider pour les toasts
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Supprimer un toast
  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Ajouter un toast
  const addToast = useCallback(
    toast => {
      const id = Date.now() + Math.random();
      const newToast = {
        id,
        duration: 3000,
        ...toast,
      };

      setToasts(prev => [...prev, newToast]);

      // Auto-remove après la durée spécifiée
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);

      return id;
    },
    [removeToast]
  );

  const value = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Hook pour utiliser les toasts
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Hook spécialisé pour les notifications musicales
export const useMusicToast = () => {
  const { addToast } = useToast();

  const notifyPlay = useCallback(
    song => {
      addToast({
        type: 'success',
        title: 'Lecture en cours',
        message: `${song.title} - ${song.artist}`,
        icon: <Music size={20} />,
      });
    },
    [addToast]
  );

  const notifyLike = useCallback(
    song => {
      addToast({
        type: 'success',
        title: 'Ajouté aux favoris',
        message: `${song.title} a été ajouté à vos favoris`,
        icon: <Heart size={20} />,
      });
    },
    [addToast]
  );

  const notifyUnlike = useCallback(
    song => {
      addToast({
        type: 'info',
        title: 'Retiré des favoris',
        message: `${song.title} a été retiré de vos favoris`,
        icon: <Heart size={20} />,
      });
    },
    [addToast]
  );

  const notifyPlaylistAdd = useCallback(
    (song, playlistName = 'la playlist') => {
      addToast({
        type: 'success',
        title: 'Ajouté à la playlist',
        message: `${song.title} a été ajouté à ${playlistName}`,
        icon: <Plus size={20} />,
      });
    },
    [addToast]
  );

  const notifyShare = useCallback(
    song => {
      addToast({
        type: 'success',
        title: 'Lien copié',
        message: `Le lien de "${song.title}" a été copié`,
        icon: <Share2 size={20} />,
      });
    },
    [addToast]
  );

  return {
    notifyPlay,
    notifyLike,
    notifyUnlike,
    notifyPlaylistAdd,
    notifyShare,
  };
};

// Composant conteneur des toasts
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const containerStyle = {
    position: 'fixed',
    top: '100px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Composant toast individuel
const Toast = ({ toast, onClose }) => {
  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          background: 'rgba(16, 185, 129, 0.9)',
          borderColor: '#10B981',
        };
      case 'error':
        return {
          background: 'rgba(239, 68, 68, 0.9)',
          borderColor: '#EF4444',
        };
      case 'warning':
        return {
          background: 'rgba(245, 158, 11, 0.9)',
          borderColor: '#F59E0B',
        };
      case 'info':
      default:
        return {
          background: 'rgba(139, 92, 246, 0.9)',
          borderColor: '#8B5CF6',
        };
    }
  };

  const typeStyles = getTypeStyles();

  const toastStyle = {
    ...typeStyles,
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    border: `1px solid ${typeStyles.borderColor}`,
    padding: '16px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    animation: 'slideIn 0.3s ease-out',
    position: 'relative',
    minWidth: '300px',
  };

  const iconContainerStyle = {
    marginTop: '2px',
    flexShrink: 0,
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const messageStyle = {
    fontSize: '13px',
    opacity: 0.9,
    lineHeight: '1.4',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    opacity: 0.7,
    transition: 'opacity 0.2s ease',
    marginTop: '-2px',
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      <div style={toastStyle}>
        <div style={iconContainerStyle}>
          {toast.icon || <CheckCircle size={20} />}
        </div>

        <div style={contentStyle}>
          <div style={titleStyle}>{toast.title}</div>
          {toast.message && <div style={messageStyle}>{toast.message}</div>}
        </div>

        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={e => (e.target.style.opacity = '1')}
          onMouseLeave={e => (e.target.style.opacity = '0.7')}
        >
          <X size={16} />
        </button>
      </div>
    </>
  );
};
