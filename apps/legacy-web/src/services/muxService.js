// services/muxService.js

// Configuration Mux
const MUX_TOKEN_ID = process.env.REACT_APP_MUX_TOKEN_ID;
const MUX_TOKEN_SECRET = process.env.REACT_APP_MUX_TOKEN_SECRET;
const MUX_PLAYBACK_ID_PREFIX =
  process.env.REACT_APP_MUX_PLAYBACK_ID_PREFIX || "";

class MuxService {
  constructor() {
    this.baseUrl = "https://api.mux.com";
    this.streamBaseUrl = "https://stream.mux.com";
  }

  // Générer l'URL de streaming pour un asset
  getStreamUrl(playbackId, options = {}) {
    const {
      format = "m3u8", // HLS par défaut
      quality = "auto",
      audioOnly = false,
    } = options;

    if (audioOnly) {
      // Pour l'audio uniquement
      return `${this.streamBaseUrl}/${playbackId}/audio.${format}`;
    }

    // Pour la vidéo
    return `${this.streamBaseUrl}/${playbackId}.${format}`;
  }

  // Obtenir la thumbnail d'une vidéo
  getThumbnailUrl(playbackId, options = {}) {
    const {
      width = 640,
      height = 360,
      time = 1,
      fitMode = "preserve",
    } = options;

    return `${this.streamBaseUrl}/${playbackId}/thumbnail.jpg?width=${width}&height=${height}&time=${time}&fit_mode=${fitMode}`;
  }

  // Obtenir la durée d'un asset (nécessite un backend)
  async getAssetDetails(assetId) {
    try {
      const response = await fetch(`/api/mux/assets/${assetId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("omusika_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch asset details");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching asset details:", error);
      return null;
    }
  }

  // Uploader un fichier (nécessite un backend pour sécuriser les clés)
  async requestUploadUrl() {
    try {
      const response = await fetch("/api/mux/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("omusika_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      return await response.json();
    } catch (error) {
      console.error("Error requesting upload URL:", error);
      return null;
    }
  }

  // Upload direct depuis le navigateur
  async uploadFile(file, uploadUrl, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = (event.loaded / event.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"));
      });

      xhr.open("PUT", uploadUrl);
      xhr.send(file);
    });
  }

  // Créer un live stream (nécessite un backend)
  async createLiveStream(options = {}) {
    try {
      const response = await fetch("/api/mux/live-streams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("omusika_token")}`,
        },
        body: JSON.stringify({
          playback_policy: ["public"],
          new_asset_settings: {
            playback_policy: ["public"],
          },
          ...options,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create live stream");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating live stream:", error);
      return null;
    }
  }

  // Obtenir les statistiques de lecture
  async getPlaybackStats(playbackId, timeframe = "24:hours") {
    try {
      const response = await fetch(
        `/api/mux/data/metrics/views?filters[]=playback_id:${playbackId}&timeframe=${timeframe}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("omusika_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch playback stats");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching playback stats:", error);
      return null;
    }
  }
}

export const muxService = new MuxService();

// Hook personnalisé pour utiliser Mux dans les composants React
export const useMuxPlayer = (playbackId, options = {}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    if (!playbackId) return;

    const initializePlayer = async () => {
      try {
        // Charger Mux Player si pas déjà chargé
        if (!window.mux) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/@mux/mux-player@latest/dist/index.js";
          script.async = true;
          document.head.appendChild(script);

          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        setIsReady(true);
      } catch (err) {
        setError(err);
        console.error("Failed to initialize Mux player:", err);
      }
    };

    initializePlayer();
  }, [playbackId]);

  return {
    isReady,
    error,
    duration,
    playerRef,
    streamUrl: muxService.getStreamUrl(playbackId, options),
    thumbnailUrl: muxService.getThumbnailUrl(playbackId),
  };
};
