import { Bell, BookMarked, LogOut, Settings, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import SearchBar from "./search/SearchBar";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".notification-menu")) {
        setShowNotifications(false);
      }
      if (!(e.target as Element).closest(".profile-menu")) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-gray-200 z-50"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -64 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookMarked className="text-primary" size={28} />
          <Link to="/" className="text-xl font-semibold">
            NoviList
          </Link>
        </div>

        <div className="flex items-center gap-12">
          <div className="space-x-6">
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/profile" className="nav-link">
              ReadingList
            </Link>
            <a href="/discover" className="nav-link">
              Discover
            </a>
            <a href="#" className="nav-link">
              Stats
            </a>
          </div>

          <div className="flex items-center gap-4">
            <SearchBar />

            <div className="relative notification-menu">
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
              >
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>

              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <h3 className="px-4 py-2 text-sm font-semibold border-b border-gray-100">
                    Notifications
                  </h3>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm font-medium">
                          New chapter available
                        </p>
                        <p className="text-xs text-gray-500">
                          Chapter 324 of "The Beginning After The End" is now
                          available
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-primary font-medium hover:underline w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="relative profile-menu">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
              >
                <User size={24} />
              </button>

              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Settings size={16} />
                      Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

