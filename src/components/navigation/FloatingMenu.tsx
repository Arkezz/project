import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Bell, Settings, Sun, Moon } from "lucide-react";
import QuickActions from "./QuickActions";
import SearchOverlay from "./SearchOverlay";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-end gap-2"
            >
              <QuickActions>
                <QuickActions.Item
                  icon={Search}
                  label="Search"
                  onClick={() => setShowSearch(true)}
                />
                <QuickActions.Item
                  icon={Bell}
                  label="Notifications"
                  badge="3"
                  onClick={() => console.log("Notifications clicked")}
                />
                <QuickActions.Item
                  icon={Settings}
                  label="Settings"
                  onClick={() => console.log("Settings clicked")}
                />
              </QuickActions>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.div>

      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}
