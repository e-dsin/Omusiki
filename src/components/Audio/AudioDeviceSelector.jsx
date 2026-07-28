// components/Audio/AudioDeviceSelector.jsx
import React, { useState, useEffect } from 'react';
import {
  Headphones,
  Settings,
  CheckCircle,
  AlertCircle,
  Play,
  Loader,
} from 'lucide-react';
import audioDeviceService from '../../services/AudioDeviceService';

const AudioDeviceSelector = ({
  isVisible,
  onClose,
  currentAudioElement = null,
}) => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testingDevice, setTestingDevice] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Initialiser l'état
    setDevices(audioDeviceService.getDevicesForUI());
    setIsSupported(audioDeviceService.isSupported);

    // Listeners pour les événements du service
    const handleDevicesChanged = () => {
      setDevices(audioDeviceService.getDevicesForUI());
    };

    const handleDeviceSelected = _data => {
      // Appliquer automatiquement au player si disponible
      if (currentAudioElement) {
        audioDeviceService.applyToAudioElement(currentAudioElement);
      }
    };

    const handleDeviceDisconnected = () => {
      setDevices(audioDeviceService.getDevicesForUI());
    };

    const handleDeviceTested = data => {
      setTestingDevice(null);
      if (!data.success) {
        alert(
          `Erreur lors du test du périphérique: ${
            data.error?.message || 'Erreur inconnue'
          }`
        );
      }
    };

    // Ajouter les listeners
    audioDeviceService.addEventListener('devicesChanged', handleDevicesChanged);
    audioDeviceService.addEventListener('deviceSelected', handleDeviceSelected);
    audioDeviceService.addEventListener(
      'deviceDisconnected',
      handleDeviceDisconnected
    );
    audioDeviceService.addEventListener('deviceTested', handleDeviceTested);

    // Détecter les périphériques au montage
    audioDeviceService.detectAudioDevices();

    // Cleanup
    return () => {
      audioDeviceService.removeEventListener(
        'devicesChanged',
        handleDevicesChanged
      );
      audioDeviceService.removeEventListener(
        'deviceSelected',
        handleDeviceSelected
      );
      audioDeviceService.removeEventListener(
        'deviceDisconnected',
        handleDeviceDisconnected
      );
      audioDeviceService.removeEventListener(
        'deviceTested',
        handleDeviceTested
      );
    };
  }, [currentAudioElement]);

  const handleDeviceSelect = async deviceId => {
    setIsLoading(true);
    try {
      const success = await audioDeviceService.selectAudioDevice(deviceId);
      if (success) {
        // Si on a un élément audio actuel, appliquer immédiatement
        if (currentAudioElement) {
          await audioDeviceService.applyToAudioElement(currentAudioElement);
        }
      }
    } catch (error) {
      console.error('Error selecting device:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestDevice = async deviceId => {
    setTestingDevice(deviceId);
    await audioDeviceService.testAudioDevice(deviceId);
  };

  const handleResetToDefault = async () => {
    setIsLoading(true);
    try {
      audioDeviceService.resetToDefault();

      if (currentAudioElement) {
        await audioDeviceService.applyToAudioElement(currentAudioElement);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    background:
      'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
    margin: 0,
  };

  const deviceListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  };

  const deviceItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const selectedDeviceStyle = {
    ...deviceItemStyle,
    background:
      'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
    border: '1px solid rgba(139, 92, 246, 0.4)',
  };

  const deviceInfoStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const deviceNameStyle = {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
  };

  const deviceStatusStyle = {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const footerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const actionButtonStyle = {
    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  if (!isSupported) {
    return (
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          <div style={headerStyle}>
            <AlertCircle size={24} color="#EF4444" />
            <h3 style={titleStyle}>Périphériques Audio Non Supportés</h3>
          </div>
          <p
            style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}
          >
            Votre navigateur ne supporte pas la sélection des périphériques
            audio de sortie. Cette fonctionnalité est disponible sur Chrome,
            Edge et d&apos;autres navigateurs basés sur Chromium.
          </p>
          <div style={footerStyle}>
            <button style={actionButtonStyle} onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <Headphones size={24} color="#8B5CF6" />
          <h3 style={titleStyle}>Périphériques Audio</h3>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            {isLoading && (
              <Loader size={20} color="#8B5CF6" className="animate-spin" />
            )}
          </div>
        </div>

        <div style={deviceListStyle}>
          {devices.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <Headphones size={48} color="rgba(255, 255, 255, 0.3)" />
              <p style={{ marginTop: '12px' }}>
                Aucun périphérique audio détecté
              </p>
            </div>
          ) : (
            devices.map(device => (
              <div
                key={device.value}
                style={
                  device.isSelected ? selectedDeviceStyle : deviceItemStyle
                }
                onClick={() => !isLoading && handleDeviceSelect(device.value)}
                onMouseEnter={e => {
                  if (!device.isSelected) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={e => {
                  if (!device.isSelected) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
              >
                <div style={{ fontSize: '20px' }}>{device.icon}</div>

                <div style={deviceInfoStyle}>
                  <div style={deviceNameStyle}>{device.label}</div>
                  <div style={deviceStatusStyle}>
                    {device.isSelected && 'Sélectionné • '}
                    {device.isDefault && 'Par défaut • '}
                    {device.isConnected ? 'Connecté' : 'Déconnecté'}
                  </div>
                </div>

                {device.isSelected && <CheckCircle size={20} color="#10B981" />}

                <button
                  style={buttonStyle}
                  onClick={e => {
                    e.stopPropagation();
                    handleTestDevice(device.value);
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  disabled={testingDevice === device.value}
                  title="Tester ce périphérique"
                >
                  {testingDevice === device.value ? (
                    <Loader size={16} color="white" className="animate-spin" />
                  ) : (
                    <Play size={16} color="white" />
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        <div style={footerStyle}>
          <button
            style={{
              ...actionButtonStyle,
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
            onClick={handleResetToDefault}
            disabled={isLoading}
          >
            <Settings size={16} />
            Réinitialiser
          </button>

          <button style={actionButtonStyle} onClick={onClose}>
            <CheckCircle size={16} />
            Terminé
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioDeviceSelector;
