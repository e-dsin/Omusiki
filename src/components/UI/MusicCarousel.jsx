import React, { useState } from 'react';
import {
  Play,
  Heart,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Music,
  Clock,
  Star,
  Crown,
  Zap,
  ArrowRight,
} from 'lucide-react';

import { usePlayer } from '../../contexts/EnhancedPlayerContext';

const MusicCarousel = ({
  title,
  items = [],
  description = '',
  type = 'default',
  onChartClick = null,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  const { openPlayer } = usePlayer();

  const containerStyle = {
    marginBottom: '48px',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    padding: '0 40px',
  };

  const headerContentStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '8px',
    background: 'linear-gradient(45deg, #ffffff, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '1.5',
  };

  const navButtonStyle = {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const carouselContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
  };

  const carouselStyle = {
    display: 'flex',
    gap: '20px',
    padding: '0 40px',
    transform: `translateX(${scrollPosition}px)`,
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  const cardStyle = {
    minWidth: type === 'compact' ? '240px' : '300px',
    height: type === 'compact' ? '340px' : '450px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,0.1)',
    position: 'relative',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  };

  const imageContainerStyle = {
    position: 'relative',
    height: type === 'compact' ? '200px' : '270px',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const playButtonOverlayStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.3s ease',
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
  };

  const chartButtonOverlayStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #10B981, #059669)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.3s ease',
    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
  };

  const contentStyle = {
    padding: type === 'compact' ? '16px' : '20px',
    height: type === 'compact' ? '120px' : '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const cardTitleStyle = {
    fontSize: type === 'compact' ? '15px' : '17px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'Montserrat, sans-serif',
  };

  const artistStyle = {
    fontSize: type === 'compact' ? '13px' : '15px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'Montserrat, sans-serif',
  };

  const metaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
  };

  const actionsStyle = {
    display: 'flex',
    gap: '8px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  };

  const actionButtonStyle = {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  const typeIndicatorStyle = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const popularityIndicatorStyle = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(45deg, #F59E0B, #EAB308)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const countryFlagStyle = {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    fontSize: '20px',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  };

  const chartBadgeStyle = {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const scroll = direction => {
    const cardWidth = type === 'compact' ? 260 : 320; // largeur + gap
    const maxScroll = -(items.length * cardWidth - window.innerWidth + 320);

    if (direction === 'left') {
      setScrollPosition(Math.min(scrollPosition + cardWidth * 3, 0));
    } else {
      setScrollPosition(Math.max(scrollPosition - cardWidth * 3, maxScroll));
    }
  };

  const handlePlayClick = (item, e = null) => {
    if (e) {
      e.stopPropagation();
    }

    // Si c'est un chart et qu'on a un handler onChartClick, on navigue vers la sous-page
    if (item.type === 'chart' && onChartClick) {
      onChartClick(item);
      return;
    }

    if (
      item.type === 'playlist' ||
      item.type === 'chart' ||
      item.type === 'genre' ||
      item.type === 'album' ||
      item.type === 'discovery'
    ) {
      // Vérifier que la playlist existe et contient des chansons
      if (
        item.playlist &&
        Array.isArray(item.playlist) &&
        item.playlist.length > 0
      ) {
        openPlayer(item.playlist[0], item.playlist);
      } else {
        console.warn('Playlist vide ou non définie pour:', item.title);
        // Fallback: jouer la première chanson des items si disponible
        const fallbackSongs = items.filter(i => !i.type || i.type === 'song');
        if (fallbackSongs.length > 0) {
          openPlayer(fallbackSongs[0], fallbackSongs);
        }
      }
    } else {
      // Pour les chansons individuelles
      const songsOnly = items.filter(i => !i.type || i.type === 'song');
      openPlayer(item, songsOnly.length > 0 ? songsOnly : [item]);
    }
  };

  const getItemInfo = item => {
    if (
      item.type === 'playlist' ||
      item.type === 'chart' ||
      item.type === 'genre'
    ) {
      return {
        trackCount: item.tracks || item.playlist?.length || 0,
        duration: item.duration,
        type: item.type || 'playlist',
      };
    } else {
      return {
        trackCount: 1,
        duration: item.duration,
        type: 'song',
      };
    }
  };

  const getTypeIcon = type => {
    switch (type) {
      case 'playlist':
        return <Music size={12} />;
      case 'chart':
        return <Crown size={12} />;
      case 'genre':
        return <Zap size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  const getTypeColor = type => {
    switch (type) {
      case 'playlist':
        return 'rgba(139, 92, 246, 0.9)';
      case 'chart':
        return 'rgba(236, 72, 153, 0.9)';
      case 'genre':
        return 'rgba(16, 185, 129, 0.9)';
      default:
        return 'rgba(99, 102, 241, 0.9)';
    }
  };

  const getCountryFlag = country => {
    const flags = {
      Cameroon: '🇨🇲',
      Nigeria: '🇳🇬',
      'Ivory Coast': '🇨🇮',
      Congo: '🇨🇬',
      'South Africa': '🇿🇦',
      Ghana: '🇬🇭',
      Senegal: '🇸🇳',
      Kenya: '🇰🇪',
      Morocco: '🇲🇦',
      Egypt: '🇪🇬',
      Algeria: '🇩🇿',
      Tunisia: '🇹🇳',
      Libya: '🇱🇾',
      Tanzania: '🇹🇿',
      Uganda: '🇺🇬',
      Rwanda: '🇷🇼',
      Ethiopia: '🇪🇹',
      Mali: '🇲🇱',
      'Burkina Faso': '🇧🇫',
      Gabon: '🇬🇦',
      Chad: '🇹🇩',
      France: '🇫🇷',
      'United Kingdom': '🇬🇧',
      Germany: '🇩🇪',
      Netherlands: '🇳🇱',
      Japan: '🇯🇵',
      'South Korea': '🇰🇷',
      China: '🇨🇳',
      Thailand: '🇹🇭',
      India: '🇮🇳',
      Australia: '🇦🇺',
      Jamaica: '🇯🇲',
      Martinique: '🇲🇶',
      Trinidad: '🇹🇹',
      Antarctica: '🧊',
    };
    return flags[country] || '🌍';
  };

  const isPopular = item => {
    return item.streams && item.streams > 1000000;
  };

  const formatStreams = streams => {
    if (streams >= 1000000) {
      return `${(streams / 1000000).toFixed(1)}M`;
    } else if (streams >= 1000) {
      return `${Math.floor(streams / 1000)}K`;
    }
    return streams?.toString() || '0';
  };

  const isChart = item => {
    return item.type === 'chart';
  };

  if (!items || items.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <h2 style={titleStyle}>{title}</h2>
            {description && <p style={descriptionStyle}>{description}</p>}
          </div>
        </div>
        <div
          style={{
            padding: '60px 40px',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          <Music size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
          <div>Aucun contenu disponible pour le moment</div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <h2 style={titleStyle}>{title}</h2>
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={navButtonStyle}
            onClick={() => scroll('left')}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(139, 92, 246, 0.3)';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            style={navButtonStyle}
            onClick={() => scroll('right')}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(139, 92, 246, 0.3)';
              e.target.style.transform = 'scale(1.1)';
              e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div style={carouselContainerStyle}>
        <div style={carouselStyle}>
          {items.map(item => {
            const itemInfo = getItemInfo(item);

            return (
              <div
                key={item.id}
                style={cardStyle}
                onClick={() => {
                  // Si c'est un chart et qu'on a un handler onChartClick, on navigue vers la sous-page
                  if (item.type === 'chart' && onChartClick) {
                    onChartClick(item);
                  } else {
                    handlePlayClick(item);
                  }
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseOver={e => {
                  if (hoveredItem === item.id) {
                    e.currentTarget.style.transform =
                      'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.boxShadow =
                      '0 20px 64px rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.zIndex = '10';

                    // Effet sur l'image
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 32px rgba(0,0,0,0.1)';
                  e.currentTarget.style.zIndex = '1';

                  // Reset image
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Indicateur de popularité */}
                {isPopular(item) && (
                  <div style={popularityIndicatorStyle}>
                    <Star size={10} fill="white" />
                    HOT
                  </div>
                )}

                {/* Indicateur de type */}
                <div
                  style={{
                    ...typeIndicatorStyle,
                    background: getTypeColor(itemInfo.type),
                  }}
                >
                  {getTypeIcon(itemInfo.type)}
                  {itemInfo.type === 'song'
                    ? 'TRACK'
                    : itemInfo.type.toUpperCase()}
                </div>

                {/* Drapeau du pays */}
                {item.country && (
                  <div style={countryFlagStyle}>
                    {getCountryFlag(item.country)}
                  </div>
                )}

                {/* Badge spécial pour les charts */}
                {isChart(item) && (
                  <div style={chartBadgeStyle}>
                    <ArrowRight size={10} />
                    EXPLORE
                  </div>
                )}

                <div style={imageContainerStyle}>
                  <img src={item.cover} alt={item.title} style={imageStyle} />
                  <div
                    style={{
                      ...overlayStyle,
                      opacity: hoveredItem === item.id ? 1 : 0,
                    }}
                  >
                    {/* Bouton différent selon le type */}
                    {isChart(item) && onChartClick ? (
                      <button
                        style={chartButtonOverlayStyle}
                        onClick={e => {
                          e.stopPropagation();
                          onChartClick(item);
                        }}
                        onMouseEnter={e => {
                          e.target.style.transform = 'scale(1.1)';
                          e.target.style.boxShadow =
                            '0 12px 40px rgba(16, 185, 129, 0.6)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow =
                            '0 8px 32px rgba(16, 185, 129, 0.4)';
                        }}
                      >
                        <ArrowRight size={24} color="white" />
                      </button>
                    ) : (
                      <button
                        style={playButtonOverlayStyle}
                        onClick={e => handlePlayClick(item, e)}
                        onMouseEnter={e => {
                          e.target.style.transform = 'scale(1.1)';
                          e.target.style.boxShadow =
                            '0 12px 40px rgba(139, 92, 246, 0.6)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow =
                            '0 8px 32px rgba(139, 92, 246, 0.4)';
                        }}
                      >
                        <Play size={24} fill="white" color="white" />
                      </button>
                    )}
                  </div>
                </div>

                <div style={contentStyle}>
                  <div>
                    <h3 style={cardTitleStyle}>{item.title}</h3>
                    <p style={artistStyle}>{item.artist}</p>
                  </div>

                  <div style={metaStyle}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>
                        {itemInfo.trackCount}{' '}
                        {itemInfo.trackCount > 1 ? 'titres' : 'titre'}
                      </span>
                      {item.streams && (
                        <span
                          style={{
                            color: 'rgba(245, 158, 11, 1)',
                            fontWeight: '600',
                            fontSize: '11px',
                          }}
                        >
                          {formatStreams(item.streams)} ▸
                        </span>
                      )}
                      {isChart(item) && (
                        <span
                          style={{
                            color: 'rgba(16, 185, 129, 1)',
                            fontWeight: '600',
                            fontSize: '11px',
                          }}
                        >
                          CHART
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        ...actionsStyle,
                        opacity: hoveredItem === item.id ? 1 : 0,
                      }}
                    >
                      <button
                        style={actionButtonStyle}
                        title="Ajouter aux favoris"
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(236, 72, 153, 0.3)';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        <Heart size={16} />
                      </button>
                      <button
                        style={actionButtonStyle}
                        title="Ajouter à la playlist"
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(139, 92, 246, 0.3)';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        style={actionButtonStyle}
                        title="Plus d'options"
                        onMouseEnter={e => {
                          e.target.style.background = 'rgba(16, 185, 129, 0.3)';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicCarousel;
