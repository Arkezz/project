import React, { useState } from "react";
import { Send, X, Quote } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
  quotedContent?: {
    content: string;
    author: string;
    timestamp: string;
  } | null;
}

export default function CommentForm({
  onSubmit,
  onCancel,
  placeholder = "Write your reply...",
  quotedContent = null,
}: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
            className="mb-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Quote size={14} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Quoting {quotedContent.author}
              </span>
              <span className="text-xs text-gray-500">
                {format(
                  new Date(quotedContent.timestamp),
                  "MMM dd, yyyy 'at' HH:mm"
                )}
              </span>
            </div>
            <div className="text-sm text-gray-700 italic leading-relaxed">
              "{quotedContent.content}"
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
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-xl hover:bg-gray-50 min-h-[44px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X size={18} />
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={!content.trim()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md min-h-[44px]"
                whileHover={{ scale: content.trim() ? 1.02 : 1 }}
                whileTap={{ scale: content.trim() ? 0.98 : 1 }}
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
