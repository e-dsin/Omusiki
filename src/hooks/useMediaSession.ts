// hooks/useMediaSession.ts

import { useEffect } from "react";
import { Song } from "../types";

interface MediaSessionOptions {
  song: Song | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const useMediaSession = ({
  song,
  isPlaying,
  onPlay,
  onPause,
  onPrevious,
  onNext,
}: MediaSessionOptions) => {
  useEffect(() => {
    if (!("mediaSession" in navigator) || !song) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title,
      artist: song.artist,
      album: song.album,
      artwork: [
        {
          src: song.coverUrl || "/default-cover.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", onPlay);
    navigator.mediaSession.setActionHandler("pause", onPause);
    navigator.mediaSession.setActionHandler("previoustrack", onPrevious);
    navigator.mediaSession.setActionHandler("nexttrack", onNext);

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [song, onPlay, onPause, onPrevious, onNext]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  }, [isPlaying]);
};
