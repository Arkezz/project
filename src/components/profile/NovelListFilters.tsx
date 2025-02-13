import React from "react";
import { Star } from "lucide-react";

export default function NovelListFilters() {
  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50">
            <option value="">All Genres</option>
            <option value="fantasy">Fantasy</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center gap-2">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <input type="checkbox" className="rounded border-gray-300" />
                <Star size={14} className="text-amber-400 fill-current" />
                <span className="text-sm">≥{rating}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50">
            <option value="updated">Last Updated</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>
    </div>
  );
}
