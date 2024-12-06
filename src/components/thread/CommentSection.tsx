import React from "react";
import { motion } from "framer-motion";
import Comment from "./Comment";
import { ThreadComment } from "../../types/Thread";

interface CommentSectionProps {
  comments: ThreadComment[];
  sortBy: "newest" | "oldest" | "popular";
}

export default function CommentSection({
  comments,
  sortBy,
}: CommentSectionProps) {
  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "popular":
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {sortedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={0} />
      ))}
    </motion.div>
  );
}
