// services/api.service.ts

import {
  ApiResponse,
  User,
  AuthCredentials,
  SignupCredentials,
  Song,
  SearchQuery,
  SearchResults,
  PaginatedResponse,
  SubscriptionType,
  UserStats,
  Album,
  Artist,
  Playlist,
} from "../types";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("omusika_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(this.token && { Authorization: `Bearer ${this.token}` }),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: response.status.toString(),
            message: data.message || "Une erreur est survenue",
            details: data.details,
          },
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Erreur de connexion au serveur",
        },
      };
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("omusika_token", token);
    } else {
      localStorage.removeItem("omusika_token");
    }
  }

  // Auth methods
  async login(
    credentials: AuthCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );

    if (response.success && response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async signup(
    credentials: SignupCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>(
      "/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );

    if (response.success && response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.request("/auth/logout", { method: "POST" });
    this.setToken(null);
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>("/auth/me");
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async updateSubscription(plan: SubscriptionType): Promise<ApiResponse<User>> {
    return this.request<User>("/auth/subscription", {
      method: "PUT",
      body: JSON.stringify({ plan }),
    });
  }

  // Music methods
  async getSongs(
    page = 1,
    limit = 20,
    genre?: string
  ): Promise<ApiResponse<PaginatedResponse<Song>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(genre && { genre }),
    });

    return this.request<PaginatedResponse<Song>>(`/songs?${params}`);
  }

  async getSong(id: number): Promise<ApiResponse<Song>> {
    return this.request<Song>(`/songs/${id}`);
  }

  async search(query: SearchQuery): Promise<ApiResponse<SearchResults>> {
    const params = new URLSearchParams({
      q: query.query,
      page: (query.page || 1).toString(),
      limit: (query.limit || 20).toString(),
    });

    if (query.filters) {
      Object.entries(query.filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          params.append(key, value.join(","));
        } else if (typeof value === "object") {
          Object.entries(value).forEach(([subKey, subValue]) => {
            params.append(`${key}[${subKey}]`, String(subValue));
          });
        } else {
          params.append(key, String(value));
        }
      });
    }

    return this.request<SearchResults>(`/search?${params}`);
  }

  async getAlbum(id: number): Promise<ApiResponse<Album>> {
    return this.request<Album>(`/albums/${id}`);
  }

  async getArtist(id: number): Promise<ApiResponse<Artist>> {
    return this.request<Artist>(`/artists/${id}`);
  }

  async getArtistSongs(artistId: number): Promise<ApiResponse<Song[]>> {
    return this.request<Song[]>(`/artists/${artistId}/songs`);
  }

  // Playlist methods
  async getPlaylists(): Promise<ApiResponse<Playlist[]>> {
    return this.request<Playlist[]>("/playlists");
  }

  async getPlaylist(id: number): Promise<ApiResponse<Playlist>> {
    return this.request<Playlist>(`/playlists/${id}`);
  }

  async createPlaylist(
    name: string,
    isPublic = false
  ): Promise<ApiResponse<Playlist>> {
    return this.request<Playlist>("/playlists", {
      method: "POST",
      body: JSON.stringify({ name, isPublic }),
    });
  }

  async updatePlaylist(
    id: number,
    data: Partial<Playlist>
  ): Promise<ApiResponse<Playlist>> {
    return this.request<Playlist>(`/playlists/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deletePlaylist(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/playlists/${id}`, {
      method: "DELETE",
    });
  }

  async addSongToPlaylist(
    playlistId: number,
    songId: number
  ): Promise<ApiResponse<Playlist>> {
    return this.request<Playlist>(`/playlists/${playlistId}/songs`, {
      method: "POST",
      body: JSON.stringify({ songId }),
    });
  }

  async removeSongFromPlaylist(
    playlistId: number,
    songId: number
  ): Promise<ApiResponse<Playlist>> {
    return this.request<Playlist>(`/playlists/${playlistId}/songs/${songId}`, {
      method: "DELETE",
    });
  }

  // Stats methods
  async getUserStats(): Promise<ApiResponse<UserStats>> {
    return this.request<UserStats>("/stats/user");
  }

  async recordListening(
    songId: number,
    duration: number
  ): Promise<ApiResponse<void>> {
    return this.request<void>("/stats/listening", {
      method: "POST",
      body: JSON.stringify({ songId, duration }),
    });
  }

  // Offline methods
  async getStreamUrl(songId: number): Promise<ApiResponse<{ url: string }>> {
    return this.request<{ url: string }>(`/songs/${songId}/stream`);
  }
}

export const apiService = new ApiService();

// services/audio.service.ts

export class AudioService {
  private audio: HTMLAudioElement;
  private context: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;

  constructor() {
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";
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
      console.error("Failed to setup audio context:", error);
    }
  }

  async load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.audio.src = url;

      this.audio.addEventListener("loadeddata", () => resolve(), {
        once: true,
      });
      this.audio.addEventListener("error", (e) => reject(e), { once: true });

      this.audio.load();
    });
  }

  async play(): Promise<void> {
    if (this.context?.state === "suspended") {
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
    this.audio.src = "";
    this.source?.disconnect();
    this.gainNode?.disconnect();
    this.context?.close();
  }
}

// services/storage.service.ts

interface StorageData {
  user: User | null;
  settings: any;
  downloadedSongs: number[];
  playlists: Playlist[];
}

class StorageService {
  private prefix = "omusika_";

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
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => localStorage.removeItem(key));
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
  private dbName = "omusika_offline";
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

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("songs")) {
          const store = db.createObjectStore("songs", { keyPath: "id" });
          store.createIndex("artist", "artist", { unique: false });
          store.createIndex("album", "album", { unique: false });
        }
      };
    });
  }

  async saveSongOffline(song: Song, audioBlob: Blob): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["songs"], "readwrite");
      const store = transaction.objectStore("songs");

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
      const transaction = this.db!.transaction(["songs"], "readonly");
      const store = transaction.objectStore("songs");
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async removeOfflineSong(id: number): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["songs"], "readwrite");
      const store = transaction.objectStore("songs");
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllOfflineSongs(): Promise<any[]> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["songs"], "readonly");
      const store = transaction.objectStore("songs");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }
}

export const storageService = new StorageService();

// services/analytics.service.ts

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  private queue: AnalyticsEvent[] = [];
  private isOnline = navigator.onLine;

  constructor() {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.flushQueue();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  track(event: AnalyticsEvent): void {
    if (!this.isOnline) {
      this.queue.push(event);
      return;
    }

    this.sendEvent(event);
  }

  trackSongPlay(song: Song): void {
    this.track({
      category: "Music",
      action: "Play",
      label: `${song.artist} - ${song.title}`,
      value: song.id,
    });
  }

  trackSearch(query: string, resultsCount: number): void {
    this.track({
      category: "Search",
      action: "Query",
      label: query,
      value: resultsCount,
    });
  }

  trackSubscription(plan: SubscriptionType): void {
    this.track({
      category: "Subscription",
      action: "Change",
      label: plan,
    });
  }

  trackError(error: Error, context?: string): void {
    this.track({
      category: "Error",
      action: error.name,
      label: context || error.message,
    });
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // In production, send to analytics service
      console.log("Analytics event:", event);

      // Example: Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag("event", event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        });
      }
    } catch (error) {
      console.error("Failed to send analytics event:", error);
    }
  }

  private async flushQueue(): Promise<void> {
    const events = [...this.queue];
    this.queue = [];

    for (const event of events) {
      await this.sendEvent(event);
    }
  }
}

export const analyticsService = new AnalyticsService();
