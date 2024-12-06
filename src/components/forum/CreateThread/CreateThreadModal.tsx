import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Send, AlertCircle } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import ThreadForm from "./ThreadForm";
import { useThreadDraft } from "../../../hooks/useThreadDraft";
import { toast } from "sonner";

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    tags?: string;
    content?: string;
  }>({});

  const { saveDraft, loadDraft, clearDraft } = useThreadDraft();

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setTitle(draft.title);
      setContent(draft.content);
      setSelectedTags(draft.tags);
      setSelectedNovel(draft.novel);
    }
  }, []);

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
    toast.success("Draft saved successfully");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to create the thread
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      clearDraft();
      toast.success("Thread created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create thread");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-surface rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create New Thread</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
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
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <Save size={18} />
                  <span>Save Draft</span>
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
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                    <span>
                      {isSubmitting ? "Creating..." : "Create Thread"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
