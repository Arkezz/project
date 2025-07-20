import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  User,
  Clock,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

interface DeletedCommentProps {
  deletionType: "user" | "moderator" | "admin";
  deletedAt: string;
  deletedBy?: {
    name: string;
    role: "user" | "moderator" | "admin";
  };
  originalAuthor: {
    name: string;
    avatar?: string;
  };
  reason?: string;
  postNumber?: number;
  showModeratorView?: boolean;
  originalContent?: string;
  className?: string;
}

const deletionConfig = {
  user: {
    icon: User,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    message: "Comment deleted by author",
    description: "The author chose to remove this comment",
  },
  moderator: {
    icon: Shield,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    message: "Comment removed by moderator",
    description: "This comment was removed for violating community guidelines",
  },
  admin: {
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    message: "Comment removed by administrator",
    description: "This comment was removed by site administration",
  },
} as const;

// Mock function to check if user is moderator
const useIsModerator = () => {
  return false; // Set to false to test regular user view
};

export default function DeletedComment({
  deletionType,
  deletedAt,
  deletedBy,
  originalAuthor,
  reason,
  postNumber,
  showModeratorView = false,
  originalContent,
  className = "",
}: DeletedCommentProps) {
  const [showOriginalContent, setShowOriginalContent] = useState(false);
  const isModerator = useIsModerator();
  const config = deletionConfig[deletionType];
  const Icon = config.icon;

  const canViewOriginal = isModerator && originalContent && showModeratorView;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        ${config.bgColor} ${config.borderColor} border-2 border-dashed rounded-xl p-4 sm:p-6
        transition-all duration-200 hover:shadow-sm ${className}
      `}
      role="article"
      aria-label={`Deleted comment by ${originalAuthor.name}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 ${config.bgColor} rounded-lg border ${config.borderColor}`}
          >
            <Icon size={18} className={config.color} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`font-medium ${config.color}`}>
                {config.message}
              </h4>
              {postNumber && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  #{postNumber}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-2">{config.description}</p>

            {/* Author and deletion info */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User size={12} />
                <span>Originally by {originalAuthor.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>
                  Deleted{" "}
                  {format(new Date(deletedAt), "MMM dd, yyyy 'at' HH:mm")}
                </span>
              </div>

              {/* Only show deleter if not user deletion and deleter is not the author */}
              {deletionType !== "user" &&
                deletedBy &&
                deletedBy.name !== originalAuthor.name && (
                  <div className="flex items-center gap-1">
                    <Shield size={12} />
                    <span>by {deletedBy.name}</span>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Moderator actions */}
        {canViewOriginal && (
          <motion.button
            onClick={() => setShowOriginalContent(!showOriginalContent)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={
              showOriginalContent
                ? "Hide original content"
                : "Show original content"
            }
          >
            {showOriginalContent ? (
              <>
                <EyeOff size={14} />
                <span className="hidden sm:inline">Hide</span>
              </>
            ) : (
              <>
                <Eye size={14} />
                <span className="hidden sm:inline">View Original</span>
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Deletion reason */}
      {reason && deletionType !== "user" && (
        <div className="mb-3 p-3 bg-white/60 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-amber-500" />
            <span className="text-sm font-medium text-gray-700">
              Reason for removal:
            </span>
          </div>
          <p className="text-sm text-gray-600">{reason}</p>
        </div>
      )}

      {/* Original content for moderators */}
      <AnimatePresence>
        {showOriginalContent && originalContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={14} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Original Content:
                </span>
                <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  Moderator View Only
                </span>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                {originalContent}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility info */}
      <div className="sr-only">
        Comment deleted on{" "}
        {format(new Date(deletedAt), "MMMM dd, yyyy 'at' h:mm a")}
        {deletedBy && ` by ${deletedBy.name}`}
        {reason && `. Reason: ${reason}`}
      </div>
    </motion.div>
  );
}
