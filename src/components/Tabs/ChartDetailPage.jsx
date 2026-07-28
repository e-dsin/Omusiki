import React from 'react';
import { ArrowLeft } from 'lucide-react';
import MusicCarousel from '../UI/MusicCarousel';
import ChartInsights from './ChartInsights';
import ChartBreadcrumb from './ChartBreadcrumb';
import SubCategoryGenerator from '../../services/SubCategoryGenerator';

const ChartDetailPage = ({ chart, onBack }) => {
  // Utiliser le générateur de sous-catégories
  const subCategories = SubCategoryGenerator.generateSubCategories(chart);

  // Top 10 des titres les plus écoutés
  const top10Songs = chart.playlist
    .sort((a, b) => b.streams - a.streams)
    .slice(0, 10)
    .map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      cover: song.cover,
      duration: `${Math.floor(song.duration / 60)}min ${song.duration % 60}s`,
      tracks: 1,
      audioUrl: song.audioUrl,
      genre: song.genre,
      country: song.country,
      streams: song.streams,
      year: song.year,
      description: song.description,
      likes: song.likes,
      tags: song.tags,
      language: song.language,
    }));

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      {/* Breadcrumb Navigation */}
      <ChartBreadcrumb chart={chart} onBack={onBack} />

      {/* Hero Section pour le chart */}
      <ChartHeroSection chart={chart} onBack={onBack} />

      {/* Top 10 */}
      <MusicCarousel
        title="🏆 Top 10"
        items={top10Songs}
        description={`Les 10 titres les plus écoutés • ${chart.title}`}
        type="default"
      />

      {/* Insights & Statistiques */}
      <ChartInsights chart={chart} />

      {/* Sous-catégories */}
      {subCategories.length > 0 && (
        <MusicCarousel
          title="🎯 Sous-catégories"
          items={subCategories}
          description="Explorez par genre, pays ou style musical"
          type="compact"
        />
      )}
    </div>
  );
};

// Composant Hero pour les pages de chart
const ChartHeroSection = ({ chart, onBack }) => {
  const heroStyle = {
    position: 'relative',
    height: '60vh',
    minHeight: '400px',
    background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)`,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("${chart.cover}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3,
    filter: 'blur(2px)',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '800px',
    padding: '0 40px',
    color: 'white',
  };

  const backButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: 'white',
    padding: '12px 20px',
    cursor: 'pointer',
    marginBottom: '24px',
    fontSize: '14px',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'all 0.3s ease',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '16px',
    background: 'linear-gradient(45deg, #ffffff, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '1.1',
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '24px',
    lineHeight: '1.6',
    fontFamily: 'Montserrat, sans-serif',
  };

  const statsStyle = {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const statItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const formatStreams = streams => {
    if (streams >= 1000000) return `${(streams / 1000000).toFixed(1)}M`;
    if (streams >= 1000) return `${Math.floor(streams / 1000)}K`;
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
      Jamaica: '🇯🇲',
    };
    return flags[country] || '🌍';
  };

  return (
    <div style={heroStyle}>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </button>

        <h1 style={titleStyle}>{chart.title}</h1>
        <p style={descriptionStyle}>{chart.artist}</p>

        <div style={statsStyle}>
          <div style={statItemStyle}>
            <span>🎵</span>
            <span>{chart.tracks} titres</span>
          </div>
          <div style={statItemStyle}>
            <span>⏱️</span>
            <span>{chart.duration}</span>
          </div>
          <div style={statItemStyle}>
            <span>🔥</span>
            <span>{formatStreams(chart.streams)} écoutes</span>
          </div>
          <div style={statItemStyle}>
            <span>📊</span>
            <span>Top Charts</span>
          </div>
          {chart.country && (
            <div style={statItemStyle}>
              <span>{getCountryFlag(chart.country)}</span>
              <span>{chart.country}</span>
            </div>
          )}
          {chart.region && (
            <div style={statItemStyle}>
              <span>🌍</span>
              <span>
                {chart.region
                  .replace('-', ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartDetailPage;
