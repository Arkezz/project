import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import NovelHeader from "../components/novel/NovelHeader";
import NovelTabs from "../components/novel/NovelTabs";
import ReadingProgress from "../components/novel/ReadingProgress";
import Overview from "../components/novel/Overview";
import ReviewsTabContent from "../components/novel/ReviewsTabContent";
import TranslationStatus from "../components/novel/TranslationStatus";
import ChapterList from "../components/novel/ChapterList";
import EnhancedInformationCard from "../components/novel/EnhancedInformationCard";
import ReviewSummaryCard from "../components/novel/ReviewSummaryCard";
import { Link } from "react-router-dom";
import { Edit, MessageSquare } from "lucide-react";
import type { Review } from "../components/novel/ReviewCard";

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    username: "NovelEnthusiast",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    title: "An absolute masterpiece of character development",
    content:
      "This novel completely exceeded my expectations. The way the author handles Arthur's growth from his past life experiences to his new world is phenomenal. The magic system is well-thought-out and the political intrigue keeps you on the edge of your seat. The recent chapters have been particularly intense with the war arc, and I can't wait to see how everything unfolds.",
    createdAt: "2024-03-01T10:30:00Z",
    likes: 42,
    dislikes: 3,
    isHelpful: true,
    spoilerWarning: false,
  },
  {
    id: "2",
    userId: "user2",
    username: "CriticalReader",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=160&h=160&fit=crop&crop=faces",
    rating: 4,
    title: "Great story with minor pacing issues",
    content:
      "TBATE is definitely one of the better web novels out there. The world-building is excellent and the characters feel real and well-developed. My only complaint is that some arcs feel a bit drawn out, particularly in the middle volumes. However, the payoff is usually worth it, and the latest chapters have been absolutely incredible.",
    createdAt: "2024-02-28T15:45:00Z",
    updatedAt: "2024-03-02T09:20:00Z",
    likes: 28,
    dislikes: 7,
    isHelpful: true,
    spoilerWarning: true,
  },
  {
    id: "3",
    userId: "user3",
    username: "FantasyFan92",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    title: "Perfect blend of action and emotion",
    content:
      "What sets TBATE apart from other reincarnation novels is its emotional depth. Arthur isn't just overpowered - he's genuinely struggling with the weight of his past and the responsibility of his new life. The relationships feel authentic, especially with his family and friends. The action scenes are well-written and easy to visualize.",
    createdAt: "2024-02-25T12:15:00Z",
    likes: 35,
    dislikes: 2,
    isHelpful: true,
    spoilerWarning: false,
  },
];

const novelData = {
  id: "1",
  title: "The Beginning After The End",
  originalTitle: "디 비기닝 애프터 디 엔드",
  cover:
    "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
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
  translations: [
    {
      language: "English",
      group: "Official",
      platform: "Tapas",
      progress: 98,
      chapters: 410,
      status: "Active",
    },
    {
      language: "Spanish",
      group: "NovelHispano",
      platform: "NovelHispano.org",
      progress: 75,
      chapters: 315,
      status: "Active",
    },
  ],
  rawChapters: {
    available: 420,
    lastUpdated: "2024-03-10",
    nextRaw: "2024-03-17",
    source: "Kakao",
  },
};

