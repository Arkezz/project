import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Quote,
  Flag,
  Heart,
  Edit3,
  Trash2,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Clock,
  Hash,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { ThreadComment } from "../../types/thread";

interface CommentProps {
  comment: ThreadComment;
  postNumber: number;
}

export default function Comment({ comment, postNumber }: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleQuote = () => {
    console.log("Quote comment:", comment.id);
  };

  const handleReport = () => {
    console.log("Report comment:", comment.id);
  };

  const handleEdit = () => {
    console.log("Edit comment:", comment.id);
  };

  const handleDelete = () => {
    console.log("Delete comment:", comment.id);
  };

  // Mock user data (refined - removed location and online status)
  const userData = {
    joinDate: "2023-01-15",
    postCount: 1247,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="forum-post-card border border-gray-200 shadow-sm bg-white"
    >
      <div className="flex">
        {/* Left Column - User Info */}
        <div className="w-[28%] bg-user-info-panel border-r border-gray-200 p-5 flex flex-col items-center text-center">
          {/* User Avatar */}
          <div className="relative mb-4">
            <div className="w-[100px] h-[100px] rounded-lg overflow-hidden border-4 border-primary/30 shadow-lg">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Username */}
          <h3 className="font-bold text-lg text-gray-900 mb-2 break-words">
            {comment.author.name}
          </h3>

          {/* User Stats */}
          <div className="space-y-2 text-sm text-gray-600 w-full">
            <div className="flex items-center justify-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span>
                Joined {format(new Date(userData.joinDate), "MMM yyyy")}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={14} className="text-gray-400" />
              <span>{userData.postCount.toLocaleString()} posts</span>
            </div>

            {/* Reputation Level */}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-gray-500">Level</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  {comment.author.reputation}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Post Content */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Hash size={14} />
                <span className="font-medium">#{postNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>
                  {format(
                    new Date(comment.createdAt),
                    "MMM dd, yyyy 'at' HH:mm"
                  )}
                </span>
              </div>
            </div>

            {/* Post Options */}
            <div className="relative">
              <motion.button
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal size={18} className="text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[140px] z-10"
                  >
                    <button
                      onClick={handleEdit}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-3 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quoted Content - Now clickable to navigate to quoted comment */}
          {comment.quotedContent && comment.quotedAuthor && (
            <motion.a
              href={`#${comment.parentId}`}
              className="block mb-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-lg hover:from-primary/10 hover:to-primary/15 transition-all duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-sm text-primary mb-2 font-semibold">
                Originally posted by {comment.quotedAuthor.name}:
              </div>
              <div className="text-sm text-gray-700 italic leading-relaxed">
                "{comment.quotedContent}"
              </div>
            </motion.a>
          )}

          {/* Post Content */}
          <div className="flex-1 prose prose-sm max-w-none text-gray-800 leading-relaxed mb-6">
            <p className="whitespace-pre-wrap">{comment.content}</p>
          </div>

          {/* Post Footer - Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleQuote}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Quote size={16} />
                Quote
              </motion.button>

              <motion.button
                onClick={handleReport}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Flag size={16} />
                Report
              </motion.button>

              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isLiked
                    ? "text-red-600 bg-red-50"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                {isLiked ? "Liked" : "Like"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
