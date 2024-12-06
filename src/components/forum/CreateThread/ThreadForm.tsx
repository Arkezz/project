import React from "react";
import { tagColors } from "../ThreadTags";
import NovelSearch from "./NovelSearch";
import { AlertCircle } from "lucide-react";

interface Novel {
  id: string;
  title: string;
  originalTitle: string;
  language: string;
  chapters: number;
}

interface ThreadFormProps {
  title: string;
  onTitleChange: (title: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedNovel: Novel | null;
  onNovelSelect: (novel: Novel | null) => void;
  errors: {
    title?: string;
    tags?: string;
    novel?: string;
  };
}

export default function ThreadForm({
  title,
  onTitleChange,
  selectedTags,
  onTagsChange,
  selectedNovel,
  onNovelSelect,
  errors,
}: ThreadFormProps) {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter thread title..."
          className={`
            w-full px-4 py-2 rounded-lg border transition-all
            ${
              errors.title
                ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                : "border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            }
          `}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tags <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(tagColors).map((tag) => {
            const isSelected = selectedTags.includes(tag);
            const colorSet = tagColors[tag as keyof typeof tagColors];

            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-all
                  ${
                    isSelected
                      ? `${colorSet.bg} ${colorSet.text}`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {errors.tags && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.tags}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-500">Select up to 3 tags</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Related Novel <span className="text-gray-400">(Optional)</span>
        </label>
        <NovelSearch selectedNovel={selectedNovel} onSelect={onNovelSelect} />
      </div>
    </div>
  );
}
