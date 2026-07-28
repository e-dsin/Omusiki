import React, { useState, useEffect } from 'react';
import {
  Heart,
  Clock,
  Download,
  Music,
  User,
  Calendar,
  BarChart3,
  Shuffle,
  Play,
  Trash2,
  Upload,
  Filter,
  Grid,
  List,
  Search,
  Plus,
  Folder,
  TrendingUp,
} from 'lucide-react';
import { useFavorites } from '../Favorites/FavoritesSystem';
import { usePlayer } from '../../contexts/EnhancedPlayerContext';
import { FavoriteButton } from '../Favorites/FavoritesSystem';
import { useMusicToast } from '../Toast/ToastSystem';

const LibraryTab = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const {
    favorites,
    getFavoritesByDate,
    getFavoritesByGenre,
    getFavoritesStats,
    searchFavorites,
    exportFavorites,
    clearAllFavorites,
  } = useFavorites();

  const { openPlayer } = usePlayer();
  const { notifyPlay, notifyPlaylistAdd } = useMusicToast();

  // Charger les données utilisateur
  useEffect(() => {
    // Charger l'historique d'écoute
    const savedHistory = localStorage.getItem('omusiki_recently_played');
    if (savedHistory) {
      setRecentlyPlayed(JSON.parse(savedHistory));
    }

    // Charger les playlists utilisateur
    const savedPlaylists = localStorage.getItem('omusiki_user_playlists');
    if (savedPlaylists) {
      setUserPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  const stats = getFavoritesStats();
  const favoritesByGenre = getFavoritesByGenre();

  // Filtrer et trier les favoris
  const getFilteredFavorites = () => {
    let filtered = searchQuery ? searchFavorites(searchQuery) : favorites;

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(song => song.genre === selectedGenre);
    }

    switch (sortBy) {
      case 'recent':
        return getFavoritesByDate(false);
      case 'oldest':
        return getFavoritesByDate(true);
      case 'title':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return [...filtered].sort((a, b) => a.artist.localeCompare(b.artist));
      default:
        return filtered;
    }
  };

  const handlePlayAll = () => {
    const filteredFavorites = getFilteredFavorites();
    if (filteredFavorites.length > 0) {
      openPlayer(filteredFavorites[0], filteredFavorites);
      notifyPlay(filteredFavorites[0]);
    }
  };

  const handleShuffleAll = () => {
    const shuffled = [...getFilteredFavorites()].sort(
      () => Math.random() - 0.5
    );
    if (shuffled.length > 0) {
      openPlayer(shuffled[0], shuffled);
      notifyPlay(shuffled[0]);
    }
  };

  const createNewPlaylist = () => {
    const name = prompt('Nom de la nouvelle playlist :');
    if (name && name.trim()) {
      const newPlaylist = {
        id: `playlist_${Date.now()}`,
        name: name.trim(),
        songs: [],
        createdAt: new Date().toISOString(),
        cover: null,
      };

      const updatedPlaylists = [...userPlaylists, newPlaylist];
      setUserPlaylists(updatedPlaylists);
      localStorage.setItem(
        'omusiki_user_playlists',
        JSON.stringify(updatedPlaylists)
      );
      notifyPlaylistAdd({ title: 'Playlist créée' }, name);
    }
  };

  const formatDuration = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle = {
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '8px',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const tabsContainerStyle = {
    display: 'flex',
    gap: '2px',
    marginBottom: '30px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '4px',
  };

  const tabStyle = isActive => ({
    flex: 1,
    padding: '12px 20px',
    background: isActive ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  });

  const statsCardsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '30px',
  };

  const statCardStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(15px)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
  };

  const statValueStyle = {
    fontSize: '24px',
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

  const controlsBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
  };

  const controlsLeftStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  };

  const controlsRightStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
  };

  const searchInputStyle = {
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    width: '200px',
  };

  const selectStyle = {
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns:
      viewMode === 'grid' ? 'repeat(auto-fill, minmax(180px, 1fr))' : '1fr',
    gap: viewMode === 'grid' ? '16px' : '8px',
  };

  const gridItemStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const songCoverStyle = {
    width: viewMode === 'grid' ? '100%' : '48px',
    height: viewMode === 'grid' ? '120px' : '48px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginBottom: viewMode === 'grid' ? '12px' : '0',
  };

  const songInfoStyle = {
    flex: viewMode === 'list' ? 1 : 'none',
    minWidth: 0,
  };

  const songTitleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const songArtistStyle = {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const songMetaStyle = {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '4px',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'rgba(255,255,255,0.7)',
  };

  const genreChipStyle = {
    padding: '4px 8px',
    background: 'rgba(139, 92, 246, 0.3)',
    borderRadius: '8px',
    fontSize: '10px',
    color: '#8B5CF6',
    fontWeight: '500',
    marginTop: '8px',
    display: 'inline-block',
  };

  const renderFavorites = () => {
    const filteredFavorites = getFilteredFavorites();

    if (filteredFavorites.length === 0) {
      return (
        <div style={emptyStateStyle}>
          <Heart size={64} style={{ opacity: 0.3, marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '8px', color: 'white' }}>
            {searchQuery || selectedGenre !== 'all'
              ? 'Aucun favori trouvé'
              : 'Aucun favori pour le moment'}
          </h3>
          <p>
            {searchQuery || selectedGenre !== 'all'
              ? 'Essayez de modifier vos filtres de recherche'
              : 'Commencez à aimer des chansons pour les retrouver ici'}
          </p>
        </div>
      );
    }

    return (
      <div style={gridContainerStyle}>
        {filteredFavorites.map(song =>
          viewMode === 'grid' ? (
            <div
              key={song.id}
              style={gridItemStyle}
              onClick={() => {
                openPlayer(song, filteredFavorites);
                notifyPlay(song);
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img src={song.cover} alt={song.title} style={songCoverStyle} />
              <div style={songInfoStyle}>
                <div style={songTitleStyle}>{song.title}</div>
                <div style={songArtistStyle}>{song.artist}</div>
                <div style={songMetaStyle}>
                  Ajouté le {formatDate(song.addedAt)}
                </div>
                <div style={genreChipStyle}>{song.genre}</div>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <FavoriteButton song={song} size={16} />
              </div>
            </div>
          ) : (
            <div
              key={song.id}
              style={listItemStyle}
              onClick={() => {
                openPlayer(song, filteredFavorites);
                notifyPlay(song);
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              <img src={song.cover} alt={song.title} style={songCoverStyle} />
              <div style={songInfoStyle}>
                <div style={songTitleStyle}>{song.title}</div>
                <div style={songArtistStyle}>
                  {song.artist} • {song.genre}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                {formatDate(song.addedAt)}
              </div>
              <FavoriteButton song={song} size={16} />
            </div>
          )
        )}
      </div>
    );
  };

  const renderStats = () => (
    <div>
      <div style={statsCardsStyle}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalSongs}</div>
          <div style={statLabelStyle}>Chansons aimées</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>
            {formatDuration(stats.totalDuration)}
          </div>
          <div style={statLabelStyle}>Temps total</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.uniqueArtists}</div>
          <div style={statLabelStyle}>Artistes différents</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.recentlyAdded}</div>
          <div style={statLabelStyle}>Ajoutés cette semaine</div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '20px',
          }}
        >
          Répartition par genre
        </h3>
        <div style={gridContainerStyle}>
          {Object.entries(favoritesByGenre).map(([genre, songs]) => (
            <div key={genre} style={gridItemStyle}>
              <div style={statValueStyle}>{songs.length}</div>
              <div style={statLabelStyle}>{genre}</div>
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {formatDuration(
                  songs.reduce((sum, song) => sum + song.duration, 0)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlaylists = () => (
    <div>
      <div style={controlsBarStyle}>
        <button style={primaryButtonStyle} onClick={createNewPlaylist}>
          <Plus size={16} />
          Nouvelle playlist
        </button>
      </div>

      {userPlaylists.length === 0 ? (
        <div style={emptyStateStyle}>
          <Folder size={64} style={{ opacity: 0.3, marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', marginBottom: '8px', color: 'white' }}>
            Aucune playlist créée
          </h3>
          <p>Créez votre première playlist pour organiser votre musique</p>
        </div>
      ) : (
        <div style={gridContainerStyle}>
          {userPlaylists.map(playlist => (
            <div key={playlist.id} style={gridItemStyle}>
              <div
                style={{
                  width: '100%',
                  height: '120px',
                  background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Music size={32} color="white" />
              </div>
              <div style={songTitleStyle}>{playlist.name}</div>
              <div style={songArtistStyle}>
                {playlist.songs.length} titre(s)
              </div>
              <div style={songMetaStyle}>
                Créée le {formatDate(playlist.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Ma Bibliothèque</h1>
        <p style={subtitleStyle}>Gérez votre collection musicale personnelle</p>
      </div>

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        <button
          style={tabStyle(activeTab === 'favorites')}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={16} />
          Favoris ({favorites.length})
        </button>
        <button
          style={tabStyle(activeTab === 'playlists')}
          onClick={() => setActiveTab('playlists')}
        >
          <Music size={16} />
          Playlists ({userPlaylists.length})
        </button>
        <button
          style={tabStyle(activeTab === 'stats')}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart3 size={16} />
          Statistiques
        </button>
      </div>

      {/* Content */}
      {activeTab === 'favorites' && (
        <>
          {/* Controls Bar */}
          <div style={controlsBarStyle}>
            <div style={controlsLeftStyle}>
              <button style={primaryButtonStyle} onClick={handlePlayAll}>
                <Play size={16} />
                Tout lire
              </button>
              <button style={buttonStyle} onClick={handleShuffleAll}>
                <Shuffle size={16} />
                Aléatoire
              </button>
              <button style={buttonStyle} onClick={exportFavorites}>
                <Download size={16} />
                Exporter
              </button>
            </div>

            <div style={controlsRightStyle}>
              <input
                type="text"
                placeholder="Rechercher..."
                style={searchInputStyle}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />

              <select
                style={selectStyle}
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
              >
                <option value="all">Tous les genres</option>
                {Object.keys(favoritesByGenre).map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              <select
                style={selectStyle}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="recent">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="title">Titre A-Z</option>
                <option value="artist">Artiste A-Z</option>
              </select>

              <button
                style={{
                  ...buttonStyle,
                  background:
                    viewMode === 'grid'
                      ? 'rgba(139, 92, 246, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                }}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button
                style={{
                  ...buttonStyle,
                  background:
                    viewMode === 'list'
                      ? 'rgba(139, 92, 246, 0.3)'
                      : 'rgba(255,255,255,0.1)',
                }}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {renderFavorites()}
        </>
      )}

      {activeTab === 'playlists' && renderPlaylists()}

      {activeTab === 'stats' && renderStats()}
    </div>
  );
};

export default LibraryTab;
