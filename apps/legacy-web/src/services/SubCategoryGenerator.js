// services/SubCategoryGenerator.js
// Générateur intelligent de sous-catégories pour les charts

export class SubCategoryGenerator {
  /**
   * Génère les sous-catégories appropriées selon le type de chart
   * @param {Object} chart - L'objet chart avec ses données
   * @returns {Array} - Tableau des sous-catégories
   */
  static generateSubCategories(chart) {
    if (!chart || !chart.playlist) return [];

    switch (chart.category) {
      case 'country':
        return this.generateCountrySubCategories(chart);
      case 'region':
        return this.generateRegionSubCategories(chart);
      case 'world':
        return this.generateWorldSubCategories(chart);
      default:
        return [];
    }
  }

  /**
   * Génère les sous-catégories pour un pays (par genres)
   */
  static generateCountrySubCategories(chart) {
    const countryGenres = {};

    chart.playlist.forEach(song => {
      if (!countryGenres[song.genre]) {
        countryGenres[song.genre] = [];
      }
      countryGenres[song.genre].push(song);
    });

    return Object.entries(countryGenres)
      .sort(([, a], [, b]) => b.length - a.length)
      .slice(0, 6)
      .map(([genre, songs]) => ({
        id: `${chart.id}_${genre}`,
        title: `${this.capitalizeFirst(genre)} ${chart.country}`,
        artist: `${songs.length} titres • ${chart.country}`,
        cover: songs[0]?.cover,
        duration: this.formatTotalDuration(songs),
        tracks: songs.length,
        playlist: songs.sort((a, b) => b.streams - a.streams),
        type: 'genre',
        streams: songs.reduce((sum, s) => sum + s.streams, 0),
        genre: genre,
        country: chart.country,
      }));
  }

  /**
   * Génère les sous-catégories pour une région (par pays)
   */
  static generateRegionSubCategories(chart) {
    const regionCountries = {};

    chart.playlist.forEach(song => {
      if (!regionCountries[song.country]) {
        regionCountries[song.country] = [];
      }
      regionCountries[song.country].push(song);
    });

    return Object.entries(regionCountries)
      .sort(
        ([, a], [, b]) =>
          b.reduce((sum, s) => sum + s.streams, 0) -
          a.reduce((sum, s) => sum + s.streams, 0)
      )
      .slice(0, 8)
      .map(([country, songs]) => ({
        id: `${chart.id}_${country}`,
        title: `Top ${country}`,
        artist: `${songs.length} titres • Hits locaux`,
        cover: songs[0]?.cover,
        duration: this.formatTotalDuration(songs),
        tracks: songs.length,
        playlist: songs.sort((a, b) => b.streams - a.streams),
        type: 'country',
        streams: songs.reduce((sum, s) => sum + s.streams, 0),
        country: country,
      }));
  }

  /**
   * Génère les sous-catégories pour World Music (par régions mondiales)
   */
  static generateWorldSubCategories(chart) {
    const worldRegions = {
      European: this.filterByCountries(chart.playlist, [
        'France',
        'United Kingdom',
        'Germany',
        'Netherlands',
      ]),
      Asian: this.filterByCountries(chart.playlist, [
        'Japan',
        'South Korea',
        'China',
        'Thailand',
        'India',
      ]),
      Australian: this.filterByCountries(chart.playlist, ['Australia']),
      Caribbean: this.filterByCountries(chart.playlist, [
        'Martinique',
        'Trinidad',
      ]),
      Fusion: chart.playlist.filter(s => s.tags && s.tags.includes('fusion')),
    };

    return Object.entries(worldRegions)
      .filter(([, songs]) => songs.length > 0)
      .map(([region, songs]) => ({
        id: `${chart.id}_${region}`,
        title: `${region} Fusion`,
        artist: `${songs.length} titres • Fusion mondiale`,
        cover: songs[0]?.cover,
        duration: this.formatTotalDuration(songs),
        tracks: songs.length,
        playlist: songs,
        type: 'fusion',
        streams: songs.reduce((sum, s) => sum + s.streams, 0),
        region: region,
      }));
  }

  /**
   * Filtre les chansons par pays
   */
  static filterByCountries(playlist, countries) {
    return playlist.filter(song => countries.includes(song.country));
  }

  /**
   * Formate la durée totale d'une liste de chansons
   */
  static formatTotalDuration(songs) {
    const totalSeconds = songs.reduce((sum, song) => sum + song.duration, 0);
    const totalMinutes = Math.floor(totalSeconds / 60);

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}min`;
    }

    return `${totalMinutes}min`;
  }

  /**
   * Met en forme le première lettre en majuscule
   */
  static capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Génère les statistiques d'une sous-catégorie
   */
  static getSubCategoryStats(songs) {
    return {
      totalTracks: songs.length,
      totalStreams: songs.reduce((sum, s) => sum + s.streams, 0),
      totalDuration: songs.reduce((sum, s) => sum + s.duration, 0),
      averageYear: Math.round(
        songs.reduce((sum, s) => sum + s.year, 0) / songs.length
      ),
      topArtists: this.getTopArtists(songs, 3),
      genres: [...new Set(songs.map(s => s.genre))],
    };
  }

  /**
   * Obtient les top artistes d'une liste de chansons
   */
  static getTopArtists(songs, limit = 3) {
    const artistCounts = {};

    songs.forEach(song => {
      if (!artistCounts[song.artist]) {
        artistCounts[song.artist] = {
          count: 0,
          streams: 0,
          artist: song.artist,
        };
      }
      artistCounts[song.artist].count++;
      artistCounts[song.artist].streams += song.streams;
    });

    return Object.values(artistCounts)
      .sort((a, b) => b.streams - a.streams)
      .slice(0, limit);
  }

  /**
   * Génère des recommandations basées sur une sous-catégorie
   */
  static generateRecommendations(subCategory, allPlaylist, limit = 5) {
    if (!subCategory || !allPlaylist) return [];

    const baseGenre = subCategory.genre;
    const baseCountry = subCategory.country;

    return allPlaylist
      .filter(
        song =>
          song.genre === baseGenre ||
          song.country === baseCountry ||
          (song.tags &&
            song.tags.some(tag =>
              subCategory.playlist.some(s => s.tags && s.tags.includes(tag))
            ))
      )
      .filter(song => !subCategory.playlist.some(s => s.id === song.id))
      .sort((a, b) => b.streams - a.streams)
      .slice(0, limit);
  }
}

export default SubCategoryGenerator;
