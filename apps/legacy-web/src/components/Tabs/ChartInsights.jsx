import React from 'react';
import { TrendingUp, Globe, Music, Crown, Star } from 'lucide-react';

const ChartInsights = ({ chart }) => {
  // Calculer les insights du chart
  const calculateInsights = () => {
    const songs = chart.playlist || [];

    // Top artistes
    const artistCounts = {};
    songs.forEach(song => {
      if (!artistCounts[song.artist]) {
        artistCounts[song.artist] = { count: 0, streams: 0 };
      }
      artistCounts[song.artist].count++;
      artistCounts[song.artist].streams += song.streams;
    });

    const topArtists = Object.entries(artistCounts)
      .sort(([, a], [, b]) => b.streams - a.streams)
      .slice(0, 3)
      .map(([artist, data]) => ({ artist, ...data }));

    // Genres populaires
    const genreCounts = {};
    songs.forEach(song => {
      genreCounts[song.genre] = (genreCounts[song.genre] || 0) + song.streams;
    });

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([genre, streams]) => ({ genre, streams }));

    // Années populaires
    const yearCounts = {};
    songs.forEach(song => {
      yearCounts[song.year] = (yearCounts[song.year] || 0) + 1;
    });

    const popularYears = Object.entries(yearCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    // Statistiques générales
    const totalStreams = songs.reduce((sum, song) => sum + song.streams, 0);
    const averageStreams = Math.floor(totalStreams / songs.length);
    const averageYear = Math.round(
      songs.reduce((sum, song) => sum + song.year, 0) / songs.length
    );

    return {
      topArtists,
      topGenres,
      popularYears,
      totalStreams,
      averageStreams,
      averageYear,
      uniqueCountries: [...new Set(songs.map(s => s.country))].length,
      uniqueGenres: [...new Set(songs.map(s => s.genre))].length,
    };
  };

  const insights = calculateInsights();

  const containerStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(15px)',
    borderRadius: '20px',
    padding: '32px',
    margin: '40px',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  };

  const sectionStyle = {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  };

  const itemNameStyle = {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const itemValueStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  };

  const statItemStyle = {
    textAlign: 'center',
    background: 'rgba(255,255,255,0.05)',
    padding: '16px',
    borderRadius: '8px',
  };

  const statValueStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '4px',
  };

  const statLabelStyle = {
    fontSize: '12px',
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

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        <TrendingUp size={24} color="#8B5CF6" />
        Insights & Statistiques
      </h3>

      <div style={gridStyle}>
        {/* Top Artistes */}
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>
            <Crown size={18} color="#EC4899" />
            Top Artistes
          </h4>
          {insights.topArtists.map((artist, index) => (
            <div key={artist.artist} style={listItemStyle}>
              <span style={itemNameStyle}>
                #{index + 1} {artist.artist}
              </span>
              <div style={{ textAlign: 'right' }}>
                <div style={itemValueStyle}>{formatNumber(artist.streams)}</div>
                <div
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}
                >
                  {artist.count} titre{artist.count > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Genres */}
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>
            <Music size={18} color="#10B981" />
            Genres Populaires
          </h4>
          {insights.topGenres.map((genre, index) => (
            <div key={genre.genre} style={listItemStyle}>
              <span style={itemNameStyle}>
                #{index + 1}{' '}
                {genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}
              </span>
              <span style={itemValueStyle}>{formatNumber(genre.streams)}</span>
            </div>
          ))}
        </div>

        {/* Années Populaires */}
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>
            <Star size={18} color="#F59E0B" />
            Années Populaires
          </h4>
          {insights.popularYears.map(([year, count], index) => (
            <div key={year} style={listItemStyle}>
              <span style={itemNameStyle}>
                #{index + 1} {year}
              </span>
              <span style={itemValueStyle}>
                {count} titre{count > 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Statistiques Générales */}
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>
            <Globe size={18} color="#6366F1" />
            Statistiques Générales
          </h4>
          <div style={statsGridStyle}>
            <div style={statItemStyle}>
              <div style={statValueStyle}>
                {formatNumber(insights.totalStreams)}
              </div>
              <div style={statLabelStyle}>Total Écoutes</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle}>
                {formatNumber(insights.averageStreams)}
              </div>
              <div style={statLabelStyle}>Moyenne/Titre</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle}>{insights.uniqueGenres}</div>
              <div style={statLabelStyle}>Genres</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle}>{insights.averageYear}</div>
              <div style={statLabelStyle}>Année Moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartInsights;
