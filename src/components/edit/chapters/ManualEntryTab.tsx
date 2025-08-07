import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Plus,
  PlusCircle,
  Globe,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Edit2,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface RecentChapter {
  id: string;
  number: number;
  title: string;
  url: string;
  addedAt: Date;
  language: string;
  translationType: string;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
];

const translationTypes = [
  { value: "official", label: "Official", color: "text-green-600" },
  { value: "fan", label: "Fan Translation", color: "text-blue-600" },
  { value: "machine", label: "Machine Translation", color: "text-amber-600" },
];

const popularSites = [
  "webnovel.com",
  "wuxiaworld.com",
  "novelupdates.com",
  "lightnovelpub.com",
  "readnovelfull.com",
  "novelhall.com",
];

export default function ManualEntryTab() {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterUrl, setChapterUrl] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translationType, setTranslationType] = useState("official");
  const [sourceWebsite, setSourceWebsite] = useState("");
  const [urlValidation, setUrlValidation] = useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [recentChapters, setRecentChapters] = useState<RecentChapter[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [continueAdding, setContinueAdding] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (chapterUrl) {
      const timeoutId = setTimeout(() => {
        try {
          new URL(chapterUrl);
          setUrlValidation("valid");
        } catch {
          setUrlValidation("invalid");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setUrlValidation("idle");
    }
  }, [chapterUrl]);

  const isValidForm = () => {
    return (
      chapterTitle.trim() && chapterUrl.trim() && urlValidation === "valid"
    );
  };

  const addChapter = async (shouldContinue: boolean = false) => {
    if (!isValidForm()) {
      toast.error("Please fill in all required fields with valid information");
      return;
    }

    setIsSubmitting(true);
    setContinueAdding(shouldContinue);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newChapter: RecentChapter = {
      id: Date.now().toString(),
      number: chapterNumber,
      title: chapterTitle,
      url: chapterUrl,
      addedAt: new Date(),
      language: selectedLanguage,
      translationType,
    };

    setRecentChapters((prev) => [newChapter, ...prev.slice(0, 4)]);

    if (shouldContinue) {
      // Reset form for next chapter
      setChapterNumber((prev) => prev + 1);
      setChapterTitle("");
      setChapterUrl("");
      setUrlValidation("idle");

      // Focus title input for next entry
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);

      toast.success(`Chapter ${chapterNumber} added! Ready for next chapter.`);
    } else {
      // Reset entire form
      setChapterNumber(1);
      setChapterTitle("");
      setChapterUrl("");
      setUrlValidation("idle");

      toast.success(`Chapter ${chapterNumber} added successfully!`);
    }

    setIsSubmitting(false);
    setContinueAdding(false);
  };

  const editRecentChapter = (id: string) => {
    const chapter = recentChapters.find((ch) => ch.id === id);
    if (chapter) {
      setChapterNumber(chapter.number);
      setChapterTitle(chapter.title);
      setChapterUrl(chapter.url);
      setSelectedLanguage(chapter.language);
      setTranslationType(chapter.translationType);

      // Remove from recent list
      setRecentChapters((prev) => prev.filter((ch) => ch.id !== id));

      titleInputRef.current?.focus();
      toast.info("Chapter loaded for editing");
    }
  };

  const deleteRecentChapter = (id: string) => {
    setRecentChapters((prev) => prev.filter((ch) => ch.id !== id));
    toast.success("Chapter removed from recent list");
  };

  const getUrlValidationIcon = () => {
    switch (urlValidation) {
      case "valid":
        return <CheckCircle size={16} className="text-green-500" />;
      case "invalid":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      role="tabpanel"
      id="panel-manual-entry"
    >
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Edit3 className="text-primary" size={20} />
            <div>
              <h4 className="font-semibold text-gray-900">
                Add Single Chapter
              </h4>
              <p className="text-sm text-gray-600">
                Manually enter chapter information with real-time validation
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Chapter Number */}
            <div>
              <label
                htmlFor="chapter-number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Chapter Number
              </label>
              <input
                id="chapter-number"
                type="number"
                min="1"
                value={chapterNumber}
                onChange={(e) =>
                  setChapterNumber(parseInt(e.target.value) || 1)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                aria-describedby="chapter-number-help"
              />
              <p
                id="chapter-number-help"
                className="text-xs text-gray-500 mt-1"
              >
                Auto-increments after adding chapters
              </p>
            </div>

            {/* Chapter Title */}
            <div>
              <label
                htmlFor="chapter-title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Chapter Title *
              </label>
              <input
                ref={titleInputRef}
                id="chapter-title"
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                placeholder="Enter chapter title"
                aria-required="true"
              />
            </div>

            {/* Chapter URL */}
            <div>
              <label
                htmlFor="chapter-url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Chapter URL *
              </label>
              <div className="relative">
                <input
                  id="chapter-url"
                  type="url"
                  value={chapterUrl}
                  onChange={(e) => setChapterUrl(e.target.value)}
                  className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all ${
                    urlValidation === "valid"
                      ? "border-green-300 focus:border-green-500"
                      : urlValidation === "invalid"
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-primary/50"
                  }`}
                  placeholder="https://example.com/chapter-1"
                  aria-required="true"
                  aria-describedby="url-validation"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getUrlValidationIcon()}
                </div>
              </div>
              <div id="url-validation" className="mt-1">
                {urlValidation === "valid" && (
                  <p className="text-xs text-green-600">✓ Valid URL format</p>
                )}
                {urlValidation === "invalid" && (
                  <p className="text-xs text-red-600">✗ Invalid URL format</p>
                )}
              </div>
            </div>

            {/* Source Website Autocomplete */}
            <div>
              <label
                htmlFor="source-website"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Source Website
              </label>
              <div className="relative">
                <input
                  id="source-website"
                  type="text"
                  value={sourceWebsite}
                  onChange={(e) => setSourceWebsite(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  placeholder="Enter or select website"
                  list="popular-sites"
                />
                <datalist id="popular-sites">
                  {popularSites.map((site) => (
                    <option key={site} value={site} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Language and Translation Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Language
                </label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="translation-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Translation Type
                </label>
                <select
                  id="translation-type"
                  value={translationType}
                  onChange={(e) => setTranslationType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                >
                  {translationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <motion.button
              onClick={() => addChapter(false)}
              disabled={!isValidForm() || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting && !continueAdding ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Plus size={20} />
                  </motion.div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Chapter
                </>
              )}
            </motion.button>

            <motion.button
              onClick={() => addChapter(true)}
              disabled={!isValidForm() || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting && continueAdding ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <PlusCircle size={20} />
                  </motion.div>
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle size={20} />
                  Add & Continue
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Recently Added Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
          <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-600" size={18} />
              <h4 className="font-semibold text-gray-900">Recently Added</h4>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Last 5 chapters with quick actions
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {recentChapters.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Clock size={32} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No recent chapters</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Added chapters will appear here
                  </p>
                </div>
              ) : (
                recentChapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            Ch. {chapter.number}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              translationTypes.find(
                                (t) => t.value === chapter.translationType
                              )?.color
                            } bg-gray-100`}
                          >
                            {
                              translationTypes.find(
                                (t) => t.value === chapter.translationType
                              )?.label
                            }
                          </span>
                        </div>
                        <h5 className="text-sm text-gray-700 line-clamp-2 mb-2">
                          {chapter.title}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>
                            {
                              languages.find((l) => l.code === chapter.language)
                                ?.flag
                            }
                          </span>
                          <span>
                            {chapter.addedAt.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => editRecentChapter(chapter.id)}
                          className="p-1.5 text-gray-400 hover:text-primary rounded transition-colors"
                          aria-label={`Edit chapter ${chapter.number}`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <a
                          href={chapter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors"
                          aria-label={`Open chapter ${chapter.number} in new tab`}
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => deleteRecentChapter(chapter.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                          aria-label={`Delete chapter ${chapter.number}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {recentChapters.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setRecentChapters([])}
                className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear Recent Chapters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
