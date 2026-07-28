import React from 'react';
import { Play, Pause } from 'lucide-react';

const SongRow = ({ song, onPlay, isPlaying }) => {
  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer group"
      onClick={() => onPlay(song)}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <div className="flex-1">
        <h4
          className="font-semibold text-gray-900"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {song.title}
        </h4>
        <p className="text-sm text-gray-600">{song.artist}</p>
      </div>
      <div className="text-sm text-gray-500">
        {formatDuration(song.duration)}
      </div>
    </div>
  );
};

export default SongRow;
