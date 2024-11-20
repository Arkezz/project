import React from "react";
import { BookOpen, Heart, List, Share2, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

interface NovelHeaderProps {
  title: string;
  originalTitle: string;
  cover: string;
  status: string;
  type: string;
  rating: number;
  totalRatings: number;
  chapters: {
    total: number;
    latest: number;
  };
  activeReaders: number;
}

export default function NovelHeader({
  title,
  originalTitle,
  cover,
  status,
  type,
  rating,
  totalRatings,
  chapters,
  activeReaders,
}: NovelHeaderProps) {
  return (
    <div className="relative h-96 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-20"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="absolute inset-0 bg-banner" />

      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 h-72 rounded-lg overflow-hidden shadow-lg flex-shrink-0"
          >
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                {status}
              </span>
              <span className="px-2 py-1 bg-surface shadow-sm rounded text-sm">
                {type}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-2 text-text">{title}</h1>
            <p className="text-xl text-gray-600 mb-4 font-kr">
              {originalTitle}
            </p>

            <div className="flex items-center gap-6 text-text">
              <div className="flex items-center gap-2">
                <Star className="text-amber-500" fill="currentColor" />
                <span className="font-medium">{rating}</span>
                <span className="text-sm text-gray-500">
                  ({totalRatings.toLocaleString()} ratings)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <span>Ch. {chapters.total}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{(activeReaders / 1000).toFixed(1)}K readers</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button className="btn-primary flex items-center gap-2">
                <List size={20} />
                Add to Reading List
              </button>
              <button className="p-2 rounded-lg bg-surface hover:bg-gray-100 transition-colors shadow-sm">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-lg bg-surface hover:bg-gray-100 transition-colors shadow-sm">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
