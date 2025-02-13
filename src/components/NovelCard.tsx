import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuickActions from "./novelcard/QuickActions";
import ProgressBar from "./novelcard/ProgressBar";
import NovelDetails from "./novelcard/NovelDetails";

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
  status: "reading" | "completed" | "paused" | "on_hold";
  genres: string[];
  synopsis: string;
}

const languageIndicators = {
  cn: "🇨🇳",
  kr: "한",
  jp: "日",
} as const;

export default function NovelCard({
  id,
  title,
  originalTitle,
  language,
  cover,
  progress,
  rating,
  chaptersRead,
  totalChapters,
  status,
  genres,
  synopsis,
}: NovelCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleAction = (type: "favorite" | "status", success: boolean) => {
    console.log(
      `Action ${type} ${success ? "succeeded" : "failed"} for novel ${id}`
    );
  };

  const novelUrl = `/novel/${id}`;

  return (
    <motion.div
      className="group relative bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
    >
      <Link
        to={novelUrl}
        className="block aspect-[2/3] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={cover} alt={title} className="w-full h-full object-cover" />

        <motion.div
          className="absolute top-2 left-2 text-xs bg-black/40 backdrop-blur-sm text-white/90 px-1.5 py-0.5 rounded font-medium z-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {languageIndicators[language]}
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <QuickActions novelId={id} show={showDetails} onAction={handleAction} />

        <NovelDetails
          show={showDetails}
          rating={rating}
          genres={genres}
          synopsis={synopsis}
        />

        <ProgressBar progress={progress} status={status} />
      </Link>

      <motion.div
        className="p-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to={novelUrl}
          className="block hover:text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-medium text-sm line-clamp-1" title={title}>
            {title}
          </h3>
        </Link>
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
      </motion.div>
    </motion.div>
  );
}
