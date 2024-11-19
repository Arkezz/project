import React from 'react';
import { Book } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  onSelect: (title: string) => void;
}

export default function SearchResults({ query, onSelect }: SearchResultsProps) {
  // Mock search results - in a real app, this would come from an API
  const results = [
    {
      title: 'The Beginning After The End',
      originalTitle: '디 비기닝 애프터 디 엔드',
      language: 'kr',
      chapters: 420,
    },
    {
      title: 'Omniscient Reader\'s Viewpoint',
      originalTitle: '전지적 독자 시점',
      language: 'kr',
      chapters: 551,
    },
    {
      title: 'Release That Witch',
      originalTitle: '放开那个女巫',
      language: 'cn',
      chapters: 1498,
    },
  ].filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.originalTitle.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No results found for "{query}"</p>
        <p className="text-sm mt-1">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="py-2 max-h-96 overflow-y-auto">
      {results.map((result) => (
        <button
          key={result.title}
          onClick={() => onSelect(result.title)}
          className="w-full px-4 py-2 hover:bg-gray-50 flex items-start gap-3"
        >
          <Book className="text-gray-400 mt-1" size={16} />
          <div className="text-left">
            <p className="font-medium">{result.title}</p>
            <p className={`text-sm text-gray-500 font-${result.language}`}>
              {result.originalTitle}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {result.chapters} chapters
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}