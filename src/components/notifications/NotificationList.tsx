import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import type { Notification } from "../../types/notifications";

interface NotificationListProps {
  notifications: Notification[];
  selectedFilter: string;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationList({
  notifications,
  selectedFilter,
  onMarkAsRead,
}: NotificationListProps) {
  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") return true;
    return notification.type === selectedFilter;
  });

  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <NotificationItem
              notification={notification}
              onMarkAsRead={onMarkAsRead}
            />
          </motion.div>
        ))}

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No notifications to show</p>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
