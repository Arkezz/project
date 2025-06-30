import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Globe, Flag } from "lucide-react";
import type { Novel } from "../../../types/novel";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

interface AlternativeTitle {
  id: string;
  title: string;
  language: string;
  region: string;
  type: "official" | "unofficial" | "fan_translation";
}

const languages = [
  { code: "en", name: "English" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

const titleTypes = [
  {
    value: "official",
    label: "Official",
    color: "bg-green-100 text-green-700",
  },
  {
    value: "unofficial",
    label: "Unofficial",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    value: "fan_translation",
    label: "Fan Translation",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function AlternativeTitlesSection() {
  const { watch, setValue } = useFormContext<NovelEditForm>();
  const [alternativeTitles, setAlternativeTitles] = useState<
    AlternativeTitle[]
  >([]);

  const addAlternativeTitle = () => {
    const newTitle: AlternativeTitle = {
      id: Date.now().toString(),
      title: "",
      language: "en",
      region: "",
      type: "official",
    };
    setAlternativeTitles([...alternativeTitles, newTitle]);
  };

  const updateAlternativeTitle = (
    id: string,
    field: keyof AlternativeTitle,
    value: string
  ) => {
    setAlternativeTitles((titles) =>
      titles.map((title) =>
        title.id === id ? { ...title, [field]: value } : title
      )
    );
  };

  const removeAlternativeTitle = (id: string) => {
    setAlternativeTitles((titles) => titles.filter((title) => title.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Add titles in different languages or regions to help readers find your
          novel
        </p>
        <motion.button
          type="button"
          onClick={addAlternativeTitle}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} />
          Add Title
        </motion.button>
      </div>

      <AnimatePresence>
        {alternativeTitles.map((altTitle, index) => (
          <motion.div
            key={altTitle.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">
                Alternative Title #{index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeAlternativeTitle(altTitle.id)}
                className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={altTitle.title}
                  onChange={(e) =>
                    updateAlternativeTitle(altTitle.id, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  placeholder="Enter alternative title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region/Country
                </label>
                <input
                  type="text"
                  value={altTitle.region}
                  onChange={(e) =>
                    updateAlternativeTitle(
                      altTitle.id,
                      "region",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  placeholder="e.g., Japan, Korea, China"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe size={14} className="inline mr-1" />
                  Language
                </label>
                <select
                  value={altTitle.language}
                  onChange={(e) =>
                    updateAlternativeTitle(
                      altTitle.id,
                      "language",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flag size={14} className="inline mr-1" />
                  Type
                </label>
                <select
                  value={altTitle.type}
                  onChange={(e) =>
                    updateAlternativeTitle(
                      altTitle.id,
                      "type",
                      e.target.value as AlternativeTitle["type"]
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                >
                  {titleTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Preview:</span>
                <span className="font-medium">
                  {altTitle.title || "Untitled"}
                </span>
                {altTitle.language && (
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                    {languages.find((l) => l.code === altTitle.language)?.name}
                  </span>
                )}
                {altTitle.type && (
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      titleTypes.find((t) => t.value === altTitle.type)?.color
                    }`}
                  >
                    {titleTypes.find((t) => t.value === altTitle.type)?.label}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {alternativeTitles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Globe size={32} className="mx-auto mb-3 text-gray-300" />
          <p>No alternative titles added yet</p>
          <p className="text-sm">
            Click "Add Title" to include translations or regional variations
          </p>
        </div>
      )}
    </div>
  );
}
