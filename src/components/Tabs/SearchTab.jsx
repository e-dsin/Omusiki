import React, { useState, useEffect } from 'react';
import {
  Search,
  Music,
  User,
  Disc,
  MapPin,
  TrendingUp,
  Clock,
  Play,
  Filter,
  X,
  ChevronDown,
} from 'lucide-react';
import { MusicSearchService } from '../../services/musicDatabase';
import { usePlayer } from '../../contexts/EnhancedPlayerContext';
import { FavoriteButton } from '../Favorites/FavoritesSystem';
import { useMusicToast } from '../Toast/ToastSystem';

const SearchTab = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genre: 'all',
    country: 'all',
    year: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [popularSearches] = useState([
    'Afrobeats',
    'Burna Boy',
    'Nigeria',
    'Amapiano',
    'Makossa',
    'Cameroun',
    'Highlife',
    'Ghana',
    'Soukous',
    'Mali',
  ]);

  const { openPlayer } = usePlayer();
  const { notifyPlay } = useMusicToast();

  // Charger l'historique de recherche
  useEffect(() => {
    const savedHistory = localStorage.getItem('omusiki_search_history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sauvegarder l'historique
  const saveToHistory = searchTerm => {
    const newHistory = [
      searchTerm,
      ...searchHistory.filter(term => term !== searchTerm),
    ].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('omusiki_search_history', JSON.stringify(newHistory));
  };

  // Recherche avec debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
        saveToHistory(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, selectedFilters]);

  const performSearch = searchTerm => {
    setIsLoading(true);

    let searchResults = MusicSearchService.searchGlobal(searchTerm);

    // Appliquer les filtres
    if (selectedFilters.genre !== 'all') {
      searchResults = searchResults.filter(
        song => song.genre === selectedFilters.genre
      );
    }
    if (selectedFilters.country !== 'all') {
      searchResults = searchResults.filter(
        song => song.country === selectedFilters.country
      );
    }
    if (selectedFilters.year !== 'all') {
      const year = parseInt(selectedFilters.year);
      searchResults = searchResults.filter(song => song.year === year);
    }

    setResults(searchResults);
    setIsLoading(false);
  };

  const handleSongPlay = song => {
    openPlayer(song, results);
    notifyPlay(song);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('omusiki_search_history');
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

  const searchContainerStyle = {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto 40px auto',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '16px 60px 16px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '16px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    fontFamily: 'Montserrat, sans-serif',
  };

  const searchActionsStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: '8px',
  };

  const actionButtonStyle = {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const filtersContainerStyle = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(15px)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    border: '1px solid rgba(255,255,255,0.1)',
    display: showFilters ? 'block' : 'none',
  };

  const filtersGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  };

  const filterGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const filterLabelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
  };

  const filterSelectStyle = {
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  };

  const quickSearchStyle = {
    marginBottom: '30px',
  };

  const quickSearchTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '16px',
  };

  const tagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  };

  const tagStyle = {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Montserrat, sans-serif',
  };

  const resultsContainerStyle = {
    marginTop: '30px',
  };

  const resultsHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const resultsCountStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
  };

  const resultItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const resultImageStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const resultInfoStyle = {
    flex: 1,
    minWidth: 0,
  };

  const resultTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '4px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const resultMetaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '4px',
  };

  const resultTagsStyle = {
    display: 'flex',
    gap: '8px',
    fontSize: '12px',
  };

  const resultTagStyle = {
    padding: '2px 8px',
    background: 'rgba(139, 92, 246, 0.3)',
    borderRadius: '12px',
    color: '#8B5CF6',
    fontWeight: '500',
  };

  const resultActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const playButtonStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'rgba(255,255,255,0.7)',
  };

  const emptyIconStyle = {
    fontSize: '64px',
    marginBottom: '16px',
    opacity: 0.5,
  };

  // Obtenir les options de filtres
  const genres = [
    ...new Set(
      MusicSearchService.getByGenres
        ? Object.keys(MusicSearchService.getByGenres())
        : []
    ),
  ];
  const countries = [
    ...new Set(
      results.length > 0
        ? results.map(song => song.country)
        : ['Nigeria', 'Cameroon', 'Ghana', 'South Africa']
    ),
  ];
  const years = [
    ...new Set(
      results.length > 0 ? results.map(song => song.year) : [2023, 2024]
    ),
  ];

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Recherche musicale</h1>
        <p style={subtitleStyle}>
          Découvrez votre prochaine chanson favorite parmi notre catalogue
          africain
        </p>
      </div>

      {/* Barre de recherche principale */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Rechercher des artistes, titres, albums, genres..."
          style={searchInputStyle}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            e.target.style.background = 'rgba(255,255,255,0.15)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
        />

        <div style={searchActionsStyle}>
          {query && (
            <button
              style={actionButtonStyle}
              onClick={clearSearch}
              title="Effacer"
              onMouseEnter={e => {
                e.target.style.background = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }}
            >
              <X size={16} />
            </button>
          )}

          <button
            style={{
              ...actionButtonStyle,
              background: showFilters
                ? 'rgba(139, 92, 246, 0.3)'
                : 'rgba(255,255,255,0.1)',
            }}
            onClick={() => setShowFilters(!showFilters)}
            title="Filtres"
            onMouseEnter={e => {
              e.target.style.background = 'rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={e => {
              e.target.style.background = showFilters
                ? 'rgba(139, 92, 246, 0.3)'
                : 'rgba(255,255,255,0.1)';
            }}
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div style={filtersContainerStyle}>
        <div style={filtersGridStyle}>
          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Genre</label>
            <select
              style={filterSelectStyle}
              value={selectedFilters.genre}
              onChange={e =>
                setSelectedFilters(prev => ({ ...prev, genre: e.target.value }))
              }
            >
              <option value="all">Tous les genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Pays</label>
            <select
              style={filterSelectStyle}
              value={selectedFilters.country}
              onChange={e =>
                setSelectedFilters(prev => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
            >
              <option value="all">Tous les pays</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Année</label>
            <select
              style={filterSelectStyle}
              value={selectedFilters.year}
              onChange={e =>
                setSelectedFilters(prev => ({ ...prev, year: e.target.value }))
              }
            >
              <option value="all">Toutes les années</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recherches populaires et historique */}
      {!query && (
        <div style={quickSearchStyle}>
          <h3 style={quickSearchTitleStyle}>🔥 Recherches populaires</h3>
          <div style={tagsContainerStyle}>
            {popularSearches.map((term, index) => (
              <div
                key={index}
                style={tagStyle}
                onClick={() => setQuery(term)}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(139, 92, 246, 0.3)';
                  e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
              >
                {term}
              </div>
            ))}
          </div>

          {searchHistory.length > 0 && (
            <>
              <div
                style={{
                  ...quickSearchTitleStyle,
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>🕒 Recherches récentes</span>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                  onClick={clearHistory}
                >
                  Effacer
                </button>
              </div>
              <div style={tagsContainerStyle}>
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    style={{
                      ...tagStyle,
                      background: 'rgba(236, 72, 153, 0.2)',
                      borderColor: 'rgba(236, 72, 153, 0.3)',
                    }}
                    onClick={() => setQuery(term)}
                    onMouseEnter={e => {
                      e.target.style.background = 'rgba(236, 72, 153, 0.3)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = 'rgba(236, 72, 153, 0.2)';
                    }}
                  >
                    {term}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Résultats de recherche */}
      {query && (
        <div style={resultsContainerStyle}>
          <div style={resultsHeaderStyle}>
            <h3 style={resultsCountStyle}>
              {isLoading
                ? 'Recherche en cours...'
                : `${results.length} résultat${
                    results.length > 1 ? 's' : ''
                  } pour "${query}"`}
            </h3>
          </div>

          {isLoading ? (
            <div style={loadingStyle}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid rgba(139, 92, 246, 0.3)',
                  borderTop: '3px solid #8B5CF6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '12px',
                }}
              ></div>
              Recherche en cours...
            </div>
          ) : results.length > 0 ? (
            results.map(song => (
              <div
                key={song.id}
                style={resultItemStyle}
                onClick={() => handleSongPlay(song)}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  style={resultImageStyle}
                />

                <div style={resultInfoStyle}>
                  <h4 style={resultTitleStyle}>{song.title}</h4>
                  <div style={resultMetaStyle}>
                    <span>
                      <User size={14} /> {song.artist}
                    </span>
                    <span>
                      <MapPin size={14} /> {song.country}
                    </span>
                    <span>
                      <Clock size={14} /> {Math.floor(song.duration / 60)}:
                      {String(song.duration % 60).padStart(2, '0')}
                    </span>
                  </div>
                  <div style={resultTagsStyle}>
                    <span style={resultTagStyle}>{song.genre}</span>
                    <span
                      style={{
                        ...resultTagStyle,
                        background: 'rgba(236, 72, 153, 0.3)',
                        color: '#EC4899',
                      }}
                    >
                      {song.year}
                    </span>
                  </div>
                </div>

                <div style={resultActionsStyle}>
                  <FavoriteButton song={song} size={20} />
                  <button
                    style={playButtonStyle}
                    onClick={e => {
                      e.stopPropagation();
                      handleSongPlay(song);
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <Play size={20} fill="white" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>🔍</div>
              <h3
                style={{
                  fontSize: '20px',
                  marginBottom: '8px',
                  color: 'white',
                }}
              >
                Aucun résultat trouvé
              </h3>
              <p>
                Essayez avec des mots-clés différents ou modifiez vos filtres
              </p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchTab;
