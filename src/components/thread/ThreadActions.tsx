import React from "react";
import { MessageCircle, Share2, Star } from "lucide-react";
import { Thread } from "../../types/Thread";

interface ThreadActionsProps {
  thread: Thread;
  onReply: () => void;
}

export default function ThreadActions({ thread, onReply }: ThreadActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <button onClick={onReply} className="btn-primary flex items-center gap-2">
        <MessageCircle size={18} />
        Reply
      </button>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Star size={18} className="text-gray-400" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Share2 size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
