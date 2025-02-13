import React, { useState } from "react";
import {
  Filter,
  Flame,
  Globe,
  History,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import CategoryPill from "../components/CategoryPill";
import AdvancedFilters from "../components/filters/AdvancedFilters";
import FilterStatusBar from "../components/discover/FilterStatusBar";
import FilteredResults from "../components/discover/FilteredResults";
import novels from "../data/novelData";
import NovelSection from "../components/discover/sections/NovelSection";

const categories = [
  { id: "action", name: "Action", count: 1243 },
  { id: "romance", name: "Romance", count: 892 },
  { id: "fantasy", name: "Fantasy", count: 1567 },
  { id: "martial", name: "Martial Arts", count: 743 },
  { id: "system", name: "System", count: 456 },
  { id: "comedy", name: "Comedy", count: 678 },
  { id: "drama", name: "Drama", count: 892 },
  { id: "supernatural", name: "Supernatural", count: 567 },
] as const;

const languages = [
  { id: "cn", name: "Chinese", icon: "中" },
  { id: "kr", name: "Korean", icon: "한" },
  { id: "jp", name: "Japanese", icon: "日" },
] as const;

export default function Discover() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<
    Array<{ type: string; value: string }>
  >([]);

  const hasActiveFilters = activeFilters.length > 0;

  const handleRemoveFilter = (filterToRemove: {
    type: string;
    value: string;
  }) => {
    setActiveFilters((prev) =>
      prev.filter(
        (filter) =>
          !(
            filter.type === filterToRemove.type &&
            filter.value === filterToRemove.value
          )
      )
    );
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSelectedLanguages([]);
  };

  const handleLanguageToggle = (langId: string) => {
    setSelectedLanguages((prev) => {
      const newLanguages = prev.includes(langId)
        ? prev.filter((id) => id !== langId)
        : [...prev, langId];

      // Update active filters
      setActiveFilters((current) => {
        const withoutLanguages = current.filter((f) => f.type !== "Language");
        return [
          ...withoutLanguages,
          ...newLanguages.map((lang) => ({
            type: "Language",
            value: languages.find((l) => l.id === lang)?.name || lang,
          })),
        ];
      });

      return newLanguages;
    });
  };

  return (
    <div>
      <div className="discover-banner mb-4 md:mb-8 py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                Discover New Stories
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                Explore thousands of web novels across different languages and
                genres. Track your reading progress and discover your next
                favorite story.
              </p>

              <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-8">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageToggle(lang.id)}
                    className={`flex-1 md:flex-none min-w-[120px] px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      selectedLanguages.includes(lang.id)
                        ? "bg-primary text-white"
                        : "bg-white/80 hover:bg-white"
                    }`}
                  >
                    <span className="mr-2">{lang.icon}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end gap-4">
              <button
                onClick={() => setShowFilters(true)}
                className="flex-1 md:flex-none btn-filter"
              >
                <Filter size={20} />
                <span className="hidden md:inline">Advanced Filters</span>
                <span className="md:hidden">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <FilterStatusBar
        filters={activeFilters}
        totalResults={1234}
        onRemoveFilter={handleRemoveFilter}
        onClearFilters={handleClearFilters}
        onOpenFilters={() => setShowFilters(true)}
      />

      <div className="max-w-7xl mx-auto px-6">
        {hasActiveFilters ? (
          <FilteredResults
            novels={novels} // Pass your filtered novels here
            isLoading={false}
            hasMore={true}
          />
        ) : (
          <>
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-primary" size={24} />
                <h2 className="text-2xl font-semibold">Popular Categories</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <CategoryPill key={category.id} {...category} />
                ))}
              </div>
            </section>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-9">
                <NovelSection
                  title="Trending Now"
                  icon={Flame}
                  iconColor="text-accent"
                  type="trending"
                  viewAllLink="/trending"
                />

                <NovelSection
                  title="New Releases"
                  icon={Sparkles}
                  iconColor="text-amber-500"
                  type="new"
                  viewAllLink="/new-releases"
                />

                <NovelSection
                  title="Popular in Your Region"
                  icon={Globe}
                  iconColor="text-emerald-500"
                  type="regional"
                  viewAllLink="/regional"
                />
              </div>

              <div className="col-span-12 lg:col-span-3">
                <div className="sticky top-24">
                  <section className="card mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <History className="text-primary" size={20} />
                      <h3 className="font-semibold">Recently Viewed</h3>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-12 h-16 bg-gray-100 rounded-md" />
                          <div>
                            <p className="font-medium line-clamp-1">
                              Novel Title {i}
                            </p>
                            <p className="text-sm text-gray-600">
                              5 minutes ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="card">
                    <h3 className="font-semibold mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Cultivation",
                        "School Life",
                        "Romance",
                        "Action",
                        "Mystery",
                        "Horror",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </>
        )}

        {showFilters && (
          <AdvancedFilters onClose={() => setShowFilters(false)} />
        )}
      </div>
    </div>
  );
}

