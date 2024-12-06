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

export default function Forum() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateThread, setShowCreateThread] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Filters and sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <nav className="text-sm breadcrumbs">
                <ul className="flex items-center gap-2 text-gray-500">
                  <li>
                    <a href="#" className="hover:text-primary">
                      Forum
                    </a>
                  </li>
                  <span>/</span>
                  <li className="text-text font-medium">All Discussions</li>
                </ul>
              </nav>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-filter group"
                >
                  <Filter
                    size={18}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                  <span>Filters</span>
                </button>

                <div className="flex items-center gap-2 bg-surface rounded-lg p-1 shadow-sm">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                          sortBy === option.id
                            ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-sm"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={
                            sortBy === option.id ? "animate-pulse" : ""
                          }
                        />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Advanced filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6"
                >
                  <div className="bg-surface rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Novel Series
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 transition-all">
                          <option>All Series</option>
                          <option>The Beginning After The End</option>
                          <option>Solo Leveling</option>
                          <option>Omniscient Reader</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Time Period
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 transition-all">
                          <option>All Time</option>
                          <option>Past 24 Hours</option>
                          <option>Past Week</option>
                          <option>Past Month</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Thread Type
                        </label>
                        <select className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 transition-all">
                          <option>All Types</option>
                          <option>Discussion</option>
                          <option>Question</option>
                          <option>Review</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pinned threads */}
            {selectedCategory === "all" && (
              <div className="mb-8">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Pin size={18} className="animate-bounce" />
                  <h2 className="font-medium">Pinned Threads</h2>
                </div>
                <div className="space-y-4">
                  {forumData.threads
                    .filter((thread) => thread.isPinned)
                    .map((thread) => (
                      <ThreadCard key={thread.id} thread={thread} />
                    ))}
                </div>
              </div>
            )}

            {/* Regular threads */}
            <div className="space-y-4">
              {forumData.threads
                .filter((thread) => !thread.isPinned)
                .map((thread) => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <motion.button
        onClick={() => setShowCreateThread(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus
          size={24}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </motion.button>

      <CreateThreadModal
        isOpen={showCreateThread}
        onClose={() => setShowCreateThread(false)}
      />
    </div>
  );
}
