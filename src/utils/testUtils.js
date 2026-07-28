// utils/testUtils.js
import { MUSIC_DATABASE, MusicSearchService } from '../services/musicDatabase';

/**
 * Utilitaires de test pour valider le bon fonctionnement d'OMusiki
 */

export class OMusikiTestSuite {
  static results = [];

  // Test de la base de données musicale
  static testMusicDatabase() {
    console.log('🎵 Test de la base de données musicale...');
    const results = [];

    // Test 1: Vérifier que la base contient des données
    results.push({
      test: 'Base de données non vide',
      passed: MUSIC_DATABASE.length > 0,
      details: `${MUSIC_DATABASE.length} chansons trouvées`,
    });

    // Test 2: Vérifier la structure des données
    const firstSong = MUSIC_DATABASE[0];
    const requiredFields = [
      'id',
      'title',
      'artist',
      'genre',
      'country',
      'audioUrl',
      'cover',
    ];
    const hasAllFields = requiredFields.every(field =>
      firstSong.hasOwnProperty(field)
    );

    results.push({
      test: 'Structure des données valide',
      passed: hasAllFields,
      details: `Champs requis: ${requiredFields.join(', ')}`,
    });

    // Test 3: Vérifier les URLs audio
    const validUrls = MUSIC_DATABASE.filter(
      song => song.audioUrl && song.audioUrl.startsWith('http')
    ).length;

    results.push({
      test: 'URLs audio valides',
      passed: validUrls === MUSIC_DATABASE.length,
      details: `${validUrls}/${MUSIC_DATABASE.length} URLs valides`,
    });

    // Test 4: Vérifier la diversité des genres
    const uniqueGenres = [...new Set(MUSIC_DATABASE.map(song => song.genre))];
    results.push({
      test: 'Diversité des genres',
      passed: uniqueGenres.length >= 5,
      details: `${uniqueGenres.length} genres: ${uniqueGenres.join(', ')}`,
    });

    // Test 5: Vérifier la diversité des pays
    const uniqueCountries = [
      ...new Set(MUSIC_DATABASE.map(song => song.country)),
    ];
    results.push({
      test: 'Diversité géographique',
      passed: uniqueCountries.length >= 3,
      details: `${uniqueCountries.length} pays: ${uniqueCountries.join(', ')}`,
    });

    return results;
  }

  // Test du service de recherche
  static testSearchService() {
    console.log('🔍 Test du service de recherche...');
    const results = [];

    // Test 1: Recherche par titre
    const titleResults = MusicSearchService.searchByTitle('Lagos');
    results.push({
      test: 'Recherche par titre',
      passed: titleResults.length > 0,
      details: `"Lagos" → ${titleResults.length} résultats`,
    });

    // Test 2: Recherche par genre
    const genreResults = MusicSearchService.searchByGenre('afrobeats');
    results.push({
      test: 'Recherche par genre',
      passed: genreResults.length > 0,
      details: `"afrobeats" → ${genreResults.length} résultats`,
    });

    // Test 3: Recherche par pays
    const countryResults = MusicSearchService.searchByCountry('Nigeria');
    results.push({
      test: 'Recherche par pays',
      passed: countryResults.length > 0,
      details: `"Nigeria" → ${countryResults.length} résultats`,
    });

    // Test 4: Recherche globale
    const globalResults = MusicSearchService.searchGlobal('music');
    results.push({
      test: 'Recherche globale',
      passed: globalResults.length > 0,
      details: `"music" → ${globalResults.length} résultats`,
    });

    // Test 5: Obtenir chansons populaires
    const popular = MusicSearchService.getPopular(5);
    results.push({
      test: 'Chansons populaires',
      passed: popular.length === 5,
      details: `Top 5 récupéré correctement`,
    });

    return results;
  }

  // Test des contextes React
  static testContexts() {
    console.log('⚛️ Test des contextes React...');
    const results = [];

    // Test localStorage pour les favoris
    try {
      localStorage.setItem('omusiki_test', 'test');
      const retrieved = localStorage.getItem('omusiki_test');
      localStorage.removeItem('omusiki_test');

      results.push({
        test: 'localStorage disponible',
        passed: retrieved === 'test',
        details: 'Stockage des favoris possible',
      });
    } catch (error) {
      results.push({
        test: 'localStorage disponible',
        passed: false,
        details: 'localStorage non disponible',
      });
    }

    return results;
  }

