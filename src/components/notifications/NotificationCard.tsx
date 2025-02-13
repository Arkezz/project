import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Notification } from "../../types/notifications";
import NotificationIcon from "./NotificationIcon";
import NotificationAvatar from "./NotificationAvatar";
import clsx from "clsx";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const cardClasses = clsx(
    "relative group rounded-xl border transition-all duration-200",
    "hover:border-primary/30 hover:shadow-md",
    notification.read
      ? "bg-surface border-gray-100"
      : [
          "bg-gradient-to-r from-primary/5 to-transparent",
          "border-primary/20",
          "shadow-[inset_0_0_0_1px_rgba(var(--color-primary),0.1)]",
        ]
  );

  return (
    <motion.div
      className={cardClasses}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {!notification.read && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse"
        />
      )}

      <button
        onClick={() => onMarkAsRead(notification.id)}
        className="w-full p-4 text-left"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            {notification.type === "reply" ||
            notification.type === "mention" ? (
              <NotificationAvatar user={notification.user} />
            ) : (
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                {notification.novel?.coverImage ? (
                  <img
                    src={notification.novel.coverImage}
                    alt={notification.novel.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <NotificationIcon type={notification.type} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 leading-relaxed">
              {notification.message}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <time
                dateTime={notification.timestamp}
                className="text-gray-400 bg-gray-50 px-2 py-1 rounded-full"
              >
                {formatDistanceToNow(new Date(notification.timestamp), {
                  addSuffix: true,
                })}
              </time>
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
