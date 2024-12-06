import React from "react";
import { motion } from "framer-motion";
import { Globe, Clock } from "lucide-react";

interface Translation {
  language: string;
  group: string;
  platform: string;
  progress: number;
  chapters: number;
  status: string;
}

interface RawChapters {
  available: number;
  lastUpdated: string;
  nextRaw: string;
  source: string;
}

interface TranslationStatusProps {
  translations: Translation[];
  rawChapters: RawChapters;
}

export default function TranslationStatus({
  translations,
  rawChapters,
}: TranslationStatusProps) {
  return (
    <motion.div
      className="bg-surface rounded-lg shadow-sm p-4"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <h3 className="font-medium mb-4">Translation Status</h3>

      <div className="space-y-4">
        <div className="p-3 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-primary" />
              <span>Raw ({rawChapters.source})</span>
            </div>
            <span className="font-medium">
              {rawChapters.available} chapters
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={14} />
            <span>
              Next chapter on{" "}
              {new Date(rawChapters.nextRaw).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {translations.map((translation, index) => (
            <motion.div
              key={translation.language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{translation.language}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    translation.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100"
                  }`}
                >
                  {translation.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{translation.group}</span>
                  <span>{translation.chapters} chapters</span>
                </div>

                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${translation.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{translation.platform}</span>
                  <span>{translation.progress}% translated</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
