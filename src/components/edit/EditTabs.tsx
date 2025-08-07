import React from "react";
import { motion } from "framer-motion";
import { Book, Calendar, Users, Globe, BookOpen } from "lucide-react";

interface Tab {
  id: string;
  label: string;
}

interface EditTabsProps {
  tabs: readonly Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const getTabIcon = (id: string) => {
  switch (id) {
    case "general":
      return <Book className="w-4 h-4" />;
    case "release":
      return <Calendar className="w-4 h-4" />;
    case "relations":
      return <Users className="w-4 h-4" />;
    case "translation":
      return <Globe className="w-4 h-4" />;
    case "chapters":
      return <BookOpen className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function EditTabs({ tabs, activeTab, onChange }: EditTabsProps) {
  return (
    <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                type="button"
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <div className="flex items-center gap-2">
                  {getTabIcon(tab.id)}
                  <span>{tab.label}</span>
                </div>

                {/* Active tab indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeEditTab"
                    className="absolute inset-0 bg-primary rounded-xl -z-10"
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
    </div>
  );
}
