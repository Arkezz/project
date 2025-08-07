import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Save, ArrowLeft, Eye, RotateCcw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Novel } from "../types/novel";
import EditTabs from "../components/edit/EditTabs";
import GeneralInfoForm from "../components/edit/forms/GeneralInfoForm";
import ReleaseInfoForm from "../components/edit/forms/ReleaseInfoForm";
import RelationsForm from "../components/edit/forms/RelationsForm";
import TranslationForm from "../components/edit/forms/TranslationForm";
import ChapterManagementForm from "../components/edit/forms/ChapterManagementForm";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

const tabs = [
  { id: "general", label: "General Information" },
  { id: "release", label: "Release Information" },
  { id: "relations", label: "Relations" },
  { id: "translation", label: "Translation" },
  { id: "chapters", label: "Chapters" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function NovelEdit() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const methods = useForm<NovelEditForm>({
    defaultValues: {
      title: "",
      originalTitle: "",
      type: "Web Novel",
      status: "Ongoing",
      cover: "",
      synopsis: "",
      contentWarnings: [],
      genres: [],
      creators: [],
      publishers: [],
      releaseSchedule: {
        frequency: "Weekly",
      },
      translation: {
        status: "Ongoing",
        language: "English",
        progress: 0,
        lastUpdate: new Date().toISOString(),
      },
      details: {
        chapters: 0,
        language: "",
        origin: "",
        startDate: new Date().toISOString(),
      },
      characters: [],
      recommendations: [],
    },
  });

  // Auto-save functionality
  useEffect(() => {
    const subscription = methods.watch(() => {
      setHasUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  // Auto-save every 30 seconds if there are unsaved changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges]);

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;

    try {
      const data = methods.getValues();
      // Simulate auto-save API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      toast.success("Auto-saved", { duration: 2000 });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  const onSubmit = async (data: NovelEditForm) => {
    try {
      setIsSaving(true);
      console.log("Saving novel data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      toast.success("Novel information saved successfully", {
        icon: <CheckCircle size={16} />,
        duration: 4000,
      });
    } catch (error) {
      toast.error("Failed to save novel information");
      console.error("Error saving novel:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    const data = methods.getValues();
    console.log("Preview data:", data);
    toast.info("Preview functionality would open here");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all changes? This action cannot be undone."
      )
    ) {
      methods.reset();
      setHasUnsavedChanges(false);
      toast.success("Form reset successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link
                to="/novel/1"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Edit Novel
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  {hasUnsavedChanges ? (
                    <span className="flex items-center gap-1 text-sm text-amber-600">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                      Unsaved changes
                    </span>
                  ) : lastSaved ? (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle size={14} />
                      Last saved {lastSaved.toLocaleTimeString()}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                Reset
              </motion.button>

              <motion.button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye size={16} />
                Preview
              </motion.button>

              <motion.button
                onClick={methods.handleSubmit(onSubmit)}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form className="pb-12">
          <EditTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {activeTab === "general" && <GeneralInfoForm />}
                {activeTab === "release" && <ReleaseInfoForm />}
                {activeTab === "relations" && <RelationsForm />}
                {activeTab === "translation" && <TranslationForm />}
                {activeTab === "chapters" && <ChapterManagementForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </form>
      </FormProvider>

      {/* Floating Save Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <motion.button
          onClick={methods.handleSubmit(onSubmit)}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
        </motion.button>
      </div>
    </div>
  );
}
