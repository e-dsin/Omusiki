// services/musicDatabase.js - Extended Version with 100+ tracks
export const MUSIC_DATABASE = [
  // ============ WEST AND CENTRAL AFRICA (60 tracks) ============

  // === CAMEROON (20 tracks) ===
  // Makossa
  {
    id: 'cmr_makossa_001',
    title: 'Dibalabobe',
    artist: 'Bebell',
    album: 'Dibalabobe',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'UBomdrVsYo016YZkqO8orIRIXsX00j9yZDz401xQWS01n3s',
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl: 'biblio/audio/Bebell-Dibalabobe.wav',
    cover: 'biblio/images/Bebell_3.jpg',
    license: 'CC BY-SA 4.0',
    description: 'Makossa authentique avec des rythmes entraînants',
    tags: ['makossa', 'cameroon', 'traditional', 'douala'],
    streams: 850000,
    likes: 42000,
    language: 'FR',
  },
  {
    id: 'cmr_makossa_002',
    title: 'Mboko God',
    artist: 'Charlotte Dipanda',
    album: 'Cameroon Pride',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2024,
    duration: 198,
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion makossa moderne avec des influences jazz',
    tags: ['makossa', 'modern', 'jazz', 'cameroon'],
    streams: 720000,
    likes: 35000,
    language: 'FR',
  },
  {
    id: 'cmr_makossa_003',
    title: 'Yaoundé Calling',
    artist: 'Petit Pays',
    album: 'Capital Vibes',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 267,
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Hommage à la capitale camerounaise',
    tags: ['makossa', 'yaoundé', 'capital', 'tribute'],
    streams: 950000,
    likes: 47000,
    language: 'FR',
  },
  {
    id: 'cmr_makossa_004',
    title: 'Littoral Express',
    artist: 'Grace Decca',
    album: 'Coastal Dreams',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2024,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Voyage musical le long de la côte camerounaise',
    tags: ['makossa', 'coastal', 'journey', 'littoral'],
    streams: 680000,
    likes: 34000,
    language: 'FR',
  },
  {
    id: 'cmr_makossa_005',
    title: 'Bassa Rhythm',
    artist: 'Lapiro de Mbanga',
    album: 'Cultural Roots',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 289,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Rythmes traditionnels Bassa modernisés',
    tags: ['makossa', 'bassa', 'traditional', 'roots'],
    streams: 590000,
    likes: 29000,
    language: 'BASSA',
  },
  {
    id: 'cmr_makossa_006',
    title: 'Ewondo Spirit',
    artist: 'Anne-Marie Nzié',
    album: 'Ancestral Songs',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2024,
    duration: 245,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Célébration de la culture Ewondo',
    tags: ['makossa', 'ewondo', 'culture', 'spirit'],
    streams: 820000,
    likes: 41000,
    language: 'EWONDO',
  },
    {
    id: 'cmr_makossa_011',
    title: 'Duta Longo',
    artist: 'Bebell',
    album: 'Dibalabobe',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'UBomdrVsYo016YZkqO8orIRIXsX00j9yZDz401xQWS01n3s',
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl: 'biblio/audio/Bebell-Duta-Longo.wav',
    cover: 'biblio/images/Bebell_3.jpg',
    license: 'CC BY-SA 4.0',
    description: 'Makossa authentique avec des rythmes entraînants',
    tags: ['makossa', 'cameroon', 'traditional', 'douala'],
    streams: 850000,
    likes: 42000,
    language: 'FR',
  },
    {
    id: 'cmr_makossa_012',
    title: 'Madiba',
    artist: 'Bebell',
    album: 'Dibalabobe',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'UBomdrVsYo016YZkqO8orIRIXsX00j9yZDz401xQWS01n3s',
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl: 'biblio/audio/Bebell-Madiba.wav',
    cover: 'biblio/images/Bebell_3.jpg',
    license: 'CC BY-SA 4.0',
    description: 'Makossa authentique avec des rythmes entraînants',
    tags: ['makossa', 'cameroon', 'traditional', 'douala'],
    streams: 850000,
    likes: 42000,
    language: 'FR',
  },
    {
    id: 'cmr_makossa_013',
    title: 'Muka',
    artist: 'Bebell',
    album: 'Dibalabobe',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'UBomdrVsYo016YZkqO8orIRIXsX00j9yZDz401xQWS01n3s',
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl: 'biblio/audio/Bebell-Muka.wav',
    cover: 'biblio/images/Bebell_3.jpg',
    license: 'CC BY-SA 4.0',
    description: 'Makossa authentique avec des rythmes entraînants',
    tags: ['makossa', 'cameroon', 'traditional', 'douala'],
    streams: 850000,
    likes: 42000,
    language: 'FR',
  },
    {
    id: 'cmr_makossa_014',
    title: 'Ndolo',
    artist: 'Bebell',
    album: 'Dibalabobe',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'UBomdrVsYo016YZkqO8orIRIXsX00j9yZDz401xQWS01n3s',
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl: 'biblio/audio/Bebell-Ndolo.wav',
    cover: 'biblio/images/Bebell_3.jpg',
    license: 'CC BY-SA 4.0',
    description: 'Makossa authentique avec des rythmes entraînants',
    tags: ['makossa', 'cameroon', 'traditional', 'douala'],
    streams: 850000,
    likes: 42000,
    language: 'FR',
  },
  {
    id: 'cmr_makossa_015',
    title: 'Trouble',
    artist: 'Bebell',
    album: 'Dibalabobe',
    genre: 'makossa',
    country: 'Cameroon',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'UBomdrVsYo016YZkqO8orIRIXsX00j9yZDz401xQWS01n3s',
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl: 'biblio/audio/Bebell-Trouble.wav',
    cover: 'biblio/images/Bebell_3.jpg',
    license: 'CC BY-SA 4.0',
    description: 'Makossa authentique avec des rythmes entraînants',
    tags: ['makossa', 'cameroon', 'traditional', 'douala'],
    streams: 850000,
    likes: 42000,
    language: 'FR',
  },



  // Bikutsi
  {
    id: 'cmr_bikutsi_001',
    title: 'Forest Drums',
    artist: 'Les Têtes Brûlées',
    album: 'Urban Bikutsi',
    genre: 'bikutsi',
    country: 'Cameroon',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Bikutsi traditionnel avec percussions puissantes',
    tags: ['bikutsi', 'drums', 'forest', 'traditional'],
    streams: 750000,
    likes: 37000,
    language: 'FR',
  },
  {
    id: 'cmr_bikutsi_002',
    title: 'Balafon Dreams',
    artist: 'Lady Ponce',
    album: 'Modern Traditions',
    genre: 'bikutsi',
    country: 'Cameroon',
    year: 2024,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion bikutsi-balafon contemporaine',
    tags: ['bikutsi', 'balafon', 'fusion', 'contemporary'],
    streams: 630000,
    likes: 31000,
    language: 'FR',
  },
  {
    id: 'cmr_bikutsi_003',
    title: 'Mvett Stories',
    artist: 'Kareyce Fotso',
    album: 'Oral Traditions',
    genre: 'bikutsi',
    country: 'Cameroon',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Contes traditionnels en rythme bikutsi',
    tags: ['bikutsi', 'mvett', 'stories', 'oral'],
    streams: 580000,
    likes: 29000,
    language: 'BETI',
  },
  {
    id: 'cmr_bikutsi_004',
    title: 'Electric Mendzan',
    artist: 'Coco Argentée',
    album: 'Electric Traditions',
    genre: 'bikutsi',
    country: 'Cameroon',
    year: 2024,
    duration: 187,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Bikutsi électrique moderne',
    tags: ['bikutsi', 'electric', 'modern', 'mendzan'],
    streams: 920000,
    likes: 46000,
    language: 'FR',
  },
  {
    id: 'cmr_bikutsi_005',
    title: 'Beti Harmony',
    artist: 'Dynastie Le Tigre',
    album: 'Cultural Pride',
    genre: 'bikutsi',
    country: 'Cameroon',
    year: 2023,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Harmonie des traditions Beti',
    tags: ['bikutsi', 'beti', 'harmony', 'culture'],
    streams: 670000,
    likes: 33000,
    language: 'BETI',
  },
  {
    id: 'cmr_bikutsi_006',
    title: 'Urban Forest',
    artist: 'K-Tino',
    album: 'City Meets Tradition',
    genre: 'bikutsi',
    country: 'Cameroon',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Bikutsi urbain contemporain',
    tags: ['bikutsi', 'urban', 'contemporary', 'city'],
    streams: 810000,
    likes: 40000,
    language: 'FR',
  },

  // Cameroon Top Hits
  {
    id: 'cmr_hit_001',
    title: 'Lion Indomptable',
    artist: 'Franko',
    album: 'National Pride',
    genre: 'afropop',
    country: 'Cameroon',
    year: 2024,
    duration: 203,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hymne moderne du Cameroun',
    tags: ['afropop', 'cameroon', 'national', 'pride'],
    streams: 2100000,
    likes: 105000,
    language: 'FR',
  },
  {
    id: 'cmr_hit_002',
    title: 'Coller la Petite',
    artist: 'Tenor',
    album: 'Street Anthems',
    genre: 'urban',
    country: 'Cameroon',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hit urbain camerounais',
    tags: ['urban', 'street', 'hit', 'modern'],
    streams: 1850000,
    likes: 92000,
    language: 'FR',
  },
  {
    id: 'cmr_hit_003',
    title: 'Bamenda Style',
    artist: 'Mr. Leo',
    album: 'Northwestern Vibes',
    genre: 'afrobeats',
    country: 'Cameroon',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Son afrobeats du Nord-Ouest',
    tags: ['afrobeats', 'bamenda', 'northwest', 'style'],
    streams: 1620000,
    likes: 81000,
    language: 'EN',
  },
  {
    id: 'cmr_hit_004',
    title: 'Sawa Love',
    artist: 'Blanche Bailly',
    album: 'Coastal Romance',
    genre: 'afropop',
    country: 'Cameroon',
    year: 2023,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Romance afropop des côtes camerounaises',
    tags: ['afropop', 'love', 'sawa', 'romance'],
    streams: 1340000,
    likes: 67000,
    language: 'FR',
  },
  {
    id: 'cmr_hit_005',
    title: 'Mboko Rock',
    artist: 'Salatiel',
    album: 'Alpha Better Records',
    genre: 'afrobeats',
    country: 'Cameroon',
    year: 2024,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion afrobeats-rock camerounaise',
    tags: ['afrobeats', 'rock', 'fusion', 'modern'],
    streams: 1780000,
    likes: 89000,
    language: 'FR',
  },
  {
    id: 'cmr_hit_006',
    title: 'Garoua Express',
    artist: 'Locko',
    album: 'Northern Sounds',
    genre: 'afropop',
    country: 'Cameroon',
    year: 2023,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Son du Nord du Cameroun',
    tags: ['afropop', 'garoua', 'northern', 'express'],
    streams: 1450000,
    likes: 72000,
    language: 'FR',
  },
  {
    id: 'cmr_hit_007',
    title: 'Mount Cameroon',
    artist: 'Stanley Enow',
    album: 'Monumental',
    genre: 'hip-hop',
    country: 'Cameroon',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hip-hop camerounais inspiré du mont Cameroun',
    tags: ['hip-hop', 'mountain', 'cameroon', 'monument'],
    streams: 1560000,
    likes: 78000,
    language: 'EN',
  },
  {
    id: 'cmr_hit_008',
    title: 'Ndole Vibes',
    artist: 'Rinyu',
    album: 'Cultural Flavors',
    genre: 'afropop',
    country: 'Cameroon',
    year: 2023,
    duration: 187,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Célébration de la cuisine camerounaise',
    tags: ['afropop', 'ndole', 'culture', 'food'],
    streams: 1290000,
    likes: 64000,
    language: 'FR',
  },

  // === NIGERIA (10 tracks) ===
  {
    id: 'nga_afrobeats_001',
    title: 'Lagos Nights',
    artist: 'Burna Boy',
    album: 'African Giant',
    genre: 'afrobeats',
    country: 'Nigeria',
    year: 2024,
    duration: 203,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Son afrobeats authentique de Lagos',
    tags: ['afrobeats', 'lagos', 'nigeria', 'urban'],
    streams: 4500000,
    likes: 225000,
    language: 'EN',
  },
  {
    id: 'nga_afrobeats_002',
    title: 'Abuja Flow',
    artist: 'Wizkid',
    album: 'Made in Lagos',
    genre: 'afrobeats',
    country: 'Nigeria',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Vibes de la capitale nigériane',
    tags: ['afrobeats', 'abuja', 'capital', 'flow'],
    streams: 3800000,
    likes: 190000,
    language: 'EN',
  },
  {
    id: 'nga_afrobeats_003',
    title: 'Kano Beats',
    artist: 'Davido',
    album: 'Timeless',
    genre: 'afrobeats',
    country: 'Nigeria',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion afrobeats du Nord Nigeria',
    tags: ['afrobeats', 'kano', 'northern', 'fusion'],
    streams: 4200000,
    likes: 210000,
    language: 'EN',
  },
  {
    id: 'nga_afropop_001',
    title: 'Jollof Dreams',
    artist: 'Tiwa Savage',
    album: 'Water & Garri',
    genre: 'afropop',
    country: 'Nigeria',
    year: 2023,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Pop africaine moderne',
    tags: ['afropop', 'jollof', 'dreams', 'modern'],
    streams: 3200000,
    likes: 160000,
    language: 'EN',
  },
  {
    id: 'nga_afropop_002',
    title: 'Calabar Carnival',
    artist: 'Yemi Alade',
    album: 'Empress',
    genre: 'afropop',
    country: 'Nigeria',
    year: 2024,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Festivité musicale de Calabar',
    tags: ['afropop', 'calabar', 'carnival', 'festival'],
    streams: 2900000,
    likes: 145000,
    language: 'EN',
  },
  {
    id: 'nga_hit_001',
    title: 'Naija Spirit',
    artist: 'Rema',
    album: 'Rave & Roses',
    genre: 'afrobeats',
    country: 'Nigeria',
    year: 2024,
    duration: 187,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Esprit authentique du Nigeria',
    tags: ['afrobeats', 'naija', 'spirit', 'authentic'],
    streams: 5100000,
    likes: 255000,
    language: 'EN',
  },
  {
    id: 'nga_hit_002',
    title: 'Igbo Amaka',
    artist: 'Phyno',
    album: 'Something to Live For',
    genre: 'hip-hop',
    country: 'Nigeria',
    year: 2023,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hip-hop Igbo contemporain',
    tags: ['hip-hop', 'igbo', 'contemporary', 'cultural'],
    streams: 2800000,
    likes: 140000,
    language: 'IGBO',
  },
  {
    id: 'nga_hit_003',
    title: 'Yoruba Blessings',
    artist: 'Olamide',
    album: 'UY Scuti',
    genre: 'afrobeats',
    country: 'Nigeria',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Bénédictions yoruba en musique',
    tags: ['afrobeats', 'yoruba', 'blessings', 'traditional'],
    streams: 3600000,
    likes: 180000,
    language: 'YORUBA',
  },
  {
    id: 'nga_hit_004',
    title: 'Hausa Harmony',
    artist: 'Classiq',
    album: 'Northern Crown',
    genre: 'afrobeats',
    country: 'Nigeria',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Harmonie musicale Hausa',
    tags: ['afrobeats', 'hausa', 'harmony', 'northern'],
    streams: 2400000,
    likes: 120000,
    language: 'HAUSA',
  },
  {
    id: 'nga_hit_005',
    title: 'Benin Legacy',
    artist: 'Adekunle Gold',
    album: 'Afro Pop Vol. 1',
    genre: 'afropop',
    country: 'Nigeria',
    year: 2024,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Héritage musical de Benin City',
    tags: ['afropop', 'benin', 'legacy', 'heritage'],
    streams: 3100000,
    likes: 155000,
    language: 'EN',
  },

  // === IVORY COAST (10 tracks) ===
  {
    id: 'civ_coupe_001',
    title: 'Abidjan Party',
    artist: 'DJ Arafat',
    album: 'Yorogang',
    genre: 'coupe-decale',
    country: 'Ivory Coast',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: "Énergie pure du coupé-décalé d'Abidjan",
    tags: ['coupe-decale', 'abidjan', 'party', 'energy'],
    streams: 2100000,
    likes: 105000,
    language: 'FR',
  },
  {
    id: 'civ_coupe_002',
    title: 'Boucan Boucan',
    artist: 'Debordo Leekunfa',
    album: 'Copines',
    genre: 'coupe-decale',
    country: 'Ivory Coast',
    year: 2024,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hit coupé-décalé entraînant',
    tags: ['coupe-decale', 'boucan', 'hit', 'dance'],
    streams: 1800000,
    likes: 90000,
    language: 'FR',
  },
  {
    id: 'civ_coupe_003',
    title: 'Cocody Vibes',
    artist: 'Serge Beynaud',
    album: 'Akrakabo',
    genre: 'coupe-decale',
    country: 'Ivory Coast',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Ambiance Cocody en musique',
    tags: ['coupe-decale', 'cocody', 'vibes', 'neighborhood'],
    streams: 1650000,
    likes: 82000,
    language: 'FR',
  },
  {
    id: 'civ_coupe_004',
    title: 'Yopougon Style',
    artist: 'Molare',
    album: 'Gbounounan',
    genre: 'coupe-decale',
    country: 'Ivory Coast',
    year: 2024,
    duration: 203,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Style authentique de Yopougon',
    tags: ['coupe-decale', 'yopougon', 'style', 'authentic'],
    streams: 1920000,
    likes: 96000,
    language: 'FR',
  },
  {
    id: 'civ_coupe_005',
    title: 'Lagune Express',
    artist: 'Bebi Philip',
    album: 'Decalco',
    genre: 'coupe-decale',
    country: 'Ivory Coast',
    year: 2023,
    duration: 187,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Voyage musical sur la lagune',
    tags: ['coupe-decale', 'lagune', 'express', 'water'],
    streams: 1540000,
    likes: 77000,
    language: 'FR',
  },
  {
    id: 'civ_hit_001',
    title: 'Magic System',
    artist: 'Magic System',
    album: 'Un Gaou à Paris',
    genre: 'zouglou',
    country: 'Ivory Coast',
    year: 2024,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Zouglou légendaire ivoirien',
    tags: ['zouglou', 'magic', 'legendary', 'ivorian'],
    streams: 3200000,
    likes: 160000,
    language: 'FR',
  },
  {
    id: 'civ_hit_002',
    title: 'Attieké Dance',
    artist: 'Kedjevara',
    album: 'Ivorian Flavors',
    genre: 'afropop',
    country: 'Ivory Coast',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Danse sur rythmes ivoiriens',
    tags: ['afropop', 'attieke', 'dance', 'flavors'],
    streams: 1780000,
    likes: 89000,
    language: 'FR',
  },
  {
    id: 'civ_hit_003',
    title: 'Bassam Sunset',
    artist: 'Nash',
    album: 'Coastal Dreams',
    genre: 'afrobeats',
    country: 'Ivory Coast',
    year: 2024,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Coucher de soleil à Grand Bassam',
    tags: ['afrobeats', 'bassam', 'sunset', 'coastal'],
    streams: 1450000,
    likes: 72000,
    language: 'FR',
  },
  {
    id: 'civ_hit_004',
    title: 'Bouaké Rhythm',
    artist: 'Josey',
    album: 'Central Vibes',
    genre: 'urban',
    country: 'Ivory Coast',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Rythmes urbains de Bouaké',
    tags: ['urban', 'bouake', 'rhythm', 'central'],
    streams: 1320000,
    likes: 66000,
    language: 'FR',
  },
  {
    id: 'civ_hit_005',
    title: 'Éléphant Power',
    artist: 'Suspect 95',
    album: 'National Pride',
    genre: 'hip-hop',
    country: 'Ivory Coast',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fierté nationale ivoirienne',
    tags: ['hip-hop', 'elephant', 'power', 'national'],
    streams: 1890000,
    likes: 94000,
    language: 'FR',
  },

  // === CONGO (10 tracks) ===
  {
    id: 'cog_ndombolo_001',
    title: 'Kinshasa Nights',
    artist: 'Koffi Olomide',
    album: 'Quartier Latin',
    genre: 'ndombolo',
    country: 'Congo',
    year: 2023,
    duration: 267,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Ndombolo authentique de Kinshasa',
    tags: ['ndombolo', 'kinshasa', 'nights', 'authentic'],
    streams: 1850000,
    likes: 92000,
    language: 'LINGALA',
  },
  {
    id: 'cog_amapiano_001',
    title: 'Congo Piano',
    artist: 'Fally Ipupa',
    album: 'Control',
    genre: 'amapiano',
    country: 'Congo',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion amapiano congolaise',
    tags: ['amapiano', 'congo', 'piano', 'fusion'],
    streams: 2200000,
    likes: 110000,
    language: 'LINGALA',
  },
  {
    id: 'cog_rumba_001',
    title: 'Rumba Congolaise',
    artist: 'Papa Wemba',
    album: 'Roi de la Rumba',
    genre: 'rumba',
    country: 'Congo',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Rumba traditionnelle congolaise',
    tags: ['rumba', 'traditional', 'congo', 'king'],
    streams: 1450000,
    likes: 72000,
    language: 'LINGALA',
  },
  {
    id: 'cog_rumba_002',
    title: 'Lubumbashi Sound',
    artist: 'Werrason',
    album: 'Wenge',
    genre: 'rumba',
    country: 'Congo',
    year: 2024,
    duration: 289,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Son de Lubumbashi moderne',
    tags: ['rumba', 'lubumbashi', 'sound', 'modern'],
    streams: 1320000,
    likes: 66000,
    language: 'LINGALA',
  },
  {
    id: 'cog_ndombolo_002',
    title: 'Matadi Express',
    artist: 'JB Mpiana',
    album: 'Wenge BCBG',
    genre: 'ndombolo',
    country: 'Congo',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Express musical vers Matadi',
    tags: ['ndombolo', 'matadi', 'express', 'port'],
    streams: 1680000,
    likes: 84000,
    language: 'LINGALA',
  },
  {
    id: 'cog_hit_001',
    title: 'Brazzaville Blues',
    artist: 'Bantous de la Capitale',
    album: 'Congo Heritage',
    genre: 'blues',
    country: 'Congo',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Blues moderne de Brazzaville',
    tags: ['blues', 'brazzaville', 'heritage', 'modern'],
    streams: 980000,
    likes: 49000,
    language: 'FR',
  },
  {
    id: 'cog_hit_002',
    title: 'Pointe-Noire Vibes',
    artist: 'Kaysha',
    album: 'Kizomba Fusion',
    genre: 'kizomba',
    country: 'Congo',
    year: 2023,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Kizomba de Pointe-Noire',
    tags: ['kizomba', 'pointe-noire', 'vibes', 'coastal'],
    streams: 1240000,
    likes: 62000,
    language: 'FR',
  },
  {
    id: 'cog_hit_003',
    title: 'Congo River',
    artist: 'Innoss B',
    album: 'Afrobeat Congo',
    genre: 'afrobeats',
    country: 'Congo',
    year: 2024,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Afrobeats inspiré du fleuve Congo',
    tags: ['afrobeats', 'congo', 'river', 'nature'],
    streams: 1780000,
    likes: 89000,
    language: 'LINGALA',
  },
  {
    id: 'cog_hit_004',
    title: 'Sapeurs Dreams',
    artist: 'Ferré Gola',
    album: 'Qqjd Le Retour',
    genre: 'ndombolo',
    country: 'Congo',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hommage aux sapeurs congolais',
    tags: ['ndombolo', 'sapeurs', 'dreams', 'elegance'],
    streams: 1920000,
    likes: 96000,
    language: 'LINGALA',
  },
  {
    id: 'cog_hit_005',
    title: 'Lingala Lesson',
    artist: 'Gims',
    album: 'Transcendance',
    genre: 'afropop',
    country: 'Congo',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Leçon musicale en lingala',
    tags: ['afropop', 'lingala', 'lesson', 'language'],
    streams: 2850000,
    likes: 142000,
    language: 'LINGALA',
  },

  // === CENTRAL AFRICA (5 tracks) ===
  {
    id: 'caf_001',
    title: 'Bangui Rhythms',
    artist: 'Laba Sosseh',
    album: 'Central Beats',
    genre: 'traditional',
    country: 'Central African Republic',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Rythmes traditionnels de Bangui',
    tags: ['traditional', 'bangui', 'rhythms', 'central'],
    streams: 420000,
    likes: 21000,
    language: 'SANGO',
  },
  {
    id: 'caf_002',
    title: 'Libreville Nights',
    artist: 'Patience Dabany',
    album: 'Gabonese Soul',
    genre: 'soul',
    country: 'Gabon',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Soul gabonaise moderne',
    tags: ['soul', 'libreville', 'nights', 'gabon'],
    streams: 680000,
    likes: 34000,
    language: 'FR',
  },
  {
    id: 'caf_003',
    title: 'Malabo Dreams',
    artist: 'Hijos del Sol',
    album: 'Equatorial Sounds',
    genre: 'afropop',
    country: 'Equatorial Guinea',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Sons équatoriaux modernes',
    tags: ['afropop', 'malabo', 'dreams', 'equatorial'],
    streams: 520000,
    likes: 26000,
    language: 'ES',
  },
  {
    id: 'caf_004',
    title: 'Ndjamena Sunrise',
    artist: 'Chari Jazz',
    album: 'Sahel Sounds',
    genre: 'jazz',
    country: 'Chad',
    year: 2024,
    duration: 267,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Jazz du Sahel tchadien',
    tags: ['jazz', 'ndjamena', 'sunrise', 'sahel'],
    streams: 380000,
    likes: 19000,
    language: 'FR',
  },
  {
    id: 'caf_005',
    title: 'São Tomé Waves',
    artist: 'Africa Negra',
    album: 'Island Vibes',
    genre: 'traditional',
    country: 'São Tomé and Príncipe',
    year: 2023,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Vagues musicales de São Tomé',
    tags: ['traditional', 'sao-tome', 'waves', 'island'],
    streams: 290000,
    likes: 14000,
    language: 'PT',
  },

  // === WEST AFRICA (5 tracks) ===
  {
    id: 'waf_001',
    title: 'Dakar Teranga',
    artist: 'Youssou NDour',
    album: 'Senegalese Spirit',
    genre: 'mbalax',
    country: 'Senegal',
    year: 2023,
    duration: 289,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Mbalax sénégalais authentique',
    tags: ['mbalax', 'dakar', 'teranga', 'senegal'],
    streams: 1250000,
    likes: 62000,
    language: 'WOLOF',
  },
  {
    id: 'waf_002',
    title: 'Ouagadougou Beat',
    artist: 'Bil Aka Kora',
    album: 'Burkina Sounds',
    genre: 'afrobeats',
    country: 'Burkina Faso',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Beat moderne de Ouagadougou',
    tags: ['afrobeats', 'ouagadougou', 'beat', 'burkina'],
    streams: 780000,
    likes: 39000,
    language: 'FR',
  },
  {
    id: 'waf_003',
    title: 'Freetown Vibes',
    artist: 'Emerson',
    album: 'Sierra Leone Soul',
    genre: 'afropop',
    country: 'Sierra Leone',
    year: 2023,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Vibes soul de Freetown',
    tags: ['afropop', 'freetown', 'vibes', 'soul'],
    streams: 560000,
    likes: 28000,
    language: 'EN',
  },
  {
    id: 'waf_004',
    title: 'Monrovia Rising',
    artist: 'Christoph Kohr',
    album: 'Liberian Dreams',
    genre: 'reggae',
    country: 'Liberia',
    year: 2024,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Reggae libérien montant',
    tags: ['reggae', 'monrovia', 'rising', 'liberia'],
    streams: 650000,
    likes: 32000,
    language: 'EN',
  },
  {
    id: 'waf_005',
    title: 'Bamako Blues',
    artist: 'Ali Farka Touré',
    album: 'Mali Masters',
    genre: 'blues',
    country: 'Mali',
    year: 2023,
    duration: 267,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Blues malien traditionnel',
    tags: ['blues', 'bamako', 'mali', 'traditional'],
    streams: 920000,
    likes: 46000,
    language: 'BAMBARA',
  },

  // ============ EAST AFRICA (5 tracks) ============
  {
    id: 'eaf_kenya_001',
    title: 'Nairobi Nights',
    artist: 'Sauti Sol',
    album: 'Midnight Train',
    genre: 'afropop',
    country: 'Kenya',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Nuits de Nairobi en musique',
    tags: ['afropop', 'nairobi', 'nights', 'kenya'],
    streams: 1450000,
    likes: 72000,
    language: 'SW',
  },
  {
    id: 'eaf_ethiopia_001',
    title: 'Addis Groove',
    artist: 'Mahmoud Ahmed',
    album: 'Ethiopian Soul',
    genre: 'traditional',
    country: 'Ethiopia',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Groove éthiopien traditionnel',
    tags: ['traditional', 'addis', 'groove', 'ethiopia'],
    streams: 780000,
    likes: 39000,
    language: 'AM',
  },
  {
    id: 'eaf_hit_001',
    title: 'East African Unity',
    artist: 'Diamond Platnumz',
    album: 'A Boy from Tandale',
    genre: 'bongo-flava',
    country: 'Tanzania',
    year: 2024,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: "Unité de l'Afrique de l'Est",
    tags: ['bongo-flava', 'unity', 'east-africa', 'tanzania'],
    streams: 2100000,
    likes: 105000,
    language: 'SW',
  },
  {
    id: 'eaf_hit_002',
    title: 'Kampala Dreams',
    artist: 'Eddy Kenzo',
    album: 'Tweyagale',
    genre: 'afrobeats',
    country: 'Uganda',
    year: 2023,
    duration: 203,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Rêves de Kampala',
    tags: ['afrobeats', 'kampala', 'dreams', 'uganda'],
    streams: 1680000,
    likes: 84000,
    language: 'LG',
  },
  {
    id: 'eaf_hit_003',
    title: 'Kigali Rising',
    artist: 'The Ben',
    album: 'Rwanda Sounds',
    genre: 'afropop',
    country: 'Rwanda',
    year: 2024,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Émergence musicale de Kigali',
    tags: ['afropop', 'kigali', 'rising', 'rwanda'],
    streams: 890000,
    likes: 44000,
    language: 'RW',
  },

  // ============ NORTH AFRICA (5 tracks) ============
  {
    id: 'naf_001',
    title: 'Cairo Dreams',
    artist: 'Amr Diab',
    album: 'Mediterranean Sounds',
    genre: 'pop',
    country: 'Egypt',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Rêves du Caire moderne',
    tags: ['pop', 'cairo', 'dreams', 'egypt'],
    streams: 2800000,
    likes: 140000,
    language: 'AR',
  },
  {
    id: 'naf_002',
    title: 'Casablanca Nights',
    artist: 'Saad Lamjarred',
    album: 'Moroccan Fusion',
    genre: 'rai',
    country: 'Morocco',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Nuits de Casablanca en fusion',
    tags: ['rai', 'casablanca', 'nights', 'morocco'],
    streams: 3200000,
    likes: 160000,
    language: 'AR',
  },
  {
    id: 'naf_003',
    title: 'Tunis Groove',
    artist: 'Emel Mathlouthi',
    album: 'Tunisian Revolution',
    genre: 'world',
    country: 'Tunisia',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Groove révolutionnaire tunisien',
    tags: ['world', 'tunis', 'groove', 'tunisia'],
    streams: 1100000,
    likes: 55000,
    language: 'AR',
  },
  {
    id: 'naf_004',
    title: 'Algiers Beat',
    artist: 'Khaled',
    album: 'Rai Master',
    genre: 'rai',
    country: 'Algeria',
    year: 2024,
    duration: 212,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: "Beat authentique d'Alger",
    tags: ['rai', 'algiers', 'beat', 'algeria'],
    streams: 2600000,
    likes: 130000,
    language: 'AR',
  },
  {
    id: 'naf_005',
    title: 'Tripoli Winds',
    artist: 'Ahmed Fakroun',
    album: 'Libyan Echoes',
    genre: 'traditional',
    country: 'Libya',
    year: 2023,
    duration: 245,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },

    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Vents musicaux de Tripoli',
    tags: ['traditional', 'tripoli', 'winds', 'libya'],
    streams: 650000,
    likes: 32000,
    language: 'AR',
  },

  // ============ SOUTH AFRICA (5 tracks) ============
  {
    id: 'saf_001',
    title: 'Cape Town Sunset',
    artist: 'Black Coffee',
    album: 'Subconsciously',
    genre: 'house',
    country: 'South Africa',
    year: 2023,
    duration: 276,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'House sud-africaine du Cap',
    tags: ['house', 'cape-town', 'sunset', 'south-africa'],
    streams: 3800000,
    likes: 190000,
    language: 'EN',
  },
  {
    id: 'saf_002',
    title: 'Johannesburg Flow',
    artist: 'Nasty C',
    album: 'Zulu Man With Some Power',
    genre: 'hip-hop',
    country: 'South Africa',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hip-hop de Johannesburg',
    tags: ['hip-hop', 'johannesburg', 'flow', 'power'],
    streams: 2900000,
    likes: 145000,
    language: 'EN',
  },
  {
    id: 'saf_003',
    title: 'Durban Gqom',
    artist: 'DJ Lag',
    album: 'Meeting with the King',
    genre: 'gqom',
    country: 'South Africa',
    year: 2023,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Gqom authentique de Durban',
    tags: ['gqom', 'durban', 'electronic', 'king'],
    streams: 1800000,
    likes: 90000,
    language: 'ZU',
  },
  {
    id: 'saf_004',
    title: 'Pretoria Dreams',
    artist: 'Sho Madjozi',
    album: 'Limpopo Champions League',
    genre: 'afropop',
    country: 'South Africa',
    year: 2024,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Rêves colorés de Pretoria',
    tags: ['afropop', 'pretoria', 'dreams', 'colorful'],
    streams: 2100000,
    likes: 105000,
    language: 'TS',
  },
  {
    id: 'saf_005',
    title: 'Bloemfontein Soul',
    artist: 'Zonke',
    album: 'Give and Take Live',
    genre: 'soul',
    country: 'South Africa',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Soul profonde de Bloemfontein',
    tags: ['soul', 'bloemfontein', 'deep', 'live'],
    streams: 1200000,
    likes: 60000,
    language: 'EN',
  },

  // ============ CARIBBEAN (2 tracks) ============
  {
    id: 'car_001',
    title: 'Caribbean Fusion',
    artist: 'Kassav',
    album: 'Zouk Masters',
    genre: 'zouk',
    country: 'Martinique',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion zouk des Caraïbes',
    tags: ['zouk', 'caribbean', 'fusion', 'martinique'],
    streams: 1450000,
    likes: 72000,
    language: 'FR',
  },
  {
    id: 'car_002',
    title: 'Island Vibes',
    artist: 'Machel Montano',
    album: 'Soca Kingdom',
    genre: 'soca',
    country: 'Trinidad',
    year: 2024,
    duration: 187,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Vibes insulaires de Trinidad',
    tags: ['soca', 'island', 'vibes', 'trinidad'],
    streams: 980000,
    likes: 49000,
    language: 'EN',
  },

  // ============ JAMAICAN (3 tracks) ============
  {
    id: 'jam_001',
    title: 'Kingston Roots',
    artist: 'Bob Marley',
    album: 'Legend Continues',
    genre: 'reggae',
    country: 'Jamaica',
    year: 2023,
    duration: 267,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Racines reggae de Kingston',
    tags: ['reggae', 'kingston', 'roots', 'jamaica'],
    streams: 4200000,
    likes: 210000,
    language: 'EN',
  },
  {
    id: 'jam_002',
    title: 'Dancehall Fire',
    artist: 'Sean Paul',
    album: 'Live N Livin',
    genre: 'dancehall',
    country: 'Jamaica',
    year: 2024,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Feu du dancehall jamaïcain',
    tags: ['dancehall', 'fire', 'jamaica', 'energy'],
    streams: 3600000,
    likes: 180000,
    language: 'EN',
  },
  {
    id: 'jam_003',
    title: 'Blue Mountain High',
    artist: 'Chronixx',
    album: 'Chronology',
    genre: 'reggae',
    country: 'Jamaica',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Reggae moderne des Blue Mountains',
    tags: ['reggae', 'blue-mountain', 'high', 'modern'],
    streams: 1950000,
    likes: 97000,
    language: 'EN',
  },

  // ============ WORLD MUSIC (20 tracks) ============

  // === EUROPEAN (4 tracks) ===
  {
    id: 'eur_001',
    title: 'Paris African Quarter',
    artist: 'Manu Chao',
    album: 'Clandestino 2.0',
    genre: 'world-fusion',
    country: 'France',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion world du quartier africain',
    tags: ['world-fusion', 'paris', 'african', 'quarter'],
    streams: 1800000,
    likes: 90000,
    language: 'FR',
  },
  {
    id: 'eur_002',
    title: 'London Afro Beat',
    artist: 'Skepta',
    album: 'Ignorance Is Bliss',
    genre: 'grime',
    country: 'United Kingdom',
    year: 2024,
    duration: 176,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Grime londonien afro-influencé',
    tags: ['grime', 'london', 'afro', 'beat'],
    streams: 2200000,
    likes: 110000,
    language: 'EN',
  },
  {
    id: 'eur_003',
    title: 'Berlin African Nights',
    artist: 'Ott',
    album: 'Mir',
    genre: 'electronic',
    country: 'Germany',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Électronique berlinoise afro-fusion',
    tags: ['electronic', 'berlin', 'african', 'nights'],
    streams: 1350000,
    likes: 67000,
    language: 'DE',
  },
  {
    id: 'eur_004',
    title: 'Amsterdam Afro House',
    artist: 'Culoe De Song',
    album: 'Electronic Africa',
    genre: 'afro-house',
    country: 'Netherlands',
    year: 2024,
    duration: 289,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: "Afro house d'Amsterdam",
    tags: ['afro-house', 'amsterdam', 'electronic', 'africa'],
    streams: 1680000,
    likes: 84000,
    language: 'NL',
  },

  // === ASIAN (4 tracks) ===
  {
    id: 'asi_001',
    title: 'Tokyo Afro Fusion',
    artist: 'DJ Krush',
    album: 'African Dreams',
    genre: 'hip-hop',
    country: 'Japan',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hip-hop tokyoïte afro-fusionné',
    tags: ['hip-hop', 'tokyo', 'afro', 'fusion'],
    streams: 920000,
    likes: 46000,
    language: 'JA',
  },
  {
    id: 'asi_002',
    title: 'Seoul African Beat',
    artist: 'Epik High',
    album: 'Sleepless in Seoul',
    genre: 'k-hip-hop',
    country: 'South Korea',
    year: 2024,
    duration: 187,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'K-hip-hop aux influences africaines',
    tags: ['k-hip-hop', 'seoul', 'african', 'beat'],
    streams: 1450000,
    likes: 72000,
    language: 'KO',
  },
  {
    id: 'asi_003',
    title: 'Beijing Afro Jazz',
    artist: 'Liu Sola',
    album: 'East Meets West',
    genre: 'jazz-fusion',
    country: 'China',
    year: 2023,
    duration: 267,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Jazz fusion pékinois afro-inspiré',
    tags: ['jazz-fusion', 'beijing', 'afro', 'east-west'],
    streams: 780000,
    likes: 39000,
    language: 'ZH',
  },
  {
    id: 'asi_004',
    title: 'Bangkok African Nights',
    artist: 'Thaitanium',
    album: 'Still Resisting',
    genre: 'thai-hip-hop',
    country: 'Thailand',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Hip-hop thaï aux rythmes africains',
    tags: ['thai-hip-hop', 'bangkok', 'african', 'nights'],
    streams: 650000,
    likes: 32000,
    language: 'TH',
  },

  // === INDIAN (4 tracks) ===
  {
    id: 'ind_001',
    title: 'Mumbai Afro Bollywood',
    artist: 'A.R. Rahman',
    album: 'Global Sounds',
    genre: 'bollywood-fusion',
    country: 'India',
    year: 2023,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Bollywood fusion afro de Mumbai',
    tags: ['bollywood-fusion', 'mumbai', 'afro', 'global'],
    streams: 2800000,
    likes: 140000,
    language: 'HI',
  },
  {
    id: 'ind_002',
    title: 'Delhi African Taal',
    artist: 'Midival Punditz',
    album: 'Midival Times',
    genre: 'electronic',
    country: 'India',
    year: 2024,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Électronique de Delhi aux rythmes africains',
    tags: ['electronic', 'delhi', 'african', 'taal'],
    streams: 1200000,
    likes: 60000,
    language: 'HI',
  },
  {
    id: 'ind_003',
    title: 'Bangalore Afro Classical',
    artist: 'L. Shankar',
    album: 'Song for Everyone',
    genre: 'classical-fusion',
    country: 'India',
    year: 2023,
    duration: 276,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/01_-_Broke_For_Free_-_Night_Owl.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Fusion classique indienne afro',
    tags: ['classical-fusion', 'bangalore', 'afro', 'indian'],
    streams: 890000,
    likes: 44000,
    language: 'KN',
  },
  {
    id: 'ind_004',
    title: 'Chennai African Carnatic',
    artist: 'Ravi Shankar',
    album: 'East Meets Africa',
    genre: 'carnatic-fusion',
    country: 'India',
    year: 2024,
    duration: 312,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/02_-_Broke_For_Free_-_Something_Elated.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Fusion carnatique africaine de Chennai',
    tags: ['carnatic-fusion', 'chennai', 'african', 'classical'],
    streams: 720000,
    likes: 36000,
    language: 'TA',
  },

  // === AUSTRALIAN (4 tracks) ===
  {
    id: 'aus_001',
    title: 'Sydney Afro Vibes',
    artist: 'Hiatus Kaiyote',
    album: 'Mood Valiant',
    genre: 'neo-soul',
    country: 'Australia',
    year: 2023,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/03_-_Broke_For_Free_-_Mellow_Out.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Neo-soul australien aux influences afro',
    tags: ['neo-soul', 'sydney', 'afro', 'vibes'],
    streams: 1350000,
    likes: 67000,
    language: 'EN',
  },
  {
    id: 'aus_002',
    title: 'Melbourne African Jazz',
    artist: 'The Cat Empire',
    album: 'Stolen Diamonds',
    genre: 'jazz-fusion',
    country: 'Australia',
    year: 2024,
    duration: 234,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/04_-_Broke_For_Free_-_As_Colorful_As_Ever.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Jazz fusion de Melbourne afro-inspiré',
    tags: ['jazz-fusion', 'melbourne', 'african', 'jazz'],
    streams: 980000,
    likes: 49000,
    language: 'EN',
  },
  {
    id: 'aus_003',
    title: 'Perth Didgeridoo Meets Africa',
    artist: 'Gurrumul',
    album: 'Djarimirri',
    genre: 'world-fusion',
    country: 'Australia',
    year: 2023,
    duration: 267,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/05_-_Broke_For_Free_-_Damscray.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Fusion didgeridoo et rythmes africains',
    tags: ['world-fusion', 'perth', 'didgeridoo', 'africa'],
    streams: 720000,
    likes: 36000,
    language: 'YOLNGU',
  },
  {
    id: 'aus_004',
    title: 'Brisbane Afro House',
    artist: 'Flight Facilities',
    album: 'Forever',
    genre: 'house',
    country: 'Australia',
    year: 2024,
    duration: 189,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/06_-_Broke_For_Free_-_Decipher.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'House de Brisbane aux influences africaines',
    tags: ['house', 'brisbane', 'afro', 'electronic'],
    streams: 1120000,
    likes: 56000,
    language: 'EN',
  },

  // === ANTARCTICA (4 tracks) ===
  {
    id: 'ant_001',
    title: 'Antarctic African Dreams',
    artist: 'Polar Research Station Collective',
    album: 'Sounds from the Ice',
    genre: 'ambient',
    country: 'Antarctica',
    year: 2023,
    duration: 345,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/07_-_Broke_For_Free_-_Tensions.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description: 'Ambient glacial aux mélodies africaines',
    tags: ['ambient', 'antarctica', 'african', 'dreams'],
    streams: 120000,
    likes: 6000,
    language: 'INSTRUMENTAL',
  },
  {
    id: 'ant_002',
    title: 'Ice Station Afrobeats',
    artist: 'McMurdo Sound System',
    album: 'Frozen Rhythms',
    genre: 'experimental',
    country: 'Antarctica',
    year: 2024,
    duration: 198,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/08_-_Broke_For_Free_-_Yellow_Bicycle.mp3',
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description: 'Expérimentation afrobeats polaire',
    tags: ['experimental', 'ice-station', 'afrobeats', 'polar'],
    streams: 89000,
    likes: 4000,
    language: 'INSTRUMENTAL',
  },
  {
    id: 'ant_003',
    title: 'Penguin Colony Drums',
    artist: 'Antarctic Wildlife Orchestra',
    album: 'Nature Meets Africa',
    genre: 'nature-fusion',
    country: 'Antarctica',
    year: 2023,
    duration: 276,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/jamendo-093560/09_-_Broke_For_Free_-_A_Dark_Comedic_Twist.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY-SA 4.0',
    description:
      'Fusion naturelle entre faune antarctique et percussion africaine',
    tags: ['nature-fusion', 'penguin', 'drums', 'wildlife'],
    streams: 156000,
    likes: 8000,
    language: 'NATURAL',
  },
  {
    id: 'ant_004',
    title: 'Aurora Australis Beats',
    artist: 'South Pole Electronic Collective',
    album: 'Polar Lights',
    genre: 'electronic-ambient',
    country: 'Antarctica',
    year: 2024,
    duration: 312,
    mux: {
      playbackId: 'abc123xyzT4KjE002iQ02xXHQgO02jDVm5KjE', // ← fourni par Mux après upload
      streamType: 'on-demand', // ou "live" si pertinent un jour
    },
    audioUrl:
      'https://archive.org/download/JamendoLSRAlbum/01%20-%20Kola%20Ogunkoya%20-%20No%20Chicken.mp3',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    license: 'CC BY 3.0',
    description:
      'Électronique ambient inspirée des aurores australes et rythmes africains',
    tags: ['electronic-ambient', 'aurora', 'beats', 'polar'],
    streams: 98000,
    likes: 5000,
    language: 'INSTRUMENTAL',
  },
];

