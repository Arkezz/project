import { motion } from "framer-motion";
import { BookOpen, Heart, List, Star } from "lucide-react";
import React, { useState } from "react";

interface NovelCardProps {
  id: string;
  title: string;
  originalTitle: string;
  language: "cn" | "kr" | "jp";
  cover: string;
  progress: number;
  rating: number;
  chaptersRead: number;
  totalChapters: number;
  status: string;
  genres: string[];
  synopsis: string;
}

const languageIndicators = {
  cn: "🇨🇳",
  kr: "한",
  jp: "日",
} as const;

export default function NovelCard({
  title,
  originalTitle,
  language,
  cover,
  progress,
  rating,
  chaptersRead,
  totalChapters,
  genres,
  synopsis,
}: NovelCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      className="group relative bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
    >
      <div className="aspect-[2/3] relative">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
        {/* Language indicator */}
        <div className="absolute top-2 left-2 text-xs bg-black/40 backdrop-blur-sm text-white/90 px-1.5 py-0.5 rounded font-medium">
          {languageIndicators[language]}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick actions */}
        <motion.div
          className="absolute top-2 right-2 flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors">
            <Heart size={16} />
          </button>
          <button className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 transition-colors">
            <List size={16} />
          </button>
        </motion.div>

        {/* Hover content */}
        <motion.div
          className="absolute inset-0 p-3 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs">
              <Star size={14} className="text-amber-400" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
              <span className="mx-1">•</span>
              <span>{genres[0]}</span>
            </div>
            <p className="text-xs line-clamp-2 text-gray-200">{synopsis}</p>
          </div>
        </motion.div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      <div className="p-2">
        <h3 className="font-medium text-sm line-clamp-1" title={title}>
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p
            className={`text-xs text-gray-500 font-${language} line-clamp-1`}
            title={originalTitle}
          >
            {originalTitle}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <BookOpen size={12} />
            <span>{chaptersRead}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
