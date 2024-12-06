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
} from "lucide-react";
import Avatar from "./Avatar";

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
      className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
    >
      {/* Status indicator line */}
      {thread.isPinned && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
      )}
      {thread.isLocked && !thread.isPinned && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300" />
      )}

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Author avatar and voting */}
          <div className="flex flex-col items-center gap-3">
            <Avatar
              src={thread.author.avatar}
              alt={thread.author.name}
              size="md"
              fallback={thread.author.name}
            />
            <div className="flex flex-col items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-primary">
                <ArrowBigUp size={20} />
              </button>
              <span className="text-sm font-medium">{thread.upvotes}</span>
            </div>
          </div>

          {/* Thread content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {/* Title and status icons */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {thread.isPinned && (
                    <span className="text-primary" title="Pinned">
                      <Pin size={16} />
                    </span>
                  )}
                  {thread.isLocked && (
                    <span className="text-gray-400" title="Locked">
                      <Lock size={16} />
                    </span>
                  )}
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {thread.title}
                  </h3>
                </div>

                {/* Novel reference */}
                {thread.novel && (
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={14} className="text-primary" />
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      {thread.novel.title}
                    </a>
                  </div>
                )}

                {/* Author info and timestamp */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <a href="#" className="font-medium hover:text-primary">
                    {thread.author.name}
                  </a>
                  <div className="px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded text-xs">
                    Lv.{thread.author.reputation}
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Thread preview */}
                <p className="text-gray-600 line-clamp-2 mb-3">
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
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer
                          ${colorSet.bg} ${colorSet.text} ${colorSet.hover}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MessageCircle size={16} />
                  <span className="text-sm">{thread.replyCount} replies</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Eye size={16} />
                  <span className="text-sm">{thread.viewCount} views</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary"
                  title="Save thread"
                >
                  <Star size={16} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary"
                  title="Share thread"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
