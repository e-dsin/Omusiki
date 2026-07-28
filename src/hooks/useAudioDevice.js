// hooks/useAudioDevice.js
import { useState, useEffect, useCallback, useRef } from 'react';
import audioDeviceService from '../services/AudioDeviceService';

export const useAudioDevice = (audioElementRef = null) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);

  // Ref pour éviter les re-renders inutiles
  const listenersRef = useRef({});

  // Initialisation
  useEffect(() => {
    setDevices(audioDeviceService.getDevicesForUI());
    setSelectedDevice(audioDeviceService.getSelectedDevice());
    setIsSupported(audioDeviceService.isSupported);

    // Handlers pour les événements
    const handleDevicesChanged = newDevices => {
      setDevices(audioDeviceService.getDevicesForUI());
    };

    const handleDeviceSelected = data => {
      setSelectedDevice(audioDeviceService.getSelectedDevice());
      setError(null);

      // Auto-appliquer au player si un élément audio est fourni
      if (audioElementRef?.current) {
        audioDeviceService.applyToAudioElement(audioElementRef.current);
      }
    };

    const handleDeviceDisconnected = deviceId => {
      setDevices(audioDeviceService.getDevicesForUI());
      setSelectedDevice(audioDeviceService.getSelectedDevice());

      // Notifier l'utilisateur si son périphérique a été déconnecté
      if (deviceId !== 'default') {
        setError(
          `Le périphérique audio a été déconnecté. Basculement vers le périphérique par défaut.`
        );

        // Effacer l'erreur après 5 secondes
        setTimeout(() => setError(null), 5000);
      }
    };

    const handleDeviceApplied = data => {
      setError(null);
      console.log('Audio device applied successfully:', data.deviceId);
    };

    const handleDeviceTested = data => {
      if (!data.success) {
        setError(
          `Erreur lors du test: ${
            data.error?.message || 'Périphérique non disponible'
          }`
        );
        setTimeout(() => setError(null), 3000);
      }
    };

    // Stocker les références pour le cleanup
    listenersRef.current = {
      devicesChanged: handleDevicesChanged,
      deviceSelected: handleDeviceSelected,
      deviceDisconnected: handleDeviceDisconnected,
      deviceApplied: handleDeviceApplied,
      deviceTested: handleDeviceTested,
    };

    // Ajouter les listeners
    Object.entries(listenersRef.current).forEach(([event, handler]) => {
      audioDeviceService.addEventListener(event, handler);
    });

    // Détecter les périphériques au montage
    audioDeviceService.detectAudioDevices();

    // Cleanup
    return () => {
      Object.entries(listenersRef.current).forEach(([event, handler]) => {
        audioDeviceService.removeEventListener(event, handler);
      });
    };
  }, [audioElementRef]);

  // Sélectionner un périphérique
  const selectDevice = useCallback(async deviceId => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await audioDeviceService.selectAudioDevice(deviceId);

      if (!success) {
        throw new Error('Impossible de sélectionner ce périphérique');
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tester un périphérique
  const testDevice = useCallback(async (deviceId, testAudioUrl = null) => {
    try {
      return await audioDeviceService.testAudioDevice(deviceId, testAudioUrl);
    } catch (err) {
      setError(`Erreur lors du test: ${err.message}`);
      return false;
    }
  }, []);

  // Appliquer le périphérique sélectionné à un élément audio
  const applyToAudioElement = useCallback(async audioElement => {
    if (!audioElement) return false;

    try {
      return await audioDeviceService.applyToAudioElement(audioElement);
    } catch (err) {
      setError(`Erreur lors de l'application: ${err.message}`);
      return false;
    }
  }, []);

  // Réinitialiser au périphérique par défaut
  const resetToDefault = useCallback(async () => {
    setIsLoading(true);
    try {
      audioDeviceService.resetToDefault();
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Rafraîchir la liste des périphériques
  const refreshDevices = useCallback(async () => {
    setIsLoading(true);
    try {
      await audioDeviceService.detectAudioDevices();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effacer l'erreur manuellement
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Obtenir les statistiques
  const getStats = useCallback(() => {
    return audioDeviceService.getDeviceStats();
  }, []);

  return {
    // État
    devices,
    selectedDevice,
    isLoading,
    isSupported,
    error,

    // Actions
    selectDevice,
    testDevice,
    applyToAudioElement,
    resetToDefault,
    refreshDevices,
    clearError,

    // Utilitaires
    getStats,
    selectedDeviceId: selectedDevice?.deviceId || 'default',
    hasMultipleDevices: devices.length > 1,

    // Informations du service
    serviceInstance: audioDeviceService,
  };
};
