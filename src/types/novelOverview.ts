export interface Character {
  id: string;
  name: string;
  originalName?: string;
  role: "Main" | "Supporting" | "Antagonist";
  image?: string;
  description?: string;
}

export interface Publisher {
  name: string;
  type: "Original" | "Licensed";
  website?: string;
}

export interface Creator {
  name: string;
  originalName?: string;
  role: "Author" | "Artist" | "Illustrator";
}

export interface Novel {
  id: string;
  title: string;
  originalTitle?: string;
  alternativeTitles?: string[];
  type: "Web Novel" | "Light Novel" | "Published Novel";
  status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled";
  cover: string;

  creators: Creator[];
  publishers: Publisher[];

  releaseSchedule: {
    frequency: string;
    day?: string;
    time?: string;
    nextRelease?: string;
  };

  translation: {
    status: "Ongoing" | "Completed" | "Licensed" | "Dropped";
    language: string;
    progress: number;
    group?: string;
    lastUpdate: string;
  };

  statistics: {
    rating: number;
    totalRatings: number;
    ratingDistribution: Record<number, number>;
    readers: number;
    reviews: number;
    favorites: number;
    rank?: number;
    popularity?: number;
  };

  details: {
    volumes?: number;
    chapters: number;
    averageLength: string;
    language: string;
    origin: string;
    startDate: string;
    endDate?: string;
  };

  genres: Array<{
    id: string;
    name: string;
    type: "Genre" | "Theme" | "Tag";
  }>;

  characters: Character[];
  synopsis: string;
  contentWarnings?: string[];

  recommendations: Array<{
    id: string;
    title: string;
    cover: string;
    similarity: number;
    reason?: string;
  }>;

  userProgress?: {
    status: "Reading" | "Completed" | "On Hold" | "Dropped" | "Plan to Read";
    currentChapter: number;
    rating?: number;
    startDate?: string;
    completedDate?: string;
    notes?: string;
  };
}
