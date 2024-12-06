import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

interface NovelDetailsProps {
  show: boolean;
  rating: number;
  genres: string[];
  synopsis: string;
}

export default function NovelDetails({
  show,
  rating,
  genres,
  synopsis,
}: NovelDetailsProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 p-3 flex flex-col justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-white space-y-1.5">
            <motion.div
              className="flex items-center gap-1.5 text-xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Star size={14} className="text-amber-400" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
              <span className="mx-1">•</span>
              <span>{genres[0]}</span>
            </motion.div>
            <motion.p
              className="text-xs line-clamp-2 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {synopsis}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
