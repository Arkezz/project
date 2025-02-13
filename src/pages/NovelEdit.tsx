import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Save } from "lucide-react";
import type { Novel } from "../types/novel";
import EditTabs from "../components/edit/EditTabs";
import GeneralInfoForm from "../components/edit/forms/GeneralInfoForm";
import ReleaseInfoForm from "../components/edit/forms/ReleaseInfoForm";
import RelationsForm from "../components/edit/forms/RelationsForm";
import TranslationForm from "../components/edit/forms/TranslationForm";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

const tabs = [
  { id: "general", label: "General Information" },
  { id: "release", label: "Release Information" },
  { id: "relations", label: "Relations" },
  { id: "translation", label: "Translation" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function NovelEdit() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [isSaving, setIsSaving] = useState(false);

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

  const onSubmit = async (data: NovelEditForm) => {
    try {
      setIsSaving(true);
      // Here you would typically make an API call to save the data
      console.log("Saving novel data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Novel information saved successfully");
    } catch (error) {
      toast.error("Failed to save novel information");
      console.error("Error saving novel:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // methods.handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <h1 className="text-2xl font-semibold">Edit Novel</h1>
          <button
            onClick={methods.handleSubmit(onSubmit)}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <EditTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "general" && <GeneralInfoForm />}
                {activeTab === "release" && <ReleaseInfoForm />}
                {activeTab === "relations" && <RelationsForm />}
                {activeTab === "translation" && <TranslationForm />}
              </motion.div>
            </AnimatePresence>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
