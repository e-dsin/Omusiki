// types/index.ts

// ====== USER TYPES ======
export interface User {
  id: number;
  email: string;
  name: string;
  subscription: SubscriptionType;
  avatar?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends AuthCredentials {
  name: string;
}

export type SubscriptionType = "Gratuit" | "Premium" | "Famille";

// ====== MUSIC TYPES ======
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  genre: string;
  coverUrl?: string;
  audioUrl?: string;
  releaseDate?: Date;
  playCount?: number;
}

export interface Genre {
  id: number;
  name: string;
  color: string;
  description?: string;
  imageUrl?: string;
}

export interface Playlist {
  id: number;
  name: string;
  songs: number[]; // Song IDs
  userId?: number;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  releaseDate: Date;
  coverUrl?: string;
  songs: Song[];
}

// ====== SUBSCRIPTION TYPES ======
export interface SubscriptionPlan {
  id: number;
  name: SubscriptionType;
  price: number;
  features: string[];
  maxDevices?: number;
  audioQuality?: "standard" | "high" | "lossless";
}

export interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "mobile_money";
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

// ====== PLAYER TYPES ======
export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  queue: Song[];
  currentIndex: number;
  shuffle: boolean;
  repeat: "none" | "one" | "all";
}

export interface PlaybackControls {
  play: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: number) => void;
  clearQueue: () => void;
}

// ====== ANALYTICS TYPES ======
export interface UserStats {
  totalListeningTime: number; // in minutes
  songsPlayed: number;
  favoriteGenre: string;
  favoriteArtist: string;
  mostPlayedSong: Song;
  listeningHistory: ListeningSession[];
}

export interface ListeningSession {
  songId: number;
  startTime: Date;
  endTime: Date;
  completionRate: number; // 0-100
}

// ====== OFFLINE TYPES ======
export interface DownloadedSong extends Song {
  downloadedAt: Date;
  fileSize: number; // in MB
  localPath?: string;
}

export interface OfflineState {
  downloadedSongs: DownloadedSong[];
  totalSize: number; // in MB
  maxSize: number; // in MB, based on subscription
  isDownloading: boolean;
  downloadQueue: number[]; // Song IDs
}

// ====== API TYPES ======
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ====== SEARCH TYPES ======
export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  page?: number;
  limit?: number;
}

export interface SearchFilters {
  genres?: string[];
  artists?: string[];
  albums?: string[];
  releaseYear?: {
    min?: number;
    max?: number;
  };
  duration?: {
    min?: number; // in seconds
    max?: number;
  };
}

export interface SearchResults {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
  totalResults: number;
}

// ====== ARTIST TYPES ======
export interface Artist {
  id: number;
  name: string;
  bio?: string;
  imageUrl?: string;
  genres: string[];
  monthlyListeners?: number;
  verified: boolean;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  website?: string;
}

// ====== NOTIFICATION TYPES ======
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// ====== EVENT TYPES ======
export interface MusicEvent {
  id: number;
  title: string;
  artist: Artist;
  date: Date;
  venue: string;
  city: string;
  country: string;
  ticketUrl?: string;
  price?: {
    min: number;
    max: number;
    currency: string;
  };
}

// ====== FORM TYPES ======
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  birthDate?: Date;
  country?: string;
  favoriteGenres?: string[];
}

// ====== CONTEXT TYPES ======
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateSubscription: (plan: SubscriptionType) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export interface PlayerContextType extends PlayerState, PlaybackControls {
  isLoading: boolean;
  error: Error | null;
}

// ====== UTILITY TYPES ======
export type Theme = "light" | "dark" | "auto";

export interface AppSettings {
  theme: Theme;
  language: string;
  audioQuality: "auto" | "low" | "normal" | "high" | "lossless";
  autoplay: boolean;
  crossfade: boolean;
  crossfadeDuration: number; // in seconds
  explicitContent: boolean;
  downloadOverWifiOnly: boolean;
  notifications: {
    newReleases: boolean;
    artistUpdates: boolean;
    concerts: boolean;
    recommendations: boolean;
  };
}

// ====== COMPONENT PROPS TYPES ======
export interface SongRowProps {
  song: Song;
  onPlay: (song: Song) => void;
  isPlaying: boolean;
  showArtist?: boolean;
  showAlbum?: boolean;
  showDuration?: boolean;
  onAddToQueue?: (song: Song) => void;
  onAddToPlaylist?: (song: Song) => void;
  onDownload?: (song: Song) => void;
}

export interface GenreCardProps {
  genre: Genre;
  onClick: (genre: Genre) => void;
  isSelected?: boolean;
}

export interface PlaylistCardProps {
  playlist: Playlist;
  onClick: (playlist: Playlist) => void;
  onPlay?: (playlist: Playlist) => void;
  onEdit?: (playlist: Playlist) => void;
  onDelete?: (playlist: Playlist) => void;
  showActions?: boolean;
}

// ====== HOOK RETURN TYPES ======
export interface UseAudioReturn {
  audio: HTMLAudioElement | null;
  isReady: boolean;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

export interface UseSearchReturn {
  results: SearchResults | null;
  isSearching: boolean;
  error: Error | null;
  search: (query: SearchQuery) => Promise<void>;
  clearResults: () => void;
}

export interface UseOfflineReturn {
  downloadedSongs: DownloadedSong[];
  isDownloading: boolean;
  downloadProgress: number;
  download: (song: Song) => Promise<void>;
  remove: (songId: number) => void;
  clearAll: () => void;
  getTotalSize: () => number;
}

// ====== ENUM DEFINITIONS ======
export enum PlaybackQuality {
  LOW = "96",
  NORMAL = "160",
  HIGH = "320",
  LOSSLESS = "FLAC",
}

export enum RepeatMode {
  NONE = "none",
  ONE = "one",
  ALL = "all",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum SongSortBy {
  TITLE = "title",
  ARTIST = "artist",
  ALBUM = "album",
  DURATION = "duration",
  RELEASE_DATE = "releaseDate",
  PLAY_COUNT = "playCount",
}
