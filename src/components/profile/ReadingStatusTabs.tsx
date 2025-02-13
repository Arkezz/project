import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, Pause } from "lucide-react";

type ReadingStatus = "reading" | "completed" | "planning" | "paused";

interface ReadingStatusTabsProps {
  activeStatus: ReadingStatus;
  onStatusChange: (status: ReadingStatus) => void;
}

const statusConfig = {
  reading: {
    label: "Currently Reading",
    icon: BookOpen,
    count: 12,
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    count: 48,
  },
  planning: {
    label: "Plan to Read",
    icon: Clock,
    count: 24,
  },
  paused: {
    label: "On Hold",
    icon: Pause,
    count: 6,
  },
} as const;

export default function ReadingStatusTabs({
  activeStatus,
  onStatusChange,
}: ReadingStatusTabsProps) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2 pb-2 md:pb-0">
      {(
        Object.entries(statusConfig) as [
          ReadingStatus,
          typeof statusConfig.reading
        ][]
      ).map(([status, config]) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`relative flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-colors ${
            activeStatus === status
              ? "text-primary font-medium"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <config.icon size={18} />
          <span>{config.label}</span>
          <span className="text-sm text-gray-400">({config.count})</span>
          {activeStatus === status && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      ))}
    </div>
  );
}
