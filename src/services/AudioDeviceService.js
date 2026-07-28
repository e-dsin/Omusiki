// src/services/AudioDeviceService.js - Version améliorée
export class AudioDeviceService {
  constructor() {
    this.audioDevices = [];
    this.selectedDeviceId = 'default';
    this.listeners = [];
    this.isSupported = this.checkSupport();
    this.permissionStream = null; // Pour libérer le stream après permission

    // Initialiser la détection des périphériques
    this.initializeDeviceDetection();

    // Charger les préférences sauvegardées au démarrage
    this.loadSavedPreferences();
  }

  /**
   * Vérifie si l'API de sélection des périphériques audio est supportée
   */
  checkSupport() {
    const hasMediaDevices = !!(
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
    );
    const hasSinkId = !!HTMLAudioElement.prototype.setSinkId;

    if (!hasMediaDevices) {
      console.warn('MediaDevices API not supported');
    }
    if (!hasSinkId) {
      console.warn('setSinkId not supported');
    }

    return hasMediaDevices && hasSinkId;
  }

  /**
   * Initialise la détection automatique des périphériques
   */
  async initializeDeviceDetection() {
    if (!this.isSupported) {
      console.warn('Audio device selection not supported in this browser');
      return;
    }

    try {
      // Demander permission pour accéder aux périphériques audio
      this.permissionStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Libérer immédiatement le stream après avoir obtenu la permission
      if (this.permissionStream) {
        this.permissionStream.getTracks().forEach(track => track.stop());
        this.permissionStream = null;
      }

      // Écouter les changements de périphériques
      this.deviceChangeHandler = () => this.detectAudioDevices();
      navigator.mediaDevices.addEventListener(
        'devicechange',
        this.deviceChangeHandler
      );

      // Détection initiale
      await this.detectAudioDevices();
    } catch (error) {
      console.warn('Could not initialize audio device detection:', error);
      // Fallback: essayer de détecter sans permission
      await this.detectAudioDevices();
    }
  }

