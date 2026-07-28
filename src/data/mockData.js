export const mockGenres = [
  { id: 1, name: "Makossa", color: "from-pink-500 to-purple-500" },
  { id: 2, name: "Cameroun Music", color: "from-blue-500 to-teal-500" },
  { id: 3, name: "African Hits", color: "from-green-500 to-yellow-500" },
  { id: 4, name: "World Music", color: "from-orange-500 to-red-500" },
  { id: 5, name: "O Musiki Hits", color: "from-purple-500 to-pink-500" },
  { id: 6, name: "Generation 90", color: "from-indigo-500 to-purple-500" },
  { id: 7, name: "Generation 80", color: "from-teal-500 to-green-500" },
  { id: 8, name: "Generation 70", color: "from-red-500 to-orange-500" },
];

export const mockSongs = [
  {
    id: 1,
    title: "Ndolo",
    artist: "Grace Decca",
    album: "Best of Makossa",
    duration: 240,
    genre: "Makossa",
  },
  {
    id: 2,
    title: "Soul Makossa",
    artist: "Manu Dibango",
    album: "Soul Makossa",
    duration: 265,
    genre: "Makossa",
  },
  {
    id: 3,
    title: "Amio",
    artist: "Charlotte Dipanda",
    album: "Karibu",
    duration: 218,
    genre: "Cameroun Music",
  },
  {
    id: 4,
    title: "Lobé",
    artist: "Mani Bella",
    album: "Pousse la vie",
    duration: 195,
    genre: "Cameroun Music",
  },
  {
    id: 5,
    title: "African Queen",
    artist: "2Baba",
    album: "Face 2 Face",
    duration: 232,
    genre: "African Hits",
  },
  {
    id: 6,
    title: "Zombie",
    artist: "Fela Kuti",
    album: "Zombie",
    duration: 720,
    genre: "African Hits",
  },
  {
    id: 7,
    title: "Pata Pata",
    artist: "Miriam Makeba",
    album: "Pata Pata",
    duration: 180,
    genre: "World Music",
  },
  {
    id: 8,
    title: "Jambo Bwana",
    artist: "Them Mushrooms",
    album: "Jambo Bwana",
    duration: 215,
    genre: "World Music",
  },
];

export const mockPlaylists = [
  { id: 1, name: "Mes Favoris", songs: [1, 3, 5, 7] },
  { id: 2, name: "Vibes du Weekend", songs: [2, 4, 6, 8] },
  { id: 3, name: "Classiques Africains", songs: [1, 2, 5, 6] },
];

export const mockSubscriptionPlans = [
  {
    id: 1,
    name: "Gratuit",
    price: 0,
    features: ["Écoute limitée", "Publicités", "Qualité standard"],
  },
  {
    id: 2,
    name: "Premium",
    price: 4.99,
    features: [
      "Écoute illimitée",
      "Sans publicité",
      "Qualité HD",
      "Mode hors ligne",
    ],
  },
  {
    id: 3,
    name: "Famille",
    price: 7.99,
    features: ["Tout Premium", "6 comptes", "Contrôle parental"],
  },
];
