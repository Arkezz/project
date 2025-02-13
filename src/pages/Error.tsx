import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Disc as Discord, Home, BookOpen, RefreshCw } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Mascot Illustration */}
        <motion.div
          className="w-[250px] h-[250px] mx-auto mb-8 sm:mb-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src="https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=250"
            alt="Confused reader mascot"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </motion.div>

        {/* Error Message */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-text">
          Oops! Something went wrong
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Even the most dedicated readers sometimes lose their page
        </p>

        {/* Help Section */}
        <div className="bg-surface rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Found a bug? Let us help!
          </h2>
          <a
            href="https://discord.gg/novilist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors mb-4"
          >
            <Discord className="w-5 h-5" />
            Join our Discord community
          </a>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Or refresh the page to try again
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link
            to="/reading-list"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition-colors w-full sm:w-auto justify-center"
          >
            <BookOpen className="w-5 h-5" />
            View Reading List
          </Link>
        </div>
      </div>
    </div>
  );
}
