import React from "react";
import {
  BookOpen,
  MessageCircle,
  Star,
  Coffee,
  HelpCircle,
  FileText,
  Users,
  Newspaper,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Categories", icon: MessageCircle, count: 2451 },
  {
    id: "novel-discussion",
    label: "Novel Discussion",
    icon: BookOpen,
    count: 856,
  },
  { id: "reviews", label: "Reviews", icon: Star, count: 423 },
  {
    id: "recommendations",
    label: "Recommendations",
    icon: FileText,
    count: 312,
  },
  { id: "questions", label: "Questions", icon: HelpCircle, count: 245 },
  { id: "news", label: "News & Updates", icon: Newspaper, count: 156 },
  { id: "introductions", label: "Introductions", icon: Users, count: 89 },
  { id: "off-topic", label: "Off-Topic", icon: Coffee, count: 370 },
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
    <div className="bg-surface rounded-xl shadow-sm p-4">
      <h2 className="font-medium mb-4">Categories</h2>
      <div className="space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} />
                <span>{category.label}</span>
              </div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
