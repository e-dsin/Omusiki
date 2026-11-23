import React, { useState, useContext } from "react";
import { Download, X } from "lucide-react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { AuthContext } from "../../contexts/AuthContext";
import { mockSongs } from "../../data/mockData";
import SongRow from "../Common/SongRow";

const OfflineTab = () => {
  const [downloadedSongs, setDownloadedSongs] = useState([1, 3, 5]);
  const { play, currentSong, isPlaying } = useContext(PlayerContext);
  const { user } = useContext(AuthContext);

  const getDownloadedSongs = () => {
    return downloadedSongs
      .map((id) => mockSongs.find((song) => song.id === id))
      .filter(Boolean);
  };

  const toggleDownload = (songId) => {
    if (downloadedSongs.includes(songId)) {
      setDownloadedSongs(downloadedSongs.filter((id) => id !== songId));
    } else {
      setDownloadedSongs([...downloadedSongs, songId]);
    }
  };

  const goToSubscription = () => {
    const subscriptionButton = document.querySelector(
      '[data-tab="subscription"]'
    );
    if (subscriptionButton) subscriptionButton.click();
  };

  return (
    <div className="p-6">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Mode Hors Ligne
      </h2>

      {user?.subscription === "Gratuit" ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <p className="text-yellow-800 mb-2">
            Le mode hors ligne est réservé aux abonnés Premium et Famille.
          </p>
          <button
            onClick={goToSubscription}
            className="text-purple-600 underline"
          >
            Mettre à niveau votre abonnement
          </button>
        </div>
      ) : (
        <>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              {downloadedSongs.length} chansons téléchargées •{" "}
              {Math.round(downloadedSongs.length * 3.5)} MB
            </p>
          </div>

          <h3
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Chansons téléchargées
          </h3>
          <div className="space-y-2">
            {getDownloadedSongs().map((song) => (
              <div key={song.id} className="flex items-center">
                <div className="flex-1">
                  <SongRow
                    song={song}
                    onPlay={play}
                    isPlaying={currentSong?.id === song.id && isPlaying}
                  />
                </div>
                <button
                  onClick={() => toggleDownload(song.id)}
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <h3
            className="text-xl font-bold mt-8 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Disponible au téléchargement
          </h3>
          <div className="space-y-2">
            {mockSongs
              .filter((song) => !downloadedSongs.includes(song.id))
              .map((song) => (
                <div key={song.id} className="flex items-center">
                  <div className="flex-1">
                    <SongRow
                      song={song}
                      onPlay={play}
                      isPlaying={currentSong?.id === song.id && isPlaying}
                    />
                  </div>
                  <button
                    onClick={() => toggleDownload(song.id)}
                    className="ml-4 text-green-500 hover:text-green-600"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OfflineTab;
