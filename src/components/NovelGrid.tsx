import { motion } from 'framer-motion';
import React from 'react';
import NovelCard from './NovelCard';

interface NovelGridProps {
  type: 'trending' | 'new' | 'regional' | 'reading' | 'completed';
}

export default function NovelGrid({ type }: NovelGridProps) {
  const novels = [
    {
      id: '1',
      title: "The Beginning After The End",
      originalTitle: "디 비기닝 애프터 디 엔드",
      language: "kr",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
      progress: 75,
      rating: 4.7,
      chaptersRead: 320,
      totalChapters: 420,
      status: 'Reading',
      genres: ['Fantasy', 'Action', 'Adventure'],
      synopsis: "King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability...",
    },
    {
      id: '2',
      title: "Omniscient Reader's Viewpoint",
      originalTitle: "전지적 독자 시점",
      language: "kr",
      cover: "https://cdn.novelupdates.com/images/2020/12/Omniscient-Readers-Viewpoint.png",
      progress: 42,
      rating: 4.8,
      chaptersRead: 230,
      totalChapters: 551,
      status: 'Reading',
      genres: ['Fantasy', 'Drama', 'Psychological'],
      synopsis: "Only I know how this world will end. The story of a novel becomes reality, and the only...",
    },
    {
      id: '3',
      title: "Release That Witch",
      originalTitle: "放开那个女巫",
      language: "cn",
      cover: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
      progress: 88,
      rating: 4.5,
      chaptersRead: 1320,
      totalChapters: 1498,
      status: 'Reading',
      genres: ['Fantasy', 'Kingdom Building', 'Romance'],
      synopsis: "Chen Yan travels through time, only to end up becoming an honorable prince in the Middle Ages...",
    },
  ];

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {novels.map((novel) => (
        <NovelCard key={novel.id} {...novel} />
      ))}
    </motion.div>
  );
}