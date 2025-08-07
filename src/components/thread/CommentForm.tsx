import React, { useState } from "react";
import { Send, X, Quote } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";
import { format } from "date-fns";
import DeletedQuote from "./DeletedQuote";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
  quotedContent?: {
    content: string;
    author: string;
    timestamp: string;
    isDeleted?: boolean;
    deletionInfo?: {
      deletionType: "user" | "moderator" | "admin";
      deletedAt: string;
      deletedBy?: {
        name: string;
        role: "user" | "moderator" | "admin";
      };
    };
  } | null;
}

export default function CommentForm({
  onSubmit,
  onCancel,
  placeholder = "Write your reply...",
  quotedContent = null,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [deletionType, setDeletionType] = useState<"user" | "moderator">(
    "user"
  );
  const [deletedAt] = useState<string>(
    format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
  );
  const [deletedBy] = useState<
    { name: string; role: "user" | "moderator" | "admin" } | undefined
  >(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  const handleSwitch = (type: "user" | "moderator") => {
    setDeletionType(type);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">Write a Reply</h3>
        </div>

        {/* Quoted Content */}
        {quotedContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <DeletedQuote
              originalContent={quotedContent.content}
              originalAuthor={{ name: quotedContent.author }}
              originalTimestamp={quotedContent.timestamp}
              deletionType={
                quotedContent.deletionInfo?.deletionType || deletionType
              }
              deletedAt={quotedContent.deletionInfo?.deletedAt || deletedAt}
              deletedBy={quotedContent.deletionInfo?.deletedBy || deletedBy}
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className={`px-3 py-1 rounded text-xs font-semibold border ${deletionType === "user" ? "bg-primary text-white" : "bg-white text-primary border-primary"}`}
                onClick={() => handleSwitch("user")}
              >
                User Deletion
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded text-xs font-semibold border ${deletionType === "moderator" ? "bg-primary text-white" : "bg-white text-primary border-primary"}`}
                onClick={() => handleSwitch("moderator")}
              >
                Moderator Deletion
              </button>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || "")}
              preview="edit"
              height={200}
              data-color-mode="light"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-500 font-medium">
              💡 Markdown formatting is supported
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <motion.button
                type="button"
                onClick={onCancel}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-200 rounded-xl hover:bg-gray-50 hover:shadow-sm min-h-[44px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <X size={18} />
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={!content.trim()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm min-h-[44px]"
                whileHover={{ scale: content.trim() ? 1.02 : 1 }}
                whileTap={{ scale: content.trim() ? 0.95 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Send size={18} />
                <span>Post Reply</span>
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
