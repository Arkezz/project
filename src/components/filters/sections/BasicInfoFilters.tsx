import React from "react";
import { Star } from "lucide-react";

export default function BasicInfoFilters() {
  return (
    <div className="space-y-6">
      {/* Status */}
      <div>
        <h4 className="text-sm font-medium mb-3">Status</h4>
        <div className="flex flex-wrap gap-2">
          {["Ongoing", "Completed", "Hiatus"].map((status) => (
            <label
              key={status}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            >
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium mb-3">Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[4.5, 4.0, 3.5].map((rating) => (
            <label
              key={rating}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            >
              <input type="checkbox" className="rounded border-gray-300" />
              <Star size={14} className="text-amber-400 fill-current" />
              <span className="text-sm">≥ {rating}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Chapter Count */}
      <div>
        <h4 className="text-sm font-medium mb-3">Chapter Count</h4>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            />
          </div>
          <span className="text-gray-400">to</span>
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Language */}
      <div>
        <h4 className="text-sm font-medium mb-3">Language</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { code: "cn", name: "Chinese", icon: "中" },
            { code: "kr", name: "Korean", icon: "한" },
            { code: "jp", name: "Japanese", icon: "日" },
          ].map((lang) => (
            <label
              key={lang.code}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            >
              <input type="checkbox" className="rounded border-gray-300" />
              <span className={`font-${lang.code}`}>{lang.icon}</span>
              <span className="text-sm">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
