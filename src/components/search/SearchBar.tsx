import React, { useState, useRef } from 'react';
import { Search, X, History, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useRecentSearches } from '../../hooks/useRecentSearches';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { recentSearches, addSearch, clearRecentSearches } = useRecentSearches();
  
  useClickOutside(searchRef, () => setIsFocused(false));

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      addSearch(searchQuery);
      // Here you would typically trigger the actual search
      console.log('Searching for:', searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className={`relative ${isFocused ? 'w-80' : 'w-64'} transition-all duration-300`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search novels..."
          className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          onFocus={() => setIsFocused(true)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            {query ? (
              <SearchResults query={query} onSelect={(title) => handleSearch(title)} />
            ) : (
              <div className="py-2">
                {recentSearches.length > 0 && (
                  <>
                    <div className="px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <History size={16} />
                        <span>Recent Searches</span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-primary hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <History size={14} className="text-gray-400" />
                          {search}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-2" />
                  </>
                )}
                <div className="px-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <TrendingUp size={16} />
                    <span>Trending Searches</span>
                  </div>
                  <div className="space-y-2">
                    {['The Beginning After The End', 'Solo Leveling', 'Omniscient Reader'].map((trend) => (
                      <button
                        key={trend}
                        onClick={() => setQuery(trend)}
                        className="w-full px-4 py-1.5 text-sm text-left hover:bg-gray-50 rounded-md"
                      >
                        {trend}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}