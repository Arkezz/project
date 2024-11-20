import React from "react";
import { Calendar, Clock } from "lucide-react";

interface ReadingProgressProps {
  currentChapter: number;
  totalChapters: number;
  startDate?: string;
  lastRead?: string;
  averageReadingTime: string;
}

export default function ReadingProgress({
  currentChapter,
  totalChapters,
  startDate,
  lastRead,
  averageReadingTime,
}: ReadingProgressProps) {
  const progress = (currentChapter / totalChapters) * 100;

  return (
    <div className="bg-surface rounded-lg shadow-sm p-4">
      <h3 className="font-medium mb-4">Reading Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2 text-gray-500">
          <span>Chapter {currentChapter}</span>
          <span>of {totalChapters}</span>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        {startDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <span>Started Reading</span>
            </div>
            <span>{new Date(startDate).toLocaleDateString()}</span>
          </div>
        )}
        {lastRead && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span>Last Read</span>
            </div>
            <span>{lastRead}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={16} />
            <span>Avg. Reading Time</span>
          </div>
          <span>{averageReadingTime}</span>
        </div>
      </div>
    </div>
  );
}
