// utils/CountryUtils.js
// Utilitaires pour la gestion des pays et régions

export class CountryUtils {
  // Mapping des drapeaux par pays
  static FLAGS = {
    // Afrique
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
    'Central African Republic': '🇨🇫',
    'Equatorial Guinea': '🇬🇶',
    'São Tomé and Príncipe': '🇸🇹',
    'Sierra Leone': '🇸🇱',
    Liberia: '🇱🇷',

    // Autres régions
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

  // Mapping des régions par pays
  static REGIONS = {
    'west-africa': [
      'Nigeria',
      'Ghana',
      'Ivory Coast',
      'Senegal',
      'Mali',
      'Burkina Faso',
      'Sierra Leone',
      'Liberia',
    ],
    'central-africa': [
      'Cameroon',
      'Congo',
      'Central African Republic',
      'Gabon',
      'Equatorial Guinea',
      'Chad',
      'São Tomé and Príncipe',
    ],
    'east-africa': ['Kenya', 'Ethiopia', 'Tanzania', 'Uganda', 'Rwanda'],
    'north-africa': ['Egypt', 'Morocco', 'Tunisia', 'Algeria', 'Libya'],
    'south-africa': ['South Africa'],
    caribbean: ['Martinique', 'Trinidad'],
    jamaica: ['Jamaica'],
    european: ['France', 'United Kingdom', 'Germany', 'Netherlands'],
    asian: ['Japan', 'South Korea', 'China', 'Thailand'],
    indian: ['India'],
    australian: ['Australia'],
    antarctica: ['Antarctica'],
  };

  // Genres musicaux par région/pays
  static POPULAR_GENRES = {
    Cameroon: ['makossa', 'bikutsi', 'afropop'],
    Nigeria: ['afrobeats', 'highlife', 'afropop', 'hip-hop'],
    'Ivory Coast': ['coupe-decale', 'zouglou', 'afropop'],
    Congo: ['ndombolo', 'rumba', 'soukous', 'amapiano'],
    'South Africa': ['house', 'gqom', 'amapiano', 'hip-hop'],
    Ghana: ['highlife', 'afrobeats', 'hiplife'],
    Senegal: ['mbalax', 'afropop'],
    Morocco: ['rai', 'chaabi'],
    Jamaica: ['reggae', 'dancehall'],
    France: ['world-fusion', 'electronic'],
  };

  /**
   * Obtient le drapeau d'un pays
   */
  static getFlag(country) {
    return this.FLAGS[country] || '🌍';
  }

  /**
   * Obtient la région d'un pays
   */
  static getRegion(country) {
    for (const [region, countries] of Object.entries(this.REGIONS)) {
      if (countries.includes(country)) {
        return region;
      }
    }
    return 'world';
  }

  /**
   * Obtient les pays d'une région
   */
  static getCountriesByRegion(region) {
    return this.REGIONS[region] || [];
  }

  /**
   * Obtient les genres populaires d'un pays
   */
  static getPopularGenres(country) {
    return this.POPULAR_GENRES[country] || ['afropop'];
  }

  /**
   * Formate le nom d'une région pour l'affichage
   */
  static formatRegionName(region) {
    const names = {
      'west-africa': "Afrique de l'Ouest",
      'central-africa': 'Afrique Centrale',
      'east-africa': "Afrique de l'Est",
      'north-africa': 'Afrique du Nord',
      'south-africa': 'Afrique du Sud',
      caribbean: 'Caraïbes',
      jamaica: 'Jamaïque',
      european: 'Europe',
      asian: 'Asie',
      indian: 'Inde',
      australian: 'Australie',
      antarctica: 'Antarctique',
      world: 'Monde',
    };
    return names[region] || region;
  }

  /**
   * Obtient les métadonnées d'un pays
   */
  static getCountryMetadata(country) {
    return {
      flag: this.getFlag(country),
      region: this.getRegion(country),
      popularGenres: this.getPopularGenres(country),
      regionName: this.formatRegionName(this.getRegion(country)),
    };
  }

  /**
   * Filtre les chansons par région
   */
  static filterSongsByRegion(songs, region) {
    const countries = this.getCountriesByRegion(region);
    return songs.filter(song => countries.includes(song.country));
  }

  /**
   * Groupe les chansons par pays
   */
  static groupSongsByCountry(songs) {
    const grouped = {};
    songs.forEach(song => {
      if (!grouped[song.country]) {
        grouped[song.country] = [];
      }
      grouped[song.country].push(song);
    });
    return grouped;
  }

  /**
   * Groupe les chansons par région
   */
  static groupSongsByRegion(songs) {
    const grouped = {};
    songs.forEach(song => {
      const region = this.getRegion(song.country);
      if (!grouped[region]) {
        grouped[region] = [];
      }
      grouped[region].push(song);
    });
    return grouped;
  }

  /**
   * Valide si un pays existe dans notre mapping
   */
  static isValidCountry(country) {
    return Object.keys(this.FLAGS).includes(country);
  }

  /**
   * Obtient la liste de tous les pays supportés
   */
  static getAllCountries() {
    return Object.keys(this.FLAGS);
  }

  /**
   * Obtient la liste de toutes les régions supportées
   */
  static getAllRegions() {
    return Object.keys(this.REGIONS);
  }

  /**
   * Calcule les statistiques d'une région
   */
  static getRegionStats(songs, region) {
    const regionSongs = this.filterSongsByRegion(songs, region);
    const countries = this.groupSongsByCountry(regionSongs);

    return {
      totalSongs: regionSongs.length,
      countries: Object.keys(countries).length,
      totalStreams: regionSongs.reduce((sum, song) => sum + song.streams, 0),
      topCountry: Object.entries(countries).sort(
        ([, a], [, b]) => b.length - a.length
      )[0]?.[0],
      genres: [...new Set(regionSongs.map(song => song.genre))],
    };
  }
}

export default CountryUtils;
