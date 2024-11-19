import { Flame } from 'lucide-react';
import React from 'react';
import NovelCard from './NovelCard';

interface TrendingNovelsProps {
  novels: Array<{
    title: string;
    originalTitle: string;
    language: 'cn' | 'kr' | 'jp';
    cover: string;
    progress: number;
    rating: number;
    chaptersRead: number;
    totalChapters: number;
  }>;
}

export default function TrendingNovels({ novels }: TrendingNovelsProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="text-accent" size={24} />
        <h2 className="text-2xl font-semibold">Trending Now</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {novels.map((novel) => (
          <NovelCard key={novel.title} {...novel} />
        ))}
      </div>
    </section>
  );
}