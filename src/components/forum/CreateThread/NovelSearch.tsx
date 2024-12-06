import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../../../hooks/useClickOutside";
import useDebounce from "../../../hooks/useDebounce";

interface Novel {
  id: string;
  title: string;
  originalTitle: string;
  language: string;
  chapters: number;
}

interface NovelSearchProps {
  selectedNovel: Novel | null;
  onSelect: (novel: Novel | null) => void;
}

export default function NovelSearch({
  selectedNovel,
  onSelect,
}: NovelSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Novel[]>([]);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useClickOutside(searchRef, () => setIsFocused(false));

  // Mock search results - in a real app, this would be an API call
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const mockResults: Novel[] = [
        {
          id: "1",
          title: "The Beginning After The End",
          originalTitle: "디 비기닝 애프터 디 엔드",
          language: "kr",
          chapters: 420,
        },
        {
          id: "2",
          title: "Solo Leveling",
          originalTitle: "나 혼자만 레벨업",
          language: "kr",
          chapters: 179,
        },
        {
          id: "3",
          title: "Omniscient Reader's Viewpoint",
          originalTitle: "전지적 독자 시점",
          language: "kr",
          chapters: 551,
        },
      ].filter(
        (novel) =>
          novel.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          novel.originalTitle
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase())
      );

      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div ref={searchRef} className="relative">
      {selectedNovel ? (
        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div>
            <p className="font-medium">{selectedNovel.title}</p>
            <p className="text-sm text-gray-500">
              {selectedNovel.originalTitle}
            </p>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a novel..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              onFocus={() => setIsFocused(true)}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <AnimatePresence>
            {isFocused && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10"
              >
                {results.map((novel) => (
                  <button
                    key={novel.id}
                    onClick={() => {
                      onSelect(novel);
                      setQuery("");
                      setIsFocused(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-medium">{novel.title}</p>
                    <p className="text-sm text-gray-500">
                      {novel.originalTitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {novel.chapters} chapters
                    </p>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
