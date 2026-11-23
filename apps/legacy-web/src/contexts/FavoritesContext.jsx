// contexts/FavoritesContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('omusiki_favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des favoris:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('omusiki_favorites', JSON.stringify(favorites));
      } catch (error) {
        console.warn('Erreur lors de la sauvegarde des favoris:', error);
      }
    }
  }, [favorites, isLoading]);

  // Ajouter une chanson aux favoris
  const addToFavorites = useCallback(song => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === song.id);
      if (exists) return prev;

      const favoriteEntry = {
        ...song,
        addedAt: new Date().toISOString(),
        addedTimestamp: Date.now(),
      };

      return [favoriteEntry, ...prev];
    });
  }, []);

  // Retirer une chanson des favoris
  const removeFromFavorites = useCallback(songId => {
    setFavorites(prev => prev.filter(fav => fav.id !== songId));
  }, []);

  // Basculer l'état favori d'une chanson
  const toggleFavorite = useCallback(
    song => {
      const isFavorite = favorites.some(fav => fav.id === song.id);
      if (isFavorite) {
        removeFromFavorites(song.id);
        return false;
      } else {
        addToFavorites(song);
        return true;
      }
    },
    [favorites, addToFavorites, removeFromFavorites]
  );

  // Vérifier si une chanson est en favoris
  const isFavorite = useCallback(
    songId => {
      return favorites.some(fav => fav.id === songId);
    },
    [favorites]
  );

  // Obtenir les favoris triés par date d'ajout
  const getFavoritesByDate = useCallback(
    (ascending = false) => {
      return [...favorites].sort((a, b) => {
        const dateA = new Date(a.addedAt).getTime();
        const dateB = new Date(b.addedAt).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
      });
    },
    [favorites]
  );

  // Obtenir les favoris par genre
  const getFavoritesByGenre = useCallback(() => {
    const genreGroups = {};
    favorites.forEach(song => {
      const genre = song.genre || 'unknown';
      if (!genreGroups[genre]) {
        genreGroups[genre] = [];
      }
      genreGroups[genre].push(song);
    });
    return genreGroups;
  }, [favorites]);

  // Obtenir les favoris par artiste
  const getFavoritesByArtist = useCallback(() => {
    const artistGroups = {};
    favorites.forEach(song => {
      const artist = song.artist || 'Unknown Artist';
      if (!artistGroups[artist]) {
        artistGroups[artist] = [];
      }
      artistGroups[artist].push(song);
    });
    return artistGroups;
  }, [favorites]);

  // Rechercher dans les favoris
  const searchFavorites = useCallback(
    query => {
      const normalizedQuery = query.toLowerCase().trim();
      if (!normalizedQuery) return favorites;

      return favorites.filter(
        song =>
          song.title.toLowerCase().includes(normalizedQuery) ||
          song.artist.toLowerCase().includes(normalizedQuery) ||
          song.album?.toLowerCase().includes(normalizedQuery) ||
          song.genre.toLowerCase().includes(normalizedQuery)
      );
    },
    [favorites]
  );

  // Obtenir les statistiques des favoris
  const getFavoritesStats = useCallback(() => {
    const totalSongs = favorites.length;
    const totalDuration = favorites.reduce(
      (sum, song) => sum + (song.duration || 0),
      0
    );
    const uniqueArtists = [...new Set(favorites.map(song => song.artist))]
      .length;
    const uniqueGenres = [...new Set(favorites.map(song => song.genre))].length;
    const uniqueCountries = [...new Set(favorites.map(song => song.country))]
      .length;

    const mostPlayedGenre =
      Object.entries(getFavoritesByGenre()).sort(
        ([, a], [, b]) => b.length - a.length
      )[0]?.[0] || null;

    const recentlyAdded = favorites.filter(song => {
      const addedTime = new Date(song.addedAt).getTime();
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return addedTime > weekAgo;
    }).length;

    return {
      totalSongs,
      totalDuration,
      uniqueArtists,
      uniqueGenres,
      uniqueCountries,
      mostPlayedGenre,
      recentlyAdded,
    };
  }, [favorites, getFavoritesByGenre]);

  // Exporter les favoris
  const exportFavorites = useCallback(() => {
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      favorites: favorites,
      stats: getFavoritesStats(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `omusiki-favorites-${
      new Date().toISOString().split('T')[0]
    }.json`;
    link.click();

    URL.revokeObjectURL(url);
  }, [favorites, getFavoritesStats]);

  // Importer des favoris
  const importFavorites = useCallback(
    file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const importData = JSON.parse(e.target.result);
            if (importData.favorites && Array.isArray(importData.favorites)) {
              // Fusionner avec les favoris existants, éviter les doublons
              const existingIds = new Set(favorites.map(fav => fav.id));
              const newFavorites = importData.favorites.filter(
                fav => !existingIds.has(fav.id)
              );

              setFavorites(prev => [...newFavorites, ...prev]);
              resolve({
                imported: newFavorites.length,
                skipped: importData.favorites.length - newFavorites.length,
              });
            } else {
              reject(new Error('Format de fichier invalide'));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () =>
          reject(new Error('Erreur de lecture du fichier'));
        reader.readAsText(file);
      });
    },
    [favorites]
  );

  // Effacer tous les favoris
  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const contextValue = {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesByDate,
    getFavoritesByGenre,
    getFavoritesByArtist,
    searchFavorites,
    getFavoritesStats,
    exportFavorites,
    importFavorites,
    clearAllFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook pour les actions rapides de favoris
export const useFavoriteActions = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = useCallback(
    (song, onSuccess, onError) => {
      try {
        const isNowFavorite = toggleFavorite(song);
        if (onSuccess) {
          onSuccess(isNowFavorite);
        }
        return isNowFavorite;
      } catch (error) {
        if (onError) {
          onError(error);
        }
        console.error('Erreur lors de la gestion des favoris:', error);
        return null;
      }
    },
    [toggleFavorite]
  );

  return {
    handleFavoriteClick,
    isFavorite,
  };
};

// Composant bouton de favori réutilisable
export const FavoriteButton = ({
  song,
  size = 20,
  className = '',
  onToggle = null,
  showLabel = false,
}) => {
  const { isFavorite } = useFavorites();
  const { handleFavoriteClick } = useFavoriteActions();

  const isLiked = isFavorite(song.id);

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isLiked ? '#EC4899' : 'rgba(255,255,255,0.6)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '8px',
  };

  const handleClick = e => {
    e.stopPropagation();
    const newState = handleFavoriteClick(song);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      className={className}
      title={isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      onMouseEnter={e => {
        e.target.style.color = '#EC4899';
        e.target.style.background = 'rgba(236, 72, 153, 0.1)';
        e.target.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={e => {
        e.target.style.color = isLiked ? '#EC4899' : 'rgba(255,255,255,0.6)';
        e.target.style.background = 'none';
        e.target.style.transform = 'scale(1)';
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {showLabel && (
        <span style={{ fontSize: '14px', fontWeight: '500' }}>
          {isLiked ? 'Aimé' : 'Aimer'}
        </span>
      )}
    </button>
  );
};

export default FavoritesProvider;
