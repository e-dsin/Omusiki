// components/Player/MuxPlayer.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Loader,
} from "lucide-react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { muxService } from "../../services/muxService";

const MuxPlayer = () => {
  const {
    currentSong,
    isPlaying,
    pause,
    resume,
    playNext,
    playPrevious,
    volume,
    setVolume,
    setProgress,
  } = useContext(PlayerContext);

  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentSong?.muxPlaybackId) return;

    const initializePlayer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Charger le script Mux Player si nécessaire
        if (!customElements.get("mux-player")) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/@mux/mux-player@latest/dist/index.js";
          script.type = "module";
          document.head.appendChild(script);

          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        // Attendre que le player soit prêt
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.volume = volume / 100;
          }
        }, 100);
      } catch (err) {
        console.error("Failed to initialize Mux player:", err);
        setError("Erreur lors du chargement du lecteur");
      }
    };

    initializePlayer();
  }, [currentSong?.muxPlaybackId]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentSong) return null;

  // Si la chanson utilise Mux
  if (currentSong.muxPlaybackId) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
        <div className="max-w-screen-xl mx-auto">
          {/* Info de la chanson */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center flex-1">
              {currentSong.thumbnailUrl ? (
                <img
                  src={currentSong.thumbnailUrl}
                  alt={currentSong.title}
                  className="w-14 h-14 rounded-lg mr-4 object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-4"></div>
              )}
              <div>
                <h4
                  className="font-semibold text-gray-900"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {currentSong.title}
                </h4>
                <p className="text-sm text-gray-600">{currentSong.artist}</p>
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-4">
              <button
                onClick={playPrevious}
                className="text-gray-600 hover:text-gray-900"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={isPlaying ? pause : resume}
                disabled={isLoading}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-1" />
                )}
              </button>
              <button
                onClick={playNext}
                className="text-gray-600 hover:text-gray-900"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              <span className="text-sm text-gray-500">
                {formatTime(currentTime)}
              </span>
              <span className="text-sm text-gray-500">/</span>
              <span className="text-sm text-gray-500">
                {formatTime(duration)}
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowVolume(!showVolume)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                {showVolume && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg p-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => {
                        const newVolume = parseInt(e.target.value);
                        setVolume(newVolume);
                        if (videoRef.current) {
                          videoRef.current.volume = newVolume / 100;
                        }
                      }}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div
            className="w-full h-1 bg-gray-200 rounded-full cursor-pointer relative"
            onClick={handleSeek}
          >
            <div
              className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>

          {/* Élément Mux Player (caché visuellement) */}
          <mux-player
            ref={videoRef}
            playback-id={currentSong.muxPlaybackId}
            stream-type={currentSong.isVideo ? "on-demand" : "audio"}
            metadata-video-title={currentSong.title}
            metadata-viewer-user-id={currentSong.userId}
            style={{ display: "none" }}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={(e) => setError("Erreur de lecture")}
            muted={false}
            autoplay={false}
          />

          {error && (
            <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-sm p-2 text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback pour les chansons sans Mux (utilise l'ancien player)
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-4"></div>
          <div>
            <h4
              className="font-semibold text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {currentSong.title}
            </h4>
            <p className="text-sm text-gray-600">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={playPrevious}
            className="text-gray-600 hover:text-gray-900"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={isPlaying ? pause : resume}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-1" />
            )}
          </button>
          <button
            onClick={playNext}
            className="text-gray-600 hover:text-gray-900"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative">
            <button
              onClick={() => setShowVolume(!showVolume)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            {showVolume && (
              <div className="absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg p-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuxPlayer;
