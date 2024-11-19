import React, { useState } from 'react';
import { Filter, Flame, Globe, History, Sparkles, TrendingUp } from 'lucide-react';
import NovelGrid from '../components/NovelGrid';
import CategoryPill from '../components/CategoryPill';
import DiscoverFilter from '../components/DiscoverFilter';

const categories = [
  { id: 'action', name: 'Action', count: 1243 },
  { id: 'romance', name: 'Romance', count: 892 },
  { id: 'fantasy', name: 'Fantasy', count: 1567 },
  { id: 'martial', name: 'Martial Arts', count: 743 },
  { id: 'system', name: 'System', count: 456 },
  { id: 'comedy', name: 'Comedy', count: 678 },
  { id: 'drama', name: 'Drama', count: 892 },
  { id: 'supernatural', name: 'Supernatural', count: 567 },
] as const;

const languages = [
  { id: 'cn', name: 'Chinese', icon: '中' },
  { id: 'kr', name: 'Korean', icon: '한' },
  { id: 'jp', name: 'Japanese', icon: '日' },
] as const;

export default function Discover() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  return (
    <div>
      <div className="discover-banner mb-8 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Discover New Stories</h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Explore thousands of web novels across different languages and genres. 
                Track your reading progress and discover your next favorite story.
              </p>
            </div>
            <button 
              onClick={() => setActiveFilter(prev => prev ? null : 'filters')}
              className="btn-filter"
            >
              <Filter size={20} />
              Advanced Filters
            </button>
          </div>

          <div className="flex gap-4 mt-8">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguages(prev => 
                  prev.includes(lang.id) 
                    ? prev.filter(id => id !== lang.id)
                    : [...prev, lang.id]
                )}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLanguages.includes(lang.id)
                    ? 'bg-primary text-white'
                    : 'bg-white/80 hover:bg-white'
                }`}
              >
                <span className={`font-${lang.id} mr-2`}>{lang.icon}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-primary" size={24} />
            <h2 className="text-2xl font-semibold">Popular Categories</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <CategoryPill key={category.id} {...category} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="text-accent" size={24} />
                <h2 className="text-2xl font-semibold">Trending Now</h2>
              </div>
              <NovelGrid type="trending" />
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-amber-500" size={24} />
                <h2 className="text-2xl font-semibold">New Releases</h2>
              </div>
              <NovelGrid type="new" />
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <Globe className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-semibold">Popular in Your Region</h2>
              </div>
              <NovelGrid type="regional" />
            </section>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-24">
              <section className="card mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="text-primary" size={20} />
                  <h3 className="font-semibold">Recently Viewed</h3>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-12 h-16 bg-gray-100 rounded-md" />
                      <div>
                        <p className="font-medium line-clamp-1">Novel Title {i}</p>
                        <p className="text-sm text-gray-600">5 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card">
                <h3 className="font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Cultivation', 'School Life', 'Romance', 'Action', 'Mystery', 'Horror'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {activeFilter && (
          <DiscoverFilter onClose={() => setActiveFilter(null)} />
        )}
      </div>
    </div>
  );
}