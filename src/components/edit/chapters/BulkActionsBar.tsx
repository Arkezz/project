import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Archive,
  Eye,
  EyeOff,
  Send,
  Download,
  Copy,
  MoreHorizontal,
  CheckCircle,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface BulkActionsBarProps {
  selectedCount: number;
  onAction: (action: string, chapterIds: string[]) => void;
  selectedChapterIds: string[];
  onSelectAll: () => void;
  onClearSelection: () => void;
}

const bulkActions = [
  {
    id: "publish",
    label: "Publish",
    icon: Send,
    color: "text-green-600 hover:bg-green-50",
    description: "Make chapters publicly available",
  },
  {
    id: "archive",
    label: "Archive",
    icon: Archive,
    color: "text-purple-600 hover:bg-purple-50",
    description: "Move chapters to archive",
  },
  {
    id: "hide",
    label: "Hide",
    icon: EyeOff,
    color: "text-amber-600 hover:bg-amber-50",
    description: "Hide chapters from public view",
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    color: "text-red-600 hover:bg-red-50",
    description: "Permanently delete chapters",
    requiresConfirmation: true,
  },
];

const exportActions = [
  {
    id: "download-txt",
    label: "Download as TXT",
    icon: Download,
  },
  {
    id: "download-pdf",
    label: "Download as PDF",
    icon: Download,
  },
  {
    id: "copy-urls",
    label: "Copy URLs",
    icon: Copy,
  },
];

export default function BulkActionsBar({
  selectedCount,
  onAction,
  selectedChapterIds,
  onSelectAll,
  onClearSelection,
}: BulkActionsBarProps) {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  const handleAction = async (actionId: string) => {
    const action = bulkActions.find((a) => a.id === actionId);

    if (action?.requiresConfirmation) {
      if (
        !confirm(
          `Are you sure you want to ${action.label.toLowerCase()} ${selectedCount} chapters? This action cannot be undone.`
        )
      ) {
        return;
      }
    }

    setIsProcessing(true);
    setProcessingAction(actionId);

    try {
      await onAction(actionId, selectedChapterIds);
    } catch (error) {
      toast.error(`Failed to ${action?.label.toLowerCase()} chapters`);
    } finally {
      setIsProcessing(false);
      setProcessingAction(null);
      setShowMoreActions(false);
    }
  };

  const handleExportAction = async (exportId: string) => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      switch (exportId) {
        case "download-txt":
          toast.success(`Downloaded ${selectedCount} chapters as TXT`);
          break;
        case "download-pdf":
          toast.success(`Downloaded ${selectedCount} chapters as PDF`);
          break;
        case "copy-urls":
          // Simulate copying URLs
          const urls = selectedChapterIds.map(
            (id) => `https://example.com/chapter/${id}`
          );
          navigator.clipboard.writeText(urls.join("\n"));
          toast.success(`Copied ${selectedCount} URLs to clipboard`);
          break;
      }
    } catch (error) {
      toast.error("Export failed");
    } finally {
      setIsProcessing(false);
      setShowExportMenu(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[400px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-gray-900">
                  {selectedCount} chapter{selectedCount !== 1 ? "s" : ""}{" "}
                  selected
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSelectAll}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Select All
                </button>
                <span className="text-gray-300">•</span>
                <button
                  type="button"
                  onClick={onClearSelection}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Primary Actions */}
              {bulkActions.slice(0, 2).map((action) => {
                const Icon = action.icon;
                const isProcessingThis = processingAction === action.id;

                return (
                  <motion.button
                    type="button"
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    disabled={isProcessing}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${action.color} disabled:opacity-50`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title={action.description}
                  >
                    {isProcessingThis ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Icon size={16} />
                    )}
                    <span className="hidden sm:inline">{action.label}</span>
                  </motion.button>
                );
              })}

              {/* Export Menu */}
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </motion.button>

                <AnimatePresence>
                  {showExportMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[180px]"
                    >
                      {exportActions.map((exportAction) => {
                        const Icon = exportAction.icon;
                        return (
                          <button
                            type="button"
                            key={exportAction.id}
                            onClick={() => handleExportAction(exportAction.id)}
                            disabled={isProcessing}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
                          >
                            <Icon size={16} className="text-gray-400" />
                            <span>{exportAction.label}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* More Actions */}
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => setShowMoreActions(!showMoreActions)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MoreHorizontal size={16} />
                </motion.button>

                <AnimatePresence>
                  {showMoreActions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[200px]"
                    >
                      {bulkActions.slice(2).map((action) => {
                        const Icon = action.icon;
                        const isProcessingThis = processingAction === action.id;

                        return (
                          <button
                            type="button"
                            key={action.id}
                            onClick={() => handleAction(action.id)}
                            disabled={isProcessing}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
                          >
                            {isProcessingThis ? (
                              <Loader2
                                size={16}
                                className="animate-spin text-gray-400"
                              />
                            ) : (
                              <Icon size={16} className="text-gray-400" />
                            )}
                            <div>
                              <div className="font-medium">{action.label}</div>
                              <div className="text-xs text-gray-500">
                                {action.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close Selection */}
              <button
                onClick={onClearSelection}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Clear selection"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <Loader2 size={16} className="animate-spin text-primary" />
                  <span className="text-sm text-gray-600">
                    Processing {selectedCount} chapters...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