// Service de recherche musical étendu
export class MusicSearchService {
  static searchByTitle(query) {
    return MUSIC_DATABASE.filter(
      song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );
  }

  static searchByGenre(genre) {
    return MUSIC_DATABASE.filter(
      song => song.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  static searchByCountry(country) {
    return MUSIC_DATABASE.filter(
      song => song.country.toLowerCase() === country.toLowerCase()
    );
  }

  static searchByRegion(region) {
    const regionMap = {
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
        'DRC',
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

    const countries = regionMap[region.toLowerCase()] || [];
    return MUSIC_DATABASE.filter(song => countries.includes(song.country));
  }

  static searchByTags(tags) {
    return MUSIC_DATABASE.filter(song =>
      tags.some(tag => song.tags.includes(tag.toLowerCase()))
    );
  }

  static getPopular(limit = 10) {
    return MUSIC_DATABASE.sort((a, b) => b.streams - a.streams).slice(0, limit);
  }

  static getByGenres() {
    const genres = {};
    MUSIC_DATABASE.forEach(song => {
      if (!genres[song.genre]) {
        genres[song.genre] = [];
      }
      genres[song.genre].push(song);
    });
    return genres;
  }

  static getByCountries() {
    const countries = {};
    MUSIC_DATABASE.forEach(song => {
      if (!countries[song.country]) {
        countries[song.country] = [];
      }
      countries[song.country].push(song);
    });
    return countries;
  }

  static getNewReleases(limit = 8) {
    return MUSIC_DATABASE.filter(song => song.year >= 2023)
      .sort((a, b) => b.year - a.year)
      .slice(0, limit);
  }

  static searchGlobal(query) {
    const normalizedQuery = query.toLowerCase();
    return MUSIC_DATABASE.filter(
      song =>
        song.title.toLowerCase().includes(normalizedQuery) ||
        song.artist.toLowerCase().includes(normalizedQuery) ||
        song.album.toLowerCase().includes(normalizedQuery) ||
        song.genre.toLowerCase().includes(normalizedQuery) ||
        song.country.toLowerCase().includes(normalizedQuery) ||
        song.tags.some(tag => tag.includes(normalizedQuery)) ||
        song.description.toLowerCase().includes(normalizedQuery)
    );
  }

  static getSongById(id) {
    return MUSIC_DATABASE.find(song => song.id === id);
  }

  static getRandomSongs(limit = 6) {
    const shuffled = [...MUSIC_DATABASE].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  static getTopHitsByRegion(region, limit = 10) {
    return this.searchByRegion(region)
      .sort((a, b) => b.streams - a.streams)
      .slice(0, limit);
  }

  static getMostLiked(limit = 10) {
    return MUSIC_DATABASE.sort((a, b) => b.likes - a.likes).slice(0, limit);
  }

  static getByYear(year) {
    return MUSIC_DATABASE.filter(song => song.year === year);
  }

  static getByLanguage(language) {
    return MUSIC_DATABASE.filter(
      song => song.language.toLowerCase() === language.toLowerCase()
    );
  }

  static createPlaylist(name, songIds) {
    return {
      id: `playlist_${Date.now()}`,
      name,
      songs: songIds.map(id => this.getSongById(id)).filter(Boolean),
      createdAt: new Date(),
      cover: songIds.length > 0 ? this.getSongById(songIds[0])?.cover : null,
    };
  }

  static getStats() {
    return {
      totalSongs: MUSIC_DATABASE.length,
      totalArtists: [...new Set(MUSIC_DATABASE.map(song => song.artist))]
        .length,
      totalCountries: [...new Set(MUSIC_DATABASE.map(song => song.country))]
        .length,
      totalGenres: [...new Set(MUSIC_DATABASE.map(song => song.genre))].length,
      totalStreams: MUSIC_DATABASE.reduce((sum, song) => sum + song.streams, 0),
      totalLikes: MUSIC_DATABASE.reduce((sum, song) => sum + song.likes, 0),
      averageDuration: Math.round(
        MUSIC_DATABASE.reduce((sum, song) => sum + song.duration, 0) /
          MUSIC_DATABASE.length
      ),
      recentReleases: MUSIC_DATABASE.filter(song => song.year >= 2023).length,
    };
  }
}

// Générateur de playlists automatiques étendu
export class PlaylistGenerator {
  static generateAfrobeatsHits() {
    const afrobeats = MusicSearchService.searchByGenre('afrobeats');
    const afropop = MusicSearchService.searchByGenre('afropop');
    return [...afrobeats, ...afropop].sort((a, b) => b.streams - a.streams);
  }

  static generateTraditionalMix() {
    const traditional = MusicSearchService.searchByGenre('traditional');
    const makossa = MusicSearchService.searchByGenre('makossa');
    const highlife = MusicSearchService.searchByGenre('highlife');
    const mbalax = MusicSearchService.searchByGenre('mbalax');
    return [...traditional, ...makossa, ...highlife, ...mbalax];
  }

  static generateModernAfricanMix() {
    const amapiano = MusicSearchService.searchByGenre('amapiano');
    const afrobeats = MusicSearchService.searchByGenre('afrobeats');
    const coupeDecale = MusicSearchService.searchByGenre('coupe-decale');
    const ndombolo = MusicSearchService.searchByGenre('ndombolo');
    return [...amapiano, ...afrobeats, ...coupeDecale, ...ndombolo];
  }

  static generateByCountry(country) {
    return MusicSearchService.searchByCountry(country);
  }

  static generateByRegion(region) {
    return MusicSearchService.searchByRegion(region);
  }

  static generateWorldFusion() {
    return MUSIC_DATABASE.filter(
      song =>
        song.tags.includes('fusion') ||
        song.genre.includes('fusion') ||
        song.genre === 'world' ||
        song.genre === 'world-fusion'
    );
  }

  static generateTopHitsGlobal(limit = 20) {
    return MusicSearchService.getPopular(limit);
  }

  static generateDiscoverWeekly() {
    const random = MusicSearchService.getRandomSongs(30);
    const newReleases = MusicSearchService.getNewReleases(20);
    return [...random, ...newReleases].slice(0, 30);
  }

  static generateByMood(mood) {
    const moodMap = {
      energetic: ['afrobeats', 'dancehall', 'coupe-decale', 'gqom', 'soca'],
      relaxed: ['soul', 'blues', 'jazz', 'ambient', 'kizomba'],
      traditional: ['traditional', 'makossa', 'highlife', 'mbalax', 'rumba'],
      modern: ['hip-hop', 'electronic', 'house', 'afro-house', 'urban'],
      romantic: ['soul', 'kizomba', 'zouk', 'afropop', 'rnb'],
    };

    const genres = moodMap[mood.toLowerCase()] || [];
    return MUSIC_DATABASE.filter(song => genres.includes(song.genre))
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
  }

  static generateLanguageMix(language) {
    return MusicSearchService.getByLanguage(language);
  }

  static generateDecadeMix(decade) {
    const startYear = decade;
    const endYear = decade + 9;
    return MUSIC_DATABASE.filter(
      song => song.year >= startYear && song.year <= endYear
    );
  }
}

// Nouvelles classes utilitaires

export class MusicAnalytics {
  static getTopGenres(limit = 10) {
    const genreCounts = {};
    MUSIC_DATABASE.forEach(song => {
      genreCounts[song.genre] = (genreCounts[song.genre] || 0) + song.streams;
    });

    return Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([genre, streams]) => ({ genre, streams }));
  }

  static getTopCountries(limit = 10) {
    const countryCounts = {};
    MUSIC_DATABASE.forEach(song => {
      countryCounts[song.country] =
        (countryCounts[song.country] || 0) + song.streams;
    });

    return Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([country, streams]) => ({ country, streams }));
  }

  static getTopArtists(limit = 10) {
    const artistCounts = {};
    MUSIC_DATABASE.forEach(song => {
      if (!artistCounts[song.artist]) {
        artistCounts[song.artist] = { streams: 0, songs: 0, likes: 0 };
      }
      artistCounts[song.artist].streams += song.streams;
      artistCounts[song.artist].songs += 1;
      artistCounts[song.artist].likes += song.likes;
    });

    return Object.entries(artistCounts)
      .sort(([, a], [, b]) => b.streams - a.streams)
      .slice(0, limit)
      .map(([artist, data]) => ({ artist, ...data }));
  }

  static getTrendingTags() {
    const tagCounts = {};
    MUSIC_DATABASE.forEach(song => {
      song.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + song.streams;
      });
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([tag, streams]) => ({ tag, streams }));
  }
}

export class MusicRecommendations {
  static getSimilarSongs(songId, limit = 5) {
    const song = MusicSearchService.getSongById(songId);
    if (!song) return [];

    return MUSIC_DATABASE.filter(s => s.id !== songId)
      .filter(
        s =>
          s.genre === song.genre ||
          s.country === song.country ||
          s.tags.some(tag => song.tags.includes(tag))
      )
      .sort((a, b) => b.streams - a.streams)
      .slice(0, limit);
  }

  static getRecommendedForUser(userPreferences) {
    const {
      favoriteGenres = [],
      favoriteCountries = [],
      favoriteArtists = [],
    } = userPreferences;

    return MUSIC_DATABASE.filter(
      song =>
        favoriteGenres.includes(song.genre) ||
        favoriteCountries.includes(song.country) ||
        favoriteArtists.includes(song.artist)
    )
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
  }
}

export default MusicSearchService;
