import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Star,
  Calendar as CalendarIcon,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react";

export interface Review {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  isHelpful: boolean;
  spoilerWarning: boolean;
  userVote?: "like" | "dislike" | null;
}

interface ReviewCardProps {
  review: Review;
  onVote: (reviewId: string, type: "like" | "dislike") => void;
  userVote?: "like" | "dislike" | null;
}

export default function ReviewCard({
  review,
  onVote,
  userVote,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = review.content.length > 300;
  const displayContent =
    isExpanded || !shouldTruncate
      ? review.content
      : review.content.slice(0, 300) + "...";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={review.avatar}
            alt={review.username}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 line-clamp-1">
                {review.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-gray-700">
                  {review.username}
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < review.rating
                          ? "text-amber-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CalendarIcon size={12} />
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              {review.updatedAt && (
                <span className="text-gray-400">(edited)</span>
              )}
            </div>
          </div>

          {review.spoilerWarning && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg mb-3">
              <AlertTriangle size={14} className="text-amber-600" />
              <span className="text-amber-700 text-sm font-medium">
                Contains Spoilers
              </span>
            </div>
          )}

          <p className="text-gray-700 leading-relaxed mb-4">{displayContent}</p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mb-4 transition-colors"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onVote(review.id, "like")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    userVote === "like"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ThumbsUp size={14} />
                  <span>{review.likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onVote(review.id, "dislike")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    userVote === "dislike"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ThumbsDown size={14} />
                  <span>{review.dislikes}</span>
                </motion.button>
              </div>

              {review.isHelpful && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Helpful
                </span>
              )}
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
