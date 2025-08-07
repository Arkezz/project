import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Link as LinkIcon,
  Upload,
  Edit3,
  Copy,
  Zap,
  FileText,
  Plus,
  Eye,
} from "lucide-react";
import ChapterTabs from "../chapters/ChapterTabs";
import AutoGenerateTab from "../chapters/AutoGenerateTab";
import SmartImportTab from "../chapters/SmartImportTab";
import ManualEntryTab from "../chapters/ManualEntryTab";
import BulkUploadTab from "../chapters/BulkUploadTab";
import ChapterViewTab from "../chapters/ChapterViewTab";

type TabId =
  | "view-chapters"
  | "auto-generate"
  | "smart-import"
  | "manual-entry"
  | "bulk-upload";

const tabs = [
  {
    id: "view-chapters" as TabId,
    label: "View & Edit",
    icon: Eye,
    description: "View and edit existing chapters",
  },
  {
    id: "auto-generate" as TabId,
    label: "Auto-Generate",
    icon: Zap,
    description: "Generate chapter links automatically",
  },
  {
    id: "smart-import" as TabId,
    label: "Smart Import",
    icon: Copy,
    description: "Copy-paste chapter lists",
  },
  {
    id: "manual-entry" as TabId,
    label: "Manual Entry",
    icon: Edit3,
    description: "Add chapters one by one",
  },
  {
    id: "bulk-upload" as TabId,
    label: "Bulk Upload",
    icon: Upload,
    description: "Upload from files",
  },
];

export default function ChapterManagementForm() {
  const [activeTab, setActiveTab] = useState<TabId>("view-chapters");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" size={24} />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Chapter Management
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Add and organize novel chapters using multiple import methods
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <ChapterTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-6"
            >
              {activeTab === "view-chapters" && <ChapterViewTab />}
              {activeTab === "auto-generate" && <AutoGenerateTab />}
              {activeTab === "smart-import" && <SmartImportTab />}
              {activeTab === "manual-entry" && <ManualEntryTab />}
              {activeTab === "bulk-upload" && <BulkUploadTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
