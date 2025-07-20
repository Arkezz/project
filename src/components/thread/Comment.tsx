import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Flag,
  Heart,
  Edit3,
  Trash2,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  BookOpen,
  AlertTriangle,
  X,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Link } from "react-router-dom";
import { ThreadComment } from "../../types/thread";
import { toast } from "sonner";

interface CommentProps {
  comment: ThreadComment;
  postNumber: number;
  onQuoteReply?: (content: string, author: string, timestamp: string) => void;
}

export default function Comment({
  comment,
  postNumber,
  onQuoteReply,
}: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isUserInfoExpanded, setIsUserInfoExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleQuote = () => {
    if (onQuoteReply) {
      // Process nested quotes - limit to 2 levels
      let processedContent = comment.content;

      // If this comment already has quoted content, extract only the new content
      if (comment.quotedContent) {
        // Remove the quoted part and keep only the new reply
        const quotedSection = `"${comment.quotedContent}"`;
        processedContent = comment.content.replace(quotedSection, "").trim();
      }

      onQuoteReply(processedContent, comment.author.name, comment.createdAt);
    }
  };

  const handleReport = () => {
    toast.success("Comment reported. Our moderators will review it shortly.");
  };

  const handleEdit = () => {
    toast.info("Edit functionality would open here");
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    toast.success("Comment deleted successfully");
  };

  // Check if current user is the comment owner (mock check)
  const isCommentOwner = comment.author.name === "TheoryMaster"; // In real app, this would check against current user

  // Mock user data with currently reading novel
  const userData = {
    joinDate: "2023-01-15",
    postCount: 1247,
    currentReading: {
      title: "Omniscient Reader's Viewpoint",
      cover:
        "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=100",
      progress: 65,
      chapter: "Chapter 362",
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - User Info (Compact) */}
          <div className="w-full lg:w-[240px] bg-user-info-panel border-b lg:border-b-0 lg:border-r border-gray-200 shadow-inner">
            {/* Mobile: Collapsible User Info */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsUserInfoExpanded(!isUserInfoExpanded)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary/50">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-sm text-gray-900">
                      {comment.author.name}
                    </h3>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                      {comment.author.reputation}
                    </span>
                  </div>
                </div>
                {isUserInfoExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              <AnimatePresence>
                {isUserInfoExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 pt-0 space-y-3">
                      {/* User Stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>
                            Joined{" "}
                            {format(new Date(userData.joinDate), "MMM yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare size={12} />
                          <span>
                            {userData.postCount.toLocaleString()} posts
                          </span>
                        </div>
                      </div>

                      {/* Currently Reading */}
                      <Link to="/profile" className="block">
                        <div className="bg-white rounded-lg p-2 hover:bg-gray-50 transition-colors">
                          <div className="text-xs text-gray-500 mb-1 font-medium">
                            Currently Reading
                          </div>
                          <div className="flex items-center gap-2">
                            <img
                              src={userData.currentReading.cover}
                              alt={userData.currentReading.title}
                              className="w-6 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 line-clamp-1">
                                {userData.currentReading.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {userData.currentReading.chapter}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                <div
                                  className="bg-primary h-1 rounded-full"
                                  style={{
                                    width: `${userData.currentReading.progress}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop: Full User Info */}
            <div className="hidden lg:block p-4 text-center">
              <Link to="/profile" className="block mb-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-primary/50 shadow-lg mx-auto mb-2">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 hover:text-primary transition-colors">
                  {comment.author.name}
                </h3>
              </Link>

              {/* Reputation Level */}
              <div className="mb-3">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  {comment.author.reputation}
                </span>
              </div>

              {/* User Stats */}
              <div className="space-y-2 text-xs text-gray-700 mb-3">
                <div className="flex items-center justify-center gap-1">
                  <Calendar size={12} />
                  <span>
                    Joined {format(new Date(userData.joinDate), "MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <MessageSquare size={12} />
                  <span>{userData.postCount.toLocaleString()} posts</span>
                </div>
              </div>

              {/* Currently Reading */}
              <Link to="/profile" className="block">
                <div className="bg-white rounded-lg p-2 hover:bg-gray-50 transition-colors">
                  <div className="text-xs text-gray-500 mb-2 font-medium">
                    Currently Reading
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={userData.currentReading.cover}
                      alt={userData.currentReading.title}
                      className="w-8 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-medium text-gray-900 line-clamp-1">
                        {userData.currentReading.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userData.currentReading.chapter}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-primary h-1 rounded-full"
                          style={{
                            width: `${userData.currentReading.progress}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {userData.currentReading.progress}%
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column - Post Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium">#{postNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span className="hidden sm:inline">
                    {format(
                      new Date(comment.createdAt),
                      "MMM dd, yyyy 'at' HH:mm"
                    )}
                  </span>
                  <span className="sm:hidden">
                    {format(new Date(comment.createdAt), "MMM dd")}
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
                      {isCommentOwner && (
                        <>
                          <button
                            onClick={handleEdit}
                            className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <Edit3 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-3 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </>
                      )}
                      <button
                        onClick={handleReport}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-3 transition-colors"
                      >
                        <Flag size={14} />
                        Report
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quoted Content */}
            {comment.quotedContent && comment.quotedAuthor && (
              <motion.a
                href={`#${comment.parentId}`}
                className="block mb-4 p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-lg hover:from-primary/10 hover:to-primary/15 transition-all duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Quote size={14} className="text-primary" />
                  <span className="text-sm text-primary font-semibold">
                    Originally posted by {comment.quotedAuthor.name}:
                  </span>
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
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={handleQuote}
                  className="flex items-center gap-1 p-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Quote size={16} />
                  <span className="hidden sm:inline">Quote</span>
                </motion.button>

                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1 p-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isLiked
                      ? "text-red-600 bg-red-50"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                  <span className="hidden sm:inline">
                    {isLiked ? "Liked" : "Like"}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Comment
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this comment? This action
                  cannot be undone.
                </p>

                <div className="flex items-center justify-end gap-3">
                  <motion.button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete Comment
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
