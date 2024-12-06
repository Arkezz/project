import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  BookOpen,
  MessageCircle,
  Star,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import type { Notification } from "../../types/notifications";
import { motion } from "framer-motion";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "chapter":
        return <BookOpen className="text-primary" size={20} />;
      case "reply":
        return <MessageCircle className="text-blue-500" size={20} />;
      case "mention":
        return <Star className="text-amber-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  return (
    <motion.div
      className={`
        relative group rounded-xl border transition-all duration-200
        ${
          notification.read
            ? "bg-surface border-gray-100"
            : "bg-gradient-to-r from-primary/5 to-transparent border-primary/20"
        }
        hover:border-primary/30 hover:shadow-sm
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {!notification.read && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
      )}

      <button
        onClick={() => onMarkAsRead(notification.id)}
        className="w-full p-4 text-left"
      >
        <div className="flex gap-4">
          {/* Icon or Avatar */}
          <div className="flex-shrink-0">
            {notification.type === "reply" ||
            notification.type === "mention" ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=faces"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                {notification.novel?.coverImage ? (
                  <img
                    src={notification.novel.coverImage}
                    alt={notification.novel.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    {getIcon()}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Message */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {notification.message}
            </p>

            {/* Novel Title & Time */}
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="text-gray-400">
                {formatDistanceToNow(new Date(notification.timestamp), {
                  addSuffix: true,
                })}
              </span>
              {notification.novel && (
                <>
                  <span className="text-gray-300">•</span>
                  <a
                    href={`/novel/${notification.novel.slug}`}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {notification.novel.title}
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Action Arrow */}
          <div className="flex-shrink-0 self-center">
            <ChevronRight
              size={16}
              className="text-gray-400 group-hover:text-primary transition-colors"
            />
          </div>
        </div>
      </button>
    </motion.div>
  );
}
