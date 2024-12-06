import React, { useState } from "react";
import { motion } from "framer-motion";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import AccountSettings from "../components/settings/sections/AccountSettings";
import SecuritySettings from "../components/settings/sections/SecuritySettings";
import ReadingPreferences from "../components/settings/sections/ReadingPreferences";
import NotificationSettings from "../components/settings/sections/NotificationSettings";
import ImportTools from "../components/settings/sections/ImportTools";
import { Toaster } from "sonner";

export type SettingsSection =
  | "account"
  | "security"
  | "reading"
  | "notifications"
  | "import";

export default function Settings() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("account");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountSettings />;
      case "security":
        return <SecuritySettings />;
      case "reading":
        return <ReadingPreferences />;
      case "notifications":
        return <NotificationSettings />;
      case "import":
        return <ImportTools />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <motion.main
            className="flex-1 bg-white rounded-2xl shadow-sm p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.main>
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--color-surface))",
            border: "1px solid hsl(var(--color-primary) / 0.1)",
            color: "hsl(var(--color-text))",
          },
          className: "settings-toast",
        }}
        closeButton
        richColors
      />
    </div>
  );
}
