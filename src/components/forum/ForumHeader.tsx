import React from "react";
import { Bell } from "lucide-react";
import SearchInput from "./search/SearchInput";

export default function ForumHeader() {
  const handleSearch = (query) => {
    console.log(query);
  };

  return (
    <div className="relative bg-surface border-b border-gray-200">
      {/* Main header content */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Enhanced Search Section */}
        <div className="bg-surface py-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Community Forum
            </h1>
            <p className="text-gray-600">
              Join discussions, share your thoughts, and connect with fellow
              readers
            </p>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Search discussions, reviews, and more..."
            />
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Popular:</span>
              {[
                "Latest Chapter Discussion",
                "Novel Reviews",
                "Recommendations",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="hover:text-primary transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
