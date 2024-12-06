import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BookOpen,
  MessageCircle,
  Star,
  Filter,
  Check,
  Calendar,
} from "lucide-react";
import NotificationList from "../components/notifications/NotificationList";
import NotificationFilters from "../components/notifications/NotificationFilters";
import { useNotifications } from "../hooks/useNotifications";

export default function Notifications() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { notifications, markAllAsRead, markAsRead } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative header pattern */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <Bell className="text-primary" size={28} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-semibold">Notifications</h1>
            </div>
            <p className="text-gray-600">
              Stay updated with your reading progress and community interactions
            </p>
          </div>

          {unreadCount > 0 && (
            <motion.button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-primary/20 text-primary rounded-xl hover:bg-primary/5 transition-colors shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check size={18} />
              <span>Mark all as read</span>
            </motion.button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <NotificationFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        {/* Time Groups */}
        <div className="space-y-8">
          {["Today", "Yesterday", "This Week", "Earlier"].map((timeGroup) => {
            const groupNotifications = notifications.filter((n) => {
              // In a real app, implement proper time grouping logic
              if (timeGroup === "Today") return true;
              return false;
            });

            if (groupNotifications.length === 0) return null;

            return (
              <div key={timeGroup}>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{timeGroup}</span>
                </div>
                <NotificationList
                  notifications={groupNotifications}
                  selectedFilter={selectedFilter}
                  onMarkAsRead={markAsRead}
                />
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <motion.button
          className="w-full mt-8 px-6 py-3 bg-surface border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Load more notifications
        </motion.button>
      </div>
    </div>
  );
}
