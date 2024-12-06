import React from "react";
import { motion } from "framer-motion";
import { User, Shield, BookOpen, Bell, Download, Menu, X } from "lucide-react";
import type { SettingsSection } from "../../pages/Settings";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const sections = [
  { id: "account" as const, label: "Account", icon: User },
  { id: "security" as const, label: "Security", icon: Shield },
  { id: "reading" as const, label: "Reading Preferences", icon: BookOpen },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "import" as const, label: "Import Tools", icon: Download },
];

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onToggle,
}: SettingsSidebarProps) {
  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.nav
        className={`
          fixed lg:relative inset-0 z-30 lg:z-0 bg-white lg:bg-transparent
          w-64 lg:w-72 p-6 shadow-lg lg:shadow-none
          transform lg:transform-none transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        initial={false}
      >
        <div className="space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                onSectionChange(id);
                if (isOpen) onToggle();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                transition-colors relative overflow-hidden
                ${
                  activeSection === id
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              <Icon size={20} />
              <span>{label}</span>
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-primary/5 -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
