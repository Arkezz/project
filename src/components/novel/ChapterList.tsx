import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  ChevronDown,
  Globe,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Lock,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
} from "lucide-react";

// Types for the new schema
interface Chapter {
  id: string;
  title: string;
  chapter_number: number;
  volume_number?: number;
  sort_order: number;
  translations: ChapterTranslation[];
}

interface ChapterTranslation {
  id: string;
  language_code: string;
  language_name: string;
  source_chapter_label: string;
  url: string;
  translation_status: "AVAILABLE" | "UNAVAILABLE" | "PREMIUM";
  translation_type: "OFFICIAL" | "MACHINE" | "AI_ASSISTED" | "MIXED";
  translated_title?: string;
  translation_date: string;
  translator?: string;
  source_name?: string;
  read_status?: "read" | "unread" | "reading";
}

interface ChapterListProps {
  novel: any;
}

// Mock data with the new structure
const mockChapters: Chapter[] = Array.from({ length: 25 }, (_, i) => {
  const chapterNum = i === 5 ? 5.5 : i === 12 ? 12.1 : i + 1;
  const volumeNum = Math.floor(i / 10) + 1;

  return {
    id: `chapter-${i}`,
    title: `The ${i === 5 ? "Interlude" : i === 12 ? "Side Story" : "Battle"} ${i === 0 ? "Begins" : `Continues ${i}`}`,
    chapter_number: chapterNum,
    volume_number: volumeNum,
    sort_order: i,
    translations: [
      {
        id: `trans-${i}-en`,
        language_code: "en",
        language_name: "English",
        source_chapter_label: `Ch. ${chapterNum}${i % 3 === 0 ? " Part 1" : ""}`,
        url: `https://example.com/chapter/${i}`,
        translation_status:
          i > 20 ? "PREMIUM" : i > 18 ? "UNAVAILABLE" : "AVAILABLE",
        translation_type:
          i % 4 === 0
            ? "OFFICIAL"
            : i % 4 === 1
              ? "MACHINE"
              : i % 4 === 2
                ? "AI_ASSISTED"
                : "MIXED",
        translated_title:
          i % 3 === 0 ? `The Epic Battle Part ${i + 1}` : undefined,
        translation_date: new Date(
          Date.now() - i * 24 * 60 * 60 * 1000
        ).toISOString(),
        translator:
          i % 4 === 0
            ? "Official Team"
            : i % 4 === 1
              ? "AutoTranslate"
              : `Translator${(i % 5) + 1}`,
        source_name:
          i % 3 === 0
            ? "Webnovel"
            : i % 3 === 1
              ? "NovelUpdates"
              : "Wuxiaworld",
        read_status: i < 5 ? "read" : i === 5 ? "reading" : "unread",
      },
      ...(i % 2 === 0
        ? [
            {
              id: `trans-${i}-es`,
              language_code: "es",
              language_name: "Spanish",
              source_chapter_label: `Cap. ${chapterNum}`,
              url: `https://example-es.com/chapter/${i}`,
              translation_status: "AVAILABLE" as const,
              translation_type: "OFFICIAL" as const,
              translation_date: new Date(
                Date.now() - (i + 2) * 24 * 60 * 60 * 1000
              ).toISOString(),
              translator: "Spanish Team",
              source_name: "NovelHispano",
              read_status: "unread" as const,
            },
          ]
        : []),
      ...(i % 3 === 0
        ? [
            {
              id: `trans-${i}-raw`,
              language_code: "raw",
              language_name: "Raw (Korean)",
              source_chapter_label: `제${chapterNum}화`,
              url: `https://kakao.com/chapter/${i}`,
              translation_status: "AVAILABLE" as const,
              translation_type: "OFFICIAL" as const,
              translation_date: new Date(
                Date.now() - (i - 1) * 24 * 60 * 60 * 1000
              ).toISOString(),
              translator: "Original Author",
              source_name: "Kakaopage",
              read_status: "unread" as const,
            },
          ]
        : []),
    ],
  };
});

