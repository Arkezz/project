import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NovelCard from "../NovelCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ArrowUpDown } from "lucide-react";

interface Novel {
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

interface FilteredResultsProps {
  novels: Novel[];
  isLoading: boolean;
  hasMore: boolean;
}

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "popular", label: "Popular" },
  { id: "rating", label: "Rating" },
] as const;

export default function FilteredResults({
  novels,
  isLoading,
  hasMore,
}: FilteredResultsProps) {
  const [sortBy, setSortBy] =
    React.useState<(typeof sortOptions)[number]["id"]>("latest");
  const [showSortMenu, setShowSortMenu] = React.useState(false);

  const { loadMoreRef } = useInfiniteScroll(() => {
    console.log("Loading more...");
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown size={16} />
            Sort by: {sortOptions.find((opt) => opt.id === sortBy)?.label}
          </button>

          <AnimatePresence>
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-48 bg-surface border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                      sortBy === option.id ? "bg-gray-50 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {novels.map((novel, index) => (
            <motion.div
              key={novel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NovelCard {...novel} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {hasMore && <div ref={loadMoreRef} className="h-4" />}
    </div>
  );
}
