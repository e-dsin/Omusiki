// hooks/useAudio.ts

import { useEffect, useRef, useState } from "react";
import { AudioService } from "../services/audio.service";
import { UseAudioReturn } from "../types";

export const useAudio = (url?: string): UseAudioReturn => {
  const audioService = useRef<AudioService | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(70);

  useEffect(() => {
    audioService.current = new AudioService();

    const audio = audioService.current;

    audio.on("loadedmetadata", () => {
      setDuration(audio.getDuration());
      setIsReady(true);
    });

    audio.on("timeupdate", () => {
      setCurrentTime(audio.getCurrentTime());
    });

    audio.on("play", () => setIsPlaying(true));
    audio.on("pause", () => setIsPlaying(false));
    audio.on("ended", () => setIsPlaying(false));

    return () => {
      audioService.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (url && audioService.current) {
      setIsReady(false);
      audioService.current.load(url);
    }
  }, [url]);

  const play = async () => {
    await audioService.current?.play();
  };

  const pause = () => {
    audioService.current?.pause();
  };

  const seek = (time: number) => {
    audioService.current?.seek(time);
  };

  const setVolume = (vol: number) => {
    audioService.current?.setVolume(vol);
    setVolumeState(vol);
  };

  return {
    audio: audioService.current as any,
    isReady,
    duration,
    currentTime,
    isPlaying,
    volume,
    play,
    pause,
    seek,
    setVolume,
  };
};
