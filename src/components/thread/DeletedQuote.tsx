import React from "react";
import { motion } from "framer-motion";
import { Quote, Trash2, Shield, User, Clock } from "lucide-react";
import { format } from "date-fns";

interface DeletedQuoteProps {
  originalContent: string;
  originalAuthor: {
    name: string;
  };
  originalTimestamp: string;
  deletionType: "user" | "moderator" | "admin";
  deletedAt: string;
  deletedBy?: {
    name: string;
    role: "user" | "moderator" | "admin";
  };
  className?: string;
}

const deletionConfig = {
  user: {
    icon: User,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    label: "Author deleted",
  },
  moderator: {
    icon: Shield,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    label: "Moderator removed",
  },
  admin: {
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Admin removed",
  },
} as const;

export default function DeletedQuote({
  originalContent,
  originalAuthor,
  originalTimestamp,
  deletionType,
  deletedAt,
  deletedBy,
  className = "",
}: DeletedQuoteProps) {
  const config = deletionConfig[deletionType];
  const Icon = config.icon;

  // Truncate content if too long (same 500 char limit as regular quotes)
  const truncatedContent =
    originalContent.length > 500
      ? originalContent.substring(0, 500) + "..."
      : originalContent;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 17 }}
      className={`
        relative p-4 rounded-r-lg border-l-4 border-gray-300
        ${config.bgColor} ${className}
      `}
      role="blockquote"
      aria-label={`Deleted quote from ${originalAuthor.name}`}
    >
      {/* Quote header with deletion indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Quote size={14} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-600">
            Originally posted by {originalAuthor.name}:
          </span>
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 ${config.bgColor} ${config.borderColor} border rounded-full`}
        >
          <Icon size={12} className={config.color} />
          <span className={`text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Original quoted content */}
      <div className="mb-3">
        <div className="text-sm text-gray-700 italic leading-relaxed bg-white/60 p-3 rounded-lg border border-gray-200">
          "{truncatedContent}"
        </div>
      </div>

      {/* Deletion metadata */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock size={10} />
          <span>
            Originally posted{" "}
            {format(new Date(originalTimestamp), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Trash2 size={10} />
          <span>
            Deleted {format(new Date(deletedAt), "MMM dd, yyyy")}
            {deletedBy &&
              deletedBy.name !== originalAuthor.name &&
              ` by ${deletedBy.name}`}
          </span>
        </div>
      </div>

      {/* Accessibility info */}
      <div className="sr-only">
        This is a quote from a deleted comment by {originalAuthor.name},
        originally posted on{" "}
        {format(new Date(originalTimestamp), "MMMM dd, yyyy")}, deleted on{" "}
        {format(new Date(deletedAt), "MMMM dd, yyyy")}
        {deletedBy && ` by ${deletedBy.name}`}. The quoted content reads:{" "}
        {truncatedContent}
      </div>
    </motion.div>
  );
}
