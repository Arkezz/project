import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Globe,
  Plus,
  Minus,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Loader2,
  RefreshCw,
  Trash2,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface GeneratedChapter {
  id: string;
  number: number;
  title: string;
  url: string;
  status: "valid" | "invalid" | "checking";
  language: string;
  translationType: string;
}

const urlPatterns = [
  {
    value: "{base}/chapter-{number}",
    label: "Standard Pattern",
    example: "example.com/chapter-1",
  },
  {
    value: "{base}/ch{number}",
    label: "Short Format",
    example: "example.com/ch1",
  },
  {
    value: "{base}/novel/{number}",
    label: "Novel Path",
    example: "example.com/novel/1",
  },
  {
    value: "{base}/read/{number}.html",
    label: "HTML Pages",
    example: "example.com/read/1.html",
  },
  {
    value: "custom",
    label: "Custom Pattern",
    example: "Define your own pattern",
  },
];

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

const translationTypes = [
  {
    value: "official",
    label: "Official Translation",
    description: "Professionally translated and published",
    color: "text-green-600",
  },
  {
    value: "fan",
    label: "Fan Translation",
    description: "Community-driven translation",
    color: "text-blue-600",
  },
  {
    value: "machine",
    label: "Machine Translation",
    description: "AI or automated translation",
    color: "text-amber-600",
  },
];

