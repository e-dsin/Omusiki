// utils/constants.ts

export const APP_NAME = "OMusika";
export const APP_VERSION = "1.0.0";
export const STORAGE_PREFIX = "omusika_";

export const GENRES = [
  "Makossa",
  "Cameroun Music",
  "African Hits",
  "World Music",
  "O Musiki Hits",
  "Generation 90",
  "Generation 80",
  "Generation 70",
  "Afrobeat",
  "Highlife",
  "Soukous",
  "Rumba",
  "Coupé-Décalé",
  "Ndombolo",
  "Bikutsi",
];

export const AUDIO_QUALITIES = {
  LOW: { label: "Économie de données", bitrate: "96kbps" },
  NORMAL: { label: "Normal", bitrate: "160kbps" },
  HIGH: { label: "Haute qualité", bitrate: "320kbps" },
  LOSSLESS: { label: "Sans perte", bitrate: "FLAC" },
};

export const SUBSCRIPTION_FEATURES = {
  Gratuit: {
    maxSkips: 6,
    maxOfflineSongs: 0,
    audioQuality: "NORMAL",
    hasAds: true,
  },
  Premium: {
    maxSkips: -1, // Unlimited
    maxOfflineSongs: 10000,
    audioQuality: "HIGH",
    hasAds: false,
  },
  Famille: {
    maxSkips: -1,
    maxOfflineSongs: 10000,
    audioQuality: "LOSSLESS",
    hasAds: false,
    maxAccounts: 6,
  },
};

export const CACHE_DURATION = {
  USER: 5 * 60 * 1000, // 5 minutes
  SONGS: 10 * 60 * 1000, // 10 minutes
  SEARCH: 2 * 60 * 1000, // 2 minutes
  PLAYLISTS: 5 * 60 * 1000, // 5 minutes
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  MUSIC: {
    SONGS: "/songs",
    ALBUMS: "/albums",
    ARTISTS: "/artists",
    GENRES: "/genres",
    SEARCH: "/search",
  },
  USER: {
    PROFILE: "/user/profile",
    STATS: "/user/stats",
    FAVORITES: "/user/favorites",
    HISTORY: "/user/history",
  },
  PLAYLIST: {
    BASE: "/playlists",
    USER: "/playlists/user",
    PUBLIC: "/playlists/public",
  },
};

export const ERROR_MESSAGES = {
  NETWORK: "Erreur de connexion. Veuillez vérifier votre connexion internet.",
  AUTH: "Email ou mot de passe incorrect.",
  SERVER: "Une erreur serveur est survenue. Veuillez réessayer plus tard.",
  VALIDATION: "Veuillez vérifier les informations saisies.",
  NOT_FOUND: "La ressource demandée est introuvable.",
  UNAUTHORIZED: "Vous devez être connecté pour accéder à cette ressource.",
  FORBIDDEN: "Vous n'avez pas les droits pour accéder à cette ressource.",
};
