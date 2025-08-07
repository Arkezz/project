import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  RotateCcw,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  History,
  ArrowUpDown,
  MoreHorizontal,
  Copy,
  ExternalLink,
  Calendar,
  BookOpen,
  Globe,
  Loader2,
  RefreshCw,
  Archive,
  Star,
  MessageSquare,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import ChapterEditModal from "./ChapterEditModal";
import VersionHistoryModal from "./VersionHistoryModal";
import BulkActionsBar from "./BulkActionsBar";

interface Chapter {
  id: string;
  number: number;
  title: string;
  url: string;
  language: string;
  translationType: "official" | "fan" | "machine";
  status: "published" | "draft" | "archived" | "pending";
  createdAt: string;
  updatedAt: string;
  author: string;
  wordCount?: number;
  isLocked?: boolean;
  lockedBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  lockedAt?: string;
  hasUnsavedChanges?: boolean;
  lastEditedBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  versionCount: number;
  comments?: number;
  views?: number;
}

interface SortConfig {
  field: keyof Chapter;
  direction: "asc" | "desc";
}

interface FilterConfig {
  status: string[];
  language: string[];
  translationType: string[];
  search: string;
  dateRange: {
    start: string;
    end: string;
  };
}

// Mock data with comprehensive chapter information
const mockChapters: Chapter[] = Array.from({ length: 50 }, (_, i) => ({
  id: `chapter-${i + 1}`,
  number: i + 1,
  title: `Chapter ${i + 1}: ${
    i === 0
      ? "The Beginning"
      : i === 1
        ? "First Steps"
        : i === 2
          ? "New Discoveries"
          : i === 3
            ? "The Challenge"
            : i === 4
              ? "Unexpected Allies"
              : `Adventure Continues ${i - 4}`
  }`,
  url: `https://example.com/chapter-${i + 1}`,
  language: ["en", "es", "ko", "zh"][i % 4],
  translationType: ["official", "fan", "machine"][i % 3] as any,
  status: ["published", "draft", "archived", "pending"][i % 4] as any,
  createdAt: new Date(
    Date.now() - (50 - i) * 24 * 60 * 60 * 1000
  ).toISOString(),
  updatedAt: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ).toISOString(),
  author: ["TurtleMe", "Translator1", "Editor2", "Author3"][i % 4],
  wordCount: Math.floor(Math.random() * 3000) + 1500,
  isLocked: i % 15 === 0,
  lockedBy:
    i % 15 === 0
      ? {
          id: "user-1",
          name: "John Editor",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=faces",
        }
      : undefined,
  lockedAt:
    i % 15 === 0
      ? new Date(Date.now() - 30 * 60 * 1000).toISOString()
      : undefined,
  hasUnsavedChanges: i % 20 === 0,
  lastEditedBy: {
    id: `user-${(i % 3) + 1}`,
    name: ["Alice Writer", "Bob Translator", "Carol Editor"][i % 3],
    avatar: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces",
    ][i % 3],
  },
  versionCount: Math.floor(Math.random() * 10) + 1,
  comments: Math.floor(Math.random() * 20),
  views: Math.floor(Math.random() * 1000) + 100,
}));

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

const translationTypes = [
  { value: "official", label: "Official", color: "text-green-600 bg-green-50" },
  { value: "fan", label: "Fan", color: "text-blue-600 bg-blue-50" },
  { value: "machine", label: "MTL", color: "text-amber-600 bg-amber-50" },
];

const statusTypes = [
  {
    value: "published",
    label: "Published",
    color: "text-green-600 bg-green-50",
  },
  { value: "draft", label: "Draft", color: "text-gray-600 bg-gray-50" },
  {
    value: "archived",
    label: "Archived",
    color: "text-purple-600 bg-purple-50",
  },
  { value: "pending", label: "Pending", color: "text-amber-600 bg-amber-50" },
];

