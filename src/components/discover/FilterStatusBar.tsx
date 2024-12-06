import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";

interface Filter {
  type: string;
  value: string;
}

interface FilterStatusBarProps {
  filters: Filter[];
  totalResults: number;
  onRemoveFilter: (filter: Filter) => void;
  onClearFilters: () => void;
  onOpenFilters: () => void;
}

export default function FilterStatusBar({
  filters,
  totalResults,
  onRemoveFilter,
  onClearFilters,
  onOpenFilters,
}: FilterStatusBarProps) {
  if (filters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-16 z-40 bg-surface border-b border-gray-200 py-3 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            <span className="text-sm font-medium whitespace-nowrap">
              {totalResults.toLocaleString()} results
            </span>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {filters.map((filter) => (
                  <motion.button
                    key={`${filter.type}-${filter.value}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => onRemoveFilter(filter)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                  >
                    <span className="text-gray-500">{filter.type}:</span>
                    <span className="font-medium">{filter.value}</span>
                    <X size={14} />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              Clear all
            </button>
            <button
              onClick={onOpenFilters}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
