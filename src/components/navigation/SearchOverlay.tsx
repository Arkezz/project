import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, X, ArrowRight } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";
import SearchResults from "./SearchResults";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.start();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl mx-4 bg-surface rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center gap-4">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search novels, authors, or genres..."
                className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-gray-400"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceSearch}
                  className={`p-2 rounded-full transition-colors ${
                    isListening ? "bg-accent text-white" : "hover:bg-gray-100"
                  }`}
                  aria-label="Voice search"
                >
                  <Mic size={20} />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={onClose}
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {debouncedQuery && <SearchResults query={debouncedQuery} />}

            {!debouncedQuery && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Popular Searches</h3>
                  <button className="text-sm text-primary hover:underline">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Martial Arts", "Romance", "System", "Reincarnation"].map(
                    (term) => (
                      <button
                        key={term}
                        className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        onClick={() => setQuery(term)}
                      >
                        <ArrowRight size={16} className="text-gray-400" />
                        <span>{term}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
