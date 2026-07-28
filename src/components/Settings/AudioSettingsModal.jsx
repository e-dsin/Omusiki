// src/components/Settings/AudioSettingsModal.jsx
import React, { useState, useEffect } from 'react';
import {
  X,
  Speaker,
  Headphones,
  Volume2,
  VolumeX,
  RefreshCw,
  Check,
  AlertTriangle,
  Play,
  Settings,
  Monitor,
  Smartphone,
  Radio,
  RotateCcw,
} from 'lucide-react';
import { useAudioSettings } from '../../contexts/AudioSettingsContext';

const AudioSettingsModal = ({ isVisible, onClose }) => {
  const {
    audioDevices,
    selectedDeviceId,
    isSupported,
    isLoading,
    error,
    selectAudioDevice,
    testAudioDevice,
    refreshDevices,
    resetToDefault,
    getSelectedDevice,
    clearError,
  } = useAudioSettings();

  const [testingDeviceId, setTestingDeviceId] = useState(null);
  const [selectedTempDeviceId, setSelectedTempDeviceId] =
    useState(selectedDeviceId);

  useEffect(() => {
    setSelectedTempDeviceId(selectedDeviceId);
  }, [selectedDeviceId]);

  const handleDeviceSelect = async deviceId => {
    setSelectedTempDeviceId(deviceId);
    const success = await selectAudioDevice(deviceId);
    if (!success) {
      setSelectedTempDeviceId(selectedDeviceId); // Rollback en cas d'erreur
    }
  };

  const handleTestDevice = async deviceId => {
    setTestingDeviceId(deviceId);
    clearError();

    try {
      await testAudioDevice(deviceId);
      setTimeout(() => setTestingDeviceId(null), 2000);
    } catch (err) {
      setTestingDeviceId(null);
    }
  };

  const handleRefresh = async () => {
    clearError();
    await refreshDevices();
  };

  const handleReset = () => {
    resetToDefault();
    setSelectedTempDeviceId('default');
  };

  const getDeviceIcon = device => {
    const label = device.label.toLowerCase();

    if (label.includes('headphone') || label.includes('headset')) {
      return <Headphones size={20} />;
    } else if (label.includes('bluetooth')) {
      return <Radio size={20} />;
    } else if (label.includes('monitor') || label.includes('display')) {
      return <Monitor size={20} />;
    } else if (label.includes('phone') || label.includes('mobile')) {
      return <Smartphone size={20} />;
    } else {
      return <Speaker size={20} />;
    }
  };

  const getDeviceTypeColor = device => {
    const label = device.label.toLowerCase();

    if (label.includes('bluetooth')) return '#3B82F6';
    if (label.includes('headphone') || label.includes('headset'))
      return '#8B5CF6';
    if (label.includes('monitor') || label.includes('display'))
      return '#10B981';
    return '#6B7280';
  };

  if (!isVisible) return null;

  const modalStyle = {
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

  const contentStyle = {
    background: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '32px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const closeButtonStyle = {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const sectionStyle = {
    marginBottom: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '16px',
  };

  const deviceListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const deviceItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const deviceInfoStyle = {
    flex: 1,
    marginLeft: '12px',
  };

  const deviceNameStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: 'white',
    marginBottom: '4px',
  };

  const deviceDetailsStyle = {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
  };

  const deviceActionsStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  };

  const actionButtonStyle = {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const controlsStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  };

  const buttonStyle = {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
  };

  const errorStyle = {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#EF4444',
    fontSize: '14px',
  };

  const statusStyle = {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#10B981',
    fontSize: '14px',
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <Settings size={24} />
            Périphériques Audio
          </h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Support Status */}
        {!isSupported && (
          <div style={errorStyle}>
            <AlertTriangle size={16} />
            La sélection de périphériques audio n'est pas supportée par votre
            navigateur
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={errorStyle}>
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {/* Success Status */}
        {isSupported && !error && audioDevices.length > 0 && (
          <div style={statusStyle}>
            <Check size={16} />
            {audioDevices.length} périphérique
            {audioDevices.length > 1 ? 's' : ''} détecté
            {audioDevices.length > 1 ? 's' : ''}
          </div>
        )}

        {/* Device List */}
        {isSupported && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Périphériques Disponibles</h3>

            {isLoading ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <RefreshCw
                  size={24}
                  style={{ animation: 'spin 1s linear infinite' }}
                />
                <div style={{ marginTop: '8px' }}>
                  Détection des périphériques...
                </div>
              </div>
            ) : (
              <div style={deviceListStyle}>
                {audioDevices.map(device => {
                  const isSelected = device.deviceId === selectedTempDeviceId;
                  const isTesting = testingDeviceId === device.deviceId;

                  return (
                    <div
                      key={device.deviceId}
                      style={{
                        ...deviceItemStyle,
                        borderColor: isSelected ? '#8B5CF6' : 'transparent',
                        background: isSelected
                          ? 'rgba(139, 92, 246, 0.1)'
                          : 'rgba(255,255,255,0.05)',
                      }}
                      onClick={() => handleDeviceSelect(device.deviceId)}
                      onMouseEnter={e => {
                        if (!isSelected) {
                          e.target.style.background = 'rgba(255,255,255,0.1)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) {
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                        }
                      }}
                    >
                      <div style={{ color: getDeviceTypeColor(device) }}>
                        {getDeviceIcon(device)}
                      </div>

                      <div style={deviceInfoStyle}>
                        <div style={deviceNameStyle}>
                          {device.label}
                          {device.isDefault && (
                            <span
                              style={{
                                fontSize: '10px',
                                background: '#10B981',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                marginLeft: '8px',
                              }}
                            >
                              DÉFAUT
                            </span>
                          )}
                        </div>
                        <div style={deviceDetailsStyle}>
                          {device.deviceId === 'default'
                            ? 'Périphérique système par défaut'
                            : `ID: ${device.deviceId.substring(0, 20)}...`}
                        </div>
                      </div>

                      <div style={deviceActionsStyle}>
                        {isSelected && (
                          <div style={{ color: '#8B5CF6', marginRight: '8px' }}>
                            <Check size={20} />
                          </div>
                        )}

                        <button
                          style={{
                            ...actionButtonStyle,
                            background: isTesting
                              ? '#EC4899'
                              : 'rgba(255,255,255,0.1)',
                          }}
                          onClick={e => {
                            e.stopPropagation();
                            handleTestDevice(device.deviceId);
                          }}
                          title="Tester ce périphérique"
                          disabled={isTesting}
                          onMouseEnter={e => {
                            if (!isTesting) {
                              e.target.style.background =
                                'rgba(16, 185, 129, 0.3)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isTesting) {
                              e.target.style.background =
                                'rgba(255,255,255,0.1)';
                            }
                          }}
                        >
                          {isTesting ? (
                            <VolumeX size={16} />
                          ) : (
                            <Play size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div style={controlsStyle}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={buttonStyle}
              onClick={handleRefresh}
              disabled={isLoading}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              <RefreshCw size={16} />
              Actualiser
            </button>

            <button
              style={buttonStyle}
              onClick={handleReset}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              <RotateCcw size={16} />
              Réinitialiser
            </button>
          </div>

          <button
            style={primaryButtonStyle}
            onClick={onClose}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Check size={16} />
            Fermer
          </button>
        </div>

        {/* Device Info */}
        {audioDevices.length > 0 && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            💡 Astuce : Cliquez sur le bouton de test pour vérifier le son de
            chaque périphérique. Les modifications sont sauvegardées
            automatiquement.
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AudioSettingsModal;
