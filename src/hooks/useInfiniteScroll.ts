import { useState, useEffect } from 'react';

interface Novel {
  id: string;
  title: string;
  originalTitle: string;
  language: 'cn' | 'kr' | 'jp';
  cover: string;
  progress: number;
  rating: number;
  chaptersRead: number;
  totalChapters: number;
}

interface Filters {
  status: string[];
  genres: string[];
  languages: string[];
  minChapters: string;
  maxChapters: string;
  minRating: string;
}

// Mock data generator
const generateMockData = (page: number, query: string, filters: Filters): Novel[] => {
  // In a real app, this would be an API call
  const mockData: Novel[] = Array.from({ length: 12 }, (_, i) => ({
    id: `${page}-${i}`,
    title: `Novel ${page * 12 + i + 1}`,
    originalTitle: '小说',
    language: ['cn', 'kr', 'jp'][Math.floor(Math.random() * 3)] as 'cn' | 'kr' | 'jp',
    cover: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500`,
    progress: Math.random() * 100,
    rating: 3 + Math.random() * 2,
    chaptersRead: Math.floor(Math.random() * 100),
    totalChapters: 100 + Math.floor(Math.random() * 900),
  }));

  return mockData.filter(novel => 
    novel.title.toLowerCase().includes(query.toLowerCase())
  );
};

export default function useInfiniteScroll(query: string, filters: Filters) {
  const [items, setItems] = useState<Novel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [query, filters]);

  useEffect(() => {
    const loadMore = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newItems = generateMockData(page, query, filters);
        
        setItems(prev => [...prev, ...newItems]);
        setHasMore(newItems.length > 0);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadMore();
  }, [page, query, filters]);

  return { items, loading, error, hasMore };
}