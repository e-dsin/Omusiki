import React, { useState, useEffect } from 'react';
import {
  Music,
  Users,
  Globe,
  Headphones,
  TrendingUp,
  Heart,
  Clock,
  Radio,
  Star,
  Crown,
  Award,
} from 'lucide-react';

// Importation de la base de données depuis le service
import { MUSIC_DATABASE } from '../../services/musicDatabase';

const QuickStats = () => {
  const [stats, setStats] = useState({
    totalSongs: 0,
    totalArtists: 0,
    totalCountries: 0,
    totalStreams: 0,
    totalDuration: 0,
    activeListeners: 0,
    newReleases: 0,
    topGenre: '',
    topArtist: '',
    topCountry: '',
    totalLikes: 0,
    avgDuration: 0,
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalSongs: 0,
    totalArtists: 0,
    totalCountries: 0,
    totalStreams: 0,
    totalLikes: 0,
    activeListeners: 0,
  });

  const [topGenres, setTopGenres] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topCountries, setTopCountries] = useState([]);

  useEffect(() => {
    // Analytics personnalisées
    const getTopGenres = (limit = 5) => {
      const genreCounts = {};
      MUSIC_DATABASE.forEach(song => {
        genreCounts[song.genre] = (genreCounts[song.genre] || 0) + song.streams;
      });
      return Object.entries(genreCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([genre, streams]) => ({ genre, streams }));
    };

    const getTopArtists = (limit = 5) => {
      const artistCounts = {};
      MUSIC_DATABASE.forEach(song => {
        if (!artistCounts[song.artist]) {
          artistCounts[song.artist] = { streams: 0, songs: 0, likes: 0 };
        }
        artistCounts[song.artist].streams += song.streams;
        artistCounts[song.artist].songs += 1;
        artistCounts[song.artist].likes += song.likes;
      });
      return Object.entries(artistCounts)
        .sort(([, a], [, b]) => b.streams - a.streams)
        .slice(0, limit)
        .map(([artist, data]) => ({ artist, ...data }));
    };

    const getTopCountries = (limit = 5) => {
      const countryCounts = {};
      MUSIC_DATABASE.forEach(song => {
        countryCounts[song.country] =
          (countryCounts[song.country] || 0) + song.streams;
      });
      return Object.entries(countryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([country, streams]) => ({ country, streams }));
    };

    // Calculer les statistiques enrichies de la base de données
    const calculateStats = () => {
      const uniqueArtists = [
        ...new Set(MUSIC_DATABASE.map(song => song.artist)),
      ];
      const uniqueCountries = [
        ...new Set(MUSIC_DATABASE.map(song => song.country)),
      ];
      const totalStreams = MUSIC_DATABASE.reduce(
        (sum, song) => sum + song.streams,
        0
      );
      const totalLikes = MUSIC_DATABASE.reduce(
        (sum, song) => sum + song.likes,
        0
      );
      const totalDuration = MUSIC_DATABASE.reduce(
        (sum, song) => sum + song.duration,
        0
      );
      const newReleases = MUSIC_DATABASE.filter(
        song => song.year >= 2023
      ).length;
      const avgDuration = Math.round(totalDuration / MUSIC_DATABASE.length);

      // Analytics avancées
      const genreAnalytics = getTopGenres(1);
      const artistAnalytics = getTopArtists(1);
      const countryAnalytics = getTopCountries(1);

      // Top listes pour affichage
      const topGenresList = getTopGenres(5);
      const topArtistsList = getTopArtists(5);
      const topCountriesList = getTopCountries(5);

      return {
        totalSongs: MUSIC_DATABASE.length,
        totalArtists: uniqueArtists.length,
        totalCountries: uniqueCountries.length,
        totalStreams,
        totalLikes,
        totalDuration,
        avgDuration,
        activeListeners: Math.floor(Math.random() * 15000) + 20000, // Simulé mais plus réaliste
        newReleases,
        topGenre: genreAnalytics[0]?.genre || 'afrobeats',
        topArtist: artistAnalytics[0]?.artist || 'Burna Boy',
        topCountry: countryAnalytics[0]?.country || 'Nigeria',
        topGenresList,
        topArtistsList,
        topCountriesList,
      };
    };

    const newStats = calculateStats();
    setStats(newStats);
    setTopGenres(newStats.topGenresList);
    setTopArtists(newStats.topArtistsList);
    setTopCountries(newStats.topCountriesList);

    // Animation des chiffres avec courbe plus fluide
    const animateCounters = () => {
      const duration = 2500; // 2.5 secondes
      const steps = 100;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Courbe d'animation plus sophistiquée
        const easeOut = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          totalSongs: Math.floor(newStats.totalSongs * easeOut),
          totalArtists: Math.floor(newStats.totalArtists * easeOut),
          totalCountries: Math.floor(newStats.totalCountries * easeOut),
          totalStreams: Math.floor(newStats.totalStreams * easeOut),
          totalLikes: Math.floor(newStats.totalLikes * easeOut),
          activeListeners: Math.floor(newStats.activeListeners * easeOut),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    setTimeout(animateCounters, 300);
  }, []);

  const containerStyle = {
    padding: '40px',
    marginBottom: '32px',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '800',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '12px',
    background: 'linear-gradient(45deg, #ffffff, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '1.6',
  };

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1400px',
    margin: '0 auto 40px auto',
  };

  const statCardStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  };

  const statIconStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 2,
  };

  const statValueStyle = {
    fontSize: '36px',
    fontWeight: '800',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '8px',
    lineHeight: '1',
    position: 'relative',
    zIndex: 2,
  };

  const statLabelStyle = {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
    position: 'relative',
    zIndex: 2,
  };

  const backgroundEffectStyle = {
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    opacity: 0.1,
    transform: 'rotate(12deg)',
    pointerEvents: 'none',
    fontSize: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const topListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const topListCardStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const topListTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const topListItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  };

  const topListItemInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  };

  const topListRankStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Montserrat, sans-serif',
    minWidth: '24px',
  };

  const topListNameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
  };

  const topListValueStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const formatNumber = num => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toLocaleString();
  };

  const formatSeconds = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
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
      Mali: '🇲🇱',
      Ethiopia: '🇪🇹',
      Tanzania: '🇹🇿',
      Uganda: '🇺🇬',
      Rwanda: '🇷🇼',
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

  const statsData = [
    {
      icon: Music,
      value: animatedStats.totalSongs,
      label: 'Titres disponibles',
      gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      color: '#8B5CF6',
      bgEffect: '🎵',
    },
    {
      icon: Users,
      value: animatedStats.totalArtists,
      label: 'Artistes africains',
      gradient: 'linear-gradient(135deg, #EC4899, #DB2777)',
      color: '#EC4899',
      bgEffect: '👨‍🎤',
    },
    {
      icon: Globe,
      value: animatedStats.totalCountries,
      label: 'Pays représentés',
      gradient: 'linear-gradient(135deg, #10B981, #059669)',
      color: '#10B981',
      bgEffect: '🌍',
    },
    {
      icon: Headphones,
      value: formatNumber(animatedStats.totalStreams),
      label: 'Écoutes totales',
      gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
      color: '#F59E0B',
      bgEffect: '🎧',
    },
    {
      icon: Heart,
      value: formatNumber(animatedStats.totalLikes),
      label: "J'aime totaux",
      gradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
      color: '#EF4444',
      bgEffect: '❤️',
    },
    {
      icon: Radio,
      value: animatedStats.activeListeners,
      label: 'Auditeurs en ligne',
      gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)',
      color: '#6366F1',
      isLive: true,
      bgEffect: '📻',
    },
    {
      icon: TrendingUp,
      value: stats.newReleases,
      label: 'Sorties 2023-2024',
      gradient: 'linear-gradient(135deg, #14B8A6, #0D9488)',
      color: '#14B8A6',
      bgEffect: '📈',
    },
    {
      icon: Clock,
      value: formatSeconds(stats.avgDuration),
      label: 'Durée moyenne',
      gradient: 'linear-gradient(135deg, #F97316, #EA580C)',
      color: '#F97316',
      isText: true,
      bgEffect: '⏱️',
    },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>OMusiki en Chiffres</h2>
        <p style={subtitleStyle}>
          La plus grande plateforme de musique africaine
          <br />
          <span style={{ fontSize: '16px', opacity: 0.8 }}>
            Données en temps réel • Plus de {formatNumber(stats.totalStreams)}{' '}
            écoutes
          </span>
        </p>
      </div>

      {/* Statistiques principales */}
      <div style={mainGridStyle}>
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <div
              key={index}
              style={statCardStyle}
              onMouseEnter={e => {
                e.currentTarget.style.transform =
                  'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 25px 50px ${stat.color}40`;
                e.currentTarget.style.borderColor = `${stat.color}60`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {/* Effet de fond */}
              <div style={backgroundEffectStyle}>{stat.bgEffect}</div>

              <div
                style={{
                  ...statIconStyle,
                  background: stat.gradient,
                  position: 'relative',
                }}
              >
                <IconComponent size={28} color="white" />
                {stat.isLive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '16px',
                      height: '16px',
                      background: '#10B981',
                      borderRadius: '50%',
                      border: '3px solid white',
                      animation: 'pulse 2s infinite',
                    }}
                  />
                )}
              </div>

              <div style={statValueStyle}>
                {stat.isText
                  ? stat.value
                  : typeof stat.value === 'string'
                  ? stat.value
                  : stat.value.toLocaleString()}
                {stat.isLive && (
                  <span
                    style={{
                      fontSize: '14px',
                      background: '#10B981',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      marginLeft: '12px',
                      fontWeight: '600',
                    }}
                  >
                    LIVE
                  </span>
                )}
              </div>

              <div style={statLabelStyle}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Top listes */}
      <div style={topListStyle}>
        {/* Top Genres */}
        <div style={topListCardStyle}>
          <h3 style={topListTitleStyle}>
            <Star size={24} color="#F59E0B" />
            Top Genres
          </h3>
          {topGenres.map((item, index) => (
            <div key={item.genre} style={topListItemStyle}>
              <div style={topListItemInfoStyle}>
                <span style={topListRankStyle}>#{index + 1}</span>
                <span style={topListNameStyle}>
                  {item.genre.charAt(0).toUpperCase() + item.genre.slice(1)}
                </span>
              </div>
              <span style={topListValueStyle}>
                {formatNumber(item.streams)} écoutes
              </span>
            </div>
          ))}
        </div>

        {/* Top Artistes */}
        <div style={topListCardStyle}>
          <h3 style={topListTitleStyle}>
            <Crown size={24} color="#EC4899" />
            Top Artistes
          </h3>
          {topArtists.map((item, index) => (
            <div key={item.artist} style={topListItemStyle}>
              <div style={topListItemInfoStyle}>
                <span style={topListRankStyle}>#{index + 1}</span>
                <span style={topListNameStyle}>{item.artist}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={topListValueStyle}>
                  {formatNumber(item.streams)} écoutes
                </div>
                <div
                  style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}
                >
                  {item.songs} titre{item.songs > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Pays */}
        <div style={topListCardStyle}>
          <h3 style={topListTitleStyle}>
            <Award size={24} color="#10B981" />
            Top Pays
          </h3>
          {topCountries.map((item, index) => (
            <div key={item.country} style={topListItemStyle}>
              <div style={topListItemInfoStyle}>
                <span style={topListRankStyle}>#{index + 1}</span>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>
                  {getCountryFlag(item.country)}
                </span>
                <span style={topListNameStyle}>{item.country}</span>
              </div>
              <span style={topListValueStyle}>
                {formatNumber(item.streams)} écoutes
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default QuickStats;
