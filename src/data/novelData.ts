const novels = [
  {
    id: "1",
    title: "The Beginning After The End",
    originalTitle: "디 비기닝 애프터 디 엔드",
    language: "kr",
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
    progress: 75,
    rating: 4.7,
    chaptersRead: 320,
    totalChapters: 420,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability...",
  },
  {
    id: "2",
    title: "Omniscient Reader's Viewpoint",
    originalTitle: "전지적 독자 시점",
    language: "kr",
    cover:
      "https://cdn.novelupdates.com/images/2020/12/Omniscient-Readers-Viewpoint.png",
    progress: 42,
    rating: 4.8,
    chaptersRead: 230,
    totalChapters: 551,
    status: "Reading",
    genres: ["Fantasy", "Drama", "Psychological"],
    synopsis:
      "Only I know how this world will end. The story of a novel becomes reality, and the only...",
  },
  {
    id: "3",
    title: "Release That Witch",
    originalTitle: "放开那个女巫",
    language: "cn",
    cover:
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
    progress: 88,
    rating: 4.5,
    chaptersRead: 1320,
    totalChapters: 1498,
    status: "Reading",
    genres: ["Fantasy", "Kingdom Building", "Romance"],
    synopsis:
      "Chen Yan travels through time, only to end up becoming an honorable prince in the Middle Ages...",
  },
  {
    id: "4",
    title: "Solo Leveling",
    originalTitle: "나 혼자만 레벨업",
    language: "kr",
    cover: "https://cdn.novelupdates.com/images/2019/01/Solo-Leveling.jpg",
    progress: 100,
    rating: 4.9,
    chaptersRead: 270,
    totalChapters: 270,
    status: "Completed",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race...",
  },
  {
    id: "5",
    title: "Martial Peak",
    originalTitle: "武炼巅峰",
    language: "cn",
    cover: "https://cdn.novelupdates.com/images/2016/02/i228072.jpg",
    progress: 50,
    rating: 4.6,
    chaptersRead: 2500,
    totalChapters: 5000,
    status: "Reading",
    genres: ["Fantasy", "Martial Arts", "Adventure"],
    synopsis:
      "The journey to the martial peak is a lonely, solitary and long one. In the face of adversity, you must survive and remain unyielding...",
  },
  {
    id: "6",
    title: "Overgeared",
    originalTitle: "템빨",
    language: "kr",
    cover: "https://cdn.novelupdates.com/images/2017/10/og.jpg",
    progress: 60,
    rating: 4.4,
    chaptersRead: 900,
    totalChapters: 1500,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "Shin Youngwoo has had an unfortunate life and is now stuck carrying bricks on construction sites...",
  },
  {
    id: "7",
    title: "The Legendary Moonlight Sculptor",
    originalTitle: "달빛 조각사",
    language: "kr",
    cover: "https://cdn.novelupdates.com/images/2015/06/moonlightsculptor.png",
    progress: 70,
    rating: 4.3,
    chaptersRead: 1400,
    totalChapters: 2000,
    status: "Reading",
    genres: ["Fantasy", "Adventure", "Comedy"],
    synopsis:
      "Hyun's life isn't what he expected and one day he logs into a game called Royal Road...",
  },
  {
    id: "8",
    title: "Tales of Demons and Gods",
    originalTitle: "妖神记",
    language: "cn",
    cover:
      "https://cdn.novelupdates.com/images/2015/07/tales-of-demons-and-gods.jpg",
    progress: 55,
    rating: 4.2,
    chaptersRead: 500,
    totalChapters: 900,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "Killed by a Sage Emperor and reborn as his 13-year-old self, Nie Li was given a second chance...",
  },
  {
    id: "9",
    title: "Against the Gods",
    originalTitle: "逆天邪神",
    language: "cn",
    cover: "https://cdn.novelupdates.com/images/2016/06/1416425191645.jpg",
    progress: 65,
    rating: 4.1,
    chaptersRead: 1000,
    totalChapters: 1500,
    status: "Reading",
    genres: ["Fantasy", "Action", "Romance"],
    synopsis:
      "A boy who was continuously bullied and killed by his peers, reincarnates into a different world...",
  },
  {
    id: "10",
    title: "Coiling Dragon",
    originalTitle: "盘龙",
    language: "cn",
    cover: "https://cdn.novelupdates.com/images/2016/03/s4437529.jpg",
    progress: 100,
    rating: 4.8,
    chaptersRead: 800,
    totalChapters: 800,
    status: "Completed",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "Linley is a young noble of a declining, once-powerful clan. He is determined to restore his clan to its former glory...",
  },
  {
    id: "11",
    title: "Desolate Era",
    originalTitle: "莽荒纪",
    language: "cn",
    cover:
      "https://cdn.novelupdates.com/images/2015/06/Cover-Mang-Huang-Ji.jpg",
    progress: 80,
    rating: 4.5,
    chaptersRead: 1200,
    totalChapters: 1500,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "In the world of the Three Realms, countless legends fight for supremacy. Ji Ning, a youth from Earth, is reincarnated into this world...",
  },
  {
    id: "12",
    title: "I Shall Seal the Heavens",
    originalTitle: "我欲封天",
    language: "cn",
    cover: "https://cdn.novelupdates.com/images/2015/06/15_ISSTH.jpg",
    progress: 90,
    rating: 4.7,
    chaptersRead: 1500,
    totalChapters: 1600,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "What I want, the Heavens shall not lack! What I don't want, had better not exist in the Heavens...",
  },
  {
    id: "13",
    title: "The King's Avatar",
    originalTitle: "全职高手",
    language: "cn",
    cover: "https://cdn.novelupdates.com/images/2017/04/thekingsavatar.jpg",
    progress: 100,
    rating: 4.9,
    chaptersRead: 1728,
    totalChapters: 1728,
    status: "Completed",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "In the online game Glory, Ye Xiu is regarded as a textbook and a top-tier pro-player...",
  },
  {
    id: "14",
    title: "Warlock of the Magus World",
    originalTitle: "巫界之战",
    language: "cn",
    cover:
      "https://cdn.novelupdates.com/images/2022/05/Warlock-of-the-Magus-World_1653417756.jpg",
    progress: 85,
    rating: 4.6,
    chaptersRead: 1000,
    totalChapters: 1200,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "What happens when a scientist from a futuristic world reincarnates in a World of Magic and Knights?",
  },
  {
    id: "15",
    title: "Renegade Immortal",
    originalTitle: "仙逆",
    language: "cn",
    cover: "https://cdn.novelupdates.com/images/2016/03/xianni-1.jpg",
    progress: 75,
    rating: 4.4,
    chaptersRead: 1500,
    totalChapters: 2000,
    status: "Reading",
    genres: ["Fantasy", "Action", "Adventure"],
    synopsis:
      "Wang Lin is a very smart boy with loving parents. Although him and his parents are shunned by the rest of their relatives...",
  },
];

export default novels;
