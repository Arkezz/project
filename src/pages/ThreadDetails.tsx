import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronRight,
  Home,
  Users,
  Eye,
  Clock,
  Reply,
  Calendar,
  MessageSquare,
  Heart,
  UserPlus,
  UserCheck,
  Loader2,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Flag,
  Edit3,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formatDistanceToNow, format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CommentSection from "../components/thread/CommentSection";
import CommentForm from "../components/thread/CommentForm";
import ThreadTags from "../components/forum/ThreadTags";
import { threadData } from "../data/threadData";

export default function ThreadDetails() {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quotedContent, setQuotedContent] = useState<{
    content: string;
    author: string;
    timestamp: string;
  } | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1247);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isUserInfoExpanded, setIsUserInfoExpanded] = useState(false);

  const commentsPerPage = 5;
  const totalComments = threadData.comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  // Sort comments based on sortBy
  const sortedComments = [...threadData.comments].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "popular":
        return b.upvotes - a.upvotes;
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  // Get current page comments
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = sortedComments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  // Handle scroll for pagination visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      // Hide pagination when scrolling down, show when scrolling up or near bottom
      const isNearBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.offsetHeight - 100;
      setShowPagination(
        !isScrollingDown || isNearBottom || currentScrollY < 100
      );
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSubmitReply = (content: string) => {
    console.log("Reply submitted:", content);
    setQuotedContent(null);
    setShowReplyModal(false);
    toast.success("Reply posted successfully");
  };

  const handleQuoteReply = (
    content: string,
    author: string,
    timestamp: string
  ) => {
    // Limit quoted content to 500 characters
    const truncatedContent =
      content.length > 500 ? content.substring(0, 500) + "..." : content;

    setQuotedContent({
      content: truncatedContent,
      author,
      timestamp,
    });
    setShowReplyModal(true);
  };

  const handleReport = () => {
    toast.success("Thread reported. Our moderators will review it shortly.");
  };

  const handleEdit = () => {
    toast.info("Edit functionality would open here");
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    toast.success("Thread deleted successfully");
    // In a real app, this would redirect to the forum page
  };
  const handleFollowToggle = async () => {
    setIsLoadingFollow(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsFollowing(!isFollowing);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));

      toast.success(isFollowing ? "Unfollowed thread" : "Following thread", {
        icon: isFollowing ? "👋" : "🔔",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setIsLoadingFollow(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to comments section
    const commentsSection = document.getElementById("comments-section");
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mock original poster data with currently reading
  const opData = {
    joinDate: "2022-08-15",
    postCount: 2847,
    currentReading: {
      title: "Solo Leveling",
      cover:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=100",
      progress: 78,
      chapter: "Chapter 145",
    },
  };

  // Generate pagination numbers with ellipsis
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  // Check if current user is the thread owner (mock check)
  const isThreadOwner = true; // In real app, this would check against current user
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 sm:mb-8">
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
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {threadData.title}
              </h1>

              {/* Thread metadata */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-primary" />
                  <span className="font-medium">
                    {threadData.viewCount.toLocaleString()}
                  </span>
                  <span className="hidden sm:inline">views</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-primary" />
                  <span className="font-medium">{threadData.replyCount}</span>
                  <span className="hidden sm:inline">replies</span>
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

            {/* Follow/Subscribe Button */}
            <div className="flex flex-col items-end gap-2">
              <motion.button
                onClick={handleFollowToggle}
                disabled={isLoadingFollow}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 min-w-[120px] justify-center ${
                  isFollowing
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={isFollowing ? "Unfollow thread" : "Follow thread"}
              >
                {isLoadingFollow ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isFollowing ? (
                  <UserCheck size={18} />
                ) : (
                  <UserPlus size={18} />
                )}
                <span className="hidden sm:inline">
                  {isFollowing ? "Following" : "Follow"}
                </span>
              </motion.button>
              <span className="text-xs text-gray-500">
                {followersCount.toLocaleString()} followers
              </span>
            </div>
          </div>

          {/* Novel reference */}
          {threadData.novel && (
            <motion.div
              className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
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
          className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - OP Info (Compact) */}
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
                        src={threadData.author.avatar}
                        alt={threadData.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-sm text-gray-900">
                        {threadData.author.name}
                      </h3>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                        OP
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
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>
                              Joined{" "}
                              {format(new Date(opData.joinDate), "MMM yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare size={12} />
                            <span>
                              {opData.postCount.toLocaleString()} posts
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
                                src={opData.currentReading.cover}
                                alt={opData.currentReading.title}
                                className="w-6 h-8 rounded object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 line-clamp-1">
                                  {opData.currentReading.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {opData.currentReading.chapter}
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                  <div
                                    className="bg-primary h-1 rounded-full"
                                    style={{
                                      width: `${opData.currentReading.progress}%`,
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
                  <div className="relative mx-auto mb-2">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-primary/50 shadow-lg mx-auto">
                      <img
                        src={threadData.author.avatar}
                        alt={threadData.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      OP
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 hover:text-primary transition-colors">
                    {threadData.author.name}
                  </h3>
                </Link>

                {/* User Stats */}
                <div className="space-y-2 text-xs text-gray-700 mb-3">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar size={12} />
                    <span>
                      Joined {format(new Date(opData.joinDate), "MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare size={12} />
                    <span>{opData.postCount.toLocaleString()} posts</span>
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
                        src={opData.currentReading.cover}
                        alt={opData.currentReading.title}
                        className="w-8 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-medium text-gray-900 line-clamp-1">
                          {opData.currentReading.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {opData.currentReading.chapter}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div
                            className="bg-primary h-1 rounded-full"
                            style={{
                              width: `${opData.currentReading.progress}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {opData.currentReading.progress}%
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column - Original Post Content */}
            <div className="flex-1 p-4 sm:p-6 flex flex-col">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">#1</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span className="hidden sm:inline">
                      {format(
                        new Date(threadData.createdAt),
                        "MMM dd, yyyy 'at' HH:mm"
                      )}
                    </span>
                    <span className="sm:hidden">
                      {format(new Date(threadData.createdAt), "MMM dd")}
                    </span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleReport}
                    className="flex items-center gap-1 p-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title="Report post"
                  >
                    <Flag size={16} />
                    <span className="hidden sm:inline">Report</span>
                  </motion.button>

                  {isThreadOwner && (
                    <>
                      <motion.button
                        onClick={handleEdit}
                        className="flex items-center gap-1 p-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        title="Edit post"
                      >
                        <Edit3 size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </motion.button>

                      <motion.button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center gap-1 p-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </motion.button>
                    </>
                  )}

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
                    <span className="hidden sm:inline">
                      {isLiked ? "Liked" : "Like"}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Original Post Content */}
              <div className="flex-1 prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed">
                <MDEditor.Markdown source={threadData.content} />
              </div>

              {/* Quote Button for Original Post */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <motion.button
                  onClick={() =>
                    handleQuoteReply(
                      threadData.content,
                      threadData.author.name,
                      threadData.createdAt
                    )
                  }
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Reply size={16} />
                  <span>Quote</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          id="comments-section"
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-3">
                <MessageCircle size={20} className="text-primary" />
                Replies ({totalComments})
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all bg-gray-50 hover:bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <CommentSection
              comments={currentComments}
              sortBy={sortBy}
              onQuoteReply={handleQuoteReply}
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Reply Button */}
      <motion.button
        onClick={() => setShowReplyModal(true)}
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 group z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Reply
          size={20}
          className="group-hover:rotate-12 transition-transform duration-300"
        />
      </motion.button>

      {/* Floating Pagination */}
      {totalPages > 1 && (
        <AnimatePresence>
          {showPagination && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"
            >
              <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={16} />
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {generatePaginationNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === "..." ? (
                          <span className="px-2 text-gray-400 text-sm">
                            ...
                          </span>
                        ) : (
                          <motion.button
                            onClick={() => handlePageChange(page as number)}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {page}
                          </motion.button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

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
                quotedContent={quotedContent}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    Delete Thread
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this thread? This action
                  cannot be undone and will permanently remove the thread and
                  all its replies.
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
                    Delete Thread
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
