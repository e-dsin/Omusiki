// contexts/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Check,
  X,
  AlertTriangle,
  Info,
  Music,
  Heart,
  Download,
} from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (message, type = 'info', duration = 4000, action = null) => {
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message,
        type,
        duration,
        action,
        timestamp: Date.now(),
      };

      setToasts(prev => [...prev, toast]);

      // Auto-remove toast after duration
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Helper methods for different toast types
  const success = useCallback(
    (message, duration, action) =>
      addToast(message, 'success', duration, action),
    [addToast]
  );

  const error = useCallback(
    (message, duration, action) => addToast(message, 'error', duration, action),
    [addToast]
  );

  const warning = useCallback(
    (message, duration, action) =>
      addToast(message, 'warning', duration, action),
    [addToast]
  );

  const info = useCallback(
    (message, duration, action) => addToast(message, 'info', duration, action),
    [addToast]
  );

  // Music-specific toast methods
  const musicPlay = useCallback(
    (songTitle, artist) =>
      addToast(`Lecture de "${songTitle}" par ${artist}`, 'music', 3000),
    [addToast]
  );

  const musicLiked = useCallback(
    songTitle => addToast(`"${songTitle}" ajouté aux favoris`, 'liked', 2000),
    [addToast]
  );

  const musicDownload = useCallback(
    songTitle => addToast(`"${songTitle}" téléchargé`, 'download', 3000),
    [addToast]
  );

  const contextValue = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
    musicPlay,
    musicLiked,
    musicDownload,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const containerStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '400px',
  };

  if (toasts.length === 0) return null;

  return (
    <div style={containerStyle}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const getToastConfig = type => {
    switch (type) {
      case 'success':
        return {
          icon: Check,
          bgColor: 'rgba(16, 185, 129, 0.95)',
          borderColor: '#10B981',
          textColor: 'white',
        };
      case 'error':
        return {
          icon: X,
          bgColor: 'rgba(239, 68, 68, 0.95)',
          borderColor: '#EF4444',
          textColor: 'white',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'rgba(245, 158, 11, 0.95)',
          borderColor: '#F59E0B',
          textColor: 'white',
        };
      case 'music':
        return {
          icon: Music,
          bgColor: 'rgba(139, 92, 246, 0.95)',
          borderColor: '#8B5CF6',
          textColor: 'white',
        };
      case 'liked':
        return {
          icon: Heart,
          bgColor: 'rgba(236, 72, 153, 0.95)',
          borderColor: '#EC4899',
          textColor: 'white',
        };
      case 'download':
        return {
          icon: Download,
          bgColor: 'rgba(14, 165, 233, 0.95)',
          borderColor: '#0EA5E9',
          textColor: 'white',
        };
      default:
        return {
          icon: Info,
          bgColor: 'rgba(99, 102, 241, 0.95)',
          borderColor: '#6366F1',
          textColor: 'white',
        };
    }
  };

  const config = getToastConfig(toast.type);
  const IconComponent = config.icon;

  const toastStyle = {
    background: config.bgColor,
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    border: `1px solid ${config.borderColor}`,
    padding: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '300px',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease-out',
    position: 'relative',
    cursor: 'pointer',
  };

  const iconStyle = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  };

  const contentStyle = {
    flex: 1,
    fontSize: '14px',
    fontWeight: '500',
    color: config.textColor,
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '1.4',
  };

  const closeButtonStyle = {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '6px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: config.textColor,
    transition: 'all 0.2s ease',
  };

  const actionButtonStyle = {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '600',
    color: config.textColor,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
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

      <div style={toastStyle} onClick={onRemove}>
        <div style={iconStyle}>
          <IconComponent size={20} />
        </div>

        <div style={contentStyle}>{toast.message}</div>

        {toast.action && (
          <button
            style={actionButtonStyle}
            onClick={e => {
              e.stopPropagation();
              toast.action.callback();
              onRemove();
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            {toast.action.label}
          </button>
        )}

        <button
          style={closeButtonStyle}
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
          }}
        >
          <X size={16} />
        </button>
      </div>
    </>
  );
};

// Hook for music-specific notifications
export const useMusicToast = () => {
  const { musicPlay, musicLiked, musicDownload, success, error } = useToast();

  const notifyPlay = useCallback(
    song => {
      musicPlay(song.title, song.artist);
    },
    [musicPlay]
  );

  const notifyLike = useCallback(
    song => {
      musicLiked(song.title);
    },
    [musicLiked]
  );

  const notifyUnlike = useCallback(
    song => {
      error(`"${song.title}" retiré des favoris`, 2000);
    },
    [error]
  );

  const notifyPlaylistAdd = useCallback(
    (song, playlistName = 'playlist') => {
      success(`"${song.title}" ajouté à ${playlistName}`, 2000);
    },
    [success]
  );

  const notifyDownload = useCallback(
    song => {
      musicDownload(song.title);
    },
    [musicDownload]
  );

  const notifyShare = useCallback(
    song => {
      success(`"${song.title}" partagé avec succès`, 2000);
    },
    [success]
  );

  return {
    notifyPlay,
    notifyLike,
    notifyUnlike,
    notifyPlaylistAdd,
    notifyDownload,
    notifyShare,
  };
};

export default ToastProvider;
