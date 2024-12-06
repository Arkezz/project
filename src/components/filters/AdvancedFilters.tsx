import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import BasicInfoFilters from "./sections/BasicInfoFilters";
import ContentFilters from "./sections/ContentFilters";
import PublicationFilters from "./sections/PublicationFilters";
import ActiveFilters from "./ActiveFilters";
import FilterSection from "./FilterSection";

interface AdvancedFiltersProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export default function AdvancedFilters({
  onClose,
  onApplyFilters,
}: AdvancedFiltersProps) {
  const handleApplyFilters = () => {
    const filters = {}; // Collect filters from the form
    onApplyFilters(filters);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-surface rounded-xl w-full max-w-2xl mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Advanced Filters</h2>
              <p className="text-sm text-gray-500 mt-1">
                Refine your novel search
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <ActiveFilters className="mt-4" />
        </div>

        {/* Filter Sections */}
        <div className="p-6 space-y-6">
          <FilterSection title="Basic Information">
            <BasicInfoFilters />
          </FilterSection>

          <FilterSection title="Content">
            <ContentFilters />
          </FilterSection>

          <FilterSection title="Publication">
            <PublicationFilters />
          </FilterSection>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              Reset all filters
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
