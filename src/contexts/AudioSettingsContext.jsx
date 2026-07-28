// src/contexts/AudioSettingsContext.jsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { audioDeviceService } from '../services/AudioDeviceService';

const AudioSettingsContext = createContext();

export const useAudioSettings = () => {
  const context = useContext(AudioSettingsContext);
  if (!context) {
    throw new Error(
      'useAudioSettings must be used within an AudioSettingsProvider'
    );
  }
  return context;
};

export const AudioSettingsProvider = ({ children }) => {
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('default');
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialisation
  useEffect(() => {
    const initializeAudioSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Vérifier le support
        setIsSupported(audioDeviceService.isSupported);

        if (audioDeviceService.isSupported) {
          // Charger les préférences sauvegardées
          audioDeviceService.loadSavedPreferences();
          setSelectedDeviceId(audioDeviceService.getSelectedDeviceId());

          // Détecter les périphériques
          const devices = await audioDeviceService.detectAudioDevices();
          setAudioDevices(devices);

          // Écouter les changements de périphériques
          audioDeviceService.addEventListener(
            'devicesChanged',
            handleDevicesChanged
          );
          audioDeviceService.addEventListener(
            'deviceSelected',
            handleDeviceSelected
          );
        }
      } catch (err) {
        console.error('Error initializing audio settings:', err);
        setError("Impossible d'initialiser les paramètres audio");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAudioSettings();

    // Cleanup
    return () => {
      audioDeviceService.cleanup();
    };
  }, []);

  // Gestionnaire de changement de périphériques
  const handleDevicesChanged = useCallback(devices => {
    setAudioDevices(devices);
  }, []);

  // Gestionnaire de sélection de périphérique
  const handleDeviceSelected = useCallback(deviceId => {
    setSelectedDeviceId(deviceId);
  }, []);

  // Sélectionner un périphérique audio
  const selectAudioDevice = useCallback(async deviceId => {
    try {
      setError(null);
      const success = await audioDeviceService.selectAudioDevice(deviceId);

      if (success) {
        setSelectedDeviceId(deviceId);
        return true;
      } else {
        throw new Error('Échec de la sélection du périphérique');
      }
    } catch (err) {
      console.error('Error selecting audio device:', err);
      setError(`Impossible de sélectionner le périphérique: ${err.message}`);
      return false;
    }
  }, []);

  // Tester un périphérique audio
  const testAudioDevice = useCallback(async deviceId => {
    try {
      setError(null);
      return await audioDeviceService.testAudioDevice(deviceId);
    } catch (err) {
      console.error('Error testing audio device:', err);
      setError(`Impossible de tester le périphérique: ${err.message}`);
      return false;
    }
  }, []);

  // Appliquer le périphérique sélectionné à un élément audio
  const applyToAudioElement = useCallback(async audioElement => {
    try {
      setError(null);
      return await audioDeviceService.applyToAudioElement(audioElement);
    } catch (err) {
      console.error('Error applying audio device:', err);
      setError(`Impossible d\'appliquer le périphérique: ${err.message}`);
      return false;
    }
  }, []);

  // Rafraîchir la liste des périphériques
  const refreshDevices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const devices = await audioDeviceService.detectAudioDevices();
      setAudioDevices(devices);
      return devices;
    } catch (err) {
      console.error('Error refreshing devices:', err);
      setError('Impossible de rafraîchir la liste des périphériques');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Réinitialiser aux paramètres par défaut
  const resetToDefault = useCallback(() => {
    audioDeviceService.resetToDefault();
    setSelectedDeviceId('default');
    setError(null);
  }, []);

  // Obtenir les informations d'un périphérique
  const getDeviceInfo = useCallback(deviceId => {
    return audioDeviceService.getDeviceInfo(deviceId);
  }, []);

  // Obtenir le périphérique actuellement sélectionné
  const getSelectedDevice = useCallback(() => {
    return audioDevices.find(device => device.deviceId === selectedDeviceId);
  }, [audioDevices, selectedDeviceId]);

  // Obtenir les statistiques
  const getDeviceStats = useCallback(() => {
    return audioDeviceService.getDeviceStats();
  }, []);

  // Vérifier si un périphérique est disponible
  const isDeviceAvailable = useCallback(
    deviceId => {
      return audioDevices.some(device => device.deviceId === deviceId);
    },
    [audioDevices]
  );

  // Obtenir les périphériques par catégorie
  const getDevicesByCategory = useCallback(() => {
    const defaultDevice = audioDevices.find(device => device.isDefault);
    const otherDevices = audioDevices.filter(device => !device.isDefault);

    return {
      default: defaultDevice ? [defaultDevice] : [],
      others: otherDevices,
      all: audioDevices,
    };
  }, [audioDevices]);

  // Valeurs du contexte
  const contextValue = {
    // États
    audioDevices,
    selectedDeviceId,
    isSupported,
    isLoading,
    error,

    // Actions
    selectAudioDevice,
    testAudioDevice,
    applyToAudioElement,
    refreshDevices,
    resetToDefault,

    // Getters
    getDeviceInfo,
    getSelectedDevice,
    getDeviceStats,
    isDeviceAvailable,
    getDevicesByCategory,

    // Utilitaires
    clearError: () => setError(null),
  };

  return (
    <AudioSettingsContext.Provider value={contextValue}>
      {children}
    </AudioSettingsContext.Provider>
  );
};

export default AudioSettingsContext;
