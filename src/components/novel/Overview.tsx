import React, { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
} from "lucide-react";

export default function Overview({ novel }) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
        <div className="relative">
          <p
            className={`text-gray-600 whitespace-pre-line ${
              !showFullSynopsis && "line-clamp-4"
            }`}
          >
            {novel.synopsis}
          </p>
          {!showFullSynopsis && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
          )}
          <button
            onClick={() => setShowFullSynopsis(!showFullSynopsis)}
            className="mt-2 text-primary hover:underline flex items-center gap-1"
          >
            {showFullSynopsis ? (
              <>
                Show less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Show more <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </section>

      {novel.contentWarnings.length > 0 && (
        <section className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle size={20} />
            <h3 className="font-medium">Content Warnings</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {novel.contentWarnings.map((warning) => (
              <span
                key={warning}
                className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
              >
                {warning}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">Genres & Themes</h2>
        <div className="flex flex-wrap gap-2">
          {novel.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1.5 bg-surface hover:bg-gray-100 rounded-full text-sm cursor-pointer transition-colors shadow-sm"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {novel.themes.map((theme) => (
            <span
              key={theme}
              className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm cursor-pointer transition-colors"
            >
              {theme}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Release Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Clock size={18} />
              <span>Release Schedule</span>
            </div>
            <p className="font-medium">{novel.releaseFrequency}</p>
            <p className="text-sm text-gray-500 mt-1">Next chapter in 2 days</p>
          </div>
          <div className="bg-surface rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Calendar size={18} />
              <span>Publication Period</span>
            </div>
            <p className="font-medium">
              {new Date(novel.startDate).toLocaleDateString()} - Present
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {Math.floor(
                (Date.now() - new Date(novel.startDate).getTime()) /
                  (1000 * 60 * 60 * 24 * 30)
              )}{" "}
              months of serialization
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Related Novels</h2>
          <button className="text-primary hover:underline flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {novel.relatedNovels.map((related) => (
            <div
              key={related.id}
              className="flex gap-4 bg-surface rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
            >
              <div className="w-16 h-24 rounded overflow-hidden flex-shrink-0">
                <img
                  src={related.cover}
                  alt={related.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium line-clamp-2">{related.title}</p>
                <p className="text-sm text-gray-500 mt-1">{related.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
