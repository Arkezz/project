import { Bell, BookMarked, LogOut, Menu, Settings, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import SearchBar from "./search/SearchBar";
import { Link } from "react-router-dom";
import FloatingMenu from "./navigation/FloatingMenu"; // Import the new floating menu component
import { useNotifications } from "../hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import ProfileDropdown from "./auth/ProfileDropdown"; // Import ProfileDropdown

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const { notifications } = useNotifications();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu]);

  if (isMobileView) {
    return <FloatingMenu />; // Render FloatingMenu instead of null
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-gray-200 z-50"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -64 }}
        transition={{ duration: 0.2 }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <BookMarked className="text-primary" size={28} />
              <span className="text-xl font-semibold hidden sm:block">
                NoviList
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            <div className="space-x-6">
              <Link
                to="/"
                className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                onClick={() => setActiveLink("/")}
              >
                Home
              </Link>
              <Link
                to="/profile"
                className={`nav-link ${
                  activeLink === "/profile" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/profile")}
              >
                Profile
              </Link>
              <Link
                to="/reading-list"
                className={`nav-link ${
                  activeLink === "/reading-list" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/reading-list")}
              >
                ReadingList
              </Link>
              <Link
                to="/discover"
                className={`nav-link ${
                  activeLink === "/discover" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/discover")}
              >
                Discover
              </Link>
              <Link
                to="/forum"
                className={`nav-link ${
                  activeLink === "/forum" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/forum")}
              >
                Forum
              </Link>
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
                  aria-label="Notifications"
                >
                  <Bell size={24} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </button>

                <AnimatePresence>
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
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                          >
                            <p className="text-sm font-medium">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDistanceToNow(
                                new Date(notification.timestamp),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <Link
                          to="/notifications"
                          className="text-sm text-primary font-medium hover:underline w-full text-center"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative profile-menu">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile(!showProfile);
                    setShowNotifications(false);
                  }}
                  aria-label="User menu"
                >
                  <User size={24} />
                </button>

                <ProfileDropdown
                  isOpen={showProfile}
                  onClose={() => setShowProfile(false)}
                />
              </div>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <SearchBar />
            <button
              onClick={() => setShowMobileMenu(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

