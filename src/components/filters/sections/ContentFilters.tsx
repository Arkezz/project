import React, { useState } from "react";
import GenreGrid from "./genres/GenreGrid";
import TagSelector from "./tags/TagSelector";

export default function ContentFilters() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      {/* Genres */}
      <div>
        <h4 className="text-base font-medium mb-4">Popular Genres</h4>
        <GenreGrid
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
        />
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-base font-medium mb-4">Story Elements</h4>
        <TagSelector
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />
      </div>

      {/* Content Warnings */}
      <div>
        <h4 className="text-base font-medium mb-4">Content Warnings</h4>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-full cursor-pointer transition-colors text-sm">
          <input type="checkbox" className="rounded border-red-300" />
          <span>Contains Adult Content</span>
        </label>
      </div>
    </div>
  );
}