  /**
   * Détecte tous les périphériques audio de sortie disponibles
   */
  async detectAudioDevices() {
    if (!this.isSupported) return [];

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Filtrer uniquement les périphériques de sortie audio
      const audioOutputDevices = devices
        .filter(device => device.kind === 'audiooutput')
        .map(device => ({
          deviceId: device.deviceId,
          label:
            device.label ||
            `Périphérique Audio ${device.deviceId.substring(0, 8)}`,
          groupId: device.groupId,
          kind: device.kind,
          isDefault: device.deviceId === 'default',
          isConnected: true, // Nouveau: statut de connexion
        }));

      // Ajouter le périphérique par défaut s'il n'existe pas
      if (!audioOutputDevices.some(device => device.deviceId === 'default')) {
        audioOutputDevices.unshift({
          deviceId: 'default',
          label: 'Périphérique par défaut du système',
          groupId: null,
          kind: 'audiooutput',
          isDefault: true,
          isConnected: true,
        });
      }

      // Vérifier si le périphérique actuellement sélectionné existe encore
      const selectedDeviceExists = audioOutputDevices.some(
        device => device.deviceId === this.selectedDeviceId
      );

      if (!selectedDeviceExists && this.selectedDeviceId !== 'default') {
        console.warn(
          `Selected device ${this.selectedDeviceId} no longer available, switching to default`
        );
        this.selectedDeviceId = 'default';
        localStorage.setItem('omusiki_selected_audio_device', 'default');
        this.notifyListeners('deviceDisconnected', this.selectedDeviceId);
      }

      this.audioDevices = audioOutputDevices;

      // Notifier les listeners
      this.notifyListeners('devicesChanged', this.audioDevices);

      return this.audioDevices;
    } catch (error) {
      console.error('Error detecting audio devices:', error);
      return [];
    }
  }

  /**
   * Obtient la liste des périphériques audio détectés
   */
  getAudioDevices() {
    return this.audioDevices;
  }

  /**
   * Sélectionne un périphérique audio par son ID
   */
  async selectAudioDevice(deviceId) {
    if (!this.isSupported) {
      console.warn('Audio device selection not supported');
      return false;
    }

    // Vérifier que le périphérique existe
    const deviceExists = this.audioDevices.some(
      device => device.deviceId === deviceId
    );
    if (!deviceExists && deviceId !== 'default') {
      console.error(`Device ${deviceId} not found`);
      return false;
    }

    try {
      const previousDeviceId = this.selectedDeviceId;
      this.selectedDeviceId = deviceId;

      // Sauvegarder la préférence dans localStorage
      localStorage.setItem('omusiki_selected_audio_device', deviceId);

      // Notifier les listeners avec les deux IDs pour permettre la transition
      this.notifyListeners('deviceSelected', {
        newDeviceId: deviceId,
        previousDeviceId: previousDeviceId,
        deviceInfo: this.getDeviceInfo(deviceId),
      });

      console.log(`Audio device selected: ${deviceId}`);
      return true;
    } catch (error) {
      console.error('Error selecting audio device:', error);
      return false;
    }
  }

  /**
   * Obtient l'ID du périphérique actuellement sélectionné
   */
  getSelectedDeviceId() {
    return this.selectedDeviceId;
  }

  /**
   * Obtient le périphérique actuellement sélectionné
   */
  getSelectedDevice() {
    return this.getDeviceInfo(this.selectedDeviceId);
  }

  /**
   * Charge les préférences sauvegardées
   */
  loadSavedPreferences() {
    const savedDeviceId = localStorage.getItem('omusiki_selected_audio_device');
    if (savedDeviceId) {
      this.selectedDeviceId = savedDeviceId;
      console.log(`Loaded saved audio device preference: ${savedDeviceId}`);
    }
  }

  /**
   * Applique le périphérique sélectionné à un élément audio
   */
  async applyToAudioElement(audioElement) {
    if (!this.isSupported || !audioElement) {
      return false;
    }

    // Vérifier que l'élément supporte setSinkId
    if (!audioElement.setSinkId) {
      console.warn('setSinkId not supported on this audio element');
      return false;
    }

    try {
      await audioElement.setSinkId(this.selectedDeviceId);
      console.log(`Audio output applied to device: ${this.selectedDeviceId}`);

      // Notifier que l'application a réussi
      this.notifyListeners('deviceApplied', {
        deviceId: this.selectedDeviceId,
        audioElement: audioElement,
      });

      return true;
    } catch (error) {
      console.error('Error setting audio output device:', error);

      // Fallback vers le périphérique par défaut en cas d'erreur
      if (this.selectedDeviceId !== 'default') {
        console.log('Falling back to default device');
        try {
          await audioElement.setSinkId('default');
          this.selectedDeviceId = 'default';
          localStorage.setItem('omusiki_selected_audio_device', 'default');
          return true;
        } catch (fallbackError) {
          console.error(
            'Fallback to default device also failed:',
            fallbackError
          );
        }
      }

      return false;
    }
  }

  /**
   * Obtient les informations détaillées d'un périphérique
   */
  getDeviceInfo(deviceId) {
    return this.audioDevices.find(device => device.deviceId === deviceId);
  }

  /**
   * Teste un périphérique audio avec un son test amélioré
   */
  async testAudioDevice(deviceId, testAudioUrl = null) {
    if (!this.isSupported) {
      console.warn('Audio device testing not supported');
      return false;
    }

    try {
      if (testAudioUrl) {
        // Test avec un fichier audio fourni
        const testAudio = new Audio(testAudioUrl);
        testAudio.volume = 0.3;

        await testAudio.setSinkId(deviceId);
        await testAudio.play();

        // Nettoyer après 2 secondes
        setTimeout(() => {
          testAudio.pause();
          testAudio.currentTime = 0;
        }, 2000);

        return true;
      } else {
        // Générer un bip de test avec Web Audio API amélioré
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();

        // Créer un oscillateur avec enveloppe pour un son plus agréable
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Son plus musical (note C5)
        oscillator.frequency.value = 523.25; // C5 = 523.25 Hz
        oscillator.type = 'sine';

        // Enveloppe ADSR simple
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1); // Attack
        gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.4); // Decay
        gainNode.gain.linearRampToValueAtTime(0, now + 0.5); // Release

        oscillator.start(now);
        oscillator.stop(now + 0.5);

        // Nettoyer après utilisation
        setTimeout(() => {
          audioContext.close();
        }, 600);

        this.notifyListeners('deviceTested', { deviceId, success: true });
        return true;
      }
    } catch (error) {
      console.error('Error testing audio device:', error);
      this.notifyListeners('deviceTested', { deviceId, success: false, error });
      return false;
    }
  }

  /**
   * Ajoute un listener pour les événements
   */
  addEventListener(eventType, callback) {
    this.listeners.push({ eventType, callback });
  }

  /**
   * Supprime un listener
   */
  removeEventListener(eventType, callback) {
    this.listeners = this.listeners.filter(
      listener =>
        !(listener.eventType === eventType && listener.callback === callback)
    );
  }

  /**
   * Notifie tous les listeners d'un événement
   */
  notifyListeners(eventType, data) {
    this.listeners
      .filter(listener => listener.eventType === eventType)
      .forEach(listener => {
        try {
          listener.callback(data);
        } catch (error) {
          console.error(`Error in listener for ${eventType}:`, error);
        }
      });
  }

  /**
   * Obtient les statistiques des périphériques
   */
  getDeviceStats() {
    return {
      totalDevices: this.audioDevices.length,
      selectedDevice: this.getSelectedDevice(),
      isSupported: this.isSupported,
      availableDevices: this.audioDevices.map(device => ({
        id: device.deviceId,
        name: device.label,
        isDefault: device.isDefault,
        isConnected: device.isConnected,
        isSelected: device.deviceId === this.selectedDeviceId,
      })),
    };
  }

  /**
   * Vérifie si un périphérique spécifique est disponible
   */
  isDeviceAvailable(deviceId) {
    return this.audioDevices.some(
      device => device.deviceId === deviceId && device.isConnected
    );
  }

  /**
   * Réinitialise aux paramètres par défaut
   */
  resetToDefault() {
    const previousDevice = this.selectedDeviceId;
    this.selectedDeviceId = 'default';
    localStorage.removeItem('omusiki_selected_audio_device');

    this.notifyListeners('deviceSelected', {
      newDeviceId: 'default',
      previousDeviceId: previousDevice,
      deviceInfo: this.getDeviceInfo('default'),
    });

    console.log('Audio device reset to default');
  }

  /**
   * Obtient une liste formatée pour l'affichage dans l'UI
   */
  getDevicesForUI() {
    return this.audioDevices.map(device => ({
      value: device.deviceId,
      label: device.label,
      isDefault: device.isDefault,
      isSelected: device.deviceId === this.selectedDeviceId,
      isConnected: device.isConnected,
      icon: device.isDefault ? '🔊' : '🎧',
    }));
  }

  /**
   * Nettoie les ressources
   */
  cleanup() {
    // Libérer le stream de permission s'il existe encore
    if (this.permissionStream) {
      this.permissionStream.getTracks().forEach(track => track.stop());
      this.permissionStream = null;
    }

    // Supprimer les listeners
    this.listeners = [];

    // Supprimer l'écouteur de changement de périphériques
    if (navigator.mediaDevices && this.deviceChangeHandler) {
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        this.deviceChangeHandler
      );
    }

    console.log('AudioDeviceService cleaned up');
  }
}

// Instance singleton du service
export const audioDeviceService = new AudioDeviceService();

export default audioDeviceService;
