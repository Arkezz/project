import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  BookOpen,
  CheckCircle,
  Clock,
  Pause,
  X,
  Filter,
} from "lucide-react";
import NovelGrid from "./NovelGrid";
import ListViewToggle from "./ListViewToggle";
import NovelListFilters from "./NovelListFilters";

type ViewMode = "grid" | "list";
type ReadingStatus = "reading" | "completed" | "planning" | "paused";

const statusConfig = {
  reading: {
    label: "Currently Reading",
    icon: BookOpen,
    count: 12,
    color: "text-emerald-500",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    count: 48,
    color: "text-blue-500",
  },
  planning: {
    label: "Plan to Read",
    icon: Clock,
    count: 24,
    color: "text-amber-500",
  },
  paused: {
    label: "On Hold",
    icon: Pause,
    count: 6,
    color: "text-gray-500",
  },
} as const;

interface Filter {
  type: string;
  value: string | number | [number, number];
  label: string;
}

export default function ReadingLists() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeStatus, setActiveStatus] = useState<ReadingStatus>("reading");
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterAdd = (filter: Filter) => {
    setActiveFilters((prev) => [...prev, filter]);
    // Simulate loading state
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFilterRemove = (index: number) => {
    setActiveFilters((prev) => prev.filter((_, i) => i !== index));
    // Simulate loading state
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleStatusChange = (status: ReadingStatus) => {
    setActiveStatus(status);
    // Simulate loading state
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    // Simulate loading state
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-72 shrink-0">
        <div className="lg:sticky lg:top-24 bg-surface rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your readinglist..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200"
                aria-label="Search your reading list"
              />
            </div>
          </div>

          {/* Filter Sections */}
          <div className="p-4 space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <Filter size={16} />
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label={showFilters ? "Hide filters" : "Show filters"}
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <NovelListFilters onFilterAdd={handleFilterAdd} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reading Status */}
            <div className="pt-2 border-t border-gray-100">
              <h3 className="font-medium text-gray-700 mb-3">Reading Status</h3>
              <div className="space-y-1">
                {(
                  Object.entries(statusConfig) as [
                    ReadingStatus,
                    typeof statusConfig.reading,
                  ][]
                ).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      activeStatus === status
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <config.icon
                      size={16}
                      className={
                        activeStatus === status ? "text-primary" : config.color
                      }
                    />
                    <span className="flex-1 text-left text-sm">
                      {config.label}
                    </span>
                    <span
                      className={`text-xs ${
                        activeStatus === status
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      {config.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Button */}
            {(activeFilters.length > 0 || searchQuery) && (
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 bg-surface p-4 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium">
              {statusConfig[activeStatus].label}{" "}
              <span className="text-gray-500 text-sm">
                ({statusConfig[activeStatus].count})
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <ListViewToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-surface rounded-xl shadow-sm border border-gray-100">
              {activeFilters.map((filter, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary rounded-lg text-sm"
                >
                  <span>
                    {filter.type}: {filter.label}
                  </span>
                  <button
                    onClick={() => handleFilterRemove(index)}
                    className="p-0.5 hover:bg-primary/10 rounded-full transition-colors duration-200"
                    aria-label={`Remove ${filter.type} filter`}
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Novel Grid with Loading State */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[300px] flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-sm">Loading novels...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeStatus}-${activeFilters.length}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NovelGrid viewMode={viewMode} status={activeStatus} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
