import React, { useState } from 'react';
import TopNavBar from '../UI/TopNavBar';
import HeroSection from '../UI/HeroSection';
import MusicCarousel from '../UI/MusicCarousel';
import QuickStats from '../UI/QuickStats';
import FooterSection from '../UI/FooterSection';
import OMUsikiPlayer from '../Player/OMusikiPlayer';
import ChartDetailPage from './ChartDetailPage';
import { usePlayer } from '../../contexts/EnhancedPlayerContext';
import {
  MusicSearchService,
  PlaylistGenerator,
  MusicAnalytics,
} from '../../services/musicDatabase';

const HomeTab = () => {
  const { isPlayerVisible, closePlayer, currentSong, currentPlaylist } =
    usePlayer();

  // État pour gérer la navigation vers les sous-pages
  const [currentView, setCurrentView] = useState('home');
  const [selectedChart, setSelectedChart] = useState(null);

  // Fonction pour naviguer vers une sous-page de chart
  const handleChartClick = chartItem => {
    setSelectedChart(chartItem);
    setCurrentView('chart-detail');
  };

  // Fonction pour revenir à la page d'accueil
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedChart(null);
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
  };

  const contentStyle = {
    paddingTop: '80px', // Pour le TopNavBar fixé
  };

  // Si on est sur une sous-page de chart, on affiche le détail
  if (currentView === 'chart-detail' && selectedChart) {
    return (
      <div style={containerStyle}>
        <TopNavBar />
        <div style={contentStyle}>
          <ChartDetailPage chart={selectedChart} onBack={handleBackToHome} />
          <FooterSection />
        </div>

        <OMUsikiPlayer
          isVisible={isPlayerVisible}
          onClose={closePlayer}
          initialSong={currentSong}
          playlist={currentPlaylist}
        />
      </div>
    );
  }

  // === ALBUMS DATA (NOUVELLE FONCTIONNALITÉ) ===
  // Note: Ajoutez d'abord les nouvelles fonctions dans musicDatabase.js
  let albumsData = [];
  try {
    if (MusicSearchService.getAlbums) {
      albumsData = MusicSearchService.getAlbums()
        .slice(0, 8)
        .map(album => ({
          id: album.id,
          title: album.title,
          artist: `${album.artist} • ${album.tracks} titres`,
          cover: album.cover,
          duration: album.duration,
          tracks: album.tracks,
          audioUrl: album.audioUrl,
          playlist: album.playlist,
          type: 'album',
          genre: album.genre,
          country: album.country,
          streams: album.totalStreams || album.streams,
          year: album.year,
          description: album.description,
          likes: album.totalLikes || album.likes,
        }));

      // Mise en avant spéciale pour Bebell Collection
      const bebellIndex = albumsData.findIndex(album =>
        album.title.includes('Bebell Collection')
      );
      if (bebellIndex > 0) {
        const bebellAlbum = albumsData.splice(bebellIndex, 1)[0];
        bebellAlbum.artist = `${
          bebellAlbum.artist.split(' •')[0]
        } • Makossa • 6 titres`;
        bebellAlbum.description =
          '🎵 Collection complète des hits makossa de Bebell';
        albumsData.unshift(bebellAlbum);
      }
    }
  } catch (error) {
    console.warn('Albums function not available yet:', error);
  }

  // === DONNÉES EXISTANTES (VOTRE CODE ORIGINAL) ===

  // Tendances avec plus de détails
  const trendingData = MusicSearchService.getPopular(10).map(song => ({
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

  // Nouvelles sorties avec métadonnées enrichies
  const newReleasesData = MusicSearchService.getNewReleases(8).map(song => ({
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

  // Artistes vedettes (Charlotte Dipanda, Burna Boy, etc.)
  const featuredArtistIds = [
    'cmr_makossa_001', // Bebell - Dibalabobe
    'nga_afrobeats_001', // Burna Boy - Lagos Nights
    'cmr_hit_001', // Franko - Lion Indomptable
    'nga_afrobeats_002', // Wizkid - Abuja Flow
    'civ_coupe_001', // DJ Arafat - Abidjan Party
    'cog_amapiano_001', // Fally Ipupa - Congo Piano
    // Fallback avec chansons Bebell
    'bebell_makossa_001',
    'bebell_makossa_002',
    'bebell_makossa_003',
    'bebell_makossa_004',
    'bebell_makossa_005',
    'bebell_makossa_006',
  ];

  const featuredArtistsData = featuredArtistIds
    .map(id => MusicSearchService.getSongById(id))
    .filter(Boolean)
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

  // Playlists générées automatiquement avec plus de variété
  const afrobeatsPlaylist = PlaylistGenerator.generateAfrobeatsHits();
  const traditionalPlaylist = PlaylistGenerator.generateTraditionalMix();
  const modernPlaylist = PlaylistGenerator.generateModernAfricanMix();
  const worldFusionPlaylist = PlaylistGenerator.generateWorldFusion();

  const madeForYouData = [
    {
      id: 'playlist_afrobeats',
      title: 'Mix Afrobeats Essentiel',
      artist: `${afrobeatsPlaylist.length} titres • Hits incontournables`,
      cover:
        afrobeatsPlaylist[0]?.cover ||
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: `${Math.floor(
        afrobeatsPlaylist.reduce((total, song) => total + song.duration, 0) / 60
      )}min`,
      tracks: afrobeatsPlaylist.length,
      audioUrl: afrobeatsPlaylist[0]?.audioUrl,
      playlist: afrobeatsPlaylist,
      type: 'playlist',
      streams: afrobeatsPlaylist.reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    {
      id: 'playlist_traditional',
      title: 'Trésors Traditionnels',
      artist: `${traditionalPlaylist.length} titres • Patrimoine musical`,
      cover:
        traditionalPlaylist[0]?.cover ||
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: `${Math.floor(
        traditionalPlaylist.reduce((total, song) => total + song.duration, 0) /
          60
      )}min`,
      tracks: traditionalPlaylist.length,
      audioUrl: traditionalPlaylist[0]?.audioUrl,
      playlist: traditionalPlaylist,
      type: 'playlist',
      streams: traditionalPlaylist.reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    {
      id: 'playlist_modern',
      title: 'Afrique Moderne',
      artist: `${modernPlaylist.length} titres • Sons contemporains`,
      cover:
        modernPlaylist[0]?.cover ||
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: `${Math.floor(
        modernPlaylist.reduce((total, song) => total + song.duration, 0) / 60
      )}min`,
      tracks: modernPlaylist.length,
      audioUrl: modernPlaylist[0]?.audioUrl,
      playlist: modernPlaylist,
      type: 'playlist',
      streams: modernPlaylist.reduce((total, song) => total + song.streams, 0),
    },
    {
      id: 'playlist_fusion',
      title: 'World Fusion',
      artist: `${worldFusionPlaylist.length} titres • Mélange global`,
      cover:
        worldFusionPlaylist[0]?.cover ||
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: `${Math.floor(
        worldFusionPlaylist.reduce((total, song) => total + song.duration, 0) /
          60
      )}min`,
      tracks: worldFusionPlaylist.length,
      audioUrl: worldFusionPlaylist[0]?.audioUrl,
      playlist: worldFusionPlaylist,
      type: 'playlist',
      streams: worldFusionPlaylist.reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
  ];

  // Top Charts par région et pays avec données réelles
  const topChartsData = [
    // Pays spécifiques
    {
      id: 'chart_cameroon',
      title: 'Cameroon Hits',
      artist: 'Makossa • Bikutsi • Afropop moderne',
      cover:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '3h 45min',
      tracks: MusicSearchService.searchByCountry('Cameroon').length,
      audioUrl: MusicSearchService.searchByCountry('Cameroon')[0]?.audioUrl,
      playlist: MusicSearchService.searchByCountry('Cameroon'),
      type: 'chart',
      category: 'country',
      country: 'Cameroon',
      streams: MusicSearchService.searchByCountry('Cameroon').reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    {
      id: 'chart_nigeria',
      title: 'Nigerian Hits',
      artist: 'Afrobeats • Highlife • Afropop',
      cover:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: '4h 20min',
      tracks: MusicSearchService.searchByCountry('Nigeria').length,
      audioUrl: MusicSearchService.searchByCountry('Nigeria')[0]?.audioUrl,
      playlist: MusicSearchService.searchByCountry('Nigeria'),
      type: 'chart',
      category: 'country',
      country: 'Nigeria',
      streams: MusicSearchService.searchByCountry('Nigeria').reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    {
      id: 'chart_ivory_coast',
      title: 'Ivory Coast Hits',
      artist: 'Coupé-Décalé • Zouglou • Afropop',
      cover:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '2h 55min',
      tracks: MusicSearchService.searchByCountry('Ivory Coast').length,
      audioUrl: MusicSearchService.searchByCountry('Ivory Coast')[0]?.audioUrl,
      playlist: MusicSearchService.searchByCountry('Ivory Coast'),
      type: 'chart',
      category: 'country',
      country: 'Ivory Coast',
      streams: MusicSearchService.searchByCountry('Ivory Coast').reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    {
      id: 'chart_congo',
      title: 'Congo Hits',
      artist: 'Ndombolo • Rumba • Soukous',
      cover:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: '3h 15min',
      tracks: MusicSearchService.searchByCountry('Congo').length,
      audioUrl: MusicSearchService.searchByCountry('Congo')[0]?.audioUrl,
      playlist: MusicSearchService.searchByCountry('Congo'),
      type: 'chart',
      category: 'country',
      country: 'Congo',
      streams: MusicSearchService.searchByCountry('Congo').reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    // Régions
    {
      id: 'chart_central_africa',
      title: 'Central Africa Hits',
      artist: 'Cameroun • Congo • Gabon • RCA',
      cover:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '4h 45min',
      tracks: PlaylistGenerator.generateByRegion('central-africa').length,
      audioUrl:
        PlaylistGenerator.generateByRegion('central-africa')[0]?.audioUrl,
      playlist: PlaylistGenerator.generateByRegion('central-africa'),
      type: 'chart',
      category: 'region',
      region: 'central-africa',
      streams: PlaylistGenerator.generateByRegion('central-africa').reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
    {
      id: 'chart_west_africa',
      title: 'West Africa Hits',
      artist: 'Nigeria • Ghana • Ivory Coast • Senegal',
      cover:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: '5h 15min',
      tracks: PlaylistGenerator.generateByRegion('west-africa').length,
      audioUrl: PlaylistGenerator.generateByRegion('west-africa')[0]?.audioUrl,
      playlist: PlaylistGenerator.generateByRegion('west-africa'),
      type: 'chart',
      category: 'region',
      region: 'west-africa',
      streams: PlaylistGenerator.generateByRegion('west-africa').reduce(
        (total, song) => total + song.streams,
        0
      ),
    },
  ];

  // Genres populaires avec analytics
  const topGenres = MusicAnalytics.getTopGenres(8);
  const genresData = topGenres.map(({ genre, streams }) => {
    const songs = MusicSearchService.searchByGenre(genre);
    return {
      id: `genre_${genre}`,
      title: `${genre.charAt(0).toUpperCase() + genre.slice(1)} Collection`,
      artist: `${songs.length} titres • ${[
        ...new Set(songs.map(s => s.country)),
      ]
        .slice(0, 3)
        .join(', ')}`,
      cover:
        songs[0]?.cover ||
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
      duration: `${Math.floor(
        songs.reduce((total, song) => total + song.duration, 0) / 60
      )}min`,
      tracks: songs.length,
      audioUrl: songs[0]?.audioUrl,
      playlist: songs,
      type: 'genre',
      genre: genre,
      streams: streams,
      country: songs[0]?.country,
    };
  });

  // Découvertes par pays avec artistes vedettes
  const countrySpotlights = [
    {
      country: 'Cameroon',
      songs: MusicSearchService.searchByCountry('Cameroon').slice(0, 6),
    },
    {
      country: 'Nigeria',
      songs: MusicSearchService.searchByCountry('Nigeria').slice(0, 6),
    },
    {
      country: 'Ivory Coast',
      songs: MusicSearchService.searchByCountry('Ivory Coast').slice(0, 6),
    },
    {
      country: 'Congo',
      songs: MusicSearchService.searchByCountry('Congo').slice(0, 6),
    },
  ];

  const discoveryData = countrySpotlights.map(({ country, songs }) => ({
    id: `discovery_${country.toLowerCase()}`,
    title: `Découvertes ${country}`,
    artist: `${songs.length} artistes • Talents émergents`,
    cover:
      songs[0]?.cover ||
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: `${Math.floor(
      songs.reduce((total, song) => total + song.duration, 0) / 60
    )}min`,
    tracks: songs.length,
    audioUrl: songs[0]?.audioUrl,
    playlist: songs,
    type: 'discovery',
    country: country,
    streams: songs.reduce((total, song) => total + song.streams, 0),
  }));

  // Debug pour vérifier les données
  console.log('=== DEBUG DATA LENGTHS ===');
  console.log('albumsData:', albumsData.length);
  console.log('trendingData:', trendingData.length);
  console.log('newReleasesData:', newReleasesData.length);
  console.log('featuredArtistsData:', featuredArtistsData.length);
  console.log('madeForYouData:', madeForYouData.length);
  console.log('topChartsData:', topChartsData.length);
  console.log('genresData:', genresData.length);
  console.log('discoveryData:', discoveryData.length);

  // Vue principale (page d'accueil normale)
  return (
    <div style={containerStyle}>
      {/* TopNavBar fixée en haut */}
      <TopNavBar />

      <div style={contentStyle}>
        {/* Hero Section avec Charlotte Dipanda et Burna Boy */}
        <HeroSection />

        {/* Sections de contenu musical avec vraies données enrichies */}
        <div>
          {/* === NOUVELLE SECTION ALBUMS === */}
          {albumsData.length > 0 && (
            <MusicCarousel
              title="💿 Albums & Collections"
              items={albumsData}
              description="Explorez nos albums complets • Bebell Collection en vedette"
              type="default"
              onChartClick={handleChartClick}
            />
          )}

          {/* === VOS SECTIONS EXISTANTES === */}
          <MusicCarousel
            title="📊 Classements Régionaux"
            items={topChartsData}
            description="Les hits par régions africaines • Basé sur les écoutes"
            type="default"
            onChartClick={handleChartClick}
          />

          <MusicCarousel
            title="🔥 Tendances Afro"
            items={trendingData}
            description="Les sons qui font vibrer l'Afrique en ce moment • Mis à jour quotidiennement"
            type="default"
          />

          <MusicCarousel
            title="⭐ Artistes Vedettes"
            items={featuredArtistsData}
            description="Charlotte Dipanda, Burna Boy et les stars qui illuminent la scène africaine"
            type="default"
          />

          <MusicCarousel
            title="🆕 Nouvelles Sorties"
            items={newReleasesData}
            description="Les dernières créations musicales africaines • 2023-2024"
            type="compact"
          />

          <MusicCarousel
            title="🎯 Créé pour Vous"
            items={madeForYouData}
            description="Playlists personnalisées selon vos goûts musicaux"
            type="default"
          />

          <MusicCarousel
            title="🎵 Genres Populaires"
            items={genresData}
            description="Explorez la diversité musicale africaine par genre"
            type="compact"
          />

          <MusicCarousel
            title="🌍 Découvertes Pays"
            items={discoveryData}
            description="Talents émergents et perles cachées par pays"
            type="default"
          />
        </div>
        {/* Quick Stats */}
        <QuickStats />

        {/* Footer avec infos détaillées */}
        <FooterSection />
      </div>

      {/* Player Ô Musiki */}
      <OMUsikiPlayer
        isVisible={isPlayerVisible}
        onClose={closePlayer}
        initialSong={currentSong}
        playlist={currentPlaylist}
      />
    </div>
  );
};

export default HomeTab;
