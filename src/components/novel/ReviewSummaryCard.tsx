import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, Edit3 } from "lucide-react";
import ReviewForm from "./ReviewForm";
import type { Review } from "./ReviewCard";

interface NewReview {
  rating: number;
  title: string;
  content: string;
  spoilerWarning: boolean;
}

interface ReviewSummaryCardProps {
  reviews: Review[];
  showReviewForm: boolean;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  newReview: NewReview;
  setNewReview: React.Dispatch<React.SetStateAction<NewReview>>;
  hoverRating: number;
  setHoverRating: React.Dispatch<React.SetStateAction<number>>;
  onSubmitReview: () => void;
}

export default function ReviewSummaryCard({
  reviews,
  showReviewForm,
  setShowReviewForm,
  newReview,
  setNewReview,
  hoverRating,
  setHoverRating,
  onSubmitReview,
}: ReviewSummaryCardProps) {
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

  return (
    <>
      <motion.div
        className="bg-surface rounded-lg shadow-sm p-6"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
              <MessageSquare className="text-blue-500" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Reviews</h3>
              <p className="text-gray-600 text-sm">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit3 size={16} />
            <span>Write Review</span>
          </motion.button>
        </div>

        {/* Rating Overview */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
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
          <div>
            <h4 className="font-medium mb-3 text-sm">Rating Distribution</h4>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-8">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star size={10} className="text-amber-400 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-6 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

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
