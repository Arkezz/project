import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Plus, X, Globe, ChevronDown, ChevronUp } from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";
import GenreSelect from "../inputs/GenreSelect";
import ContentWarningSelect from "../inputs/ContentWarningSelect";
import MarkdownEditor from "../inputs/MarkdownEditor";
import AlternativeTitlesSection from "../inputs/AlternativeTitlesSection";
import SynonymsSection from "../inputs/SynonymsSection";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ElementType;
}

function FormSection({
  title,
  description,
  children,
  defaultExpanded = true,
  icon: Icon,
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-primary" size={20} />}
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GeneralInfoForm() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<NovelEditForm>();

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setCoverPreview(URL.createObjectURL(file));
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <FormSection
        title="Basic Information"
        description="Essential details about your novel"
        icon={Globe}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              label="English Title"
              error={errors.title?.message}
              required
            >
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="form-input"
                placeholder="Enter English title"
              />
            </FormField>

            <FormField
              label="Original Title"
              error={errors.originalTitle?.message}
            >
              <input
                type="text"
                {...register("originalTitle")}
                className="form-input"
                placeholder="Enter original title"
              />
            </FormField>

            <FormField label="Romanized Title">
              <input
                type="text"
                {...register("romanizedTitle")}
                className="form-input"
                placeholder="Enter romanized title (if applicable)"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Type" required>
                <select {...register("type")} className="form-select">
                  <option value="Web Novel">Web Novel</option>
                  <option value="Light Novel">Light Novel</option>
                  <option value="Published Novel">Published Novel</option>
                </select>
              </FormField>

              <FormField label="Status" required>
                <select {...register("status")} className="form-select">
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Hiatus">Hiatus</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </FormField>
            </div>
          </div>

          {/* Cover Upload */}
          <div className="space-y-4">
            <FormField label="Cover Image">
              <div className="relative">
                <div className="w-full h-80 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary/50 transition-colors overflow-hidden">
                  {coverPreview ? (
                    <div className="relative h-full">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverPreview(null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 text-center">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG or WEBP (max. 5MB)
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleCoverUpload}
                      />
                    </label>
                  )}
                </div>

                {/* Upload Progress */}
                <AnimatePresence>
                  {isUploading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-xl"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                        <p className="text-sm font-medium">
                          Uploading... {uploadProgress}%
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FormField>
          </div>
        </div>
      </FormSection>

      {/* Alternative Titles */}
      <FormSection
        title="Alternative Titles"
        description="Add alternative titles, translations, and regional variations"
        defaultExpanded={false}
      >
        <AlternativeTitlesSection />
      </FormSection>

      {/* Synonyms */}
      <FormSection
        title="Synonyms & Tags"
        description="Common alternative names and search tags"
        defaultExpanded={false}
      >
        <SynonymsSection />
      </FormSection>

      {/* Content Classification */}
      <FormSection
        title="Content Classification"
        description="Genres, themes, and content warnings"
      >
        <div className="space-y-6">
          <FormField label="Genres & Tags">
            <GenreSelect />
          </FormField>

          <FormField label="Content Warnings">
            <ContentWarningSelect />
          </FormField>
        </div>
      </FormSection>

      {/* Synopsis */}
      <FormSection
        title="Synopsis"
        description="Detailed description of your novel with Markdown support"
      >
        <MarkdownEditor />
      </FormSection>
    </div>
  );
}
