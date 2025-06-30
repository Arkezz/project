import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Plus,
  Star,
  BookOpen,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Novel {
  id: string;
  title: string;
  originalTitle?: string;
  cover: string;
  rating: number;
  chapters: number;
  status: string;
  genres: string[];
}

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecommendation: (novel: Novel) => void;
  existingRecommendations: string[];
}

// Mock novels data for search
const mockNovels: Novel[] = [
  {
    id: "novel-1",
    title: "Martial World",
    originalTitle: "武极天下",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=300",
    rating: 4.6,
    chapters: 2112,
    status: "Completed",
    genres: ["Action", "Fantasy", "Martial Arts"],
  },
  {
    id: "novel-2",
    title: "Against the Gods",
    originalTitle: "逆天邪神",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300",
    rating: 4.3,
    chapters: 1875,
    status: "Completed",
    genres: ["Action", "Fantasy", "Romance"],
  },
  {
    id: "novel-3",
    title: "I Shall Seal the Heavens",
    originalTitle: "我欲封天",
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=300",
    rating: 4.7,
    chapters: 1614,
    status: "Completed",
    genres: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "novel-4",
    title: "Coiling Dragon",
    originalTitle: "盘龙",
    cover:
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=300",
    rating: 4.8,
    chapters: 806,
    status: "Completed",
    genres: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "novel-5",
    title: "Stellar Transformations",
    originalTitle: "星辰变",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=300",
    rating: 4.4,
    chapters: 697,
    status: "Completed",
    genres: ["Action", "Fantasy", "Xuanhuan"],
  },
];

export default function RecommendationModal({
  isOpen,
  onClose,
  onAddRecommendation,
  existingRecommendations,
}: RecommendationModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Novel[]>([]);
  const [addingNovelId, setAddingNovelId] = useState<string | null>(null);

  // Simulate search with debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = mockNovels.filter(
        (novel) =>
          !existingRecommendations.includes(novel.id) &&
          (novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            novel.originalTitle
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            novel.genres.some((genre) =>
              genre.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, existingRecommendations]);

  const handleAddRecommendation = async (novel: Novel) => {
    setAddingNovelId(novel.id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    onAddRecommendation(novel);
    setAddingNovelId(null);

    toast.success(`Added "${novel.title}" to recommendations`, {
      icon: "✨",
      duration: 3000,
    });
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add Recommendation
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Search and add novels to recommend to other readers
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, original title, or genre..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-base"
              autoFocus
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 size={20} className="text-gray-400 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {!searchQuery.trim() ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Search for novels to recommend
              </h3>
              <p className="text-gray-600 max-w-md">
                Start typing to find novels that you think other readers would
                enjoy. You can search by title, original title, or genre.
              </p>
            </div>
          ) : searchResults.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No novels found
              </h3>
              <p className="text-gray-600 max-w-md">
                We couldn't find any novels matching "{searchQuery}". Try
                searching with different keywords or check your spelling.
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {searchResults.map((novel, index) => (
                    <motion.div
                      key={novel.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                          <img
                            src={novel.cover}
                            alt={novel.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 line-clamp-1">
                                {novel.title}
                              </h3>
                              {novel.originalTitle && (
                                <p className="text-sm text-gray-600 line-clamp-1 font-cn">
                                  {novel.originalTitle}
                                </p>
                              )}
                            </div>

                            <motion.button
                              onClick={() => handleAddRecommendation(novel)}
                              disabled={addingNovelId === novel.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {addingNovelId === novel.id ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  <span>Adding...</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={14} />
                                  <span>Add</span>
                                </>
                              )}
                            </motion.button>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Star
                                size={14}
                                className="text-amber-400 fill-current"
                              />
                              <span>{novel.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen size={14} />
                              <span>{novel.chapters.toLocaleString()} ch</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                novel.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {novel.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {novel.genres.slice(0, 3).map((genre) => (
                              <span
                                key={genre}
                                className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                            {novel.genres.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                                +{novel.genres.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {searchResults.length > 0 && (
                <>
                  Found {searchResults.length} novel
                  {searchResults.length !== 1 ? "s" : ""}
                </>
              )}
            </p>
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
