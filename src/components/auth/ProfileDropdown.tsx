import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: User, label: "User Profile", href: "/profile" },
  { icon: Settings, label: "Account Settings", href: "/settings" },
  { icon: Shield, label: "Security & Privacy", href: "/security" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: HelpCircle, label: "Help & Support", href: "/support" },
];

export default function ProfileDropdown({
  isOpen,
  onClose,
}: ProfileDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <item.icon size={18} className="text-gray-400" />
                  <span className="flex-1 text-sm font-medium">
                    {item.label}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </motion.a>
              ))}

              <div className="h-px bg-gray-100 my-2" />

              <motion.button
                className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-red-600 hover:bg-red-50 transition-colors"
                whileHover={{ x: 4 }}
                onClick={() => {
                  // Handle logout
                  onClose();
                }}
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
