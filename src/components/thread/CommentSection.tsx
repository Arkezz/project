import React from "react";
import { motion } from "framer-motion";
import Comment from "./Comment";
import { ThreadComment } from "../../types/thread";

interface CommentSectionProps {
  comments: ThreadComment[];
  sortBy: "newest" | "oldest" | "popular";
  onQuoteReply?: (content: string, author: string, timestamp: string) => void;
}

export default function CommentSection({
  comments,
  sortBy,
  onQuoteReply,
}: CommentSectionProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No comments on this page.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {comments.map((comment, index) => {
        // Calculate the actual post number based on the comment's position
        const postNumber = index + 2; // +2 because original post is #1, and we start from #2

        return (
          <motion.div
            key={comment.id}
            id={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Comment
              comment={comment}
              postNumber={postNumber}
              onQuoteReply={onQuoteReply}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
