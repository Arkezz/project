import React, { useState } from "react";
import { Send, X } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export default function CommentForm({
  onSubmit,
  onCancel,
  placeholder = "Write your reply...",
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
      className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Simplified Header */}
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-semibold">Write a Reply</h3>
        </div>

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

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 font-medium">
              💡 Markdown formatting is supported
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-xl hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X size={18} />
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={!content.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md"
                whileHover={{ scale: content.trim() ? 1.02 : 1 }}
                whileTap={{ scale: content.trim() ? 0.98 : 1 }}
              >
                <Send size={18} />
                Post Reply
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
