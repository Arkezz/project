import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  MessageCircle,
  Star,
  Coffee,
  HelpCircle,
  FileText,
  Users,
  Newspaper,
  Hash,
} from "lucide-react";

const categories = [
  {
    id: "all",
    label: "All Categories",
    icon: MessageCircle,
    count: 2451,
    color: "text-primary",
  },
  {
    id: "novel-discussion",
    label: "Novel Discussion",
    icon: BookOpen,
    count: 856,
    color: "text-blue-600",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    count: 423,
    color: "text-amber-600",
  },
  {
    id: "recommendations",
    label: "Recommendations",
    icon: FileText,
    count: 312,
    color: "text-green-600",
  },
  {
    id: "questions",
    label: "Questions",
    icon: HelpCircle,
    count: 245,
    color: "text-purple-600",
  },
  {
    id: "news",
    label: "News & Updates",
    icon: Newspaper,
    count: 156,
    color: "text-red-600",
  },
  {
    id: "introductions",
    label: "Introductions",
    icon: Users,
    count: 89,
    color: "text-indigo-600",
  },
  {
    id: "off-topic",
    label: "Off-Topic",
    icon: Coffee,
    count: 370,
    color: "text-gray-600",
  },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-200">
        <h2 className="font-semibold flex items-center gap-2">
          <Hash size={18} className="text-primary" />
          Categories
        </h2>
      </div>

      {/* Categories List */}
      <div className="p-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-all duration-200 group ${
                isSelected
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isSelected ? "text-primary" : category.color}
                />
                <span className="font-medium">{category.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    isSelected
                      ? "bg-primary/20 text-primary"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}
                >
                  {category.count.toLocaleString()}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
