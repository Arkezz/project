import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Star,
  Edit3,
  Send,
  Filter,
  Plus,
  Calendar as CalendarIcon,
  Search,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import ReviewCard, { Review } from "./ReviewCard";
import ReviewForm from "./ReviewForm";

interface NewReview {
  rating: number;
  title: string;
  content: string;
  spoilerWarning: boolean;
}

interface ReviewsTabContentProps {
  reviews: Review[];
  reviewSort: "newest" | "oldest" | "helpful" | "rating";
  setReviewSort: React.Dispatch<
    React.SetStateAction<"newest" | "oldest" | "helpful" | "rating">
  >;
  showAllReviews: boolean;
  setShowAllReviews: React.Dispatch<React.SetStateAction<boolean>>;
  onReviewVote: (reviewId: string, type: "like" | "dislike") => void;
  reviewVotes: Record<string, "like" | "dislike" | null>;
  showReviewForm: boolean;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  newReview: NewReview;
  setNewReview: React.Dispatch<React.SetStateAction<NewReview>>;
  hoverRating: number;
  setHoverRating: React.Dispatch<React.SetStateAction<number>>;
  onSubmitReview: () => void;
}

export default function ReviewsTabContent({
  reviews,
  reviewSort,
  setReviewSort,
  showAllReviews,
  setShowAllReviews,
  onReviewVote,
  reviewVotes,
  showReviewForm,
  setShowReviewForm,
  newReview,
  setNewReview,
  hoverRating,
  setHoverRating,
  onSubmitReview,
}: ReviewsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);

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

  const filteredReviews = sortedReviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating =
      filterRating === null || review.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === rating).length / reviews.length) *
          100
        : 0,
  }));

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6 mx-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <MessageSquare size={32} className="text-primary" />
      </motion.div>

      <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Share your thoughts about this novel. Your review helps other readers
        discover great stories.
      </p>

      <motion.button
        onClick={() => setShowReviewForm(true)}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mx-auto"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={18} />
        <span>Write First Review</span>
      </motion.button>
    </motion.div>
  );

  if (reviews.length === 0) {
    return (
      <>
        <EmptyState />
        <AnimatePresence>
          {showReviewForm && (
            <ReviewForm
              newReview={newReview}
              setNewReview={setNewReview}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              onSubmit={onSubmitReview}
              onClose={() => setShowReviewForm(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
              <MessageSquare className="text-blue-500" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Reviews</h2>
              <p className="text-gray-600 text-sm">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""} •{" "}
                {averageRating.toFixed(1)} average rating
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit3 size={18} />
            <span>Write Review</span>
          </motion.button>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < Math.round(averageRating)
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-medium mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star size={12} className="text-amber-400 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Stats */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-medium mb-4">Review Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-amber-500" />
                  <span className="text-sm text-gray-600">Most Helpful</span>
                </div>
                <span className="text-sm font-medium">
                  {Math.max(...reviews.map((r) => r.likes - r.dislikes))} votes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600">Recent Activity</span>
                </div>
                <span className="text-sm font-medium">
                  {
                    reviews.filter(
                      (r) =>
                        new Date(r.createdAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }{" "}
                  this week
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-500" />
                  <span className="text-sm text-gray-600">Contributors</span>
                </div>
                <span className="text-sm font-medium">
                  {new Set(reviews.map((r) => r.userId)).size} users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={reviewSort}
              onChange={(e) =>
                setReviewSort(e.target.value as typeof reviewSort)
              }
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            >
              <option value="helpful">Most Helpful</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <select
            value={filterRating || ""}
            onChange={(e) =>
              setFilterRating(e.target.value ? Number(e.target.value) : null)
            }
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ReviewCard
                  review={review}
                  onVote={onReviewVote}
                  userVote={reviewVotes[review.id]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredReviews.length === 0 && reviews.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No reviews match your current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterRating(null);
              }}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showReviewForm && (
          <ReviewForm
            newReview={newReview}
            setNewReview={setNewReview}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            onSubmit={onSubmitReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
