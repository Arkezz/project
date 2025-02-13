import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Plus } from "lucide-react";
import type { Novel } from "../../../types/novel";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

const AVAILABLE_GENRES = [
  { id: "1", name: "Action", type: "Genre" },
  { id: "2", name: "Adventure", type: "Genre" },
  { id: "3", name: "Comedy", type: "Genre" },
  { id: "4", name: "Drama", type: "Genre" },
  { id: "5", name: "Fantasy", type: "Genre" },
  { id: "6", name: "Horror", type: "Genre" },
  { id: "7", name: "Mystery", type: "Genre" },
  { id: "8", name: "Romance", type: "Genre" },
  { id: "9", name: "Sci-Fi", type: "Genre" },
  { id: "10", name: "Slice of Life", type: "Genre" },
  { id: "11", name: "Reincarnation", type: "Theme" },
  { id: "12", name: "Magic", type: "Theme" },
  { id: "13", name: "School Life", type: "Theme" },
  { id: "14", name: "Strong Lead", type: "Tag" },
  { id: "15", name: "Female Lead", type: "Tag" },
];

export default function GenreSelect() {
  const [search, setSearch] = useState("");
  const { watch, setValue } = useFormContext<NovelEditForm>();
  const selectedGenres = watch("genres");

  const filteredGenres = AVAILABLE_GENRES.filter(
    (genre) =>
      genre.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedGenres.find((g) => g.id === genre.id)
  );

  const handleSelect = (genre: (typeof AVAILABLE_GENRES)[0]) => {
    setValue("genres", [...selectedGenres, genre]);
    setSearch("");
  };

  const handleRemove = (genreId: string) => {
    setValue(
      "genres",
      selectedGenres.filter((g) => g.id !== genreId)
    );
  };

  const getTagStyle = (type: "Genre" | "Theme" | "Tag") => {
    switch (type) {
      case "Genre":
        return "tag-primary";
      case "Theme":
        return "tag-secondary";
      case "Tag":
        return "tag-accent";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selectedGenres.map((genre) => (
            <motion.span
              key={genre.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`tag ${getTagStyle(genre.type)}`}
            >
              {genre.name}
              <button
                type="button"
                onClick={() => handleRemove(genre.id)}
                className="p-0.5 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input pl-10"
          placeholder="Search genres..."
        />

        <AnimatePresence>
          {search && filteredGenres.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto"
            >
              {filteredGenres.map((genre) => (
                <motion.button
                  key={genre.id}
                  whileHover={{ x: 4 }}
                  onClick={() => handleSelect(genre)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between group"
                >
                  <span className="text-sm">{genre.name}</span>
                  <span className="flex items-center gap-2">
                    <span className={`tag ${getTagStyle(genre.type)} text-xs`}>
                      {genre.type}
                    </span>
                    <Plus
                      size={16}
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
