import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Supernatural',
  'Martial Arts', 'Historical', 'Military', 'Psychological'
];

const statuses = ['Ongoing', 'Completed', 'Hiatus'];
const languages = ['Chinese', 'Korean', 'Japanese'];

interface SearchFiltersProps {
  filters: {
    status: string[];
    genres: string[];
    languages: string[];
    minChapters: string;
    maxChapters: string;
    minRating: string;
  };
  onChange: (filters: SearchFiltersProps['filters']) => void;
  onClose: () => void;
}

export default function SearchFilters({ filters, onChange, onClose }: SearchFiltersProps) {
  const handleToggle = (key: 'status' | 'genres' | 'languages', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-surface rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="font-medium mb-3">Status</h3>
          <div className="space-y-2">
            {statuses.map(status => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => handleToggle('status', status)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Language</h3>
          <div className="space-y-2">
            {languages.map(language => (
              <label key={language} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.languages.includes(language)}
                  onChange={() => handleToggle('languages', language)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Chapters</h3>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filters.minChapters}
              onChange={(e) => onChange({ ...filters, minChapters: e.target.value })}
              className="w-24 px-3 py-2 rounded-lg border border-gray-200"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxChapters}
              onChange={(e) => onChange({ ...filters, maxChapters: e.target.value })}
              className="w-24 px-3 py-2 rounded-lg border border-gray-200"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-medium mb-3">Rating</h3>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating || "0"}
            onChange={(e) => onChange({ ...filters, minRating: e.target.value })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Any</span>
            <span>≥ {filters.minRating || 0} ★</span>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-medium mb-3">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => handleToggle('genres', genre)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.genres.includes(genre)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}