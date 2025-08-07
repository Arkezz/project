import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Globe,
  ExternalLink,
  Copy,
  MessageSquare,
  Loader2,
  History,
  Lock,
  Unlock,
  Edit3,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

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
  content?: string;
  metadata?: {
    sourceWebsite?: string;
    translator?: string;
    editor?: string;
    notes?: string;
  };
}

interface ChapterEditModalProps {
  chapter: Chapter;
  onSave: (chapter: Chapter) => void;
  onClose: () => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

const translationTypes = [
  { value: "official", label: "Official Translation" },
  { value: "fan", label: "Fan Translation" },
  { value: "machine", label: "Machine Translation" },
];

const statusTypes = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
  { value: "pending", label: "Pending Review" },
];

export default function ChapterEditModal({
  chapter,
  onSave,
  onClose,
}: ChapterEditModalProps) {
  const [editedChapter, setEditedChapter] = useState<Chapter>({ ...chapter });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "metadata">(
    "basic"
  );
  const [urlValidation, setUrlValidation] = useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [collaborators, setCollaborators] = useState([
    {
      id: "user-1",
      name: "Alice Writer",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=faces",
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: "user-2",
      name: "Bob Translator",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces",
      isOnline: false,
      lastSeen: new Date(Date.now() - 5 * 60 * 1000),
    },
  ]);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(async () => {
        try {
          // Simulate auto-save
          await new Promise((resolve) => setTimeout(resolve, 500));
          setLastAutoSave(new Date());
          setHasUnsavedChanges(false);
          toast.success("Auto-saved", { duration: 2000 });
        } catch (error) {
          toast.error("Auto-save failed");
        }
      }, 3000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [hasUnsavedChanges, editedChapter]);

  // URL validation
  useEffect(() => {
    if (editedChapter.url) {
      const timeoutId = setTimeout(() => {
        try {
          new URL(editedChapter.url);
          setUrlValidation("valid");
        } catch {
          setUrlValidation("invalid");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setUrlValidation("idle");
    }
  }, [editedChapter.url]);

  // Warn before closing with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const updateField = (field: keyof Chapter, value: any) => {
    setEditedChapter((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const updateMetadata = (field: string, value: string) => {
    setEditedChapter((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [field]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!editedChapter.title.trim()) {
      toast.error("Chapter title is required");
      titleInputRef.current?.focus();
      return;
    }

    if (urlValidation === "invalid") {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsSaving(true);
    try {
      await onSave(editedChapter);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error("Failed to save chapter");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (
      hasUnsavedChanges &&
      !confirm("Are you sure you want to discard all changes?")
    ) {
      return;
    }
    setEditedChapter({ ...chapter });
    setHasUnsavedChanges(false);
    toast.success("Changes discarded");
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (
        !confirm("You have unsaved changes. Are you sure you want to close?")
      ) {
        return;
      }
    }
    onClose();
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(editedChapter.url);
    toast.success("URL copied to clipboard");
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Edit3 },
    { id: "content", label: "Content", icon: FileText },
    { id: "metadata", label: "Metadata", icon: Globe },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Edit3 className="text-blue-600" size={20} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Chapter #{editedChapter.number}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      Created{" "}
                      {formatDistanceToNow(new Date(editedChapter.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {hasUnsavedChanges ? (
                      <span className="flex items-center gap-1 text-amber-600">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        Unsaved changes
                      </span>
                    ) : lastAutoSave ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={14} />
                        Auto-saved{" "}
                        {formatDistanceToNow(lastAutoSave, { addSuffix: true })}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Collaborators */}
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <div className="flex -space-x-2">
                  {collaborators.map((user) => (
                    <div key={user.id} className="relative group">
                      <div
                        className={`w-8 h-8 rounded-full overflow-hidden ring-2 ring-white ${
                          user.isOnline ? "ring-green-400" : "ring-gray-300"
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {user.name}{" "}
                        {user.isOnline
                          ? "(online)"
                          : `(${formatDistanceToNow(user.lastSeen, { addSuffix: true })})`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleSave}
                disabled={isSaving || (!hasUnsavedChanges && !lastAutoSave)}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-white text-primary shadow-sm border border-primary/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[calc(95vh-200px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {activeTab === "basic" && (
                <div className="space-y-6">
                  {/* Chapter Number and Title */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chapter Number *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={editedChapter.number}
                        onChange={(e) =>
                          updateField("number", parseInt(e.target.value) || 1)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        aria-required="true"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chapter Title *
                      </label>
                      <input
                        ref={titleInputRef}
                        type="text"
                        value={editedChapter.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        placeholder="Enter chapter title"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chapter URL *
                    </label>
                    <div className="relative">
                      <LinkIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="url"
                        value={editedChapter.url}
                        onChange={(e) => updateField("url", e.target.value)}
                        className={`w-full pl-10 pr-20 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all ${
                          urlValidation === "valid"
                            ? "border-green-300 focus:border-green-500"
                            : urlValidation === "invalid"
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-primary/50"
                        }`}
                        placeholder="https://example.com/chapter-1"
                        aria-required="true"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {urlValidation === "valid" && (
                          <CheckCircle size={16} className="text-green-500" />
                        )}
                        {urlValidation === "invalid" && (
                          <X size={16} className="text-red-500" />
                        )}
                        <button
                          onClick={copyUrl}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Copy URL"
                        >
                          <Copy size={14} />
                        </button>
                        <a
                          href={editedChapter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          aria-label="Open URL in new tab"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Language, Translation Type, and Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={editedChapter.language}
                        onChange={(e) =>
                          updateField("language", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Translation Type
                      </label>
                      <select
                        value={editedChapter.translationType}
                        onChange={(e) =>
                          updateField("translationType", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      >
                        {translationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={editedChapter.status}
                        onChange={(e) => updateField("status", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      >
                        {statusTypes.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      Chapter Content
                    </h4>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span>{showPreview ? "Edit" : "Preview"}</span>
                    </button>
                  </div>

                  {showPreview ? (
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[400px]">
                      <div className="prose max-w-none">
                        {editedChapter.content ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: editedChapter.content,
                            }}
                          />
                        ) : (
                          <p className="text-gray-500 italic">
                            No content to preview
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <textarea
                      value={editedChapter.content || ""}
                      onChange={(e) => updateField("content", e.target.value)}
                      placeholder="Enter chapter content..."
                      className="w-full h-96 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                    />
                  )}

                  {editedChapter.content && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        {
                          editedChapter.content
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length
                        }{" "}
                        words
                      </span>
                      <span>{editedChapter.content.length} characters</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "metadata" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Source Website
                      </label>
                      <input
                        type="text"
                        value={editedChapter.metadata?.sourceWebsite || ""}
                        onChange={(e) =>
                          updateMetadata("sourceWebsite", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        placeholder="e.g., webnovel.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Translator
                      </label>
                      <input
                        type="text"
                        value={editedChapter.metadata?.translator || ""}
                        onChange={(e) =>
                          updateMetadata("translator", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        placeholder="Translator name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Editor
                      </label>
                      <input
                        type="text"
                        value={editedChapter.metadata?.editor || ""}
                        onChange={(e) =>
                          updateMetadata("editor", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        placeholder="Editor name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Word Count
                      </label>
                      <input
                        type="number"
                        value={editedChapter.wordCount || ""}
                        onChange={(e) =>
                          updateField(
                            "wordCount",
                            parseInt(e.target.value) || undefined
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                        placeholder="Estimated word count"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={editedChapter.metadata?.notes || ""}
                      onChange={(e) => updateMetadata("notes", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                      rows={4}
                      placeholder="Internal notes about this chapter..."
                    />
                  </div>

                  {/* Version Info */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Version Information
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current Version:</span>
                        <span className="ml-2 font-medium">
                          v{editedChapter.versionCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 font-medium">
                          {new Date(
                            editedChapter.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Modified:</span>
                        <span className="ml-2 font-medium">
                          {formatDistanceToNow(
                            new Date(editedChapter.updatedAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Author:</span>
                        <span className="ml-2 font-medium">
                          {editedChapter.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <History size={14} />
                <span>Version {editedChapter.versionCount}</span>
              </div>
              {editedChapter.views && (
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{editedChapter.views} views</span>
                </div>
              )}
              {editedChapter.comments && (
                <div className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  <span>{editedChapter.comments} comments</span>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500">
              Press Ctrl+S to save • Esc to close
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
