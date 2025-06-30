import React, { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  LayoutGrid,
  LayoutList,
  ThumbsDown,
  ThumbsUp,
  Star,
  MessageSquare,
  Edit3,
  Send,
  Filter,
  TrendingUp,
  Calendar as CalendarIcon,
  User,
  Heart,
  Flag,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ReviewCard, { Review } from "./ReviewCard";
import RecommendationModal from "./RecommendationModal";

interface OverviewProps {
  novel: any;
  reviews: Review[];
  reviewSort: "newest" | "oldest" | "helpful" | "rating";
  setReviewSort: React.Dispatch<
    React.SetStateAction<"newest" | "oldest" | "helpful" | "rating">
  >;
  showAllReviews: boolean;
  setShowAllReviews: React.Dispatch<React.SetStateAction<boolean>>;
  onReviewVote: (reviewId: string, type: "like" | "dislike") => void;
  reviewVotes: Record<string, "like" | "dislike" | null>;
}

export default function Overview({
  novel,
  reviews,
  reviewSort,
  setReviewSort,
  showAllReviews,
  setShowAllReviews,
  onReviewVote,
  reviewVotes,
}: OverviewProps) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [userVotes, setUserVotes] = useState<
    Record<string, "up" | "down" | null>
  >({});
  const [recommendationView, setRecommendationView] = useState<"grid" | "list">(
    "grid"
  );
  const [recommendationSort, setRecommendationSort] = useState<
    "match" | "recent"
  >("match");
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [recommendations, setRecommendations] = useState([
    {
      id: "rec-1",
      title: "Solo Leveling",
      cover:
        "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
      matchScore: 95,
      genres: ["Action", "Fantasy", "Adventure"],
      sharedGenres: ["Fantasy", "Action"],
      reason: "Similar progression fantasy elements",
    },
    {
      id: "rec-2",
      title: "Omniscient Reader's Viewpoint",
      cover:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
      matchScore: 88,
      genres: ["Fantasy", "Drama", "Mystery"],
      sharedGenres: ["Fantasy"],
      reason: "Complex world-building and character development",
    },
  ]);

  // Mock data for related works
  const relatedWorks = {
    prequels: [
      {
        id: "prequel-1",
        title: "Origins: The Beginning After The End",
        cover:
          "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
        type: "Prequel",
        timelinePeriod: "10 years before",
        synopsis: "The untold story of King Grey's rise to power...",
        status: "Completed",
        chapters: 50,
        votes: 42,
      },
      {
        id: "sequel-1",
        title: "The Beginning After The End: New World",
        cover:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
        type: "Sequel",
        timelinePeriod: "2 years after",
        synopsis: "As Arthur embarks on a new journey...",
        status: "Ongoing",
        chapters: 120,
        votes: 128,
      },
      {
        id: "sequel-1",
        title: "The Beginning After The End: New World",
        cover:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
        type: "Sequel",
        timelinePeriod: "2 years after",
        synopsis: "As Arthur embarks on a new journey...",
        status: "Ongoing",
        chapters: 120,
        votes: 128,
      },
    ],
    sequels: [
      {
        id: "sequel-1",
        title: "The Beginning After The End: New World",
        cover:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
        type: "Sequel",
        timelinePeriod: "2 years after",
        synopsis: "As Arthur embarks on a new journey...",
        status: "Ongoing",
        chapters: 120,
        votes: 128,
      },
    ],
    sideStories: [
      {
        id: "side-1",
        title: "Tales from the Academy",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500",
        type: "Side Story",
        timelinePeriod: "During Volume 3",
        synopsis: "Collection of short stories focusing on side characters...",
        status: "Ongoing",
        chapters: 25,
        votes: 15,
      },
    ],
  };

  const handleVote = (id: string, type: "up" | "down") => {
    setUserVotes((prev) => {
      const currentVote = prev[id];
      if (currentVote === type) {
        const newVotes = { ...prev };
        delete newVotes[id];
        return newVotes;
      }
      return { ...prev, [id]: type };
    });

    setVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (type === "up" ? 1 : -1),
    }));
  };

  const handleAddRecommendation = (novel: any) => {
    const newRecommendation = {
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      matchScore: Math.floor(Math.random() * 20) + 80,
      genres: novel.genres,
      sharedGenres: novel.genres.slice(0, 2),
      reason: "User recommendation",
    };

    setRecommendations((prev) => [...prev, newRecommendation]);
    setShowRecommendationModal(false);
    toast.success(`Added "${novel.title}" to recommendations!`);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (reviewSort) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "helpful":
        return b.likes - b.dislikes - (a.likes - a.dislikes);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Show only 2 reviews in overview
  const displayedReviews = sortedReviews.slice(0, 2);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const VoteOverlay = ({ id, initialVotes = 0 }) => {
    const userVote = userVotes[id];
    const currentVotes = votes[id] ?? initialVotes;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-white text-sm">
            <Sparkles size={14} className="text-amber-400" />
            <span className="font-medium">
              {currentVotes > 0 ? `+${currentVotes}` : currentVotes}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleVote(id, "up")}
              className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${
                userVote === "up"
                  ? "bg-green-500/20 text-green-400 ring-1 ring-green-400"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <ThumbsUp size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleVote(id, "down")}
              className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${
                userVote === "down"
                  ? "bg-red-500/20 text-red-400 ring-1 ring-red-400"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <ThumbsDown size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="space-y-12">
        {/* Synopsis section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
          <div className="relative">
            <p
              className={`text-gray-600 whitespace-pre-line ${
                !showFullSynopsis && "line-clamp-4"
              }`}
            >
              {novel.synopsis}
            </p>
            {!showFullSynopsis && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            )}
            <button
              onClick={() => setShowFullSynopsis(!showFullSynopsis)}
              className="mt-2 text-primary hover:underline flex items-center gap-1"
            >
              {showFullSynopsis ? (
                <>
                  Show less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show more <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Related Works</h2>
          <div className="space-y-3">
            {Object.entries(relatedWorks).map(([category, works]) => (
              <div key={category}>
                {works.map((work) => (
                  <motion.div
                    key={work.id}
                    className="relative"
                    onHoverStart={() => setHoveredWork(work.id)}
                    onHoverEnd={() => setHoveredWork(null)}
                  >
                    <div className="bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4 p-3">
                        {/* Timeline indicator */}
                        <div className="flex-shrink-0 w-1 self-stretch bg-primary/10 rounded-full" />

                        {/* Cover image */}
                        <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={work.cover}
                            alt={work.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium line-clamp-1">
                                {work.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full">
                                  {work.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {work.timelinePeriod}
                                </span>
                              </div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {hoveredWork === work.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 space-y-2"
                              >
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {work.synopsis}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <BookOpen size={12} />
                                    <span>{work.chapters} chapters</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{work.status}</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {novel.contentWarnings.length > 0 && (
          <section className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <AlertTriangle size={20} />
              <h3 className="font-medium">Content Warnings</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {novel.contentWarnings.map((warning) => (
                <span
                  key={warning}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                >
                  {warning}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Genres & Themes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Genres & Themes</h2>
          <div className="flex flex-wrap gap-2">
            {novel.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1.5 bg-surface hover:bg-gray-100 rounded-full text-sm cursor-pointer transition-colors shadow-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {novel.themes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm cursor-pointer transition-colors"
              >
                {theme}
              </span>
            ))}
          </div>
        </section>

        {/* Release Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Release Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock size={18} />
                <span>Release Schedule</span>
              </div>
              <p className="font-medium">{novel.releaseFrequency}</p>
              <p className="text-sm text-gray-500 mt-1">
                Next chapter in 2 days
              </p>
            </div>
            <div className="bg-surface rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Calendar size={18} />
                <span>Publication Period</span>
              </div>
              <p className="font-medium">
                {new Date(novel.startDate).toLocaleDateString()} - Present
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.floor(
                  (Date.now() - new Date(novel.startDate).getTime()) /
                    (1000 * 60 * 60 * 24 * 30)
                )}{" "}
                months of serialization
              </p>
            </div>
          </div>
        </section>

        {/* Compact Reviews Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                <MessageSquare className="text-blue-500" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Community Reviews</h2>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-current" />
                    <span className="font-medium">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span>•</span>
                  <span>
                    {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center gap-1">
              View all reviews
              <ArrowRight size={14} />
            </button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-3">
              {displayedReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onVote={onReviewVote}
                  userVote={reviewVotes[review.id]}
                />
              ))}

              {reviews.length > 2 && (
                <div className="text-center pt-4">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    View {reviews.length - 2} more review
                    {reviews.length - 2 !== 1 ? "s" : ""}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">No reviews yet</h3>
              <p className="text-gray-600 text-sm">
                Be the first to share your thoughts about this novel!
              </p>
            </div>
          )}
        </section>

        {/* Recommendations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommendations</h2>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setShowRecommendationModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                <span>Add Recommendation</span>
              </motion.button>
              <select
                value={recommendationSort}
                onChange={(e) => setRecommendationSort(e.target.value as any)}
                className="text-sm bg-transparent border-none focus:ring-0 text-gray-600"
              >
                <option value="match">Best Match</option>
                <option value="recent">Recently Added</option>
              </select>
              <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setRecommendationView("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    recommendationView === "grid"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setRecommendationView("list")}
                  className={`p-1.5 rounded-md transition-colors ${
                    recommendationView === "list"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              recommendationView === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-3"
            }
          >
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                className={`group ${
                  recommendationView === "list"
                    ? "flex items-start gap-4 bg-surface p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    : ""
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className={`relative ${
                    recommendationView === "list" ? "w-20 h-28" : "aspect-[2/3]"
                  } rounded-lg overflow-hidden`}
                >
                  <img
                    src={rec.cover}
                    alt={rec.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {recommendationView === "grid" && (
                    <VoteOverlay id={rec.id} initialVotes={rec.votes} />
                  )}
                </div>

                <div
                  className={recommendationView === "list" ? "flex-1" : "mt-2"}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium line-clamp-1">{rec.title}</h3>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {rec.sharedGenres.map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    {recommendationView === "list" && (
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleVote(rec.id, "up")}
                          className={`p-1.5 rounded-full transition-all ${
                            userVotes[rec.id] === "up"
                              ? "bg-green-50 text-green-500 ring-1 ring-green-200"
                              : "text-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          <ThumbsUp size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleVote(rec.id, "down")}
                          className={`p-1.5 rounded-full transition-all ${
                            userVotes[rec.id] === "down"
                              ? "bg-red-50 text-red-500 ring-1 ring-red-200"
                              : "text-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          <ThumbsDown size={16} />
                        </motion.button>
                      </div>
                    )}
                  </div>
                  {recommendationView === "list" && (
                    <p className="text-sm text-gray-500 mt-2">{rec.reason}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showRecommendationModal && (
          <RecommendationModal
            isOpen={showRecommendationModal}
            onClose={() => setShowRecommendationModal(false)}
            onAddRecommendation={handleAddRecommendation}
            existingRecommendations={recommendations.map((r) => r.id)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
