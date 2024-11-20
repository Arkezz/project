import React, { useState } from "react";
import { motion } from "framer-motion";
import NovelHeader from "../components/novel/NovelHeader";
import NovelTabs from "../components/novel/NovelTabs";
import ReadingProgress from "../components/novel/ReadingProgress";
import Overview from "../components/novel/Overview";

// Mock data remains the same
const novelData = {
  id: "1",
  title: "The Beginning After The End",
  originalTitle: "디 비기닝 애프터 디 엔드",
  cover:
    "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
  status: "Ongoing",
  type: "Web Novel",
  author: "TurtleMe",
  artist: "Fuyuki23",
  publisher: "Tapas Media",
  startDate: "2018-07-15",
  rating: 4.8,
  totalRatings: 12453,
  totalReviews: 824,
  genres: ["Action", "Adventure", "Fantasy", "Romance", "Drama"],
  themes: ["Reincarnation", "Magic", "Kingdom Building", "Strong Lead"],
  releaseFrequency: "Weekly",
  chapters: {
    total: 420,
    latest: 419,
    nextRelease: "2024-03-15T14:00:00Z",
  },
  synopsis: `King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power. Beneath the glamorous exterior of a powerful king lurks the shell of man, devoid of purpose and will.

Reincarnated into a new world filled with magic and monsters, the king has a second chance to relive his life. Correcting the mistakes of his past will not be his only challenge, however. Underneath the peace and prosperity of the new world is an undercurrent threatening to destroy everything he has worked for, questioning his role and reason for being born again.`,
  contentWarnings: ["Violence", "Gore", "Strong Language"],
  relatedNovels: [
    {
      id: "2",
      title: "Omniscient Reader's Viewpoint",
      cover:
        "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
      relation: "Similar Theme",
    },
    {
      id: "3",
      title: "Solo Leveling",
      cover:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500",
      relation: "You May Like",
    },
  ],
  statistics: {
    readingTime: "~40 minutes per chapter",
    averageChapterLength: "4,200 words",
    totalReaders: 245789,
    activeReaders: 98234,
    completionRate: 78,
  },
  userProgress: {
    currentChapter: 324,
    startDate: "2023-12-15",
    lastRead: "2 days ago",
  },
};

export default function NovelDetails() {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "reviews" | "stats"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Reviews" },
    { id: "stats", label: "Statistics" },
  ];

  return (
    <div className="min-h-screen bg-background text-text pt-16">
      <NovelHeader
        title={novelData.title}
        originalTitle={novelData.originalTitle}
        cover={novelData.cover}
        status={novelData.status}
        type={novelData.type}
        rating={novelData.rating}
        totalRatings={novelData.totalRatings}
        chapters={novelData.chapters}
        activeReaders={novelData.statistics.activeReaders}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <NovelTabs
              selectedTab={selectedTab}
              onTabChange={(tab) => setSelectedTab(tab as typeof selectedTab)}
              tabs={tabs}
            />

            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab === "overview" && <Overview novel={novelData} />}
            </motion.div>
          </div>

          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <ReadingProgress
                currentChapter={novelData.userProgress.currentChapter}
                totalChapters={novelData.chapters.total}
                startDate={novelData.userProgress.startDate}
                lastRead={novelData.userProgress.lastRead}
                averageReadingTime={novelData.statistics.readingTime}
              />

              <div className="bg-surface rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-4">Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Author</span>
                    <span>{novelData.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Artist</span>
                    <span>{novelData.artist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Publisher</span>
                    <span>{novelData.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Chapters</span>
                    <span>{novelData.chapters.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span>{novelData.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
