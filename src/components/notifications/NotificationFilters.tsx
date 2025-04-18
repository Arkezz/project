import React from "react";
import { motion } from "framer-motion";
import { Filter, BookOpen, MessageCircle, Star, Users } from "lucide-react";
import clsx from "clsx";

interface NotificationFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All", icon: Filter },
  { id: "chapter", label: "Chapters", icon: BookOpen },
  { id: "reply", label: "Replies", icon: MessageCircle },
  { id: "mention", label: "Mentions", icon: Star },
  { id: "follow", label: "Follows", icon: Users },
];

export default function NotificationFilters({
  selectedFilter,
  onFilterChange,
}: NotificationFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
      {filters.map(({ id, label, icon: Icon }) => {
        const isSelected = selectedFilter === id;

        const buttonClasses = clsx(
          "relative flex items-center gap-2 px-4 py-2.5 rounded-xl",
          "text-sm font-medium transition-colors duration-200 flex-shrink-0",
          isSelected ? "text-primary" : "text-gray-600 hover:text-gray-900"
        );

        return (
          <motion.button
            key={id}
            onClick={() => onFilterChange(id)}
            className={buttonClasses}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon size={18} />
            <span>{label}</span>
            {isSelected && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10 rounded-xl border border-primary/20"
                transition={{ type: "spring", bounce: 0.2 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
