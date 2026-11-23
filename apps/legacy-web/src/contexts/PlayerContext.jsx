// contexts/PlayerContext.js
import React, { createContext, useState, useRef, useCallback } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'one', 'all'

  const audioRef = useRef(null);

  // Fonctions de contrôle du lecteur
  const play = useCallback(
    song => {
      if (song && song !== currentSong) {
        setCurrentSong(song);
      }
      setIsPlaying(true);
    },
    [currentSong]
  );

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        nextIndex = repeatMode === 'all' ? 0 : currentIndex;
      }
    }

    if (nextIndex !== currentIndex || repeatMode === 'one') {
      setCurrentIndex(nextIndex);
      setCurrentSong(playlist[nextIndex]);
      setIsPlaying(true);
    }
  }, [playlist, currentIndex, isShuffled, repeatMode]);

  const playPrevious = useCallback(() => {
    if (playlist.length === 0) return;

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = repeatMode === 'all' ? playlist.length - 1 : 0;
      }
    }

    setCurrentIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  }, [playlist, currentIndex, isShuffled, repeatMode]);

  const seek = useCallback(time => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolumeLevel = useCallback(newVolume => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  const addToPlaylist = useCallback(
    (song, position = 'end') => {
      setPlaylist(prevPlaylist => {
        const newPlaylist = [...prevPlaylist];
        const songWithId = { ...song, id: song.id || Date.now() };

        if (position === 'next') {
          newPlaylist.splice(currentIndex + 1, 0, songWithId);
        } else {
          newPlaylist.push(songWithId);
        }

        return newPlaylist;
      });
    },
    [currentIndex]
  );

  const removeFromPlaylist = useCallback(songId => {
    setPlaylist(prevPlaylist =>
      prevPlaylist.filter(song => song.id !== songId)
    );
  }, []);

  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
    setCurrentIndex(0);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      switch (prev) {
        case 'none':
          return 'all';
        case 'all':
          return 'one';
        case 'one':
          return 'none';
        default:
          return 'none';
      }
    });
  }, []);

  // Valeur du contexte
  const contextValue = {
    // État
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    progress,
    playlist,
    currentIndex,
    isShuffled,
    repeatMode,
    audioRef,

    // Actions
    play,
    pause,
    resume,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume: setVolumeLevel,
    setCurrentSong,
    setCurrentTime,
    setDuration,
    setProgress,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    setPlaylist,
    toggleShuffle,
    toggleRepeat,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
