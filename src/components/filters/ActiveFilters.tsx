import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActiveFiltersProps {
  className?: string;
}

export default function ActiveFilters({ className = "" }: ActiveFiltersProps) {
  const activeFilters = [
    { id: 1, type: "Status", value: "Ongoing" },
    { id: 2, type: "Rating", value: "≥4.5" },
    { id: 3, type: "Language", value: "Korean" },
  ];

  if (activeFilters.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {activeFilters.map((filter) => (
        <motion.span
          key={filter.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
        >
          <span className="text-xs text-gray-500">{filter.type}:</span>
          <span className="font-medium">{filter.value}</span>
          <button className="p-0.5 hover:bg-primary/20 rounded">
            <X size={14} />
          </button>
        </motion.span>
      ))}
    </div>
  );
}
