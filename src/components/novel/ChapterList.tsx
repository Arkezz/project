import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ChevronDown, Globe, Search } from "lucide-react";

interface ChapterListProps {
  novel: any; // Type properly based on your data structure
}

export default function ChapterList({ novel }: ChapterListProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Mock chapters data
  const chapters = Array.from({ length: 20 }, (_, i) => ({
    number: novel.chapters.total - i,
    title: `Chapter ${novel.chapters.total - i}`,
    releaseDate: new Date(
      Date.now() - i * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    translator: "Official",
    language: "English",
    status: i === 0 ? "New" : i < 5 ? "Read" : "Unread",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-surface rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Globe size={20} />
            {selectedLanguage}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-surface p-4 rounded-lg border border-gray-200">
              <div className="flex flex-wrap gap-2">
                {["English", "Raw", "Spanish"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedLanguage === lang
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="bg-surface p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Book size={20} className="text-gray-400" />
                <div>
                  <h3 className="font-medium">{chapter.title}</h3>
                  <p className="text-sm text-gray-500">
                    {chapter.translator} • {chapter.releaseDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm px-2 py-0.5 rounded ${
                    chapter.status === "New"
                      ? "bg-primary/10 text-primary"
                      : chapter.status === "Read"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100"
                  }`}
                >
                  {chapter.status}
                </span>
                <span className="text-sm text-gray-500">#{chapter.number}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
