import React from "react";

export const tagColors = {
  Discussion: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
  },
  Theory: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
  },
  Review: {
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "hover:bg-green-100",
  },
  Question: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hover: "hover:bg-amber-100",
  },
  News: { bg: "bg-red-50", text: "text-red-600", hover: "hover:bg-red-100" },
  Guide: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    hover: "hover:bg-teal-100",
  },
  Spoilers: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    hover: "hover:bg-rose-100",
  },
  Important: {
    bg: "bg-primary/10",
    text: "text-primary",
    hover: "hover:bg-primary/20",
  },
} as const;

interface ThreadTagsProps {
  tags: string[];
}

export default function ThreadTags({ tags }: ThreadTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        const colorSet = tagColors[tag as keyof typeof tagColors] || {
          bg: "bg-gray-100",
          text: "text-gray-600",
          hover: "hover:bg-gray-200",
        };

        return (
          <span
            key={tag}
            className={`
              px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer
              ${colorSet.bg} ${colorSet.text} ${colorSet.hover}
            `}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
