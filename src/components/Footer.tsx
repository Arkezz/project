import React, { useState, useEffect } from "react";
import {
  BookMarked,
  ChevronDown,
  Twitter,
  Sun,
  Moon,
  Facebook,
  Instagram,
  Linkedin,
  Check,
  Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface FooterSectionProps {
  title: string;
  links: string[];
}

function FooterSection({ title, links }: FooterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b md:border-none border-gray-200 dark:border-gray-700">
      <button
        className="flex items-center justify-between w-full py-4 md:py-0 md:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold">{title}</h3>
        <ChevronDown
          size={20}
          className={`md:hidden transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 overflow-hidden pb-4 md:pb-0"
          >
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 block"
                >
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Color scheme options with Asian-inspired colors
const colorSchemes = [
  { id: "default", label: "Default", color: "bg-[#2B4B6F]" },
  { id: "sepia", label: "Amber", color: "bg-[#C8883C]" }, // Warm amber
  { id: "ocean", label: "Jade", color: "bg-[#3A9278]" }, // Jade green
  { id: "forest", label: "Ruby", color: "bg-[#B93B4F]" }, // Ruby red
];

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorScheme, setColorScheme] = useState("default");
  const [showThemePanel, setShowThemePanel] = useState(false);
  const currentYear = new Date().getFullYear();

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-mode") || "light";
    const savedColorScheme = localStorage.getItem("color-scheme") || "default";

    setIsDarkMode(savedTheme === "dark");
    setColorScheme(savedColorScheme);

    applyTheme(savedTheme, savedColorScheme);
  }, []);

  // Apply theme and color scheme to document
  const applyTheme = (themeMode: string, scheme: string) => {
    const root = document.documentElement;

    // Apply dark/light mode
    if (themeMode === "dark") {
      root.classList.add("theme-dark");
      document.documentElement.classList.add("dark");
    } else {
      root.classList.remove("theme-dark");
      document.documentElement.classList.remove("dark");
    }

    // Apply color scheme
    root.classList.remove("theme-sepia", "theme-ocean", "theme-forest");
    if (scheme !== "default") {
      root.classList.add(`theme-${scheme}`);
    }
  };

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme-mode", newMode);
    applyTheme(newMode, colorScheme);
  };

  // Change color scheme
  const changeColorScheme = (scheme: string) => {
    setColorScheme(scheme);
    localStorage.setItem("color-scheme", scheme);
    applyTheme(isDarkMode ? "dark" : "light", scheme);
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const actionLinks = [
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
    { label: "Join Discord", href: "/discord" },
  ];

  return (
    <footer className="bg-surface border-t border-gray-200 dark:border-gray-700 mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 pb-6 md:pb-0 border-b md:border-none border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <BookMarked className="text-primary" size={28} />
              <h2 className="text-xl font-semibold">NoviList</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Track, discover, and explore your favorite web novels. Join our
              community of passionate readers from around the world.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 text-gray-600 dark:text-gray-300 hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <FooterSection
            title="Navigation"
            links={["Home", "Discover", "Reading List", "Forum", "About Us"]}
          />

          <FooterSection
            title="Resources"
            links={[
              "Help Center",
              "Translation Guide",
              "Community Guidelines",
              "API Documentation",
              "Status Page",
            ]}
          />
        </div>

        {/* Theme Controls */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Palette size={18} className="text-primary" />
              <span className="text-sm font-medium">Appearance</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Theme Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Mode:
                </span>
                <motion.button
                  onClick={toggleDarkMode}
                  className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300"
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center"
                    animate={{
                      left: isDarkMode ? "calc(100% - 1.75rem)" : "0.25rem",
                      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {isDarkMode ? (
                      <Moon size={14} className="text-indigo-200" />
                    ) : (
                      <Sun size={14} className="text-amber-400" />
                    )}
                  </motion.div>
                  <span className="sr-only">
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </motion.button>
              </div>

              {/* Color Scheme Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Theme:
                </span>
                <div className="relative">
                  <motion.button
                    onClick={() => setShowThemePanel(!showThemePanel)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${colorSchemes.find((s) => s.id === colorScheme)?.color} shadow-sm border-2 border-white/50`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Select color theme"
                    aria-expanded={showThemePanel}
                    aria-haspopup="true"
                  >
                    <Check size={14} className="text-white drop-shadow-sm" />
                  </motion.button>

                  <AnimatePresence>
                    {showThemePanel && (
                      <>
                        <motion.div
                          className="fixed inset-0 z-40"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowThemePanel(false)}
                        />
                        <motion.div
                          className="absolute bottom-full mb-2 right-0 bg-surface dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          <div className="flex gap-2 mb-1">
                            {colorSchemes.map((scheme) => (
                              <motion.button
                                key={scheme.id}
                                onClick={() => {
                                  changeColorScheme(scheme.id);
                                  setShowThemePanel(false);
                                }}
                                className={`w-8 h-8 rounded-full ${scheme.color} ${
                                  colorScheme === scheme.id
                                    ? "ring-2 ring-offset-2 ring-offset-background"
                                    : ""
                                }`}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Switch to ${scheme.label} theme`}
                                aria-pressed={colorScheme === scheme.id}
                              >
                                {colorScheme === scheme.id && (
                                  <Check
                                    size={14}
                                    className="text-white m-auto drop-shadow-sm"
                                  />
                                )}
                              </motion.button>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            {
                              colorSchemes.find((s) => s.id === colorScheme)
                                ?.label
                            }
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 py-6 border-t border-b border-gray-200 dark:border-gray-700">
          {actionLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="px-6 py-3 text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © {currentYear} NoviList. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-600 dark:text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Border - Asian-inspired wave pattern */}
      <div className="h-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 wave-pattern" />
    </footer>
  );
}
