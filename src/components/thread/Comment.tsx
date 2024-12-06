import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import CommentForm from "./CommentForm";
import { ThreadComment } from "../../types/thread";

interface CommentProps {
  comment: ThreadComment;
  depth: number;
}

export default function Comment({ comment, depth }: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmitReply = (content: string) => {
    console.log("Reply submitted:", content);
    setShowReplyForm(false);
  };

  const maxDepth = 4;
  const marginLeft = depth < maxDepth ? depth * 2.5 : maxDepth * 2.5;

  return (
    <motion.div
      style={{ marginLeft: `${marginLeft}rem` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-surface rounded-xl shadow-sm p-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-primary">
              <ArrowBigUp size={20} />
            </button>
            <span className="text-sm font-medium">{comment.upvotes}</span>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
              <ArrowBigDown size={20} />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-6 h-6 rounded-lg object-cover"
                />
                <a href="#" className="font-medium hover:text-primary">
                  {comment.author.name}
                </a>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <MoreHorizontal size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="prose prose-sm max-w-none">{comment.content}</div>

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-sm text-gray-500 hover:text-primary flex items-center gap-1"
              >
                <MessageCircle size={16} />
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4"
          >
            <CommentForm
              onSubmit={handleSubmitReply}
              onCancel={() => setShowReplyForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
