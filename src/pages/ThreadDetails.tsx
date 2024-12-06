import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formatDistanceToNow } from "date-fns";
import CommentSection from "../components/thread/CommentSection";
import CommentForm from "../components/thread/CommentForm";
import { threadData } from "../data/threadData";
import ThreadActions from "../components/thread/ThreadActions";
import ThreadHeader from "../components/thread/ThreadHeader";

export default function ThreadDetails() {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleSubmitReply = (content: string) => {
    console.log("Reply submitted:", content);
    setShowReplyForm(false);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <ThreadHeader thread={threadData} />

        <div className="bg-surface rounded-xl shadow-sm p-6 mt-6">
          <div className="flex gap-4">
            {/* Vote buttons */}
            <div className="flex flex-col items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-primary">
                <ArrowBigUp size={24} />
              </button>
              <span className="text-lg font-semibold">
                {threadData.upvotes}
              </span>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
                <ArrowBigDown size={24} />
              </button>
            </div>

            {/* Thread content */}
            <div className="flex-1">
              <div className="prose max-w-none">
                <MDEditor.Markdown source={threadData.content} />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <ThreadActions
                  thread={threadData}
                  onReply={() => setShowReplyForm(true)}
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showReplyForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
              <CommentForm
                onSubmit={handleSubmitReply}
                onCancel={() => setShowReplyForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageCircle size={20} />
              Replies ({threadData.comments.length})
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <CommentSection comments={threadData.comments} sortBy={sortBy} />
        </div>
      </div>
    </div>
  );
}
