import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, List, Search, SlidersHorizontal } from "lucide-react";
import NovelGrid from "./NovelGrid";
import ListViewToggle from "./ListViewToggle";
import ReadingStatusTabs from "./ReadingStatusTabs";
import NovelListFilters from "./NovelListFilters";

type ViewMode = "grid" | "list";
type ReadingStatus = "reading" | "completed" | "planning" | "paused";

export default function ReadingLists() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeStatus, setActiveStatus] = useState<ReadingStatus>("reading");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <ReadingStatusTabs
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
          />

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search your novels..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SlidersHorizontal size={20} className="text-gray-600" />
            </button>

            <ListViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <NovelListFilters />
            </motion.div>
          )}
        </AnimatePresence>

        <NovelGrid viewMode={viewMode} status={activeStatus} />
      </div>
    </div>
  );
}
