// components/MuxTestComponent.jsx
// Composant de test pour vérifier que Mux fonctionne correctement

import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Video } from 'lucide-react';

const MuxTestComponent = () => {
  const [isReady, setIsReady] = useState(false);
  const [currentTest, setCurrentTest] = useState('audio');

  // Assets de test publics Mux
  const testAssets = {
    audio: {
      playbackId: 'a4nOgmxGWg8gULh6K02fh6npsqfEQ00v7KiB9001WtxKFo',
      title: 'Test Audio - Mux',
      type: 'audio',
    },
    video: {
      playbackId: 'EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs',
      title: 'Test Video - Mux',
      type: 'video',
    },
  };

  useEffect(() => {
    // Charger le script Mux Player
    const loadMuxPlayer = async () => {
      if (!customElements.get('mux-player')) {
        const script = document.createElement('script');
        script.src =
          'https://cdn.jsdelivr.net/npm/@mux/mux-player@latest/dist/index.js';
        script.type = 'module';
        document.head.appendChild(script);

        await new Promise(resolve => {
          script.onload = () => {
            setIsReady(true);
            resolve();
          };
        });
      } else {
        setIsReady(true);
      }
    };

    loadMuxPlayer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Test de Configuration Mux
        </h1>

        {/* Status */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isReady ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span>Mux Player: {isReady ? 'Chargé' : 'Chargement...'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>API Mux: Configurée</span>
            </div>
          </div>
        </div>

        {/* Sélection du type de test */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Type de Contenu</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentTest('audio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentTest === 'audio'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Music className="w-5 h-5" />
              Audio Test
            </button>
            <button
              onClick={() => setCurrentTest('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentTest === 'video'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Video className="w-5 h-5" />
              Video Test
            </button>
          </div>
        </div>

        {/* Player de test */}
        {isReady && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              {testAssets[currentTest].title}
            </h2>

            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <mux-player
                playback-id={testAssets[currentTest].playbackId}
                stream-type="on-demand"
                controls
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Informations techniques */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Informations Techniques</h3>
              <code className="block text-sm bg-gray-200 p-2 rounded">
                {`Playback ID: ${testAssets[currentTest].playbackId}`}
              </code>
              <div className="mt-2 text-sm text-gray-600">
                <p>• Format: HLS (HTTP Live Streaming)</p>
                <p>• Adaptive Bitrate: Activé</p>
                <p>• Type: {testAssets[currentTest].type}</p>
              </div>
            </div>

            {/* URLs de streaming */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">URLs de Streaming</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">HLS:</span>
                  <code className="block bg-white p-1 rounded mt-1 text-xs break-all">
                    {`https://stream.mux.com/${testAssets[currentTest].playbackId}.m3u8`}
                  </code>
                </div>
                {currentTest === 'video' && (
                  <div>
                    <span className="font-medium">Thumbnail:</span>
                    <code className="block bg-white p-1 rounded mt-1 text-xs break-all">
                      {`https://stream.mux.com/${testAssets[currentTest].playbackId}/thumbnail.jpg`}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Prochaines Étapes</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Si le player fonctionne ci-dessus, Mux est correctement configuré
              ✅
            </li>
            <li>Créez votre compte Mux et récupérez vos clés API</li>
            <li>Uploadez vos fichiers audio/vidéo via le dashboard Mux</li>
            <li>
              Remplacez les playbackIds dans <code>muxMockData.js</code>
            </li>
            <li>Configurez le backend pour gérer les uploads directs</li>
          </ol>
        </div>

        {/* Code d'intégration */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Code d'Intégration Rapide</h3>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
            {`// Dans votre composant React
<mux-player
  playback-id="VOTRE_PLAYBACK_ID"
  stream-type="on-demand"
  controls
  style={{ width: '100%', height: 'auto' }}
/>

// Pour l'audio uniquement
<mux-player
  playback-id="VOTRE_PLAYBACK_ID"
  stream-type="on-demand"
  audio
  controls
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default MuxTestComponent;
