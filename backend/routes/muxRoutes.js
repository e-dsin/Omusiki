// backend/routes/muxRoutes.js
// Configuration backend pour sécuriser les clés Mux

const express = require("express");
const router = express.Router();
const Mux = require("@mux/mux-node");
const { Video, Data } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

// Middleware d'authentification
const authenticate = require("../middleware/auth");

// Créer une URL d'upload directe
router.post("/upload-url", authenticate, async (req, res) => {
  try {
    const { songTitle, artistName, duration } = req.body;

    // Créer un upload direct
    const upload = await Video.Uploads.create({
      cors_origin: process.env.FRONTEND_URL || "http://localhost:3000",
      new_asset_settings: {
        playback_policy: "public",
        passthrough: JSON.stringify({
          userId: req.user.id,
          songTitle,
          artistName,
          uploadedAt: new Date().toISOString(),
        }),
        // Optimisations pour l'audio
        video_quality: "basic", // Qualité basique pour l'audio
        audio_only: req.body.audioOnly || false,
        mp4_support: "standard",
      },
    });

    // Sauvegarder en base de données
    await saveUploadRecord({
      uploadId: upload.id,
      userId: req.user.id,
      songTitle,
      artistName,
      status: "pending",
    });

    res.json({
      uploadUrl: upload.url,
      uploadId: upload.id,
    });
  } catch (error) {
    console.error("Error creating upload URL:", error);
    res.status(500).json({ error: "Failed to create upload URL" });
  }
});

// Webhook pour recevoir les notifications de Mux
router.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      // Vérifier la signature du webhook
      const signature = req.headers["mux-signature"];
      const isValid = Mux.Webhooks.verifyHeader(
        req.body,
        signature,
        process.env.MUX_WEBHOOK_SECRET
      );

      if (!isValid) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      const event = JSON.parse(req.body);

      switch (event.type) {
        case "video.asset.created":
          await handleAssetCreated(event.data);
          break;
        case "video.asset.ready":
          await handleAssetReady(event.data);
          break;
        case "video.asset.errored":
          await handleAssetError(event.data);
          break;
        case "video.upload.asset_created":
          await handleUploadComplete(event.data);
          break;
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({ error: "Webhook processing failed" });
    }
  }
);

// Obtenir les détails d'un asset
router.get("/assets/:assetId", authenticate, async (req, res) => {
  try {
    const asset = await Video.Assets.get(req.params.assetId);

    // Vérifier les permissions
    const passthrough = JSON.parse(asset.passthrough || "{}");
    if (passthrough.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({
      id: asset.id,
      playbackId: asset.playback_ids?.[0]?.id,
      duration: asset.duration,
      status: asset.status,
      audioOnly: asset.audio_only,
      createdAt: asset.created_at,
      metadata: passthrough,
    });
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Failed to fetch asset" });
  }
});

// Obtenir les statistiques de lecture
router.get("/stats/playback/:playbackId", authenticate, async (req, res) => {
  try {
    const { timeframe = "7:days" } = req.query;

    const views = await Data.Metrics.list({
      metric_name: "views",
      timeframe,
      filters: [`playback_id:${req.params.playbackId}`],
    });

    const watchTime = await Data.Metrics.list({
      metric_name: "watch_time",
      timeframe,
      filters: [`playback_id:${req.params.playbackId}`],
    });

    res.json({
      views: views.data,
      watchTime: watchTime.data,
      timeframe,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// Créer un live stream pour les concerts
router.post("/live-streams", authenticate, async (req, res) => {
  try {
    // Vérifier que l'utilisateur est un artiste
    if (req.user.role !== "artist") {
      return res
        .status(403)
        .json({ error: "Only artists can create live streams" });
    }

    const liveStream = await Video.LiveStreams.create({
      playback_policy: "public",
      new_asset_settings: {
        playback_policy: "public",
      },
      passthrough: JSON.stringify({
        artistId: req.user.id,
        artistName: req.user.name,
        createdAt: new Date().toISOString(),
      }),
    });

    res.json({
      streamKey: liveStream.stream_key,
      playbackId: liveStream.playback_ids?.[0]?.id,
      rtmpUrl: `rtmps://global-live.mux.com:443/app/${liveStream.stream_key}`,
      status: liveStream.status,
    });
  } catch (error) {
    console.error("Error creating live stream:", error);
    res.status(500).json({ error: "Failed to create live stream" });
  }
});

// Handlers pour les webhooks
async function handleAssetReady(data) {
  const { id, playback_ids, duration, passthrough } = data;
  const metadata = JSON.parse(passthrough || "{}");

  // Mettre à jour la base de données
  await updateSongRecord({
    uploadId: metadata.uploadId,
    assetId: id,
    playbackId: playback_ids?.[0]?.id,
    duration,
    status: "ready",
  });

  // Notifier l'artiste
  await notifyArtist(metadata.userId, {
    type: "upload_complete",
    songTitle: metadata.songTitle,
  });
}

async function handleAssetError(data) {
  const { passthrough, errors } = data;
  const metadata = JSON.parse(passthrough || "{}");

  // Logger l'erreur
  console.error("Asset error:", errors);

  // Mettre à jour le statut
  await updateSongRecord({
    uploadId: metadata.uploadId,
    status: "error",
    errorMessage: errors?.[0]?.message,
  });

  // Notifier l'artiste
  await notifyArtist(metadata.userId, {
    type: "upload_failed",
    songTitle: metadata.songTitle,
    error: errors?.[0]?.message,
  });
}

// Fonctions helper (à implémenter selon votre base de données)
async function saveUploadRecord(data) {
  // Implémenter selon votre ORM/base de données
}

async function updateSongRecord(data) {
  // Implémenter selon votre ORM/base de données
}

async function notifyArtist(userId, notification) {
  // Implémenter selon votre système de notifications
}

module.exports = router;
