export class AudioService {
  private audio: HTMLAudioElement;
  private context: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;

  constructor() {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.setupAudioContext();
  }

  private setupAudioContext() {
    try {
      this.context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      this.gainNode = this.context.createGain();
      this.source = this.context.createMediaElementSource(this.audio);

      this.source.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
    } catch (error) {
      console.error('Failed to setup audio context:', error);
    }
  }

  async load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.audio.src = url;

      this.audio.addEventListener('loadeddata', () => resolve(), {
        once: true,
      });
      this.audio.addEventListener('error', e => reject(e), { once: true });

      this.audio.load();
    });
  }

  async play(): Promise<void> {
    if (this.context?.state === 'suspended') {
      await this.context.resume();
    }
    return this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  seek(time: number): void {
    this.audio.currentTime = time;
  }

  setVolume(volume: number): void {
    this.audio.volume = volume / 100;
    if (this.gainNode) {
      this.gainNode.gain.value = volume / 100;
    }
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration || 0;
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  on(event: string, handler: EventListener): void {
    this.audio.addEventListener(event, handler);
  }

  off(event: string, handler: EventListener): void {
    this.audio.removeEventListener(event, handler);
  }

  destroy(): void {
    this.audio.pause();
    this.audio.src = '';
    this.source?.disconnect();
    this.gainNode?.disconnect();
    this.context?.close();
  }
}
