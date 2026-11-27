import React, { useContext } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Maximize2,
  Repeat,
  Shuffle,
} from 'lucide-react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Slider from '@mui/material/Slider';

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    volume,
    setVolume,
    currentTime,
    duration,
    seek,
  } = useContext(PlayerContext);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          {/* Song info */}
          <div className="flex items-center gap-3 w-1/4">
            {currentSong && (
              <>
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium truncate">{currentSong.title}</h4>
                  <p className="text-sm text-gray-400 truncate">
                    {currentSong.artist}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-white ml-2">
                  <Heart size={16} />
                </button>
              </>
            )}
          </div>

          {/* Player controls */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-2">
              <button className="text-gray-400 hover:text-white">
                <Shuffle size={16} />
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={playPrevious}
              >
                <SkipBack size={20} />
              </button>
              <button
                className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause size={20} fill="black" />
                ) : (
                  <Play size={20} fill="black" />
                )}
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={playNext}
              >
                <SkipForward size={20} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Repeat size={16} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full flex items-center gap-3">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={currentTime}
                max={duration}
                onChange={(_, value) => seek(value)}
                sx={{
                  color: '#9c27b0',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0px 0px 0px 8px rgb(156 39 176 / 16%)',
                    },
                    '&.Mui-active': {
                      width: 12,
                      height: 12,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.5,
                    backgroundColor: '#4b5563',
                  },
                }}
              />
              <span className="text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume controls */}
          <div className="w-1/4 flex justify-end items-center gap-3">
            <Volume2 size={16} className="text-gray-400" />
            <Slider
              value={volume * 100}
              onChange={(_, value) => setVolume(value / 100)}
              sx={{
                color: '#9c27b0',
                width: 100,
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                },
                '& .MuiSlider-rail': {
                  opacity: 0.5,
                  backgroundColor: '#4b5563',
                },
              }}
            />
            <button className="text-gray-400 hover:text-white">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
