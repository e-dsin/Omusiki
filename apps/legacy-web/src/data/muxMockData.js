// data/muxMockData.js

// Données mock avec intégration Mux
// Remplacez les playbackIds par vos vrais IDs Mux après upload

export const mockMuxSongs = [
  {
    id: 1,
    title: "Ndolo",
    artist: "Grace Decca",
    album: "Best of Makossa",
    duration: 240,
    genre: "Makossa",
    // Mux integration
    muxPlaybackId: "REPLACE_WITH_YOUR_MUX_PLAYBACK_ID_1", // Remplacer après upload sur Mux
    muxAssetId: null,
    thumbnailUrl: null,
    isVideo: false, // false pour audio seulement
    audioOnly: true,
  },
  {
    id: 2,
    title: "Soul Makossa",
    artist: "Manu Dibango",
    album: "Soul Makossa",
    duration: 265,
    genre: "Makossa",
    muxPlaybackId: "REPLACE_WITH_YOUR_MUX_PLAYBACK_ID_2",
    muxAssetId: null,
    thumbnailUrl: null,
    isVideo: false,
    audioOnly: true,
  },
  {
    id: 3,
    title: "Amio",
    artist: "Charlotte Dipanda",
    album: "Karibu",
    duration: 218,
    genre: "Cameroun Music",
    muxPlaybackId: "REPLACE_WITH_YOUR_MUX_PLAYBACK_ID_3",
    muxAssetId: null,
    thumbnailUrl: null,
    isVideo: false,
    audioOnly: true,
  },
  // Exemple avec vidéo clip
  {
    id: 4,
    title: "Lobé (Video Clip)",
    artist: "Mani Bella",
    album: "Pousse la vie",
    duration: 195,
    genre: "Cameroun Music",
    muxPlaybackId: "REPLACE_WITH_YOUR_MUX_VIDEO_PLAYBACK_ID",
    muxAssetId: null,
    thumbnailUrl: null, // Sera généré automatiquement par Mux
    isVideo: true, // true pour les vidéos
    audioOnly: false,
  },
  // Chansons sans Mux (utiliseront l'ancien système)
  {
    id: 5,
    title: "African Queen",
    artist: "2Baba",
    album: "Face 2 Face",
    duration: 232,
    genre: "African Hits",
    muxPlaybackId: null, // Pas encore sur Mux
    localFile: "/audio/african-queen.mp3", // Fichier local de fallback
  },
];

// Configuration pour les tests avec des assets Mux publics
export const muxTestAssets = {
  // Audio test (utilisez ces IDs pour tester sans uploader vos propres fichiers)
  audioTest: {
    playbackId: "a4nOgmxGWg8gULh6K02fh6npsqfEQ00v7KiB9001WtxKFo", // Exemple d'ID public Mux
    title: "Test Audio Stream",
    artist: "Mux Demo",
    duration: 180,
  },
  // Video test
  videoTest: {
    playbackId: "EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs", // Exemple d'ID public Mux
    title: "Test Video Stream",
    artist: "Mux Demo",
    duration: 120,
  },
};

// Configuration des uploads pour les artistes
export const muxUploadSettings = {
  audio: {
    maxFileSize: 500 * 1024 * 1024, // 500MB
    acceptedFormats: [".mp3", ".wav", ".aac", ".m4a", ".flac"],
    videoQuality: "basic",
    audioOnly: true,
    mp4Support: "standard",
  },
  video: {
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
    acceptedFormats: [".mp4", ".mov", ".avi", ".mkv"],
    videoQuality: "plus", // Meilleure qualité pour les vidéos
    audioOnly: false,
    mp4Support: "capped-1080p",
  },
};

// Helper pour générer les URLs Mux
export const getMuxUrls = (playbackId, isVideo = false) => {
  if (!playbackId) return null;

  const baseUrl = "https://stream.mux.com";

  return {
    // HLS streaming (recommandé)
    hls: `${baseUrl}/${playbackId}.m3u8`,
    // Audio seulement
    audioOnly: `${baseUrl}/${playbackId}/audio.m3u8`,
    // Thumbnail (pour les vidéos)
    thumbnail: isVideo
      ? `${baseUrl}/${playbackId}/thumbnail.jpg?width=640&height=360&time=5`
      : null,
    // Animated GIF preview (pour les vidéos)
    animatedGif: isVideo
      ? `${baseUrl}/${playbackId}/animated.gif?width=320`
      : null,
    // MP4 download (si activé)
    downloadUrl: `${baseUrl}/${playbackId}/high.mp4`,
  };
};

// Exemple d'intégration avec le PlayerContext existant
export const adaptSongForMux = (song) => {
  if (song.muxPlaybackId) {
    const urls = getMuxUrls(song.muxPlaybackId, song.isVideo);
    return {
      ...song,
      streamUrl: urls.hls,
      audioUrl: urls.audioOnly,
      thumbnailUrl: urls.thumbnail || song.thumbnailUrl,
      downloadUrl: urls.downloadUrl,
    };
  }

  // Fallback pour les chansons non-Mux
  return {
    ...song,
    streamUrl: song.localFile,
    audioUrl: song.localFile,
  };
};
