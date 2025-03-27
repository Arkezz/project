import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

interface NovelListFiltersProps {
  onFilterAdd: (filter: { type: string; value: any; label: string }) => void;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-primary transition-colors duration-200"
      >
        {title}
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      <AnimatedSection isOpen={isOpen}>{children}</AnimatedSection>
    </div>
  );
}

function AnimatedSection({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-200 ease-in-out ${
        isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function NovelListFilters({
  onFilterAdd,
}: NovelListFiltersProps) {
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2024]);

  const handleYearRangeChange = (index: number, value: number) => {
    const newRange = [...yearRange] as [number, number];
    newRange[index] = value;
    setYearRange(newRange);
    onFilterAdd({
      type: "Year",
      value: newRange,
      label: `${newRange[0]} - ${newRange[1]}`,
    });
  };

  const handleRatingFilter = (rating: number) => {
    onFilterAdd({
      type: "Rating",
      value: rating,
      label: `≥${rating}`,
    });
  };

  const handleGenreFilter = (genre: string) => {
    onFilterAdd({
      type: "Genre",
      value: genre,
      label: genre,
    });
  };

  const handleLanguageFilter = (language: string) => {
    onFilterAdd({
      type: "Language",
      value: language,
      label: language,
    });
  };

  return (
    <div className="space-y-3">
      <AccordionSection title="Publication Year" defaultOpen={true}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1990}
            max={2024}
            value={yearRange[0]}
            onChange={(e) => handleYearRangeChange(0, parseInt(e.target.value))}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200"
            aria-label="Start year"
          />
          <span className="text-gray-400">to</span>
          <input
            type="number"
            min={1990}
            max={2024}
            value={yearRange[1]}
            onChange={(e) => handleYearRangeChange(1, parseInt(e.target.value))}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200"
            aria-label="End year"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="Rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                onChange={() => handleRatingFilter(rating)}
              />
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-amber-400 fill-current"
                  />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-700">& up</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Genre">
        <div className="grid grid-cols-2 gap-1">
          {[
            "Fantasy",
            "Action",
            "Romance",
            "Drama",
            "Adventure",
            "Comedy",
            "Martial Arts",
            "Sci-Fi",
          ].map((genre) => (
            <label
              key={genre}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                onChange={() => handleGenreFilter(genre)}
              />
              <span className="text-sm text-gray-700">{genre}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Chapter Count">
        <div className="space-y-2">
          {[
            { label: "Short (≤ 100)", value: "short" },
            { label: "Medium (101-500)", value: "medium" },
            { label: "Long (501-1000)", value: "long" },
            { label: "Epic (> 1000)", value: "epic" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                onChange={() =>
                  onFilterAdd({
                    type: "Length",
                    value: option.value,
                    label: option.label,
                  })
                }
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Language">
        <div className="space-y-2">
          {[
            { code: "cn", name: "Chinese" },
            { code: "kr", name: "Korean" },
            { code: "jp", name: "Japanese" },
            { code: "en", name: "English" },
          ].map((lang) => (
            <label
              key={lang.code}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                onChange={() => handleLanguageFilter(lang.name)}
              />
              <span className="text-sm text-gray-700">{lang.name}</span>
            </label>
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
