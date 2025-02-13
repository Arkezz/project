import React from "react";
import { motion } from "framer-motion";
import { Book, Calendar, Users, Globe } from "lucide-react";

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
    default:
      return null;
  }
};

export default function EditTabs({ tabs, activeTab, onChange }: EditTabsProps) {
  return (
    <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-sm border-b border-gray-200">
      <nav className="flex gap-2 p-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`tab-button flex items-center gap-2 ${
              activeTab === tab.id
                ? "active"
                : "text-gray-500 hover:text-gray-700"
            }`}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            {getTabIcon(tab.id)}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="tab-indicator"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </motion.button>
        ))}
      </nav>
    </div>
  );
}
