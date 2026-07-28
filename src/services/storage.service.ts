import { User, Playlist, Song } from '../types';

interface StorageData {
  user: User | null;
  settings: any;
  downloadedSongs: number[];
  playlists: Playlist[];
}

class StorageService {
  private prefix = 'omusika_';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<K extends keyof StorageData>(key: K, value: StorageData[K]): void {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key} to storage:`, error);
    }
  }

  get<K extends keyof StorageData>(key: K): StorageData[K] | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get ${key} from storage:`, error);
      return null;
    }
  }

  remove(key: keyof StorageData): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }

  // Session storage methods
  setSession<T>(key: string, value: T): void {
    sessionStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  getSession<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(this.getKey(key));
  }

  // IndexedDB for offline songs
  private dbName = 'omusika_offline';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('songs')) {
          const store = db.createObjectStore('songs', { keyPath: 'id' });
          store.createIndex('artist', 'artist', { unique: false });
          store.createIndex('album', 'album', { unique: false });
        }
      };
    });
  }

  async saveSongOffline(song: Song, audioBlob: Blob): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['songs'], 'readwrite');
      const store = transaction.objectStore('songs');

      const songData = {
        ...song,
        audioBlob,
        downloadedAt: new Date(),
        fileSize: audioBlob.size / (1024 * 1024), // Convert to MB
      };

      const request = store.put(songData);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getOfflineSong(id: number): Promise<any> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['songs'], 'readonly');
      const store = transaction.objectStore('songs');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async removeOfflineSong(id: number): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['songs'], 'readwrite');
      const store = transaction.objectStore('songs');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllOfflineSongs(): Promise<any[]> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['songs'], 'readonly');
      const store = transaction.objectStore('songs');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }
}

export const storageService = new StorageService();
