import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronRight,
  Home,
  Users,
  Bookmark,
  Flag,
  Eye,
  Clock,
  Reply,
  Hash,
  Calendar,
  MessageSquare,
  Heart,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formatDistanceToNow, format } from "date-fns";
import CommentSection from "../components/thread/CommentSection";
import CommentForm from "../components/thread/CommentForm";
import ThreadTags from "../components/forum/ThreadTags";
import { threadData } from "../data/threadData";

export default function ThreadDetails() {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmitReply = (content: string) => {
    console.log("Reply submitted:", content);
    setShowReplyModal(false);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Mock original poster data (refined - removed location and online status)
  const opData = {
    joinDate: "2022-08-15",
    postCount: 2847,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Home size={16} className="text-primary" />
            <ChevronRight size={14} />
            <a
              href="/forum"
              className="hover:text-primary transition-colors font-medium"
            >
              Forum
            </a>
            <ChevronRight size={14} />
            <a
              href="#"
              className="hover:text-primary transition-colors font-medium"
            >
              {threadData.category}
            </a>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-semibold">Thread</span>
          </motion.div>
        </nav>

        {/* Thread Header */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between gap-6 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {threadData.title}
              </h1>

              {/* Thread metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-primary" />
                  <span className="font-medium">
                    {threadData.viewCount.toLocaleString()}
                  </span>
                  <span>views</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-primary" />
                  <span className="font-medium">{threadData.replyCount}</span>
                  <span>replies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="font-medium">
                    {formatDistanceToNow(new Date(threadData.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4">
                <ThreadTags tags={threadData.tags} />
              </div>
            </div>

            {/* Thread actions */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleBookmark}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  isBookmarked
                    ? "bg-amber-100 text-amber-600 shadow-sm"
                    : "hover:bg-gray-100 text-gray-400 hover:text-amber-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark
                  size={20}
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </motion.button>
              <motion.button
                className="p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-400 hover:text-red-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Flag size={20} />
              </motion.button>
            </div>
          </div>

          {/* Novel reference */}
          {threadData.novel && (
            <motion.div
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Users size={18} className="text-primary" />
              <span className="text-sm text-gray-700 font-medium">
                Discussing:
              </span>
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
              >
                {threadData.novel.title}
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Original Post */}
        <motion.div
          className="forum-post-card border border-gray-200 shadow-sm bg-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex">
            {/* Left Column - OP Info */}
            <div className="w-[28%] bg-user-info-panel border-r border-gray-200 p-5 flex flex-col items-center text-center">
              {/* OP Avatar */}
              <div className="relative mb-4">
                <div className="w-[100px] h-[100px] rounded-lg overflow-hidden border-4 border-primary/30 shadow-lg">
                  <img
                    src={threadData.author.avatar}
                    alt={threadData.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* OP Badge */}
                <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                  OP
                </div>
              </div>

              {/* OP Username */}
              <h3 className="font-bold text-lg text-gray-900 mb-2 break-words">
                {threadData.author.name}
              </h3>

              {/* OP Stats */}
              <div className="space-y-2 text-sm text-gray-600 w-full">
                <div className="flex items-center justify-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span>
                    Joined {format(new Date(opData.joinDate), "MMM yyyy")}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <MessageSquare size={14} className="text-gray-400" />
                  <span>{opData.postCount.toLocaleString()} posts</span>
                </div>

                {/* Reputation Level */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-gray-500">Level</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                      {threadData.author.reputation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Original Post Content */}
            <div className="flex-1 p-5 flex flex-col">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Hash size={14} />
                    <span className="font-medium">#1</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>
                      {format(
                        new Date(threadData.createdAt),
                        "MMM dd, yyyy 'at' HH:mm"
                      )}
                    </span>
                  </div>
                </div>

                {/* Like button for original post */}
                <motion.button
                  onClick={handleLike}
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

              {/* Original Post Content */}
              <div className="flex-1 prose prose-sm max-w-none text-gray-800 leading-relaxed">
                <MDEditor.Markdown source={threadData.content} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <MessageCircle size={20} className="text-primary" />
                Replies ({threadData.comments.length})
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all bg-gray-50 hover:bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <CommentSection comments={threadData.comments} sortBy={sortBy} />
          </div>
        </motion.div>
      </div>

      {/* Floating Reply Button */}
      <motion.button
        onClick={() => setShowReplyModal(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Reply
          size={24}
          className="group-hover:rotate-12 transition-transform duration-300"
        />
      </motion.button>

      {/* Reply Modal */}
      <AnimatePresence>
        {showReplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReplyModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CommentForm
                onSubmit={handleSubmitReply}
                onCancel={() => setShowReplyModal(false)}
                placeholder="Share your thoughts on this thread..."
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