  // Test des URLs audio
  static async testAudioUrls() {
    console.log('🎧 Test des URLs audio...');
    const results = [];
    const testUrls = MUSIC_DATABASE.slice(0, 3); // Tester les 3 premières

    for (const song of testUrls) {
      try {
        const response = await fetch(song.audioUrl, { method: 'HEAD' });
        results.push({
          test: `Audio: ${song.title}`,
          passed: response.ok,
          details: `${response.status} ${response.statusText}`,
        });
      } catch (error) {
        results.push({
          test: `Audio: ${song.title}`,
          passed: false,
          details: `Erreur: ${error.message}`,
        });
      }
    }

    return results;
  }

  // Test des images de couverture
  static async testCoverImages() {
    console.log('🖼️ Test des images de couverture...');
    const results = [];
    const testImages = MUSIC_DATABASE.slice(0, 3); // Tester les 3 premières

    for (const song of testImages) {
      try {
        const response = await fetch(song.cover, { method: 'HEAD' });
        results.push({
          test: `Image: ${song.title}`,
          passed:
            response.ok &&
            response.headers.get('content-type')?.startsWith('image/'),
          details: `${response.status} - ${response.headers.get(
            'content-type'
          )}`,
        });
      } catch (error) {
        results.push({
          test: `Image: ${song.title}`,
          passed: false,
          details: `Erreur: ${error.message}`,
        });
      }
    }

    return results;
  }

  // Exécuter tous les tests
  static async runAllTests() {
    console.log('🚀 Démarrage de la suite de tests OMusiki...\n');

    const allResults = [];

    // Tests synchrones
    allResults.push(...this.testMusicDatabase());
    allResults.push(...this.testSearchService());
    allResults.push(...this.testContexts());

    // Tests asynchrones
    allResults.push(...(await this.testAudioUrls()));
    allResults.push(...(await this.testCoverImages()));

    // Affichage des résultats
    console.log('\n📊 Résultats des tests:');
    console.log('=' * 50);

    const passed = allResults.filter(r => r.passed).length;
    const total = allResults.length;

    allResults.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.details}`);
    });

    console.log('=' * 50);
    console.log(
      `🎯 Score: ${passed}/${total} tests réussis (${Math.round(
        (passed / total) * 100
      )}%)`
    );

    if (passed === total) {
      console.log('🎉 Tous les tests sont passés ! OMusiki est prêt !');
    } else {
      console.log(
        '⚠️ Certains tests ont échoué. Vérifiez les détails ci-dessus.'
      );
    }

    return {
      passed,
      total,
      success: passed === total,
      results: allResults,
    };
  }

  // Test de performance
  static performanceTest() {
    console.log('⚡ Test de performance...');
    const results = [];

    // Test vitesse de recherche
    const start = performance.now();
    MusicSearchService.searchGlobal('music');
    const searchTime = performance.now() - start;

    results.push({
      test: 'Vitesse de recherche',
      passed: searchTime < 100, // moins de 100ms
      details: `${searchTime.toFixed(2)}ms`,
    });

    // Test mémoire (approximatif)
    const memoryUsage = JSON.stringify(MUSIC_DATABASE).length;
    results.push({
      test: 'Utilisation mémoire',
      passed: memoryUsage < 1000000, // moins de 1MB
      details: `${Math.round(memoryUsage / 1024)}KB`,
    });

    return results;
  }
}

// Fonction d'aide pour déboguer les favoris
export const debugFavorites = () => {
  try {
    const favorites = JSON.parse(
      localStorage.getItem('omusiki_favorites') || '[]'
    );
    console.log('❤️ Favoris actuels:', favorites);
    console.log(`📊 Nombre total: ${favorites.length}`);

    if (favorites.length > 0) {
      const genres = [...new Set(favorites.map(f => f.genre))];
      console.log(`🎵 Genres: ${genres.join(', ')}`);
    }

    return favorites;
  } catch (error) {
    console.error('❌ Erreur lecture favoris:', error);
    return [];
  }
};

// Fonction pour nettoyer les données de test
export const clearTestData = () => {
  localStorage.removeItem('omusiki_favorites');
  console.log('🧹 Données de test nettoyées');
};

// Fonction pour générer des données de test
export const generateTestFavorites = () => {
  const testFavorites = MUSIC_DATABASE.slice(0, 3).map(song => ({
    ...song,
    addedAt: new Date().toISOString(),
    addedTimestamp: Date.now(),
  }));

  localStorage.setItem('omusiki_favorites', JSON.stringify(testFavorites));
  console.log('🎯 Favoris de test générés:', testFavorites.length);
  return testFavorites;
};

// Export pour utilisation en console
if (typeof window !== 'undefined') {
  window.OMusikiTest = OMusikiTestSuite;
  window.debugFavorites = debugFavorites;
  window.clearTestData = clearTestData;
  window.generateTestFavorites = generateTestFavorites;
}
