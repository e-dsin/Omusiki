import React from 'react';
import { Music } from 'lucide-react';

const GenreCard = ({ genre, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl h-40 cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${genre.color} shadow-lg`}
    >
      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors">
        <div className="p-6 h-full flex flex-col justify-between">
          <Music className="w-8 h-8 text-white/80" />
          <h3
            className="text-white font-bold text-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {genre.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
