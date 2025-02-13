import React, { useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import ReadingLists from "../components/profile/ReadingLists";
import { motion, AnimatePresence } from "framer-motion";

type TabId =
  | "overview"
  | "social"
  | "favorites"
  | "reviews"
  | "submissions"
  | "stats";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />

      <div className="bg-surface/80 backdrop-blur-md z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && <ReadingLists />}
            {/* Other tab content components will be added here */}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
