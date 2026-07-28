// Créez ce nouveau composant : components/UI/AlbumCard.jsx

import React from 'react';
import { Play, Music, Clock, Users } from 'lucide-react';
import { usePlayer } from '../../contexts/EnhancedPlayerContext';

const AlbumCard = ({ album, featured = false }) => {
  const { openPlayer, isPlaying, currentSong } = usePlayer();

  const handlePlay = () => {
    if (album.playlist && album.playlist.length > 0) {
      // Utiliser openPlayer avec la première chanson de l'album et la playlist complète
      openPlayer(album.playlist[0], album.playlist);
    }
  };

  const isCurrentAlbum =
    currentSong && album.playlist?.some(song => song.id === currentSong.id);

  const cardStyle = {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: featured
      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
      : 'rgba(255, 255, 255, 0.05)',
    border: featured
      ? '2px solid rgba(139, 92, 246, 0.3)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    width: featured ? '320px' : '280px',
    height: featured ? '400px' : '360px',
    transform: 'scale(1)',
  };

  const coverStyle = {
    width: '100%',
    height: featured ? '240px' : '200px',
    objectFit: 'cover',
    borderRadius: '12px 12px 0 0',
  };

  const contentStyle = {
    padding: featured ? '24px 20px' : '20px 16px',
    color: 'white',
  };

  const titleStyle = {
    fontSize: featured ? '20px' : '18px',
    fontWeight: '700',
    marginBottom: '8px',
    lineHeight: '1.2',
    background: featured
      ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
      : 'white',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: featured ? 'transparent' : 'white',
    backgroundClip: 'text',
  };

  const artistStyle = {
    fontSize: featured ? '14px' : '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const statsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '16px',
  };

  const playButtonStyle = {
    position: 'absolute',
    top: featured ? '200px' : '160px',
    right: '16px',
    width: featured ? '56px' : '48px',
    height: featured ? '56px' : '48px',
    borderRadius: '50%',
    background:
      isCurrentAlbum && isPlaying
        ? 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)'
        : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    transform: 'scale(1)',
  };

  const featuredBadgeStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <div
      style={cardStyle}
      onClick={handlePlay}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {featured && <div style={featuredBadgeStyle}>✨ Nouveauté</div>}

      <img src={album.cover} alt={album.title} style={coverStyle} />

      <button
        style={playButtonStyle}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onClick={e => {
          e.stopPropagation();
          handlePlay();
        }}
      >
        <Play
          size={featured ? 24 : 20}
          fill="white"
          color="white"
          style={{ marginLeft: '2px' }}
        />
      </button>

      <div style={contentStyle}>
        <h3 style={titleStyle}>{album.title}</h3>

        <div style={artistStyle}>
          <Users size={12} />
          {album.artist}
        </div>

        <div style={statsStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Music size={12} />
            {album.tracks} titres
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            {album.duration}
          </div>
        </div>

        {featured && (
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.4',
              fontStyle: 'italic',
            }}
          >
            {album.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
