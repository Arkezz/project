import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const tagCategories = [
  {
    name: "Character",
    color: "bg-blue-50 hover:bg-blue-100 text-blue-700",
    tags: ["Strong Lead", "Smart MC", "Female Lead", "Anti-Hero", "Genius MC"],
  },
  {
    name: "Plot",
    color: "bg-amber-50 hover:bg-amber-100 text-amber-700",
    tags: [
      "Time Travel",
      "System",
      "Reincarnation",
      "Kingdom Building",
      "Revenge",
    ],
  },
  {
    name: "Setting",
    color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700",
    tags: [
      "Modern Day",
      "Ancient China",
      "Virtual Reality",
      "Academy",
      "Medieval",
    ],
  },
  {
    name: "Theme",
    color: "bg-purple-50 hover:bg-purple-100 text-purple-700",
    tags: ["Politics", "Business", "War", "Survival", "Romance"],
  },
];

interface TagSelectorProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function TagSelector({
  selectedTags,
  onTagToggle,
}: TagSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    tagCategories[0].name,
  ]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="space-y-4">
      {tagCategories.map((category) => {
        const isExpanded = expandedCategories.includes(category.name);
        const visibleTags = isExpanded
          ? category.tags
          : category.tags.slice(0, 3);

        return (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium text-gray-600">
                {category.name}
              </h5>
              <button
                onClick={() => toggleCategory(category.name)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={false}
              animate={{ height: isExpanded ? "auto" : "32px" }}
            >
              {visibleTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);

                return (
                  <motion.button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : `${category.color}`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                );
              })}

              {!isExpanded && category.tags.length > 3 && (
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  +{category.tags.length - 3} more
                </button>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
