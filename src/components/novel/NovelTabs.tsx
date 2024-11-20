import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NovelTabsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{
    id: string;
    label: string;
  }>;
}

export default function NovelTabs({
  selectedTab,
  onTabChange,
  tabs,
}: NovelTabsProps) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            selectedTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