export default function AutoGenerateTab() {
  const [baseUrl, setBaseUrl] = useState("");
  const [fromChapter, setFromChapter] = useState(1);
  const [toChapter, setToChapter] = useState(10);
  const [urlPattern, setUrlPattern] = useState(urlPatterns[0].value);
  const [customPattern, setCustomPattern] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translationType, setTranslationType] = useState("official");
  const [generatedChapters, setGeneratedChapters] = useState<
    GeneratedChapter[]
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generatePreview = () => {
    if (!baseUrl.trim()) {
      toast.error("Please enter a base URL");
      return;
    }

    if (fromChapter > toChapter) {
      toast.error("'From' chapter must be less than or equal to 'To' chapter");
      return;
    }

    if (toChapter - fromChapter > 1000) {
      toast.error("Maximum 1000 chapters can be generated at once");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const pattern = urlPattern === "custom" ? customPattern : urlPattern;
      const chapters: GeneratedChapter[] = [];

      for (let i = fromChapter; i <= toChapter; i++) {
        const url = pattern
          .replace("{base}", baseUrl.replace(/\/$/, ""))
          .replace("{number}", i.toString());

        chapters.push({
          id: `generated-${i}`,
          number: i,
          title: `Chapter ${i}`,
          url,
          status: "checking",
          language: selectedLanguage,
          translationType,
        });
      }

      setGeneratedChapters(chapters);
      setShowPreview(true);
      setIsGenerating(false);
      toast.success(`Generated ${chapters.length} chapter links`);
    }, 1000);
  };

  const validateUrls = async () => {
    if (generatedChapters.length === 0) return;

    setIsValidating(true);
    setValidationProgress(0);

    for (let i = 0; i < generatedChapters.length; i++) {
      const chapter = generatedChapters[i];

      // Simulate URL validation
      await new Promise((resolve) => setTimeout(resolve, 100));

      const isValid = isValidUrl(chapter.url) && Math.random() > 0.2;

      setGeneratedChapters((prev) =>
        prev.map((ch) =>
          ch.id === chapter.id
            ? { ...ch, status: isValid ? "valid" : ("invalid" as const) }
            : ch
        )
      );

      setValidationProgress(((i + 1) / generatedChapters.length) * 100);
    }

    setIsValidating(false);
    toast.success("URL validation completed");
  };

  const removeInvalidUrls = () => {
    const validChapters = generatedChapters.filter(
      (ch) => ch.status === "valid"
    );
    setGeneratedChapters(validChapters);
    toast.success(
      `Removed ${generatedChapters.length - validChapters.length} invalid URLs`
    );
  };

  const submitChapters = () => {
    const validChapters = generatedChapters.filter(
      (ch) => ch.status === "valid"
    );
    if (validChapters.length === 0) {
      toast.error("No valid chapters to submit");
      return;
    }

    toast.success(`Successfully added ${validChapters.length} chapters`);
    setGeneratedChapters([]);
    setShowPreview(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle size={16} className="text-green-500" />;
      case "invalid":
        return <XCircle size={16} className="text-red-500" />;
      case "checking":
        return <Loader2 size={16} className="text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8" role="tabpanel" id="panel-auto-generate">
      {/* Header Action */}
      <div className="text-center">
        <motion.button
          onClick={generatePreview}
          disabled={isGenerating}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all text-lg font-semibold disabled:opacity-50 mx-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-describedby="auto-generate-description"
        >
          {isGenerating ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              Generating Links...
            </>
          ) : (
            <>
              <Zap size={24} />
              Auto-Generate Chapter Links
            </>
          )}
        </motion.button>
        <p
          id="auto-generate-description"
          className="text-sm text-gray-600 mt-2"
        >
          Automatically create chapter links based on URL patterns
        </p>
      </div>

      {/* Configuration Form */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe size={20} className="text-primary" />
          Configuration
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Base URL */}
            <div>
              <label
                htmlFor="base-url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Base URL *
              </label>
              <input
                id="base-url"
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                placeholder="https://example.com"
                aria-required="true"
                aria-describedby="base-url-help"
              />
              <p id="base-url-help" className="text-xs text-gray-500 mt-1">
                The base website URL where chapters are hosted
              </p>
            </div>

            {/* Chapter Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="from-chapter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  From Chapter
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setFromChapter(Math.max(1, fromChapter - 1))}
                    className="p-2 border border-r-0 border-gray-200 rounded-l-lg hover:bg-gray-50 transition-colors"
                    aria-label="Decrease from chapter"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    id="from-chapter"
                    type="number"
                    min="1"
                    value={fromChapter}
                    onChange={(e) =>
                      setFromChapter(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full px-3 py-2 border-t border-b border-gray-200 text-center focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setFromChapter(fromChapter + 1)}
                    className="p-2 border border-l-0 border-gray-200 rounded-r-lg hover:bg-gray-50 transition-colors"
                    aria-label="Increase from chapter"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="to-chapter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  To Chapter
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setToChapter(Math.max(fromChapter, toChapter - 1))
                    }
                    className="p-2 border border-r-0 border-gray-200 rounded-l-lg hover:bg-gray-50 transition-colors"
                    aria-label="Decrease to chapter"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    id="to-chapter"
                    type="number"
                    min={fromChapter}
                    value={toChapter}
                    onChange={(e) =>
                      setToChapter(
                        Math.max(
                          fromChapter,
                          parseInt(e.target.value) || fromChapter
                        )
                      )
                    }
                    className="w-full px-3 py-2 border-t border-b border-gray-200 text-center focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setToChapter(toChapter + 1)}
                    className="p-2 border border-l-0 border-gray-200 rounded-r-lg hover:bg-gray-50 transition-colors"
                    aria-label="Increase to chapter"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* URL Pattern */}
            <div>
              <label
                htmlFor="url-pattern"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL Pattern
              </label>
              <select
                id="url-pattern"
                value={urlPattern}
                onChange={(e) => setUrlPattern(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                aria-describedby="url-pattern-help"
              >
                {urlPatterns.map((pattern) => (
                  <option key={pattern.value} value={pattern.value}>
                    {pattern.label} - {pattern.example}
                  </option>
                ))}
              </select>
              <p id="url-pattern-help" className="text-xs text-gray-500 mt-1">
                Choose how chapter numbers are formatted in URLs
              </p>

              {urlPattern === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <input
                    type="text"
                    value={customPattern}
                    onChange={(e) => setCustomPattern(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    placeholder="{base}/custom/{number}"
                    aria-label="Custom URL pattern"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {"{base}"} for base URL and {"{number}"} for chapter
                    number
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Language Selection */}
            <div>
              <label
                htmlFor="language-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Language
              </label>
              <select
                id="language-select"
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

            {/* Translation Type */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-3">
                Translation Type
              </legend>
              <div className="space-y-3">
                {translationTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="translation-type"
                      value={type.value}
                      checked={translationType === type.value}
                      onChange={(e) => setTranslationType(e.target.value)}
                      className="mt-1 text-primary focus:ring-primary/20"
                    />
                    <div>
                      <div className={`font-medium ${type.color}`}>
                        {type.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {type.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="text-blue-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Generated Chapters Preview
                    </h4>
                    <p className="text-sm text-gray-600">
                      {generatedChapters.length} chapters • Showing first 5
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={validateUrls}
                    disabled={isValidating}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isValidating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Validating...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Validate All
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={removeInvalidUrls}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 size={16} />
                    Remove Invalid
                  </motion.button>

                  <motion.button
                    onClick={submitChapters}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={16} />
                    Submit Chapters
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              {isValidating && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Validating URLs...</span>
                    <span>{Math.round(validationProgress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${validationProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Preview Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chapter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {generatedChapters.slice(0, 5).map((chapter, index) => (
                    <motion.tr
                      key={chapter.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{chapter.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {chapter.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{chapter.url}</span>
                          <a
                            href={chapter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                            aria-label={`Open chapter ${chapter.number} in new tab`}
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(chapter.status)}
                          <span
                            className={`text-sm font-medium ${
                              chapter.status === "valid"
                                ? "text-green-600"
                                : chapter.status === "invalid"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {chapter.status === "checking"
                              ? "Checking..."
                              : chapter.status === "valid"
                                ? "Valid"
                                : "Invalid"}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {generatedChapters.length > 5 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    ... and {generatedChapters.length - 5} more chapters
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Stats */}
      {generatedChapters.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {generatedChapters.length}
            </div>
            <div className="text-sm text-gray-600">Total Generated</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {generatedChapters.filter((ch) => ch.status === "valid").length}
            </div>
            <div className="text-sm text-gray-600">Valid URLs</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">
              {generatedChapters.filter((ch) => ch.status === "invalid").length}
            </div>
            <div className="text-sm text-gray-600">Invalid URLs</div>
          </div>
        </div>
      )}
    </div>
  );
}
