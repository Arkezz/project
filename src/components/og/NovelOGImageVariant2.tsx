import React from "react";
import { Star, BookOpen, Clock, Users, Heart } from "lucide-react";

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
  Ongoing: "bg-emerald-500",
  Completed: "bg-blue-500",
  Hiatus: "bg-amber-500",
};

const languageNames = {
  cn: "Chinese",
  kr: "Korean",
  jp: "Japanese",
};

export default function NovelOGImageVariant2({ novel }: NovelOGImageProps) {
  return (
    <div className="relative w-[1200px] h-[630px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 60 60"
          className="w-full h-full"
        >
          <defs>
            <pattern
              id="paper"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect width="60" height="60" fill="none" />
              <path
                d="M0 30h60M30 0v60"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paper)" />
        </svg>
      </div>

      {/* Artistic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
      </div>

      {/* Decorative Asian-inspired element */}
      <div className="absolute bottom-8 right-8 opacity-8">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="text-slate-300"
        >
          <path
            d="M20 50 Q50 20, 80 50 Q50 80, 20 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M30 50 Q50 30, 70 50 Q50 70, 30 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Main Layout */}
      <div className="relative h-full flex">
        {/* Left Content Panel */}
        <div className="flex-1 flex flex-col justify-center px-16 py-12 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500">
              <BookOpen size={20} />
              <span className="text-lg font-medium tracking-wide">
                NoviList
              </span>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              <span className="text-lg">
                {languageNames[novel.language]} Novel
              </span>
            </div>

            <h1 className="text-6xl font-bold text-slate-800 leading-tight tracking-tight">
              {novel.title}
            </h1>

            {novel.originalTitle && (
              <p className="text-2xl text-slate-500 font-light italic">
                {novel.originalTitle}
              </p>
            )}

            <p className="text-2xl text-slate-600 font-medium">
              by {novel.author}
            </p>
          </div>

          {/* Rating and Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={28}
                    className={`${i < Math.floor(novel.rating) ? "text-amber-400 fill-current" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <span className="text-3xl font-bold text-slate-700">
                {novel.rating.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${statusColors[novel.status]}`}
              ></div>
              <span className="text-xl font-medium text-slate-600">
                {novel.status}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500">
                <BookOpen size={18} />
                <span className="text-sm font-medium uppercase tracking-wide">
                  Chapters
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-700">
                {novel.chapters.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Users size={18} />
                <span className="text-sm font-medium uppercase tracking-wide">
                  Readers
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-700">
                {novel.readers.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Genres
            </p>
            <div className="flex flex-wrap gap-2">
              {novel.genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-lg text-base font-medium border border-slate-200 shadow-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Cover Panel */}
        <div className="w-[400px] relative flex items-center justify-center p-12">
          <div className="relative">
            {/* Cover Image */}
            <div className="w-[280px] h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/25 ring-1 ring-white/50 transform rotate-2">
              <img
                src={novel.cover}
                alt={novel.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12">
              <Heart size={24} className="text-red-400" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-20 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center px-3 transform rotate-6">
              <span className="text-sm font-bold text-slate-700">
                {novel.rating}
              </span>
              <Star size={16} className="text-amber-400 fill-current ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 opacity-60"></div>
    </div>
  );
}
