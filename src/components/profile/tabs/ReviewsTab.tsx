import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  BookOpen,
  Edit3,
  Trash2,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  novelId: string;
  novelTitle: string;
  novelCover: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  isPublic: boolean;
  spoilerWarning: boolean;
}

// Mock data
const mockReviews: Review[] = [
  {
    id: "1",
    novelId: "1",
    novelTitle: "The Beginning After The End",
    novelCover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
    rating: 5,
    title: "An absolute masterpiece of character development",
    content:
      "This novel completely exceeded my expectations. The way the author handles Arthur's growth from his past life experiences to his new world is phenomenal. The magic system is well-thought-out and the political intrigue keeps you on the edge of your seat. The recent chapters have been particularly intense with the war arc.",
    createdAt: "2024-03-01",
    likes: 24,
    dislikes: 2,
    isPublic: true,
    spoilerWarning: false,
  },
  {
    id: "2",
    novelId: "2",
    novelTitle: "Omniscient Reader's Viewpoint",
    novelCover:
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
    rating: 5,
    title: "Meta-fiction at its finest",
    content:
      "ORV is not just a novel, it's an experience. The way it breaks the fourth wall and makes you question the nature of stories and readers is brilliant. Kim Dokja is one of the most relatable protagonists I've ever encountered. Fair warning: this will make you cry.",
    createdAt: "2024-02-28",
    updatedAt: "2024-03-02",
    likes: 31,
    dislikes: 1,
    isPublic: true,
    spoilerWarning: true,
  },
  {
    id: "3",
    novelId: "3",
    novelTitle: "Solo Leveling",
    novelCover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500",
    rating: 4,
    title: "Great power fantasy with amazing art",
    content:
      "While the story is relatively simple, the execution is flawless. Sung Jin-Woo's journey from the weakest hunter to the strongest is incredibly satisfying. The manhwa adaptation is absolutely stunning and brings the action scenes to life.",
    createdAt: "2024-02-25",
    likes: 18,
    dislikes: 3,
    isPublic: true,
    spoilerWarning: false,
  },
];

interface ReviewCardProps {
  review: Review;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onDelete(review.id);
    toast.success("Review deleted successfully");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const shouldTruncate = review.content.length > 200;
  const displayContent =
    isExpanded || !shouldTruncate
      ? review.content
      : review.content.slice(0, 200) + "...";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDeleting ? 0 : 1,
        y: 0,
        scale: isDeleting ? 0.95 : 1,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={review.novelCover}
              alt={review.novelTitle}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                  {review.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {review.novelTitle}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <motion.button
                  onClick={() => onEdit(review.id)}
                  className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 size={16} />
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">
                {review.rating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {review.spoilerWarning && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="text-amber-600 text-sm font-medium">
                ⚠️ Contains Spoilers
              </span>
            </div>
          )}

          <p className="text-gray-700 leading-relaxed">{displayContent}</p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(review.createdAt)}</span>
              {review.updatedAt && (
                <span className="text-gray-400">(edited)</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${review.isPublic ? "bg-green-500" : "bg-gray-400"}`}
              />
              <span>{review.isPublic ? "Public" : "Private"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <ThumbsUp size={14} />
              <span>{review.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <ThumbsDown size={14} />
              <span>{review.dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
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
        Share your thoughts about the novels you've read. Your reviews help
        other readers discover great stories.
      </p>

      <motion.button
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mx-auto"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={18} />
        <span>Write Your First Review</span>
      </motion.button>
    </motion.div>
  );
}

export default function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const handleEdit = (id: string) => {
    toast.info("Edit review functionality would open here");
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.novelTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating =
      filterRating === null || review.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  if (reviews.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
            <MessageSquare className="text-blue-500" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">My Reviews</h2>
            <p className="text-gray-600 text-sm">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""} written
            </p>
          </div>
        </div>

        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          <span>Write Review</span>
        </motion.button>
      </div>

      {/* Filters */}
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
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredReviews.length === 0 && reviews.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No reviews match your current filters.
          </p>
        </div>
      )}
    </div>
  );
}
