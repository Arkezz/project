import React from "react";
import { motion } from "framer-motion";
import { DivideIcon as LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

interface ChapterTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ChapterTabs({
  tabs,
  activeTab,
  onTabChange,
}: ChapterTabsProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-50/50">
      <nav
        className="flex overflow-x-auto scrollbar-hide"
        role="tablist"
        aria-label="Chapter management methods"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-3 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap min-w-0 ${
                isActive
                  ? "text-primary bg-white border-b-2 border-primary"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              whileHover={{ y: isActive ? 0 : -1 }}
              whileTap={{ y: 0 }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
            >
              <Icon size={20} />
              <div className="text-left min-w-0">
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs text-gray-500 hidden sm:block">
                  {tab.description}
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeChapterTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
