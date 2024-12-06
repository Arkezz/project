import React from "react";
import { BookOpen, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Thread } from "../../types/Thread";

interface ThreadHeaderProps {
  thread: Thread;
}

export default function ThreadHeader({ thread }: ThreadHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
        <a href="#" className="hover:text-primary">
          Forums
        </a>
        <span>/</span>
        <a href="#" className="hover:text-primary">
          {thread.category}
        </a>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>

          {thread.novel && (
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-primary" />
              <a href="#" className="text-primary hover:underline">
                {thread.novel.title}
              </a>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={thread.author.avatar}
                alt={thread.author.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <a href="#" className="font-medium hover:text-primary">
                  {thread.author.name}
                </a>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDistanceToNow(new Date(thread.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {thread.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
