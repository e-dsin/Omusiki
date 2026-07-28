import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Plus,
  Info,
  ChevronLeft,
  ChevronRight,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { usePlayer } from '../../contexts/EnhancedPlayerContext';

const HeroSection = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  // Données étendues avec vidéos courtes (5s) et grandes images
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
      type: 'image',
      cover: '/biblio/images/Bebell_3.jpg',
      description:
        'Fusion makossa moderne avec des influences jazz par Bebell - Découvrez le son exclusif',
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
      type: 'large-image',
      cover: '/biblio/images/HeroIcons_3.jpg', // Grande image haute résolution
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
      type: 'video',
      cover:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop',
      videoUrl: '/biblio/videos/free-videos_1.mp4', // Vidéo de 5 secondes
      videoDuration: 7,
      description:
        'Hymne moderne du Cameroun - Regardez le clip officiel qui célèbre la fierté nationale',
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
      type: 'large-image',
      cover: '/biblio/images/HeroIcons_4.jpg',
      description: 'Vibes de la capitale nigériane par la superstar Wizkid',
      streams: 3800000,
      likes: 190000,
    },
    {
      id: 'eur_001',
      title: 'Paris African Quarter',
      artist: 'Manu Chao',
      album: 'Clandestino 2.0',
      genre: 'world-fusion',
      country: 'France',
      year: 2023,
      duration: 189,
      type: 'video',
      cover: '/biblio/images/free-images-audio_3.jpg',
      videoUrl: '/biblio/videos/free-videos_2.mp4', // Vidéo de 5 secondes
      videoDuration: 7,
      description: 'Sweet jazz - soul de la capitale du monde',
      streams: 3800000,
      likes: 190000,
    },
  ];

  const currentSong = featuredSongs[currentFeaturedIndex];

  // Rotation automatique avec timing adaptatif
  useEffect(() => {
    const isVideo = currentSong?.type === 'video';
    const intervalDuration = isVideo ? 7000 : 5000; // 5s pour vidéos, 7s pour images

    const interval = setInterval(() => {
      setCurrentFeaturedIndex(prev =>
        prev >= featuredSongs.length - 1 ? 0 : prev + 1
      );
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [currentFeaturedIndex, currentSong?.type, featuredSongs.length]);

  // Gestion automatique de la vidéo
  useEffect(() => {
    if (currentSong?.type === 'video' && videoRef.current) {
      const video = videoRef.current;

      // Réinitialiser la vidéo au début
      video.currentTime = 0;
      video.muted = isVideoMuted;

      // Lancer automatiquement la vidéo
      const playVideo = async () => {
        try {
          await video.play();
          setIsVideoPlaying(true);
          console.log('Vidéo lancée automatiquement');
        } catch (error) {
          console.warn('Autoplay bloqué par le navigateur:', error);
          // Fallback: la vidéo sera jouée manuellement
          setIsVideoPlaying(false);
        }
      };

      // Petit délai pour s'assurer que la vidéo est chargée
      const playTimeout = setTimeout(playVideo, 100);

      return () => clearTimeout(playTimeout);
    } else {
      // Si ce n'est pas une vidéo, s'assurer que isVideoPlaying est false
      setIsVideoPlaying(false);
    }
  }, [currentFeaturedIndex, isVideoMuted]);

  // Gestionnaire de fin de vidéo pour passer automatiquement à la suite
  useEffect(() => {
    if (currentSong?.type === 'video' && videoRef.current) {
      const video = videoRef.current;

      const handleVideoEnd = () => {
        console.log('Vidéo terminée, passage à la diapo suivante');
        setVideoProgress(0);
        setCurrentFeaturedIndex(prev =>
          prev >= featuredSongs.length - 1 ? 0 : prev + 1
        );
      };

      const handleTimeUpdate = () => {
        if (video.duration > 0) {
          const progress = (video.currentTime / video.duration) * 100;
          setVideoProgress(progress);
        }
      };

      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentFeaturedIndex, featuredSongs.length]);

  const toggleVideoPlay = () => {
    if (currentSong?.type === 'video') {
      setIsVideoPlaying(prev => !prev);
    }
  };

  const toggleVideoMute = () => {
    setIsVideoMuted(prev => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
    }
  };

  const nextSlide = () => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setCurrentFeaturedIndex(prev =>
      prev >= featuredSongs.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setCurrentFeaturedIndex(prev =>
      prev <= 0 ? featuredSongs.length - 1 : prev - 1
    );
  };

  // Styles
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

  const backgroundMediaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    opacity: currentSong?.type === 'large-image' ? 0.6 : 0.4,
    filter: currentSong?.type === 'large-image' ? 'blur(0.5px)' : 'blur(1px)',
    transition: 'all 0.8s ease-in-out',
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      currentSong?.type === 'video'
        ? 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)'
        : 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '700px',
    padding: '0 40px',
    color: 'white',
  };

  const artistImageStyle = {
    width: currentSong?.type === 'large-image' ? '150px' : '120px',
    height: currentSong?.type === 'large-image' ? '150px' : '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid rgba(255,255,255,0.3)',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    transition: 'all 0.3s ease',
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background:
      currentSong?.type === 'video'
        ? 'linear-gradient(45deg, #DC2626, #EF4444)'
        : 'linear-gradient(45deg, #8B5CF6, #EC4899)',
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

  const videoControlsStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '40px',
    display: 'flex',
    gap: '12px',
    zIndex: 5,
  };

  const videoControlButtonStyle = {
    background: 'rgba(0,0,0,0.7)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  const titleStyle = {
    fontSize: currentSong?.type === 'large-image' ? '4rem' : '3.5rem',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '16px',
    textShadow: '2px 4px 8px rgba(0,0,0,0.7)',
    background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'font-size 0.3s ease',
  };

  // Autres styles restent identiques...
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

  const videoButtonStyle = {
    ...secondaryButtonStyle,
    background:
      currentSong?.type === 'video'
        ? 'linear-gradient(45deg, #DC2626, #EF4444)'
        : secondaryButtonStyle.background,
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

  const dotStyle = (isActive, itemType) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: isActive
      ? itemType === 'video'
        ? 'linear-gradient(45deg, #DC2626, #EF4444)'
        : 'linear-gradient(45deg, #8B5CF6, #EC4899)'
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

  const getTypeIcon = type => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'large-image':
        return '🖼️';
      default:
        return '🔥';
    }
  };

  const getTypeLabel = type => {
    switch (type) {
      case 'video':
        return 'CLIP EXCLUSIF';
      case 'large-image':
        return 'GRANDE GALERIE';
      default:
        return 'ARTISTE VEDETTE';
    }
  };

  return (
    <div style={heroContainerStyle}>
      {/* Media de fond (image ou vidéo) */}
      {currentSong?.type === 'video' && currentSong?.videoUrl ? (
        <video
          ref={videoRef}
          style={backgroundMediaStyle}
          muted={isVideoMuted}
          autoPlay // Autoplay activé
          playsInline
          preload="auto" // Chargement anticipé pour un démarrage fluide
          onLoadedData={() => console.log('Vidéo chargée et prête')}
          onPlay={() => {
            console.log('Vidéo en cours de lecture');
            setIsVideoPlaying(true);
          }}
          onPause={() => {
            console.log('Vidéo en pause');
            setIsVideoPlaying(false);
          }}
          onError={e => {
            console.error('Erreur de chargement vidéo:', e);
            // Fallback vers l'image si la vidéo échoue
          }}
        >
          <source src={currentSong.videoUrl} type="video/mp4" />
          <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>
        </video>
      ) : (
        <img
          src={currentSong?.cover}
          alt={currentSong?.title}
          style={backgroundMediaStyle}
        />
      )}

      <div style={gradientOverlayStyle}></div>

      {/* Contrôles vidéo */}
      {currentSong?.type === 'video' && (
        <>
          <div style={videoControlsStyle}>
            <button
              style={videoControlButtonStyle}
              onClick={toggleVideoPlay}
              title={isVideoPlaying ? 'Pause' : 'Play'}
            >
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              style={videoControlButtonStyle}
              onClick={toggleVideoMute}
              title={isVideoMuted ? 'Unmute' : 'Mute'}
            >
              {isVideoMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Barre de progression de la vidéo */}
          {isVideoPlaying && (
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                left: '40px',
                right: '40px',
                height: '3px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '2px',
                zIndex: 5,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${videoProgress}%`,
                  background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                  borderRadius: '2px',
                  transition: 'width 0.1s ease',
                }}
              />
            </div>
          )}
        </>
      )}

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
          {getTypeIcon(currentSong?.type)} {getTypeLabel(currentSong?.type)} •{' '}
          {currentSong?.genre?.toUpperCase()}
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

          {currentSong?.type === 'video' && (
            <button
              style={videoButtonStyle}
              onClick={toggleVideoPlay}
              onMouseEnter={e => {
                e.target.style.background =
                  'linear-gradient(45deg, #EF4444, #F87171)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.target.style.background =
                  'linear-gradient(45deg, #DC2626, #EF4444)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isVideoPlaying ? 'Pause clip' : 'Relancer clip'}
            </button>
          )}

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
            Plus d&apos;infos
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
            <span>{formatStreams(currentSong?.likes)} J&apos;aime</span>
          </div>
          <div style={infoItemStyle}>
            <span>📅</span>
            <span>{currentSong?.year}</span>
          </div>
          {currentSong?.type === 'video' && (
            <div style={infoItemStyle}>
              <span>🎬</span>
              <span>Clip officiel</span>
            </div>
          )}
        </div>
      </div>

      {/* Indicateurs de navigation */}
      <div style={dotsContainerStyle}>
        {featuredSongs.map((item, index) => (
          <div
            key={index}
            style={dotStyle(index === currentFeaturedIndex, item.type)}
            onClick={() => {
              setIsVideoPlaying(false);
              setCurrentFeaturedIndex(index);
            }}
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
