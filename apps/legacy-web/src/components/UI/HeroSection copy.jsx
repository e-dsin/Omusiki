import React, { useState, useEffect } from 'react';
import { Play, Plus, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlayer } from '../../contexts/EnhancedPlayerContext';

const HeroSection = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  // Artistes vedettes avec Charlotte Dipanda et Burna Boy - données simulées
  const featuredSongs = [
    {
      id: 'bebell_makossa_001',
      title: 'Diba la Bobe',
      artist: 'Bebell',
      album: 'Diba la Bobe',
      genre: 'makossa',
      country: 'Cameroon',
      year: 2024,
      duration: 198,
      cover: '/biblio/images/Bebell_3.jpg',
      description:
        'Fusion makossa moderne avec des influences jazz par la reine de la musique camerounaise',
      streams: 720000,
      likes: 35000,
    },
    {
      id: 'nga_afrobeats_001',
      title: 'Lagos Nights',
      artist: 'Burna Boy',
      album: 'African Giant',
      genre: 'afrobeats',
      country: 'Nigeria',
      year: 2024,
      duration: 203,
      cover: '/biblio/images/free-images-audio_5.jpg',
      description: 'Son afrobeats authentique de Lagos par le géant africain',
      streams: 4500000,
      likes: 225000,
    },
    {
      id: 'cmr_hit_001',
      title: 'Lion Indomptable',
      artist: 'Franko',
      album: 'National Pride',
      genre: 'afropop',
      country: 'Cameroon',
      year: 2024,
      duration: 203,
      cover:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      description: 'Hymne moderne du Cameroun qui célèbre la fierté nationale',
      streams: 2100000,
      likes: 105000,
    },
    {
      id: 'nga_afrobeats_002',
      title: 'Abuja Flow',
      artist: 'Wizkid',
      album: 'Made in Lagos',
      genre: 'afrobeats',
      country: 'Nigeria',
      year: 2023,
      duration: 189,
      cover:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      description: 'Vibes de la capitale nigériane par la superstar Wizkid',
      streams: 3800000,
      likes: 190000,
    },
  ];

  useEffect(() => {
    // Rotation automatique toutes les 7 secondes
    const interval = setInterval(() => {
      setCurrentFeaturedIndex(prev =>
        prev >= featuredSongs.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [featuredSongs.length]);

  const currentSong = featuredSongs[currentFeaturedIndex];

  const nextSlide = () => {
    setCurrentFeaturedIndex(prev =>
      prev >= featuredSongs.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentFeaturedIndex(prev =>
      prev <= 0 ? featuredSongs.length - 1 : prev - 1
    );
  };

  const heroContainerStyle = {
    position: 'relative',
    height: '80vh',
    minHeight: '500px',
    background:
      'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const backgroundImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("${currentSong?.cover}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.4,
    filter: 'blur(1px)',
    transition: 'all 0.8s ease-in-out',
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '700px',
    padding: '0 40px',
    color: 'white',
  };

  const artistImageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid rgba(255,255,255,0.3)',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px',
    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '16px',
    textShadow: '2px 4px 8px rgba(0,0,0,0.7)',
    background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: 'Montserrat, sans-serif',
  };

  const artistNameStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '20px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const descriptionStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '32px',
    color: 'rgba(255,255,255,0.9)',
    textShadow: '1px 2px 4px rgba(0,0,0,0.8)',
    maxWidth: '500px',
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '24px',
  };

  const playButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const secondaryButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const infoContainerStyle = {
    display: 'flex',
    gap: '32px',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    flexWrap: 'wrap',
  };

  const infoItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const navigationStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  const dotsContainerStyle = {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px',
    zIndex: 10,
  };

  const dotStyle = isActive => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: isActive
      ? 'linear-gradient(45deg, #8B5CF6, #EC4899)'
      : 'rgba(255,255,255,0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 16px rgba(139, 92, 246, 0.4)' : 'none',
  });

  const { openPlayer } = usePlayer();

  const handlePlayClick = () => {
    if (currentSong) {
      openPlayer(currentSong, featuredSongs);
    }
  };

  const handleAddToPlaylist = () => {
    console.log('Ajouter a la playlist:', currentSong?.title);
  };

  const handleMoreInfo = () => {
    console.log('Plus d infos sur:', currentSong?.title);
  };

  const formatStreams = streams => {
    if (streams >= 1000000) {
      return `${(streams / 1000000).toFixed(1)}M`;
    } else if (streams >= 1000) {
      return `${Math.floor(streams / 1000)}K`;
    }
    return streams?.toString() || '0';
  };

  const getCountryFlag = country => {
    const flags = {
      Cameroon: '🇨🇲',
      Nigeria: '🇳🇬',
      'Ivory Coast': '🇨🇮',
      Congo: '🇨🇬',
      'South Africa': '🇿🇦',
      Ghana: '🇬🇭',
    };
    return flags[country] || '🌍';
  };

  return (
    <div style={heroContainerStyle}>
      <div style={backgroundImageStyle}></div>
      <div style={gradientOverlayStyle}></div>

      {/* Navigation précédente */}
      <button
        style={{ ...navigationStyle, left: '40px' }}
        onClick={prevSlide}
        onMouseEnter={e => {
          e.target.style.background = 'rgba(255,255,255,0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={e => {
          e.target.style.background = 'rgba(255,255,255,0.1)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Navigation suivante */}
      <button
        style={{ ...navigationStyle, right: '40px' }}
        onClick={nextSlide}
        onMouseEnter={e => {
          e.target.style.background = 'rgba(255,255,255,0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={e => {
          e.target.style.background = 'rgba(255,255,255,0.1)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronRight size={24} />
      </button>

      <div style={contentStyle}>
        {/* Image de l'artiste */}
        <img
          src={currentSong?.cover}
          alt={currentSong?.artist}
          style={artistImageStyle}
        />

        <span style={badgeStyle}>
          <span style={{ fontSize: '16px' }}>
            {getCountryFlag(currentSong?.country)}
          </span>
          🔥 Artiste Vedette • {currentSong?.genre?.toUpperCase()}
        </span>

        <h1 style={titleStyle}>{currentSong?.title || 'Titre Inconnu'}</h1>

        <div style={artistNameStyle}>
          par {currentSong?.artist || 'Artiste Inconnu'}
        </div>

        <p style={descriptionStyle}>{currentSong?.description}</p>

        <div style={buttonsContainerStyle}>
          <button
            style={playButtonStyle}
            onClick={handlePlayClick}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Play size={20} fill="white" />
            Écouter maintenant
          </button>

          <button
            style={secondaryButtonStyle}
            onClick={handleAddToPlaylist}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Plus size={20} />
            Ma playlist
          </button>

          <button
            style={secondaryButtonStyle}
            onClick={handleMoreInfo}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Info size={20} />
            More info
          </button>
        </div>

        <div style={infoContainerStyle}>
          <div style={infoItemStyle}>
            <span>🎵</span>
            <span>Album: {currentSong?.album}</span>
          </div>
          <div style={infoItemStyle}>
            <span>⏱️</span>
            <span>
              {Math.floor(currentSong?.duration / 60 || 3)}min{' '}
              {currentSong?.duration % 60 || 24}s
            </span>
          </div>
          <div style={infoItemStyle}>
            <span>{getCountryFlag(currentSong?.country)}</span>
            <span>{currentSong?.country}</span>
          </div>
          <div style={infoItemStyle}>
            <span>🔥</span>
            <span>{formatStreams(currentSong?.streams)} écoutes</span>
          </div>
          <div style={infoItemStyle}>
            <span>💖</span>
            <span>{formatStreams(currentSong?.likes)} I like</span>
          </div>
          <div style={infoItemStyle}>
            <span>📅</span>
            <span>{currentSong?.year}</span>
          </div>
        </div>
      </div>

      {/* Indicateurs de navigation */}
      <div style={dotsContainerStyle}>
        {featuredSongs.map((_, index) => (
          <div
            key={index}
            style={dotStyle(index === currentFeaturedIndex)}
            onClick={() => setCurrentFeaturedIndex(index)}
            onMouseEnter={e => {
              if (index !== currentFeaturedIndex) {
                e.target.style.background = 'rgba(255,255,255,0.5)';
              }
            }}
            onMouseLeave={e => {
              if (index !== currentFeaturedIndex) {
                e.target.style.background = 'rgba(255,255,255,0.3)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
