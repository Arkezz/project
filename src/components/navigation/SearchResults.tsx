import React from "react";
import { Book, Star } from "lucide-react";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  // Mock search results - in a real app, this would come from an API
  const results = [
    {
      type: "novel",
      title: "The Beginning After The End",
      cover:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
      rating: 4.8,
      chapters: 420,
    },
    {
      type: "novel",
      title: "Omniscient Reader's Viewpoint",
      cover:
        "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
      rating: 4.7,
      chapters: 551,
    },
  ].filter((result) =>
    result.title.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="font-medium">No results found for "{query}"</p>
        <p className="text-sm mt-1">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200">
      <div className="p-2">
        {results.map((result) => (
          <button
            key={result.title}
            className="w-full p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-start gap-4"
          >
            <div className="w-12 h-16 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={result.cover}
                alt={result.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium line-clamp-1">{result.title}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star
                    size={14}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                  <span>{result.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Book size={14} />
                  <span>{result.chapters} chapters</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
