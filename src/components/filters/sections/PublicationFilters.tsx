import React from "react";
import { Search } from "lucide-react";

export default function PublicationFilters() {
  return (
    <div className="space-y-6">
      {/* Author Search */}
      <div>
        <h4 className="text-sm font-medium mb-3">Author</h4>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by author name..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Publisher/Platform */}
      <div>
        <h4 className="text-sm font-medium mb-3">Publisher/Platform</h4>
        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50">
          <option value="">Select platform</option>
          <option value="webnovel">Webnovel</option>
          <option value="wuxiaworld">Wuxiaworld</option>
          <option value="qidian">Qidian</option>
          <option value="kakaopage">Kakaopage</option>
          <option value="munpia">Munpia</option>
        </select>
      </div>

      {/* Original Language */}
      <div>
        <h4 className="text-sm font-medium mb-3">Original Language</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { code: "cn", name: "Chinese" },
            { code: "kr", name: "Korean" },
            { code: "jp", name: "Japanese" },
            { code: "en", name: "English" },
          ].map((lang) => (
            <label
              key={lang.code}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="original-language"
                className="rounded-full border-gray-300"
              />
              <span className="text-sm">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Translation Status */}
      <div>
        <h4 className="text-sm font-medium mb-3">Translation Status</h4>
        <div className="flex flex-wrap gap-2">
          {[
            "Ongoing Translation",
            "Complete Translation",
            "Licensed",
            "Fan Translation",
          ].map((status) => (
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
    </div>
  );
}
