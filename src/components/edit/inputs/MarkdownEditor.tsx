import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Eye,
  EyeOff,
  Save,
  Type,
  Hash,
  Image,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react";
import type { Novel } from "../../../types/novel";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

interface ToolbarButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  variant?: "primary" | "secondary";
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  isActive,
  variant = "secondary",
}: ToolbarButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative p-2.5 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25"
          : variant === "primary"
            ? "bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 text-primary border border-primary/20"
            : "hover:bg-gray-100 text-gray-600 hover:text-gray-800 border border-transparent hover:border-gray-200"
      }`}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      title={label}
    >
      <Icon size={16} />
      {isActive && (
        <motion.div
          layoutId="activeToolbarButton"
          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 rounded-xl -z-10"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

export default function MarkdownEditor() {
  const { watch, setValue } = useFormContext<NovelEditForm>();
  const synopsis = watch("synopsis");
  const [showPreview, setShowPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(
    null
  );
  const [wordCount, setWordCount] = useState(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Auto-save functionality
  useEffect(() => {
    if (synopsis && hasUnsavedChanges) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [synopsis, hasUnsavedChanges]);

  useEffect(() => {
    setHasUnsavedChanges(true);
    setWordCount(
      synopsis
        ? synopsis
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length
        : 0
    );
  }, [synopsis]);

  const insertMarkdown = (
    before: string,
    after: string = "",
    buttonId?: string
  ) => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = synopsis.substring(start, end);
    const newText =
      synopsis.substring(0, start) +
      before +
      selectedText +
      after +
      synopsis.substring(end);

    setValue("synopsis", newText);

    // Visual feedback
    if (buttonId) {
      setActiveButton(buttonId);
      setTimeout(() => setActiveButton(null), 200);
    }

    // Restore cursor position
    setTimeout(() => {
      textareaRef.focus();
      textareaRef.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarSections = [
    {
      title: "Text Formatting",
      actions: [
        {
          id: "bold",
          icon: Bold,
          label: "Bold (Ctrl+B)",
          action: () => insertMarkdown("**", "**", "bold"),
        },
        {
          id: "italic",
          icon: Italic,
          label: "Italic (Ctrl+I)",
          action: () => insertMarkdown("*", "*", "italic"),
        },
        {
          id: "code",
          icon: Code,
          label: "Inline Code",
          action: () => insertMarkdown("`", "`", "code"),
        },
      ],
    },
    {
      title: "Structure",
      actions: [
        {
          id: "heading",
          icon: Hash,
          label: "Heading",
          action: () => insertMarkdown("## ", "", "heading"),
        },
        {
          id: "quote",
          icon: Quote,
          label: "Quote",
          action: () => insertMarkdown("> ", "", "quote"),
        },
        {
          id: "list",
          icon: List,
          label: "Bullet List",
          action: () => insertMarkdown("- ", "", "list"),
        },
        {
          id: "ordered",
          icon: ListOrdered,
          label: "Numbered List",
          action: () => insertMarkdown("1. ", "", "ordered"),
        },
      ],
    },
    {
      title: "Media",
      actions: [
        {
          id: "link",
          icon: Link,
          label: "Link",
          action: () => insertMarkdown("[", "](url)", "link"),
        },
        {
          id: "image",
          icon: Image,
          label: "Image",
          action: () => insertMarkdown("![alt text](", ")", "image"),
        },
      ],
    },
  ];

  const renderPreview = (text: string) => {
    if (!text) return "";

    return text
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1>'
      )
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-900">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono text-sm">$1</code>'
      )
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-primary/30 pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-gray-700">$1</blockquote>'
      )
      .replace(/^- (.*$)/gim, '<li class="ml-4 text-gray-700">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 text-gray-700">$2</li>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-primary hover:text-primary/80 underline">$1</a>'
      )
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />'
      )
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/\n/g, "<br>");
  };

  return (
    <div
      className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-white p-6" : ""}`}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
            <Type className="text-primary" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Synopsis Editor</h4>
            <p className="text-sm text-gray-600">
              Write your novel's description with Markdown support
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </motion.button>
        </div>
      </div>

      {/* Enhanced Floating Toolbar */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-lg shadow-gray-200/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            {toolbarSections.map((section, sectionIndex) => (
              <div key={section.title} className="flex items-center gap-1">
                {sectionIndex > 0 && (
                  <div className="w-px h-6 bg-gray-200 mx-2" />
                )}
                {section.actions.map((action) => (
                  <ToolbarButton
                    key={action.id}
                    icon={action.icon}
                    label={action.label}
                    onClick={action.action}
                    isActive={activeButton === action.id}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{wordCount} words</span>
              <span>{synopsis?.length || 0} characters</span>
            </div>

            {/* Auto-save indicator */}
            <AnimatePresence>
              {hasUnsavedChanges ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Saving...</span>
                </motion.div>
              ) : lastSaved ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-700"
                >
                  <Save size={14} />
                  <span className="text-sm font-medium">
                    Saved {lastSaved.toLocaleTimeString()}
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Preview toggle */}
            <ToolbarButton
              icon={showPreview ? EyeOff : Eye}
              label={showPreview ? "Edit Mode" : "Preview Mode"}
              onClick={() => setShowPreview(!showPreview)}
              isActive={showPreview}
              variant="primary"
            />
          </div>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div
        className={`grid gap-6 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
      >
        {/* Editor */}
        <AnimatePresence>
          {!showPreview && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-1"
            >
              <div className="relative group">
                <textarea
                  ref={setTextareaRef}
                  value={synopsis}
                  onChange={(e) => setValue("synopsis", e.target.value)}
                  placeholder="Start writing your novel synopsis here...

You can use Markdown formatting:
- **Bold text** for emphasis
- *Italic text* for style
- ## Headings for structure
- > Quotes for highlights
- `Code` for technical terms

Let your creativity flow and describe what makes your story unique!"
                  className={`w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all resize-none font-mono text-sm leading-relaxed placeholder:text-gray-400 placeholder:font-sans ${
                    isFullscreen ? "h-[calc(100vh-300px)]" : "h-96"
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f8fafc 100%)",
                    backgroundAttachment: "local",
                  }}
                />

                {/* Floating character count */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-xs text-gray-500 shadow-sm">
                    {synopsis?.length || 0} / 2000 characters
                  </div>
                  {synopsis && synopsis.length > 1500 && (
                    <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      Recommended length reached
                    </div>
                  )}
                </div>

                {/* Focus indicator */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/20" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-1"
            >
              <div
                className={`border-2 border-gray-200 rounded-2xl overflow-hidden ${
                  isFullscreen ? "h-[calc(100vh-300px)]" : "h-96"
                }`}
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-primary" size={16} />
                    <span className="font-medium text-gray-700">
                      Live Preview
                    </span>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto h-full bg-gradient-to-b from-white to-gray-50/50">
                  <div className="prose prose-sm max-w-none">
                    {synopsis ? (
                      <div
                        className="leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: `<p class="mb-4 text-gray-700 leading-relaxed">${renderPreview(synopsis)}</p>`,
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
                          <Type className="text-primary" size={24} />
                        </div>
                        <p className="text-gray-400 italic text-lg mb-2">
                          Start writing to see the preview...
                        </p>
                        <p className="text-gray-300 text-sm">
                          Your formatted synopsis will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Markdown Guide */}
      <motion.details
        className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <summary className="cursor-pointer p-4 hover:bg-blue-100/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Hash className="text-blue-600" size={16} />
              </div>
              <span className="font-medium text-blue-900">
                Markdown Quick Reference
              </span>
            </div>
            <motion.div
              className="transform transition-transform group-open:rotate-180"
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>
        </summary>

        <div className="px-4 pb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                <Bold size={16} />
                Text Formatting
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                    **bold**
                  </code>
                  <span className="text-blue-700">→</span>
                  <strong className="text-blue-900">bold</strong>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                    *italic*
                  </code>
                  <span className="text-blue-700">→</span>
                  <em className="text-blue-900">italic</em>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                    `code`
                  </code>
                  <span className="text-blue-700">→</span>
                  <code className="bg-primary/10 text-primary px-1 rounded">
                    code
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                <Hash size={16} />
                Structure
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block mb-1">
                    # Heading 1
                  </code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block mb-1">
                    ## Heading 2
                  </code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block">
                    ### Heading 3
                  </code>
                </div>
                <div>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block">
                    {" "}
                    Quote text
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                <List size={16} />
                Lists & Links
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block mb-1">
                    - List item
                  </code>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block">
                    1. Numbered item
                  </code>
                </div>
                <div>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 block">
                    [Link text](URL)
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-blue-200">
            <div className="flex items-start gap-3 p-3 bg-blue-100/50 rounded-lg">
              <Sparkles className="text-blue-600 mt-0.5" size={16} />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">
                  💡 Pro Tips for Great Synopses
                </p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Start with a compelling hook that grabs attention</li>
                  <li>• Introduce your main character and their goal</li>
                  <li>• Mention the central conflict or challenge</li>
                  <li>
                    • Keep it concise but intriguing (aim for 150-300 words)
                  </li>
                  <li>
                    • End with a question or cliffhanger to entice readers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.details>
    </div>
  );
}
