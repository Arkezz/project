import React from "react";
import { motion } from "framer-motion";

const genres = [
  { id: "action", name: "Action", count: 1243 },
  { id: "romance", name: "Romance", count: 892 },
  { id: "fantasy", name: "Fantasy", count: 1567 },
  { id: "drama", name: "Drama", count: 743 },
  { id: "comedy", name: "Comedy", count: 456 },
  { id: "horror", name: "Horror", count: 234 },
  { id: "scifi", name: "Sci-Fi", count: 345 },
  { id: "mystery", name: "Mystery", count: 567 },
  { id: "historical", name: "Historical", count: 432 },
  { id: "military", name: "Military", count: 234 },
].sort((a, b) => b.count - a.count);

interface GenreGridProps {
  selectedGenres: string[];
  onGenreToggle: (genreId: string) => void;
}

export default function GenreGrid({
  selectedGenres,
  onGenreToggle,
}: GenreGridProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((genre) => {
        const isSelected = selectedGenres.includes(genre.id);

        return (
          <motion.button
            key={genre.id}
            onClick={() => onGenreToggle(genre.id)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
              isSelected
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{genre.name}</span>
            <span className="ml-2 text-xs opacity-70">{genre.count}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
