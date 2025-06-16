import React from "react";
import { Star, BookOpen, Clock, Users } from "lucide-react";

interface NovelOGImageProps {
  novel: {
    id: string;
    title: string;
    originalTitle?: string;
    author: string;
    cover: string;
    rating: number;
    status: "Ongoing" | "Completed" | "Hiatus";
    chapters: number;
    readers: number;
    genres: string[];
    language: "cn" | "kr" | "jp";
  };
}

const statusColors = {
  Ongoing: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
  Hiatus: "bg-amber-100 text-amber-700 border-amber-200",
};

const languageFlags = {
  cn: "🇨🇳",
  kr: "🇰🇷",
  jp: "🇯🇵",
};

export default function NovelOGImage({ novel }: NovelOGImageProps) {
  return (
    <div className="relative w-[1200px] h-[630px] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <defs>
            <pattern
              id="books"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect width="20" height="20" fill="none" />
              <path
                d="M2 2h16v16H2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M6 6h8v8H6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#books)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>

      {/* Asian-inspired decorative flourish */}
      <div className="absolute top-8 right-8 opacity-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="text-slate-400"
        >
          <path
            d="M60 10 C80 30, 110 50, 90 80 C70 100, 40 90, 30 70 C20 50, 30 20, 60 10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="60" cy="60" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative h-full flex items-center px-16 py-12">
        {/* Novel Cover */}
        <div className="relative flex-shrink-0 mr-12">
          <div className="w-[280px] h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 ring-1 ring-white/50">
            <img
              src={novel.cover}
              alt={novel.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Language indicator */}
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl ring-4 ring-white/50">
            {languageFlags[novel.language]}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          {/* Title Section */}
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-slate-800 leading-tight tracking-tight">
              {novel.title}
            </h1>
            {novel.originalTitle && (
              <p className="text-2xl text-slate-500 font-light tracking-wide">
                {novel.originalTitle}
              </p>
            )}
            <p className="text-xl text-slate-600 font-medium">
              by {novel.author}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={`${i < Math.floor(novel.rating) ? "text-amber-400 fill-current" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <span className="text-2xl font-semibold text-slate-700">
                {novel.rating.toFixed(1)}
              </span>
            </div>

            {/* Status */}
            <div
              className={`px-4 py-2 rounded-full border text-lg font-medium ${statusColors[novel.status]}`}
            >
              {novel.status}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="flex items-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span className="text-lg">
                {novel.chapters.toLocaleString()} chapters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span className="text-lg">
                {novel.readers.toLocaleString()} readers
              </span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-3">
            {novel.genres.slice(0, 4).map((genre, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/70 backdrop-blur-sm text-slate-700 rounded-full text-base font-medium border border-slate-200/50 shadow-sm"
              >
                {genre}
              </span>
            ))}
            {novel.genres.length > 4 && (
              <span className="px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-base">
                +{novel.genres.length - 4} more
              </span>
            )}
          </div>

          {/* Novilist Branding */}
          <div className="pt-4">
            <div className="flex items-center gap-3 text-slate-400">
              <BookOpen size={24} />
              <span className="text-xl font-semibold tracking-wide">
                NoviList
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
    </div>
  );
}
