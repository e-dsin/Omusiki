// hooks/useOffline.ts

import { useState, useEffect } from 'react';
import { storageService } from '../services/storage.service';
import { apiService } from '../services/api.service';
import { Song, DownloadedSong, UseOfflineReturn } from '../types';

export const useOffline = (): UseOfflineReturn => {
  const [downloadedSongs, setDownloadedSongs] = useState<DownloadedSong[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    loadDownloadedSongs();
  }, []);

  const loadDownloadedSongs = async () => {
    try {
      const songs = await storageService.getAllOfflineSongs();
      setDownloadedSongs(songs);
    } catch (error) {
      console.error('Failed to load offline songs:', error);
    }
  };

  const download = async (song: Song): Promise<void> => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Get stream URL
      const streamResponse = await apiService.getStreamUrl(song.id);
      if (!streamResponse.success || !streamResponse.data) {
        throw new Error('Failed to get stream URL');
      }

      // Download audio file
      const response = await fetch(streamResponse.data.url);
      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength || '0', 10);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to read response');

      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        received += value.length;

        if (total > 0) {
          setDownloadProgress((received / total) * 100);
        }
      }

      const blob = new Blob(chunks, { type: 'audio/mpeg' });

      // Save to IndexedDB
      await storageService.saveSongOffline(song, blob);

      // Update state
      await loadDownloadedSongs();
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const remove = async (songId: number): Promise<void> => {
    try {
      await storageService.removeOfflineSong(songId);
      await loadDownloadedSongs();
    } catch (error) {
      console.error('Failed to remove offline song:', error);
    }
  };

  const clearAll = async (): Promise<void> => {
    try {
      for (const song of downloadedSongs) {
        await storageService.removeOfflineSong(song.id);
      }
      setDownloadedSongs([]);
    } catch (error) {
      console.error('Failed to clear offline songs:', error);
    }
  };

  const getTotalSize = (): number => {
    return downloadedSongs.reduce((total, song) => total + song.fileSize, 0);
  };

  return {
    downloadedSongs,
    isDownloading,
    downloadProgress,
    download,
    remove,
    clearAll,
    getTotalSize,
  };
};
