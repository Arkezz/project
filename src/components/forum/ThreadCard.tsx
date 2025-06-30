import React from "react";
import { motion } from "framer-motion";
import {
  ArrowBigUp,
  BookOpen,
  Eye,
  Lock,
  MessageCircle,
  Pin,
  Share2,
  Star,
  Clock,
  User,
  Hash,
  Heart,
} from "lucide-react";
import Avatar from "./Avatar";
import { formatDistanceToNow } from "date-fns";

const tagColors = {
  Discussion: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
  },
  Theory: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
  },
  Review: {
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "hover:bg-green-100",
  },
  Question: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hover: "hover:bg-amber-100",
  },
  News: { bg: "bg-red-50", text: "text-red-600", hover: "hover:bg-red-100" },
  Guide: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    hover: "hover:bg-teal-100",
  },
  Spoilers: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    hover: "hover:bg-rose-100",
  },
  Important: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "hover:bg-primary/20",
  },
} as const;

interface ThreadCardProps {
  thread: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      reputation: number;
    };
    novel?: {
      title: string;
      slug: string;
    };
    category: string;
    tags: string[];
    createdAt: string;
    lastReply?: string;
    replyCount: number;
    viewCount: number;
    upvotes: number;
    isPinned?: boolean;
    isLocked?: boolean;
    isSolved?: boolean;
  };
}

export default function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden border border-gray-200"
      whileHover={{ y: -2 }}
    >
      {/* Status indicator line */}
      {thread.isPinned && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/70" />
      )}
      {thread.isLocked && !thread.isPinned && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-300" />
      )}

      <div className="p-6">
        <div className="flex gap-4">
          {/* Left Column - Avatar and Stats */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <Avatar
              src={thread.author.avatar}
              alt={thread.author.name}
              size="lg"
              fallback={thread.author.name}
            />

            {/* Thread Stats */}
            <div className="flex flex-col items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-primary">
                <ArrowBigUp size={16} />
                <span className="font-medium">{thread.upvotes}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle size={14} />
                <span>{thread.replyCount}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Eye size={14} />
                <span>{thread.viewCount}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Thread content */}
          <div className="flex-1 min-w-0">
            {/* Thread Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0 flex-1">
                {/* Title and status icons */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {thread.isPinned && (
                    <Pin size={16} className="text-primary" title="Pinned" />
                  )}
                  {thread.isLocked && (
                    <Lock size={16} className="text-gray-400" title="Locked" />
                  )}
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {thread.title}
                  </h3>
                </div>

                {/* Novel reference */}
                {thread.novel && (
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={14} className="text-primary" />
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      {thread.novel.title}
                    </a>
                  </div>
                )}

                {/* Author info and timestamp */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    <a
                      href="#"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {thread.author.name}
                    </a>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    <Hash size={10} />
                    <span>{thread.author.reputation}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={14} />
                    <span>
                      {formatDistanceToNow(new Date(thread.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                {/* Thread preview */}
                <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                  {thread.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {thread.tags.map((tag) => {
                    const colorSet = tagColors[
                      tag as keyof typeof tagColors
                    ] || {
                      bg: "bg-gray-100",
                      text: "text-gray-600",
                      hover: "hover:bg-gray-200",
                    };

                    return (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer
                          ${colorSet.bg} ${colorSet.text} ${colorSet.hover}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-500"
                  title="Like thread"
                >
                  <Heart size={16} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-500"
                  title="Share thread"
                >
                  <Share2 size={16} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-amber-500"
                  title="Bookmark thread"
                >
                  <Star size={16} />
                </button>
              </div>
            </div>

            {/* Last Reply Info */}
            {thread.lastReply && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Last reply</span>
                  <span>
                    {formatDistanceToNow(new Date(thread.lastReply), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