export default function NovelDetails() {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "chapters" | "reviews" | "stats"
  >("overview");

  // Review state management
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSort, setReviewSort] = useState<
    "newest" | "oldest" | "helpful" | "rating"
  >("helpful");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewVotes, setReviewVotes] = useState<
    Record<string, "like" | "dislike" | null>
  >({});

  // New review form state
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    content: "",
    spoilerWarning: false,
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleReviewVote = (reviewId: string, type: "like" | "dislike") => {
    setReviewVotes((prev) => {
      const currentVote = prev[reviewId];
      if (currentVote === type) {
        const newVotes = { ...prev };
        delete newVotes[reviewId];
        return newVotes;
      }
      return { ...prev, [reviewId]: type };
    });

    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          const currentVote = reviewVotes[reviewId];
          let newLikes = review.likes;
          let newDislikes = review.dislikes;

          // Remove previous vote
          if (currentVote === "like") newLikes--;
          if (currentVote === "dislike") newDislikes--;

          // Add new vote
          if (type === "like" && currentVote !== "like") newLikes++;
          if (type === "dislike" && currentVote !== "dislike") newDislikes++;

          return { ...review, likes: newLikes, dislikes: newDislikes };
        }
        return review;
      })
    );
  };

  const handleSubmitReview = () => {
    if (
      !newReview.rating ||
      !newReview.title.trim() ||
      !newReview.content.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userId: "current-user",
      username: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=faces",
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      isHelpful: false,
      spoilerWarning: newReview.spoilerWarning,
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 0, title: "", content: "", spoilerWarning: false });
    setShowReviewForm(false);
    toast.success("Review submitted successfully!");
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "chapters", label: "Chapters" },
    { id: "reviews", label: "Reviews" },
    { id: "stats", label: "Statistics" },
  ];

  // Enhanced information data with new publication fields
  const enhancedInfo = {
    id: novelData.id,
    titles: {
      english: novelData.title,
      native: novelData.originalTitle,
      romaji: "The Beginning After The End",
      synonyms: ["TBATE", "The Beginning After the End"],
    },
    format: {
      type: novelData.type as "Web Novel",
      status: novelData.status as "Ongoing",
      originalLanguage: "Korean",
      region: "South Korea",
    },
    temporal: {
      startDate: novelData.startDate,
      lastUpdate: "2024-03-10",
    },
    statistics: {
      averageScore: novelData.rating / 5,
      meanScore: (novelData.rating / 5) * 0.95,
      popularity: 1,
      favorites: 15432,
      rank: 1,
      readers: novelData.statistics.totalReaders,
      reviews: novelData.totalReviews,
    },
    production: {
      publishers: [novelData.publisher],
      source: "Original",
    },
    author: novelData.author,
    artist: novelData.artist,
    license: {
      status: "Licensed" as const,
      publisher: novelData.publisher,
    },
    translation: {
      status: "Ongoing" as const,
      progress: 75,
      lastUpdate: "2024-03-10",
    },
    serialization: {
      platform: "Tapas",
      frequency: novelData.releaseFrequency,
    },
    // New publication details
    publication: {
      statusInCOO: "Status in COO",
      totalChapters: 386,
      completionStatus: "Completed" as const,
      licensed: false,
      completelyTranslated: true,
      originalPublisher: "Kakaopage",
      englishPublisher: undefined, // This will show as "N/A"
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen bg-background text-text pt-16 light`}
    >
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
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NovelTabs
              selectedTab={selectedTab}
              onTabChange={(tab) => setSelectedTab(tab as typeof selectedTab)}
              tabs={tabs}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {selectedTab === "overview" && (
                  <Overview
                    novel={novelData}
                    reviews={reviews}
                    reviewSort={reviewSort}
                    setReviewSort={setReviewSort}
                    showAllReviews={showAllReviews}
                    setShowAllReviews={setShowAllReviews}
                    onReviewVote={handleReviewVote}
                    reviewVotes={reviewVotes}
                  />
                )}
                {selectedTab === "chapters" && (
                  <ChapterList novel={novelData} />
                )}
                {selectedTab === "reviews" && (
                  <ReviewsTabContent
                    reviews={reviews}
                    reviewSort={reviewSort}
                    setReviewSort={setReviewSort}
                    showAllReviews={showAllReviews}
                    setShowAllReviews={setShowAllReviews}
                    onReviewVote={handleReviewVote}
                    reviewVotes={reviewVotes}
                    showReviewForm={showReviewForm}
                    setShowReviewForm={setShowReviewForm}
                    newReview={newReview}
                    setNewReview={setNewReview}
                    hoverRating={hoverRating}
                    setHoverRating={setHoverRating}
                    onSubmitReview={handleSubmitReview}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="w-full lg:w-80 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-24 space-y-6">
              <ReadingProgress
                currentChapter={novelData.userProgress.currentChapter}
                totalChapters={novelData.chapters.total}
                startDate={novelData.userProgress.startDate}
                lastRead={novelData.userProgress.lastRead}
                averageReadingTime={novelData.statistics.readingTime}
              />

              <ReviewSummaryCard
                reviews={reviews}
                showReviewForm={showReviewForm}
                setShowReviewForm={setShowReviewForm}
                newReview={newReview}
                setNewReview={setNewReview}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                onSubmitReview={handleSubmitReview}
              />

              <TranslationStatus
                translations={novelData.translations}
                rawChapters={novelData.rawChapters}
              />

              <EnhancedInformationCard info={enhancedInfo} />

              <Link
                to={`/novel/edit`}
                className="btn-primary flex items-center gap-2 bg-primary hover:bg-primary/90"
                aria-label="Edit novel"
              >
                <Edit size={18} />
                <span>Edit</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