export default function ChapterList({ novel }: ChapterListProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTranslationTypes, setSelectedTranslationTypes] = useState<
    string[]
  >([]);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set()
  );

  // Get available languages dynamically
  const availableLanguages = useMemo(() => {
    const languages = new Map<
      string,
      { code: string; name: string; count: number }
    >();

    mockChapters.forEach((chapter) => {
      chapter.translations.forEach((translation) => {
        const existing = languages.get(translation.language_code);
        if (existing) {
          existing.count++;
        } else {
          languages.set(translation.language_code, {
            code: translation.language_code,
            name: translation.language_name,
            count: 1,
          });
        }
      });
    });

    return Array.from(languages.values()).sort((a, b) => b.count - a.count);
  }, []);

  // Get available translation types
  const availableTranslationTypes = useMemo(() => {
    const types = new Set<string>();
    mockChapters.forEach((chapter) => {
      chapter.translations.forEach((translation) => {
        types.add(translation.translation_type);
      });
    });
    return Array.from(types);
  }, []);

  // Filter chapters based on selected criteria
  const filteredChapters = useMemo(() => {
    return mockChapters.filter((chapter) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesTitle = chapter.title.toLowerCase().includes(searchLower);
        const matchesNumber = chapter.chapter_number
          .toString()
          .includes(searchLower);
        const matchesTranslation = chapter.translations.some(
          (t) =>
            t.translated_title?.toLowerCase().includes(searchLower) ||
            t.source_chapter_label.toLowerCase().includes(searchLower)
        );

        if (!matchesTitle && !matchesNumber && !matchesTranslation) {
          return false;
        }
      }

      // Language filter - chapter must have at least one translation in selected languages
      const hasSelectedLanguage = chapter.translations.some((t) =>
        selectedLanguages.includes(t.language_code)
      );
      if (!hasSelectedLanguage) return false;

      // Translation type filter
      if (selectedTranslationTypes.length > 0) {
        const hasSelectedType = chapter.translations.some((t) =>
          selectedTranslationTypes.includes(t.translation_type)
        );
        if (!hasSelectedType) return false;
      }

      return true;
    });
  }, [searchQuery, selectedLanguages, selectedTranslationTypes]);

  const handleLanguageToggle = (langCode: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(langCode)
        ? prev.filter((code) => code !== langCode)
        : [...prev, langCode]
    );
  };

  const handleTranslationTypeToggle = (type: string) => {
    setSelectedTranslationTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleChapterExpansion = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const getTranslationBadge = (type: string, status: string) => {
    const isAvailable = status === "AVAILABLE";

    switch (type) {
      case "OFFICIAL":
        return {
          text: "Official",
          className: `px-2 py-1 text-xs font-medium rounded-full ${
            isAvailable
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-gray-100 text-gray-500 border border-gray-200"
          }`,
        };
      case "MACHINE":
        return {
          text: "MTL",
          className: `px-2 py-1 text-xs font-medium rounded-full ${
            isAvailable
              ? "bg-amber-100 text-amber-700 border border-amber-200"
              : "bg-gray-100 text-gray-500 border border-gray-200"
          }`,
        };
      case "AI_ASSISTED":
        return {
          text: "AI-Assisted",
          className: `px-2 py-1 text-xs font-medium rounded-full ${
            isAvailable
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-gray-100 text-gray-500 border border-gray-200"
          }`,
        };
      case "MIXED":
        return {
          text: "Mixed",
          className: `px-2 py-1 text-xs font-medium rounded-full ${
            isAvailable
              ? "bg-purple-100 text-purple-700 border border-purple-200"
              : "bg-gray-100 text-gray-500 border border-gray-200"
          }`,
        };
      default:
        return {
          text: "Unknown",
          className:
            "px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 border border-gray-200",
        };
    }
  };

  const getReadStatusIcon = (status?: string) => {
    switch (status) {
      case "read":
        return <Eye size={14} className="text-green-500" />;
      case "reading":
        return <Book size={14} className="text-blue-500" />;
      case "unread":
      default:
        return <EyeOff size={14} className="text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <CheckCircle size={14} className="text-green-500" />;
      case "UNAVAILABLE":
        return <Clock size={14} className="text-amber-500" />;
      case "PREMIUM":
        return <Lock size={14} className="text-purple-500" />;
      default:
        return <AlertCircle size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Header with Prominent Language Filter */}
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search chapters, titles, or labels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Prominent Language Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Globe size={16} />
            Languages:
          </span>
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageToggle(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedLanguages.includes(lang.code)
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {lang.name} ({lang.count})
            </button>
          ))}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              showFilters || selectedTranslationTypes.length > 0
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Filter size={14} />
            Filters
            {selectedTranslationTypes.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
                {selectedTranslationTypes.length}
              </span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-surface p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3">Translation Quality</h4>
                <div className="flex flex-wrap gap-2">
                  {availableTranslationTypes.map((type) => {
                    const badge = getTranslationBadge(type, "AVAILABLE");
                    return (
                      <button
                        key={type}
                        onClick={() => handleTranslationTypeToggle(type)}
                        className={`${badge.className} transition-all ${
                          selectedTranslationTypes.includes(type)
                            ? "ring-2 ring-primary/50 ring-offset-1"
                            : "hover:scale-105"
                        }`}
                      >
                        {badge.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Refined Chapter List */}
      <div className="space-y-2">
        {filteredChapters.map((chapter, index) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const isHovered = hoveredChapter === chapter.id;
          const visibleTranslations = chapter.translations.filter((t) =>
            selectedLanguages.includes(t.language_code)
          );
          const hasMultipleTranslations = visibleTranslations.length > 1;
          const primaryTranslation = visibleTranslations[0];

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="bg-surface rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              onMouseEnter={() => setHoveredChapter(chapter.id)}
              onMouseLeave={() => setHoveredChapter(null)}
            >
              {/* Main Chapter Row - Compact and Scannable */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {/* Chapter Info - Primary Focus */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {getReadStatusIcon(primaryTranslation?.read_status)}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {chapter.volume_number &&
                            `Vol. ${chapter.volume_number} `}
                          Ch. {chapter.chapter_number}
                        </div>
                        {chapter.chapter_number % 1 !== 0 && (
                          <span className="text-xs text-amber-600 font-medium">
                            Special
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">
                        {chapter.title}
                      </h3>

                      {/* Translation Badges - Secondary but Visible */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {visibleTranslations.map((translation) => {
                          const badge = getTranslationBadge(
                            translation.translation_type,
                            translation.translation_status
                          );
                          return (
                            <div
                              key={translation.id}
                              className="flex items-center gap-1"
                            >
                              <span className={badge.className}>
                                {translation.language_code.toUpperCase()}
                              </span>
                              <span className={badge.className}>
                                {badge.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Primary Read Button */}
                    {primaryTranslation && (
                      <a
                        href={primaryTranslation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all ${
                          primaryTranslation.translation_status === "AVAILABLE"
                            ? "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md"
                            : primaryTranslation.translation_status ===
                                "PREMIUM"
                              ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                              : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          if (
                            primaryTranslation.translation_status !==
                            "AVAILABLE"
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <span>Read</span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {/* Expand Button for Multiple Translations */}
                    {hasMultipleTranslations && (
                      <button
                        onClick={() => toggleChapterExpansion(chapter.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View all translations"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Tooltip - Progressive Disclosure */}
                <AnimatePresence>
                  {isHovered && primaryTranslation && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>Source: {primaryTranslation.source_name}</span>
                          {primaryTranslation.translator && (
                            <span>By: {primaryTranslation.translator}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(primaryTranslation.translation_status)}
                          <span className="capitalize">
                            {primaryTranslation.translation_status.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Expanded Translation Options - Tertiary Detail */}
              <AnimatePresence>
                {isExpanded && hasMultipleTranslations && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100 bg-gray-50/50"
                  >
                    <div className="p-4 space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Info size={14} />
                        All Available Translations
                      </h4>
                      {visibleTranslations.map((translation) => (
                        <TranslationRow
                          key={translation.id}
                          translation={translation}
                          getTranslationBadge={getTranslationBadge}
                          getStatusIcon={getStatusIcon}
                          getReadStatusIcon={getReadStatusIcon}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12">
          <Book size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No chapters found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}

// Refined Translation Row Component
interface TranslationRowProps {
  translation: ChapterTranslation;
  getTranslationBadge: (
    type: string,
    status: string
  ) => { text: string; className: string };
  getStatusIcon: (status: string) => JSX.Element;
  getReadStatusIcon: (status?: string) => JSX.Element;
}

function TranslationRow({
  translation,
  getTranslationBadge,
  getStatusIcon,
  getReadStatusIcon,
}: TranslationRowProps) {
  const badge = getTranslationBadge(
    translation.translation_type,
    translation.translation_status
  );

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">
            {translation.language_name}
          </span>
          <span className={badge.className}>{badge.text}</span>
        </div>

        {translation.translated_title && (
          <span className="text-sm text-gray-600 line-clamp-1">
            {translation.translated_title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Status and Read Indicators */}
        <div className="flex items-center gap-2">
          {getStatusIcon(translation.translation_status)}
          {getReadStatusIcon(translation.read_status)}
        </div>

        {/* Source Info */}
        <div className="text-xs text-gray-500 text-right min-w-0">
          {translation.source_name && (
            <div className="truncate">{translation.source_name}</div>
          )}
          {translation.translator && (
            <div className="truncate">by {translation.translator}</div>
          )}
        </div>

        {/* Read Button */}
        <a
          href={translation.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            translation.translation_status === "AVAILABLE"
              ? "bg-primary text-white hover:bg-primary/90"
              : translation.translation_status === "PREMIUM"
                ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (translation.translation_status !== "AVAILABLE") {
              e.preventDefault();
            }
          }}
        >
          <span>Read</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
