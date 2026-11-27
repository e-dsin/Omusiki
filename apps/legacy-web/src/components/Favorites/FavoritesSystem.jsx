// src/components/Favorites/FavoritesSystem.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Heart } from 'lucide-react';

// Context pour les favoris
const FavoritesContext = createContext();

// Provider pour les favoris
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('omusiki_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    }
  }, []);

  // Sauvegarder les favoris dans localStorage
  useEffect(() => {
    localStorage.setItem('omusiki_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Ajouter/retirer des favoris
  const toggleFavorite = useCallback(song => {
    if (!song || !song.id) return;

    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === song.id);

      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== song.id);
      } else {
        const favoriteData = {
          ...song,
          addedAt: new Date().toISOString(),
        };
        return [...prev, favoriteData];
      }
    });
  }, []);

  // Vérifier si une chanson est dans les favoris
  const isFavorite = useCallback(
    songId => {
      return favorites.some(fav => fav.id === songId);
    },
    [favorites]
  );

  // Obtenir les favoris triés par date
  const getFavoritesByDate = useCallback(
    (ascending = false) => {
      return [...favorites].sort((a, b) => {
        const dateA = new Date(a.addedAt);
        const dateB = new Date(b.addedAt);
        return ascending ? dateA - dateB : dateB - dateA;
      });
    },
    [favorites]
  );

  // Obtenir les favoris par genre
  const getFavoritesByGenre = useCallback(() => {
    return favorites.reduce((acc, song) => {
      const genre = song.genre || 'unknown';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(song);
      return acc;
    }, {});
  }, [favorites]);

  // Rechercher dans les favoris
  const searchFavorites = useCallback(
    query => {
      if (!query.trim()) return favorites;

      const lowercaseQuery = query.toLowerCase();
      return favorites.filter(
        song =>
          song.title?.toLowerCase().includes(lowercaseQuery) ||
          song.artist?.toLowerCase().includes(lowercaseQuery) ||
          song.genre?.toLowerCase().includes(lowercaseQuery)
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
    const recentlyAdded = favorites.filter(song => {
      const addedDate = new Date(song.addedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return addedDate > weekAgo;
    }).length;

    return {
      totalSongs,
      totalDuration,
      uniqueArtists,
      recentlyAdded,
    };
  }, [favorites]);

  // Exporter les favoris
  const exportFavorites = useCallback(() => {
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `omusiki-favorites-${
      new Date().toISOString().split('T')[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [favorites]);

  // Effacer tous les favoris
  const clearAllFavorites = useCallback(() => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')
    ) {
      setFavorites([]);
    }
  }, []);

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesByDate,
    getFavoritesByGenre,
    searchFavorites,
    getFavoritesStats,
    exportFavorites,
    clearAllFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook pour utiliser les favoris
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    // Si pas de contexte, utiliser une version locale simplifiée
    return useLocalFavorites();
  }
  return context;
};

// Hook local pour les favoris sans contexte (fallback)
const useLocalFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('omusiki_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('omusiki_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback(song => {
    if (!song || !song.id) return;

    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === song.id);

      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== song.id);
      } else {
        const favoriteData = {
          ...song,
          addedAt: new Date().toISOString(),
        };
        return [...prev, favoriteData];
      }
    });
  }, []);

  const isFavorite = useCallback(
    songId => {
      return favorites.some(fav => fav.id === songId);
    },
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesByDate: () => [...favorites],
    getFavoritesByGenre: () => ({}),
    searchFavorites: () => favorites,
    getFavoritesStats: () => ({ totalSongs: favorites.length }),
    exportFavorites: () => {},
    clearAllFavorites: () => setFavorites([]),
  };
};

// Composant bouton favori standalone
export const FavoriteButton = ({ song, size = 20, className = '' }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!song) return null;

  const isLiked = isFavorite(song.id);

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isLiked ? '#EC4899' : 'rgba(255,255,255,0.7)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '50%',
  };

  const handleClick = e => {
    e.stopPropagation();
    toggleFavorite(song);
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      title={isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={className}
      onMouseEnter={e => {
        e.target.style.color = '#EC4899';
        e.target.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={e => {
        e.target.style.color = isLiked ? '#EC4899' : 'rgba(255,255,255,0.7)';
        e.target.style.transform = 'scale(1)';
      }}
    >
      <Heart size={size} fill={isLiked ? 'currentColor' : 'none'} />
    </button>
  );
};

export default FavoritesProvider;