export default function ChapterViewTab() {
  const [chapters, setChapters] = useState<Chapter[]>(mockChapters);
  const [filteredChapters, setFilteredChapters] =
    useState<Chapter[]>(mockChapters);
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(
    new Set()
  );
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState<string | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "number",
    direction: "asc",
  });
  const [filters, setFilters] = useState<FilterConfig>({
    status: [],
    language: [],
    translationType: [],
    search: "",
    dateRange: { start: "", end: "" },
  });
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [conflictResolution, setConflictResolution] = useState<{
    chapterId: string;
    conflicts: any[];
  } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout>();

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        refreshChapters();
      }, 30000); // Refresh every 30 seconds
    } else {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [autoRefresh]);

  // Filter and sort chapters
  useEffect(() => {
    let filtered = [...chapters];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (chapter) =>
          chapter.title.toLowerCase().includes(searchLower) ||
          chapter.number.toString().includes(searchLower) ||
          chapter.author.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter((chapter) =>
        filters.status.includes(chapter.status)
      );
    }

    // Apply language filter
    if (filters.language.length > 0) {
      filtered = filtered.filter((chapter) =>
        filters.language.includes(chapter.language)
      );
    }

    // Apply translation type filter
    if (filters.translationType.length > 0) {
      filtered = filtered.filter((chapter) =>
        filters.translationType.includes(chapter.translationType)
      );
    }

    // Apply date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(
        (chapter) =>
          new Date(chapter.createdAt) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(
        (chapter) =>
          new Date(chapter.createdAt) <= new Date(filters.dateRange.end)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];

      let comparison = 0;
      if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortConfig.direction === "desc" ? -comparison : comparison;
    });

    setFilteredChapters(filtered);
  }, [chapters, filters, sortConfig]);

  const refreshChapters = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsLoading(false);
    toast.success("Chapters refreshed");
  };

  const handleSort = (field: keyof Chapter) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (key: keyof FilterConfig, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleChapterSelection = (chapterId: string) => {
    setSelectedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const selectAllVisible = () => {
    const visibleIds = filteredChapters.map((ch) => ch.id);
    setSelectedChapters(new Set(visibleIds));
  };

  const clearSelection = () => {
    setSelectedChapters(new Set());
  };

  const handleEditChapter = (chapter: Chapter) => {
    // Check if chapter is locked by another user
    if (chapter.isLocked && chapter.lockedBy?.id !== "current-user") {
      toast.error(
        `Chapter is being edited by ${chapter.lockedBy?.name}. Try again later.`,
        { duration: 5000 }
      );
      return;
    }

    // Lock chapter for editing
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === chapter.id
          ? {
              ...ch,
              isLocked: true,
              lockedBy: {
                id: "current-user",
                name: "You",
                avatar:
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=faces",
              },
              lockedAt: new Date().toISOString(),
            }
          : ch
      )
    );

    setEditingChapter(chapter);
  };

  const handleSaveChapter = async (updatedChapter: Chapter) => {
    try {
      setIsLoading(true);

      // Simulate save with potential conflicts
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate conflict detection (10% chance)
      if (Math.random() < 0.1) {
        setConflictResolution({
          chapterId: updatedChapter.id,
          conflicts: [
            {
              field: "title",
              yourValue: updatedChapter.title,
              theirValue: "Chapter 1: Alternative Title",
              theirAuthor: "Jane Editor",
              timestamp: new Date().toISOString(),
            },
          ],
        });
        return;
      }

      // Update chapter
      setChapters((prev) =>
        prev.map((ch) =>
          ch.id === updatedChapter.id
            ? {
                ...updatedChapter,
                updatedAt: new Date().toISOString(),
                isLocked: false,
                lockedBy: undefined,
                lockedAt: undefined,
                hasUnsavedChanges: false,
                versionCount: ch.versionCount + 1,
                lastEditedBy: {
                  id: "current-user",
                  name: "You",
                  avatar:
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=faces",
                },
              }
            : ch
        )
      );

      setEditingChapter(null);
      toast.success("Chapter saved successfully");
    } catch (error) {
      toast.error("Failed to save chapter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this chapter? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setChapters((prev) => prev.filter((ch) => ch.id !== chapterId));
      setSelectedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.delete(chapterId);
        return newSet;
      });

      toast.success("Chapter deleted successfully");
    } catch (error) {
      toast.error("Failed to delete chapter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAction = async (action: string, chapterIds: string[]) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      switch (action) {
        case "delete":
          setChapters((prev) =>
            prev.filter((ch) => !chapterIds.includes(ch.id))
          );
          toast.success(`Deleted ${chapterIds.length} chapters`);
          break;
        case "archive":
          setChapters((prev) =>
            prev.map((ch) =>
              chapterIds.includes(ch.id)
                ? { ...ch, status: "archived" as const }
                : ch
            )
          );
          toast.success(`Archived ${chapterIds.length} chapters`);
          break;
        case "publish":
          setChapters((prev) =>
            prev.map((ch) =>
              chapterIds.includes(ch.id)
                ? { ...ch, status: "published" as const }
                : ch
            )
          );
          toast.success(`Published ${chapterIds.length} chapters`);
          break;
      }

      setSelectedChapters(new Set());
    } catch (error) {
      toast.error(`Failed to ${action} chapters`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config = statusTypes.find((s) => s.value === status);
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color || "text-gray-600 bg-gray-50"}`}
      >
        {config?.label || status}
      </span>
    );
  };

  const getTranslationBadge = (type: string) => {
    const config = translationTypes.find((t) => t.value === type);
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color || "text-gray-600 bg-gray-50"}`}
      >
        {config?.label || type}
      </span>
    );
  };

  const getLanguageFlag = (langCode: string) => {
    return languages.find((l) => l.code === langCode)?.flag || "🌐";
  };

  const SortButton = ({
    field,
    children,
  }: {
    field: keyof Chapter;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-primary transition-colors group"
      aria-label={`Sort by ${field}`}
    >
      {children}
      <ArrowUpDown
        size={14}
        className={`opacity-0 group-hover:opacity-100 transition-opacity ${
          sortConfig.field === field ? "opacity-100 text-primary" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6" role="tabpanel" id="panel-chapter-view">
      {/* Header with Search and Controls */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Chapter Management
                </h4>
                <p className="text-sm text-gray-600">
                  {filteredChapters.length} of {chapters.length} chapters
                  {selectedChapters.size > 0 &&
                    ` • ${selectedChapters.size} selected`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Auto-refresh toggle */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="text-gray-600">Auto-refresh</span>
              </label>

              {/* Refresh button */}
              <motion.button
                onClick={refreshChapters}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Refresh chapters"
              >
                <RefreshCw
                  size={16}
                  className={isLoading ? "animate-spin" : ""}
                />
                <span className="hidden sm:inline">
                  {isLoading ? "Refreshing..." : "Refresh"}
                </span>
              </motion.button>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="Table view"
                >
                  <BookOpen size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="Grid view"
                >
                  <Archive size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search chapters by title, number, or author..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                aria-label="Search chapters"
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() => handleFilterChange("search", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <motion.button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors font-medium ${
                showFilters ||
                Object.values(filters).some((f) =>
                  Array.isArray(f) ? f.length > 0 : f !== ""
                )
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter size={16} />
              <span>Filters</span>
              {Object.values(filters).some((f) =>
                Array.isArray(f) ? f.length > 0 : f !== ""
              ) && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 text-xs rounded-full">
                  {filters.status.length +
                    filters.language.length +
                    filters.translationType.length +
                    (filters.search ? 1 : 0) +
                    (filters.dateRange.start || filters.dateRange.end ? 1 : 0)}
                </span>
              )}
            </motion.button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                id="filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <div className="space-y-2">
                        {statusTypes.map((status) => (
                          <label
                            key={status.value}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={filters.status.includes(status.value)}
                              onChange={(e) => {
                                const newStatus = e.target.checked
                                  ? [...filters.status, status.value]
                                  : filters.status.filter(
                                      (s) => s !== status.value
                                    );
                                handleFilterChange("status", newStatus);
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-sm">{status.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Language Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <div className="space-y-2">
                        {languages.map((lang) => (
                          <label
                            key={lang.code}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={filters.language.includes(lang.code)}
                              onChange={(e) => {
                                const newLang = e.target.checked
                                  ? [...filters.language, lang.code]
                                  : filters.language.filter(
                                      (l) => l !== lang.code
                                    );
                                handleFilterChange("language", newLang);
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-sm">
                              {lang.flag} {lang.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Translation Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Translation Type
                      </label>
                      <div className="space-y-2">
                        {translationTypes.map((type) => (
                          <label
                            key={type.value}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={filters.translationType.includes(
                                type.value
                              )}
                              onChange={(e) => {
                                const newType = e.target.checked
                                  ? [...filters.translationType, type.value]
                                  : filters.translationType.filter(
                                      (t) => t !== type.value
                                    );
                                handleFilterChange("translationType", newType);
                              }}
                              className="rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-sm">{type.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                      </label>
                      <div className="space-y-2">
                        <input
                          type="date"
                          value={filters.dateRange.start}
                          onChange={(e) =>
                            handleFilterChange("dateRange", {
                              ...filters.dateRange,
                              start: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-sm"
                          aria-label="Start date"
                        />
                        <input
                          type="date"
                          value={filters.dateRange.end}
                          onChange={(e) =>
                            handleFilterChange("dateRange", {
                              ...filters.dateRange,
                              end: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-sm"
                          aria-label="End date"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex justify-end pt-2 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        setFilters({
                          status: [],
                          language: [],
                          translationType: [],
                          search: "",
                          dateRange: { start: "", end: "" },
                        })
                      }
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedChapters.size > 0 && (
          <BulkActionsBar
            selectedCount={selectedChapters.size}
            onAction={handleBulkAction}
            selectedChapterIds={Array.from(selectedChapters)}
            onSelectAll={selectAllVisible}
            onClearSelection={clearSelection}
          />
        )}
      </AnimatePresence>

      {/* Chapters Display */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left w-12">
                    <input
                      type="checkbox"
                      checked={
                        selectedChapters.size === filteredChapters.length &&
                        filteredChapters.length > 0
                      }
                      onChange={
                        selectedChapters.size === filteredChapters.length
                          ? clearSelection
                          : selectAllVisible
                      }
                      className="rounded border-gray-300 text-primary focus:ring-primary/20"
                      aria-label="Select all chapters"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="number">Chapter #</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="title">Title</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="status">Status</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton field="updatedAt">Last Updated</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredChapters.map((chapter, index) => (
                    <motion.tr
                      key={chapter.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.02 }}
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedChapters.has(chapter.id) ? "bg-primary/5" : ""
                      } ${chapter.hasUnsavedChanges ? "bg-amber-50" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedChapters.has(chapter.id)}
                          onChange={() => toggleChapterSelection(chapter.id)}
                          className="rounded border-gray-300 text-primary focus:ring-primary/20"
                          aria-label={`Select chapter ${chapter.number}`}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            #{chapter.number}
                          </span>
                          {chapter.isLocked && (
                            <div className="relative group">
                              <Lock size={14} className="text-amber-500" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Locked by {chapter.lockedBy?.name}
                                <br />
                                {chapter.lockedAt &&
                                  formatDistanceToNow(
                                    new Date(chapter.lockedAt),
                                    { addSuffix: true }
                                  )}
                              </div>
                            </div>
                          )}
                          {chapter.hasUnsavedChanges && (
                            <div
                              className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                              title="Has unsaved changes"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 line-clamp-1">
                              {chapter.title}
                            </p>
                            {chapter.lastEditedBy && (
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-4 h-4 rounded-full overflow-hidden">
                                  <img
                                    src={chapter.lastEditedBy.avatar}
                                    alt={chapter.lastEditedBy.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-500">
                                  by {chapter.lastEditedBy.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(chapter.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {getLanguageFlag(chapter.language)}
                          </span>
                          {getTranslationBadge(chapter.translationType)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>
                            {formatDistanceToNow(new Date(chapter.updatedAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {chapter.views && (
                            <div className="flex items-center gap-1">
                              <Eye size={12} />
                              <span>{chapter.views}</span>
                            </div>
                          )}
                          {chapter.comments && (
                            <div className="flex items-center gap-1">
                              <MessageSquare size={12} />
                              <span>{chapter.comments}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <History size={12} />
                            <span>v{chapter.versionCount}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={chapter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            aria-label={`View chapter ${chapter.number} in new tab`}
                          >
                            <ExternalLink size={16} />
                          </a>

                          <button
                            type="button"
                            onClick={() => setShowVersionHistory(chapter.id)}
                            className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                            aria-label={`View version history for chapter ${chapter.number}`}
                          >
                            <History size={16} />
                          </button>

                          <motion.button
                            type="button"
                            onClick={() => handleEditChapter(chapter)}
                            disabled={
                              chapter.isLocked &&
                              chapter.lockedBy?.id !== "current-user"
                            }
                            className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Edit chapter ${chapter.number}`}
                          >
                            <Edit2 size={16} />
                          </motion.button>

                          <button
                            type="button"
                            onClick={() => handleDeleteChapter(chapter.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            aria-label={`Delete chapter ${chapter.number}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          // Grid View
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredChapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all ${
                      selectedChapters.has(chapter.id)
                        ? "ring-2 ring-primary/20 border-primary/30"
                        : ""
                    } ${chapter.hasUnsavedChanges ? "bg-amber-50 border-amber-200" : ""}`}
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4">
                      <input
                        type="checkbox"
                        checked={selectedChapters.has(chapter.id)}
                        onChange={() => toggleChapterSelection(chapter.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary/20"
                        aria-label={`Select chapter ${chapter.number}`}
                      />
                    </div>

                    {/* Status Indicators */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {chapter.isLocked && (
                        <Lock size={14} className="text-amber-500" />
                      )}
                      {chapter.hasUnsavedChanges && (
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                      )}
                    </div>

                    {/* Chapter Info */}
                    <div className="mt-6 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-gray-900">
                          #{chapter.number}
                        </span>
                        {getStatusBadge(chapter.status)}
                      </div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-3">
                        {chapter.title}
                      </h3>

                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <span className="text-base">
                            {getLanguageFlag(chapter.language)}
                          </span>
                          {getTranslationBadge(chapter.translationType)}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {chapter.wordCount && (
                          <div className="flex items-center gap-1">
                            <BookOpen size={12} />
                            <span>
                              {chapter.wordCount.toLocaleString()} words
                            </span>
                          </div>
                        )}
                        {chapter.views && (
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            <span>{chapter.views}</span>
                          </div>
                        )}
                        {chapter.comments && (
                          <div className="flex items-center gap-1">
                            <MessageSquare size={12} />
                            <span>{chapter.comments}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock size={12} />
                        <span>
                          Updated{" "}
                          {formatDistanceToNow(new Date(chapter.updatedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      {chapter.lastEditedBy && (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full overflow-hidden">
                            <img
                              src={chapter.lastEditedBy.avatar}
                              alt={chapter.lastEditedBy.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>by {chapter.lastEditedBy.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <a
                          href={chapter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          aria-label={`View chapter ${chapter.number}`}
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowVersionHistory(chapter.id)}
                          className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                          aria-label={`Version history for chapter ${chapter.number}`}
                        >
                          <History size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          type="button"
                          onClick={() => handleEditChapter(chapter)}
                          disabled={
                            chapter.isLocked &&
                            chapter.lockedBy?.id !== "current-user"
                          }
                          className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit2 size={14} />
                          <span>Edit</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredChapters.length === 0 && (
          <div className="text-center py-16 px-6">
            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No chapters found
            </h3>
            <p className="text-gray-600 mb-6">
              {chapters.length === 0
                ? "Start by adding your first chapter using one of the import methods above."
                : "Try adjusting your search terms or filters to find chapters."}
            </p>
            {chapters.length === 0 && (
              <button
                type="button"
                onClick={() => searchInputRef.current?.focus()}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Clear filters and search
              </button>
            )}
          </div>
        )}

        {/* Footer with Stats */}
        {filteredChapters.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-6">
                <span>
                  Showing {filteredChapters.length} of {chapters.length}{" "}
                  chapters
                </span>
                <span>
                  Last refreshed:{" "}
                  {formatDistanceToNow(lastRefresh, { addSuffix: true })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span>
                  {chapters.filter((ch) => ch.status === "published").length}{" "}
                  published
                </span>
                <span>
                  {chapters.filter((ch) => ch.status === "draft").length} drafts
                </span>
                <span>
                  {chapters.filter((ch) => ch.hasUnsavedChanges).length} unsaved
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {editingChapter && (
          <ChapterEditModal
            chapter={editingChapter}
            onSave={handleSaveChapter}
            onClose={() => {
              // Unlock chapter when closing
              setChapters((prev) =>
                prev.map((ch) =>
                  ch.id === editingChapter.id
                    ? {
                        ...ch,
                        isLocked: false,
                        lockedBy: undefined,
                        lockedAt: undefined,
                      }
                    : ch
                )
              );
              setEditingChapter(null);
            }}
          />
        )}

        {showVersionHistory && (
          <VersionHistoryModal
            chapterId={showVersionHistory}
            onClose={() => setShowVersionHistory(null)}
            onRestore={(version) => {
              toast.success(`Restored to version ${version}`);
              setShowVersionHistory(null);
            }}
          />
        )}

        {conflictResolution && (
          <ConflictResolutionModal
            conflicts={conflictResolution.conflicts}
            onResolve={(resolution) => {
              toast.success("Conflicts resolved successfully");
              setConflictResolution(null);
            }}
            onClose={() => setConflictResolution(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Conflict Resolution Modal Component
interface ConflictResolutionModalProps {
  conflicts: any[];
  onResolve: (resolution: any) => void;
  onClose: () => void;
}

function ConflictResolutionModal({
  conflicts,
  onResolve,
  onClose,
}: ConflictResolutionModalProps) {
  const [resolutions, setResolutions] = useState<
    Record<string, "yours" | "theirs" | "merge">
  >({});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-600" size={20} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Resolve Conflicts
                </h3>
                <p className="text-sm text-gray-600">
                  Another user made changes while you were editing
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {conflicts.map((conflict, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900 capitalize">
                    {conflict.field} Conflict
                  </h4>
                  <p className="text-sm text-gray-600">
                    Changed by {conflict.theirAuthor}{" "}
                    {formatDistanceToNow(new Date(conflict.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`conflict-${index}`}
                          value="yours"
                          checked={resolutions[conflict.field] === "yours"}
                          onChange={() =>
                            setResolutions((prev) => ({
                              ...prev,
                              [conflict.field]: "yours",
                            }))
                          }
                          className="text-primary focus:ring-primary/20"
                        />
                        <span className="font-medium text-green-600">
                          Keep Your Version
                        </span>
                      </label>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {conflict.yourValue}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`conflict-${index}`}
                          value="theirs"
                          checked={resolutions[conflict.field] === "theirs"}
                          onChange={() =>
                            setResolutions((prev) => ({
                              ...prev,
                              [conflict.field]: "theirs",
                            }))
                          }
                          className="text-primary focus:ring-primary/20"
                        />
                        <span className="font-medium text-blue-600">
                          Use Their Version
                        </span>
                      </label>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {conflict.theirValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={() => onResolve(resolutions)}
            disabled={Object.keys(resolutions).length !== conflicts.length}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CheckCircle size={16} />
            <span>Resolve Conflicts</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
