import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit2,
  ArrowUpDown,
  Check,
  X,
  Loader2,
  FileText,
  Merge,
} from "lucide-react";
import { toast } from "sonner";

interface ParsedChapter {
  id: string;
  number: number;
  title: string;
  url: string;
  status: "valid" | "invalid" | "duplicate" | "pending";
  isSelected: boolean;
  isEditing: boolean;
  duplicateOf?: string;
}

const exampleText = `Chapter 1: The Beginning - https://example.com/chapter-1
Chapter 2: First Steps - https://example.com/chapter-2
Chapter 3: New Discoveries - https://example.com/chapter-3

Or try these formats:
1. Chapter Title | URL
Ch.1 - Title (URL)
[1] Title: URL`;

export default function SmartImportTab() {
  const [inputText, setInputText] = useState("");
  const [parsedChapters, setParsedChapters] = useState<ParsedChapter[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [sortField, setSortField] = useState<"number" | "title" | "status">(
    "number"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectAll, setSelectAll] = useState(false);
  const [showDuplicates, setShowDuplicates] = useState(true);

  const parseText = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter chapter information to parse");
      return;
    }

    setIsParsing(true);

    // Simulate parsing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lines = inputText.split("\n").filter((line) => line.trim());
    const chapters: ParsedChapter[] = [];

    lines.forEach((line, index) => {
      // Multiple parsing patterns
      const patterns = [
        /Chapter\s+(\d+):\s*(.+?)\s*-\s*(https?:\/\/\S+)/i,
        /(\d+)\.\s*(.+?)\s*\|\s*(https?:\/\/\S+)/i,
        /Ch\.(\d+)\s*-\s*(.+?)\s*\((https?:\/\/\S+)\)/i,
        /\[(\d+)\]\s*(.+?):\s*(https?:\/\/\S+)/i,
      ];

      for (const pattern of patterns) {
        const match = line.match(pattern);
        if (match) {
          const [, numberStr, title, url] = match;
          const number = parseInt(numberStr);

          // Check for duplicates
          const isDuplicate = chapters.some((ch) => ch.number === number);

          chapters.push({
            id: `parsed-${index}`,
            number,
            title: title.trim(),
            url: url.trim(),
            status: isDuplicate
              ? "duplicate"
              : isValidUrl(url)
                ? "valid"
                : "invalid",
            isSelected: !isDuplicate,
            isEditing: false,
            duplicateOf: isDuplicate
              ? chapters.find((ch) => ch.number === number)?.id
              : undefined,
          });
          break;
        }
      }
    });

    setParsedChapters(chapters);
    setIsParsing(false);

    if (chapters.length === 0) {
      toast.error("No valid chapter patterns found. Please check the format.");
    } else {
      toast.success(`Parsed ${chapters.length} chapters successfully`);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const toggleChapterSelection = (id: string) => {
    setParsedChapters((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, isSelected: !ch.isSelected } : ch
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setParsedChapters((prev) =>
      prev.map((ch) => ({
        ...ch,
        isSelected: newSelectAll && ch.status !== "duplicate",
      }))
    );
  };

  const startEditing = (id: string) => {
    setParsedChapters((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, isEditing: true } : { ...ch, isEditing: false }
      )
    );
  };

  const saveEdit = (
    id: string,
    field: keyof ParsedChapter,
    value: string | number
  ) => {
    setParsedChapters((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? {
              ...ch,
              [field]: value,
              isEditing: false,
              status:
                field === "url"
                  ? isValidUrl(value as string)
                    ? "valid"
                    : "invalid"
                  : ch.status,
            }
          : ch
      )
    );
  };

  const cancelEdit = (id: string) => {
    setParsedChapters((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, isEditing: false } : ch))
    );
  };

  const sortChapters = (field: typeof sortField) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    setParsedChapters((prev) =>
      [...prev].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        if (typeof aVal === "string") aVal = aVal.toLowerCase();
        if (typeof bVal === "string") bVal = bVal.toLowerCase();

        if (direction === "asc") {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      })
    );
  };

  const importSelectedChapters = () => {
    const selectedChapters = parsedChapters.filter(
      (ch) => ch.isSelected && ch.status === "valid"
    );

    if (selectedChapters.length === 0) {
      toast.error("No valid chapters selected for import");
      return;
    }

    toast.success(`Successfully imported ${selectedChapters.length} chapters`);
    setParsedChapters([]);
    setInputText("");
  };

  const selectedCount = parsedChapters.filter((ch) => ch.isSelected).length;
  const validCount = parsedChapters.filter(
    (ch) => ch.status === "valid"
  ).length;
  const duplicateCount = parsedChapters.filter(
    (ch) => ch.status === "duplicate"
  ).length;

  return (
    <div className="space-y-6" role="tabpanel" id="panel-smart-import">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Copy className="text-primary" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">
              Smart Copy-Paste Import
            </h4>
            <p className="text-sm text-gray-600">
              Paste chapter lists in various formats for automatic parsing
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="chapter-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chapter Information
            </label>
            <textarea
              id="chapter-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={exampleText}
              className="w-full h-48 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none font-mono text-sm"
              aria-describedby="input-help"
            />
            <p id="input-help" className="text-xs text-gray-500 mt-2">
              Supports multiple formats. Each line should contain chapter
              number, title, and URL.
            </p>
          </div>

          <motion.button
            onClick={parseText}
            disabled={isParsing || !inputText.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isParsing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Parsing & Analyzing...
              </>
            ) : (
              <>
                <Search size={20} />
                Parse & Analyze
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Results Preview */}
      <AnimatePresence>
        {parsedChapters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Results Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Parsing Results
                    </h4>
                    <p className="text-sm text-gray-600">
                      {parsedChapters.length} chapters found • {validCount}{" "}
                      valid • {duplicateCount} duplicates
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {duplicateCount > 0 && (
                    <button
                      onClick={() => setShowDuplicates(!showDuplicates)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                    >
                      <Merge size={14} />
                      {showDuplicates ? "Hide" : "Show"} Duplicates
                    </button>
                  )}

                  <motion.button
                    onClick={importSelectedChapters}
                    disabled={selectedCount === 0}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Check size={16} />
                    Import Selected ({selectedCount})
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Table Controls */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Select All Valid
                  </span>
                </label>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Sort by:</span>
                  <button
                    onClick={() => sortChapters("number")}
                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                  >
                    Chapter
                    <ArrowUpDown size={14} />
                  </button>
                  <button
                    onClick={() => sortChapters("title")}
                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                  >
                    Title
                    <ArrowUpDown size={14} />
                  </button>
                  <button
                    onClick={() => sortChapters("status")}
                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                  >
                    Status
                    <ArrowUpDown size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chapter #
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parsedChapters
                    .filter((ch) => showDuplicates || ch.status !== "duplicate")
                    .map((chapter, index) => (
                      <motion.tr
                        key={chapter.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className={`hover:bg-gray-50 transition-colors ${
                          chapter.status === "duplicate" ? "bg-amber-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={chapter.isSelected}
                            onChange={() => toggleChapterSelection(chapter.id)}
                            disabled={
                              chapter.status === "duplicate" ||
                              chapter.status === "invalid"
                            }
                            className="rounded border-gray-300 text-primary focus:ring-primary/20"
                            aria-label={`Select chapter ${chapter.number}`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {chapter.isEditing ? (
                            <input
                              type="number"
                              defaultValue={chapter.number}
                              onBlur={(e) =>
                                saveEdit(
                                  chapter.id,
                                  "number",
                                  parseInt(e.target.value)
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveEdit(
                                    chapter.id,
                                    "number",
                                    parseInt(e.currentTarget.value)
                                  );
                                } else if (e.key === "Escape") {
                                  cancelEdit(chapter.id);
                                }
                              }}
                              className="w-20 px-2 py-1 border border-gray-200 rounded text-sm"
                              autoFocus
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              #{chapter.number}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {chapter.isEditing ? (
                            <input
                              type="text"
                              defaultValue={chapter.title}
                              onBlur={(e) =>
                                saveEdit(chapter.id, "title", e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveEdit(
                                    chapter.id,
                                    "title",
                                    e.currentTarget.value
                                  );
                                } else if (e.key === "Escape") {
                                  cancelEdit(chapter.id);
                                }
                              }}
                              className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-600 line-clamp-1">
                              {chapter.title}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          {chapter.isEditing ? (
                            <input
                              type="url"
                              defaultValue={chapter.url}
                              onBlur={(e) =>
                                saveEdit(chapter.id, "url", e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveEdit(
                                    chapter.id,
                                    "url",
                                    e.currentTarget.value
                                  );
                                } else if (e.key === "Escape") {
                                  cancelEdit(chapter.id);
                                }
                              }}
                              className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-600 truncate block">
                              {chapter.url}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {chapter.status === "valid" && (
                              <>
                                <CheckCircle
                                  size={16}
                                  className="text-green-500"
                                />
                                <span className="text-sm font-medium text-green-600">
                                  Valid
                                </span>
                              </>
                            )}
                            {chapter.status === "invalid" && (
                              <>
                                <XCircle size={16} className="text-red-500" />
                                <span className="text-sm font-medium text-red-600">
                                  Invalid
                                </span>
                              </>
                            )}
                            {chapter.status === "duplicate" && (
                              <>
                                <AlertTriangle
                                  size={16}
                                  className="text-amber-500"
                                />
                                <span className="text-sm font-medium text-amber-600">
                                  Duplicate
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {chapter.isEditing ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  saveEdit(chapter.id, "title", chapter.title)
                                }
                                className="p-1 text-green-600 hover:text-green-700 transition-colors"
                                aria-label="Save changes"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => cancelEdit(chapter.id)}
                                className="p-1 text-red-600 hover:text-red-700 transition-colors"
                                aria-label="Cancel editing"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditing(chapter.id)}
                              className="p-1 text-gray-400 hover:text-primary transition-colors"
                              aria-label={`Edit chapter ${chapter.number}`}
                            >
                              <Edit2 size={14} />
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {parsedChapters.length}
                  </div>
                  <div className="text-xs text-gray-600">Total Parsed</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">
                    {validCount}
                  </div>
                  <div className="text-xs text-gray-600">Valid</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-amber-600">
                    {duplicateCount}
                  </div>
                  <div className="text-xs text-gray-600">Duplicates</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-primary">
                    {selectedCount}
                  </div>
                  <div className="text-xs text-gray-600">Selected</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
