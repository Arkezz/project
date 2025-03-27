import React from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

interface OGImagePreviewProps {
  title: string;
  author: string;
  publisher: string;
  releaseYear: number;
  totalChapters: number;
  rating: number;
  genres: string[];
  coverImage?: string;
}

export default function OGImagePreview({
  title,
  author,
  publisher,
  releaseYear,
  totalChapters,
  rating,
  genres,
  coverImage,
}: OGImagePreviewProps) {
  const ratingStars = Array.from({ length: 5 }).map((_, index) => {
    const filled = index < Math.floor(rating);
    const partial = index === Math.floor(rating) && rating % 1 !== 0;

    return (
      <Star
        key={index}
        size={24}
        className={clsx(
          "transition-colors",
          filled ? "text-amber-400 fill-current" : "text-gray-300",
          partial && "text-amber-400 fill-current opacity-50",
        )}
      />
    );
  });

  return (
    <div className="w-[1200px] h-[630px] flex overflow-hidden bg-surface rounded-lg shadow-lg relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 mix-blend-overlay z-10" />

      {/* Content Container */}
      <div className="relative z-20 flex w-full">
        {/* Left Panel (60%) */}
        <div className="w-[60%] bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-12 flex flex-col justify-between backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between text-gray-400 mb-8">
            <span className="bg-gray-800/50 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
              {releaseYear}
            </span>
            <span className="bg-gray-800/50 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
              {totalChapters} Chapters
            </span>
          </div>

          <div className="flex-1">
            {/* Title */}
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Author & Publisher */}
            <div className="text-xl text-gray-300 mb-8">
              <p className="mb-2 font-medium">{author}</p>
              <p className="text-gray-400">{publisher}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8 bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm">
              <div className="flex">{ratingStars}</div>
              <span className="text-gray-300 font-medium">
                ({rating.toFixed(1)})
              </span>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-3">
              {genres.slice(0, 4).map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm border border-primary/10"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel (40%) */}
        <div className="w-[40%] relative overflow-hidden">
          {coverImage ? (
            <>
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
              />
              {/* Layered Gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 mix-blend-overlay" />
            </>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500">No Cover Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
