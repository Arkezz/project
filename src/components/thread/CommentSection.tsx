import React from "react";
import { motion } from "framer-motion";
import Comment from "./Comment";
import DeletedComment from "./DeletedComment";
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

  // Mock function to simulate deleted comments
  const isCommentDeleted = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId);
    return comment?.isDeleted === true;
  };

  const getCommentDeletionInfo = (commentId: string) => {
    // Mock deletion data - in real app, this would come from the API
    return {
      deletionType: "user" as const,
      deletedAt: "2024-03-10T16:30:00Z",
      deletedBy: {
        name: "ModeratorUser",
        role: "moderator" as const,
      },
      reason: "Violation of community guidelines - inappropriate language",
      originalContent:
        "This was the original comment content that was removed by moderation.",
    };
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {comments.map((comment, index) => {
        // Calculate the actual post number based on the comment's position
        const postNumber = index + 2; // +2 because original post is #1, and we start from #2

        // Check if comment is deleted
        if (isCommentDeleted(comment.id)) {
          const deletionInfo = getCommentDeletionInfo(comment.id);

          return (
            <motion.div
              key={comment.id}
              id={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              layout
            >
              <DeletedComment
                deletionType={deletionInfo.deletionType}
                deletedAt={deletionInfo.deletedAt}
                deletedBy={deletionInfo.deletedBy}
                originalAuthor={comment.author}
                reason={deletionInfo.reason}
                postNumber={postNumber}
                showModeratorView={true}
                originalContent={deletionInfo.originalContent}
              />
            </motion.div>
          );
        }

        return (
          <motion.div
            key={comment.id}
            id={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            layout
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
