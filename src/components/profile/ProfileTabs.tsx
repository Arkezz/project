import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Heart,
  MessageSquare,
  FileText,
  BarChart2,
} from "lucide-react";

type TabId =
  | "overview"
  | "social"
  | "favorites"
  | "reviews"
  | "submissions"
  | "stats";

interface ProfileTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = {
  overview: {
    label: "Overview",
    icon: BookOpen,
  },
  social: {
    label: "Social",
    icon: Users,
  },
  favorites: {
    label: "Favorites",
    icon: Heart,
  },
  reviews: {
    label: "Reviews",
    icon: MessageSquare,
  },
  submissions: {
    label: "Submissions",
    icon: FileText,
  },
  stats: {
    label: "Stats",
    icon: BarChart2,
  },
} as const;

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <div className="relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2">
        {(Object.entries(tabs) as [TabId, typeof tabs.overview][]).map(
          ([id, config]) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`relative flex items-center gap-2 px-6 py-4 transition-colors duration-200 ${
                activeTab === id
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-selected={activeTab === id}
              role="tab"
            >
              <config.icon size={18} />
              <span>{config.label}</span>
              {activeTab === id && (
                <motion.div
                  layoutId="activeProfileTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent, currentColor, transparent)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          )
        )}
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}
