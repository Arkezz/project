import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Filter,
  FlameKindling,
  MessageCircle,
  PenSquare,
  Pin,
  Plus,
  SortDesc,
  Star,
  TrendingUp,
  Search,
  X,
  Calendar,
  Eye,
  Users,
  Hash,
} from "lucide-react";
import ForumHeader from "../components/forum/ForumHeader";
import ThreadCard from "../components/forum/ThreadCard";
import CategoryFilter from "../components/forum/CategoryFilter";
import CreateThreadModal from "../components/forum/CreateThread/CreateThreadModal";
import { forumData } from "../data/forumData";

const sortOptions = [
  { id: "latest", label: "Latest", icon: SortDesc },
  { id: "hot", label: "Hot", icon: FlameKindling },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "most-replied", label: "Most Replied", icon: MessageCircle },
];

const timeFilters = [
  { id: "all", label: "All Time" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

const novelFilters = [
  { id: "all", label: "All Novels" },
  { id: "tbate", label: "The Beginning After The End" },
  { id: "solo-leveling", label: "Solo Leveling" },
  { id: "orv", label: "Omniscient Reader's Viewpoint" },
  { id: "release-witch", label: "Release That Witch" },
];

export default function Forum() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [novelFilter, setNovelFilter] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const clearFilters = () => {
    setSearchQuery("");
    setTimeFilter("all");
    setNovelFilter("all");
    setActiveFilters([]);
  };

  const hasActiveFilters =
    searchQuery || timeFilter !== "all" || novelFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-50">
      <ForumHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Categories */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Quick Stats */}
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Hash size={16} className="text-primary" />
                  Forum Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Threads</span>
                    <span className="font-medium">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Posts</span>
                    <span className="font-medium">156,923</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-medium">2,341</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Online Now</span>
                    <span className="font-medium text-green-600">847</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Enhanced Header with Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {/* Breadcrumb */}
              <nav className="text-sm breadcrumbs mb-4">
                <ul className="flex items-center gap-2 text-gray-500">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Forum
                    </a>
                  </li>
                  <span>/</span>
                  <li className="text-text font-medium">
                    {selectedCategory === "all"
                      ? "All Discussions"
                      : selectedCategory}
                  </li>
                </ul>
              </nav>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search threads, posts, or users..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      showFilters || hasActiveFilters
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-gray-200 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                    {hasActiveFilters && (
                      <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                        {
                          [
                            searchQuery,
                            timeFilter !== "all",
                            novelFilter !== "all",
                          ].filter(Boolean).length
                        }
                      </span>
                    )}
                  </button>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          sortBy === option.id
                            ? "bg-white text-primary shadow-sm"
                            : "hover:bg-white/50 text-gray-600"
                        }`}
                      >
                        <Icon size={16} />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Time Filter */}
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Time Period
                          </label>
                          <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                          >
                            {timeFilters.map((filter) => (
                              <option key={filter.id} value={filter.id}>
                                {filter.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Novel Filter */}
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Novel Series
                          </label>
                          <select
                            value={novelFilter}
                            onChange={(e) => setNovelFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                          >
                            {novelFilters.map((filter) => (
                              <option key={filter.id} value={filter.id}>
                                {filter.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Thread Type Filter */}
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Thread Type
                          </label>
                          <select className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all">
                            <option>All Types</option>
                            <option>Discussion</option>
                            <option>Question</option>
                            <option>Review</option>
                            <option>Theory</option>
                            <option>News</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Active filters:
                  </span>
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {timeFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {timeFilters.find((f) => f.id === timeFilter)?.label}
                      <button onClick={() => setTimeFilter("all")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {novelFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {novelFilters.find((f) => f.id === novelFilter)?.label}
                      <button onClick={() => setNovelFilter("all")}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Pinned threads */}
            {selectedCategory === "all" && (
              <div className="mb-8">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Pin size={18} />
                  <h2 className="font-semibold">Pinned Threads</h2>
                </div>
                <div className="space-y-3">
                  {forumData.threads
                    .filter((thread) => thread.isPinned)
                    .map((thread) => (
                      <ThreadCard key={thread.id} thread={thread} />
                    ))}
                </div>
              </div>
            )}

            {/* Regular threads */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">
                  Recent Discussions (
                  {forumData.threads.filter((t) => !t.isPinned).length})
                </h2>
              </div>

              {forumData.threads
                .filter((thread) => !thread.isPinned)
                .map((thread) => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Load More Threads
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.button
        onClick={() => setShowCreateThread(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Plus
          size={24}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Create Thread
        </span>
      </motion.button>

      <CreateThreadModal
        isOpen={showCreateThread}
        onClose={() => setShowCreateThread(false)}
      />
    </div>
  );
}
