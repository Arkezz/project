import React, { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = "Search threads...",
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setIsFocused(false));

  React.useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div ref={searchRef} className="relative w-full">
      <div
        className={`relative transition-all duration-300 rounded-2xl overflow-hidden ${
          isFocused ? "transform-gpu scale-[1.02] shadow-lg" : "shadow-md"
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-4 py-4 bg-surface rounded-2xl border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                   placeholder:text-gray-400 transition-all text-lg"
          onFocus={() => setIsFocused(true)}
        />
        <div
          className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300
                      ${isFocused ? "text-primary" : "text-gray-400"}`}
        >
          <Search size={22} />
        </div>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                     hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mt-2 bg-surface rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            <div className="p-3">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">
                Search Operators
              </div>
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm hover:bg-gray-50 rounded-lg cursor-help">
                  <code className="text-primary">"exact phrase"</code>
                  <span className="text-gray-500 ml-2">
                    Search exact phrase
                  </span>
                </div>
                <div className="px-3 py-2 text-sm hover:bg-gray-50 rounded-lg cursor-help">
                  <code className="text-primary">author:username</code>
                  <span className="text-gray-500 ml-2">Search by author</span>
                </div>
                <div className="px-3 py-2 text-sm hover:bg-gray-50 rounded-lg cursor-help">
                  <code className="text-primary">tag:review</code>
                  <span className="text-gray-500 ml-2">Search by tag</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
