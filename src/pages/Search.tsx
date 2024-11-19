import React, { useState, useRef, useCallback } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useDebounce from '../hooks/useDebounce';
import NovelCard from '../components/NovelCard';
import SearchFilters from '../components/search/SearchFilters';

export default function Search() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
    genres: [] as string[],
    languages: [] as string[],
    minChapters: '',
    maxChapters: '',
    minRating: '',
  });
  
  const debouncedQuery = useDebounce(query, 300);
  const observer = useRef<IntersectionObserver>();
  
  const { items, hasMore, loading, error } = useInfiniteScroll(debouncedQuery, filters);

  const lastNovelRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // Trigger next page load
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search novels..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-lg"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-filter"
            >
              <Filter size={20} />
              Filters
            </button>
            {Object.values(filters).some(f => 
              Array.isArray(f) ? f.length > 0 : f !== ''
            ) && (
              <button
                onClick={() => setFilters({
                  status: [],
                  genres: [],
                  languages: [],
                  minChapters: '',
                  maxChapters: '',
                  minRating: '',
                })}
                className="text-sm text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <SearchFilters
              filters={filters}
              onChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />
          )}
        </AnimatePresence>

        {loading && !items.length ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-gray-500">
            <p>Something went wrong. Please try again.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-medium text-gray-600">No results found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {items.map((novel, index) => (
              <div
                key={novel.id}
                ref={index === items.length - 1 ? lastNovelRef : undefined}
              >
                <NovelCard {...novel} />
              </div>
            ))}
            {loading && (
              <div className="col-span-full flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}