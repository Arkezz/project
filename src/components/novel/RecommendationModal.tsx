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
  MessageSquare,
  Sparkles,
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
  onAddRecommendation: (novel: Novel, reason?: string) => void;
  existingRecommendations: string[];
}

// Mock novels data for search
const mockNovels: Novel[] = [
  {
    id: "novel-1",
    title: "Martial World",
    originalTitle: "武极天下",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=300",
    rating: 4.6,
    chapters: 2112,
    status: "Completed",
    genres: ["Action", "Fantasy", "Martial Arts"],
  },
  {
    id: "novel-2",
    title: "Against the Gods",
    originalTitle: "逆天邪神",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300",
    rating: 4.3,
    chapters: 1875,
    status: "Completed",
    genres: ["Action", "Fantasy", "Romance"],
  },
  {
    id: "novel-3",
    title: "I Shall Seal the Heavens",
    originalTitle: "我欲封天",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=300",
    rating: 4.7,
    chapters: 1614,
    status: "Completed",
    genres: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "novel-4",
    title: "Coiling Dragon",
    originalTitle: "盘龙",
    cover: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=300",
    rating: 4.8,
    chapters: 806,
    status: "Completed",
    genres: ["Action", "Adventure", "Fantasy"],
  },
  {
    id: "novel-5",
    title: "Stellar Transformations",
    originalTitle: "星辰变",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=300",
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
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [recommendationReason, setRecommendationReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced modal animations with spring physics
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 10,
      transition: { duration: 0.15 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  };

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
            novel.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            novel.genres.some((genre) =>
              genre.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, existingRecommendations]);

  // Enhanced form validation
  const validateReason = (reason: string) => {
    if (reason.trim().length < 10) {
      return "Please provide a more detailed reason (at least 10 characters)";
    }
    if (reason.trim().length > 200) {
      return "Reason is too long (maximum 200 characters)";
    }
    return "";
  };

  const handleNovelSelect = (novel: Novel) => {
    setSelectedNovel(novel);
    setRecommendationReason("");
    setReasonError("");
  };

  const handleReasonChange = (value: string) => {
    setRecommendationReason(value);
    if (reasonError) {
      const error = validateReason(value);
      setReasonError(error);
    }
  };

  const handleSubmitRecommendation = async () => {
    if (!selectedNovel) return;

    // Validate reason field
    const error = validateReason(recommendationReason);
    if (error) {
      setReasonError(error);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      onAddRecommendation(selectedNovel, recommendationReason.trim());
      
      // Success feedback with enhanced toast
      toast.success(`Added "${selectedNovel.title}" to recommendations`, {
        icon: "✨",
        duration: 3000,
        description: "Your recommendation will help other readers discover great novels!",
      });

      // Reset form state
      setSelectedNovel(null);
      setRecommendationReason("");
      setReasonError("");
    } catch (error) {
      toast.error("Failed to add recommendation", {
        icon: "❌",
        duration: 4000,
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset all form state when closing
    setSearchQuery("");
    setSearchResults([]);
    setSelectedNovel(null);
    setRecommendationReason("");
    setReasonError("");
    setIsSubmitting(false);
    onClose();
  };

  const handleBackToSearch = () => {
    setSelectedNovel(null);
    setRecommendationReason("");
    setReasonError("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header with Gradient */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5" />
            <div className="relative p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Sparkles size={24} className="text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedNovel ? "Add Recommendation" : "Find Novel to Recommend"}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedNovel 
                        ? "Tell others why you recommend this novel"
                        : "Search and add novels to recommend to other readers"
                      }
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!selectedNovel ? (
                // Search Phase
                <motion.div
                  key="search"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Enhanced Search Bar */}
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="relative">
                      <motion.div
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        animate={{ scale: isLoading ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.6, repeat: isLoading ? Infinity : 0 }}
                      >
                        <Search size={20} />
                      </motion.div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title, original title, or genre..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-base shadow-sm hover:shadow-md"
                        autoFocus
                      />
                      {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <Loader2 size={20} className="text-gray-400 animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Search Results */}
                  {!searchQuery.trim() ? (
                    <motion.div 
                      className="flex flex-col items-center justify-center py-20 px-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Search size={28} className="text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Search for novels to recommend
                      </h3>
                      <p className="text-gray-600 max-w-md leading-relaxed">
                        Start typing to find novels that you think other readers would enjoy.
                        You can search by title, original title, or genre.
                      </p>
                    </motion.div>
                  ) : searchResults.length === 0 && !isLoading ? (
                    <motion.div 
                      className="flex flex-col items-center justify-center py-20 px-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <AlertCircle size={28} className="text-gray-400" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        No novels found
                      </h3>
                      <p className="text-gray-600 max-w-md leading-relaxed">
                        We couldn't find any novels matching "{searchQuery}". Try
                        searching with different keywords or check your spelling.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="p-6">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <AnimatePresence mode="popLayout">
                          {searchResults.map((novel, index) => (
                            <motion.div
                              key={novel.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ 
                                duration: 0.2, 
                                delay: index * 0.05,
                                layout: { duration: 0.2 }
                              }}
                              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20"
                              whileHover={{ y: -4 }}
                            >
                              <div className="flex gap-4">
                                <motion.div 
                                  className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-1 ring-gray-200"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <img
                                    src={novel.cover}
                                    alt={novel.title}
                                    className="w-full h-full object-cover"
                                  />
                                </motion.div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-gray-900 line-clamp-1 text-lg">
                                        {novel.title}
                                      </h3>
                                      {novel.originalTitle && (
                                        <p className="text-sm text-gray-600 line-clamp-1 font-cn mt-1">
                                          {novel.originalTitle}
                                        </p>
                                      )}
                                    </div>

                                    <motion.button
                                      onClick={() => handleNovelSelect(novel)}
                                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all text-sm font-medium"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <Plus size={16} />
                                      <span>Select</span>
                                    </motion.button>
                                  </div>

                                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Star
                                        size={14}
                                        className="text-amber-400 fill-current"
                                      />
                                      <span className="font-medium">{novel.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <BookOpen size={14} />
                                      <span>{novel.chapters.toLocaleString()} ch</span>
                                    </div>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium"
                                      >
                                        {genre}
                                      </span>
                                    ))}
                                    {novel.genres.length > 3 && (
                                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-lg font-medium">
                                        +{novel.genres.length - 3}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ) : (
                // Recommendation Form Phase
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  {/* Selected Novel Display */}
                  <motion.div
                    className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 mb-6 border border-primary/10"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded-xl overflow-hidden shadow-md ring-2 ring-white">
                        <img
                          src={selectedNovel.cover}
                          alt={selectedNovel.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {selectedNovel.title}
                        </h3>
                        {selectedNovel.originalTitle && (
                          <p className="text-gray-600 font-cn mb-2">
                            {selectedNovel.originalTitle}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-amber-400 fill-current" />
                            <span className="font-medium">{selectedNovel.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{selectedNovel.chapters.toLocaleString()} chapters</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        onClick={handleBackToSearch}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-white/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Back to search"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Enhanced Reason Input Field */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div>
                      <label className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-3">
                        <MessageSquare size={18} className="text-primary" />
                        Why do you recommend this novel?
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={recommendationReason}
                          onChange={(e) => handleReasonChange(e.target.value)}
                          onBlur={() => setReasonError(validateReason(recommendationReason))}
                          placeholder="Share what makes this novel special... (e.g., 'Amazing character development and unique magic system that keeps you hooked from chapter one')"
                          className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-base leading-relaxed ${
                            reasonError 
                              ? "border-red-300 focus:border-red-400 bg-red-50" 
                              : "border-gray-200 focus:border-primary/50 hover:border-gray-300"
                          }`}
                          rows={4}
                          maxLength={200}
                          aria-describedby={reasonError ? "reason-error" : "reason-help"}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                          {recommendationReason.length}/200
                        </div>
                      </div>
                      
                      {reasonError ? (
                        <motion.p
                          id="reason-error"
                          className="text-red-600 text-sm mt-2 flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle size={14} />
                          {reasonError}
                        </motion.p>
                      ) : (
                        <p id="reason-help" className="text-gray-500 text-sm mt-2">
                          Help other readers understand why they should read this novel
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Footer */}
          <motion.div
            className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-gray-100/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedNovel ? (
                  <span className="flex items-center gap-2">
                    <Check size={14} className="text-green-500" />
                    Novel selected: {selectedNovel.title}
                  </span>
                ) : searchResults.length > 0 ? (
                  <>
                    Found {searchResults.length} novel
                    {searchResults.length !== 1 ? "s" : ""}
                  </>
                ) : null}
              </div>
              
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleClose}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                
                {selectedNovel && (
                  <motion.button
                    onClick={handleSubmitRecommendation}
                    disabled={isSubmitting || !recommendationReason.trim() || !!reasonError}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Adding Recommendation...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Add Recommendation</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}