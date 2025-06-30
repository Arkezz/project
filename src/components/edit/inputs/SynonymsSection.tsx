import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Hash, Tag } from "lucide-react";
import type { Novel } from "../../../types/novel";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

export default function SynonymsSection() {
  const { watch, setValue } = useFormContext<NovelEditForm>();
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [newSynonym, setNewSynonym] = useState("");

  const addSynonym = () => {
    if (newSynonym.trim() && !synonyms.includes(newSynonym.trim())) {
      setSynonyms([...synonyms, newSynonym.trim()]);
      setNewSynonym("");
    }
  };

  const removeSynonym = (index: number) => {
    setSynonyms(synonyms.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSynonym();
    }
  };

  const popularSynonyms = [
    "TBATE",
    "ORV",
    "SL",
    "Novel",
    "Manhwa",
    "Webtoon",
    "Light Novel",
    "Web Novel",
    "Korean Novel",
    "Chinese Novel",
  ];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="text-primary" size={20} />
          <h4 className="font-medium text-gray-900">Synonyms & Search Tags</h4>
        </div>

        <p className="text-sm text-gray-600">
          Add alternative names, abbreviations, and search terms that readers
          might use to find this novel
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSynonym}
            onChange={(e) => setNewSynonym(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            placeholder="Enter synonym or tag..."
          />
          <motion.button
            type="button"
            onClick={addSynonym}
            disabled={!newSynonym.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>

      {/* Current Synonyms */}
      {synonyms.length > 0 && (
        <div className="space-y-3">
          <h5 className="font-medium text-gray-700">Current Synonyms</h5>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {synonyms.map((synonym, index) => (
                <motion.span
                  key={synonym}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  <Hash size={12} />
                  {synonym}
                  <button
                    type="button"
                    onClick={() => removeSynonym(index)}
                    className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
                  >
                    <X size={12} />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Popular Suggestions */}
      <div className="space-y-3">
        <h5 className="font-medium text-gray-700">Popular Tags</h5>
        <p className="text-sm text-gray-500">
          Click to add common search terms
        </p>
        <div className="flex flex-wrap gap-2">
          {popularSynonyms
            .filter((tag) => !synonyms.includes(tag))
            .map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={() => {
                  setSynonyms([...synonyms, tag]);
                }}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + {tag}
              </motion.button>
            ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h6 className="font-medium text-blue-900 mb-2">
          💡 Tips for better discoverability
        </h6>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • Include common abbreviations (e.g., "TBATE" for "The Beginning
            After The End")
          </li>
          <li>• Add genre-specific terms readers might search for</li>
          <li>• Include alternative romanizations for non-English titles</li>
          <li>
            • Consider platform-specific names (e.g., "Webtoon", "Manhwa")
          </li>
        </ul>
      </div>
    </div>
  );
}
