import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, Save, Send, AlertCircle } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import ThreadForm from "./ThreadForm";
import { useThreadDraft } from "../../../hooks/useThreadDraft";
import { toast } from "sonner";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

interface Novel {
  id: string;
  title: string;
  originalTitle: string;
  language: string;
  chapters: number;
}

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateThreadModal({
  isOpen,
  onClose,
}: CreateThreadModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [errors, setErrors] = useState<{
    title?: string;
    tags?: string;
    content?: string;
  }>({});

  const { saveDraft, loadDraft, clearDraft } = useThreadDraft();

  useEffect(() => {
    if (isOpen) {
      const draft = loadDraft();
      if (draft) {
        setTitle(draft.title);
        setContent(draft.content);
        setSelectedTags(draft.tags);
        setSelectedNovel(draft.novel);
      }
      // Prevent body scroll on mobile
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 10) {
      newErrors.title = "Title must be at least 10 characters long";
    }

    if (selectedTags.length === 0) {
      newErrors.tags = "Please select at least one tag";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.length < 50) {
      newErrors.content = "Content must be at least 50 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    saveDraft({
      title,
      content,
      tags: selectedTags,
      novel: selectedNovel,
    });
    navigator.vibrate?.(50); // Haptic feedback
    toast.success("Draft saved successfully");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    navigator.vibrate?.(100); // Haptic feedback

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearDraft();
      toast.success("Thread created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create thread");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragStart = (e: PointerEvent) => {
    if (!isMobile) return;
    setDragStartY(e.clientY);
  };

  const handleDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!isMobile) return;
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const modalContent = (
    <div className="relative bg-surface w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-t-xl md:rounded-xl shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4 md:px-6 border-b border-gray-200 bg-surface flex items-center justify-between">
        <h2 className="text-xl font-semibold">Create New Thread</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
        <ThreadForm
          title={title}
          onTitleChange={setTitle}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          selectedNovel={selectedNovel}
          onNovelSelect={setSelectedNovel}
          errors={errors}
        />

        <div className="mt-6">
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="Write your thread content here..."
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.content}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 px-4 py-4 md:px-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <button
          onClick={handleSaveDraft}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors"
        >
          <Save size={18} />
          <span className="hidden sm:inline">Save Draft</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 min-w-[120px] justify-center"
          >
            <Send size={18} />
            <span>{isSubmitting ? "Creating..." : "Create"}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Mobile bottom sheet */}
            {isMobile ? (
              <motion.div
                className="fixed inset-x-0 bottom-0 z-50"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDragEnd={handleDrag}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />
                {modalContent}
              </motion.div>
            ) : (
              // Desktop centered modal
              <motion.div
                className="inline-block w-full max-w-4xl my-8 p-4 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {modalContent}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
