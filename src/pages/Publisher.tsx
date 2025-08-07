import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Twitter,
  MapPin,
  Calendar,
  BookOpen,
  Star,
  Plus,
  Check,
  Clock,
  Globe,
  ExternalLink,
  ChevronDown,
  Filter,
  Building2,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface Novel {
  id: string;
  title: string;
  originalTitle?: string;
  cover: string;
  status: "Ongoing" | "Completed" | "Hiatus";
  rating: number;
  genres: string[];
  year: number;
  chapters?: number;
  popularity?: number;
  publishedDate?: string; // Publication date for this publisher
}

interface Publisher {
  id: string;
  name: string;
  type:
    | "ORIGINAL_PUBLISHER"
    | "LOCAL_LICENSEE"
    | "PLATFORM_HOST"
    | "FAN_GROUP"
    | "INDIVIDUAL";
  description?: string;
  website?: string;
  location?: string;
  founded?: string;
  specialties?: string[];
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: React.ElementType;
  }>;
  favourites: number;
  statistics?: {
    totalNovels: number;
    activeNovels: number;
    completedNovels: number;
    averageRating: number;
  };
}

type SortOption =
  | "newest"
  | "oldest"
  | "title-asc"
  | "title-desc"
  | "rating"
  | "popularity";

// Enhanced mock publisher data
const publisherData: Publisher = {
  id: "1",
  name: "Kadokawa Corporation",
  type: "ORIGINAL_PUBLISHER",
  description:
    "One of Japan's largest publishing companies, specializing in light novels, manga, and digital content. Known for high-quality publications and supporting emerging authors in the fantasy and romance genres.",
  website: "https://kadokawa.co.jp",
  location: "Tokyo, Japan",
  founded: "1945",
  specialties: [
    "Light Novels",
    "Manga",
    "Digital Publishing",
    "Anime Adaptations",
  ],
  socialLinks: [
    {
      platform: "Twitter",
      url: "https://twitter.com/kadokawa_corp",
      icon: Twitter,
    },
    { platform: "Website", url: "https://kadokawa.co.jp", icon: Globe },
  ],
  favourites: 8420,
  statistics: {
    totalNovels: 156,
    activeNovels: 89,
    completedNovels: 67,
    averageRating: 8.4,
  },
};

// Enhanced mock novels data with publication dates
const novelsData: Novel[] = [
  {
    id: "1",
    title: "Re:Zero − Starting Life in Another World",
    originalTitle: "Re:ゼロから始める異世界生活",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    status: "Ongoing",
    rating: 8.9,
    genres: ["Fantasy", "Drama", "Romance"],
    year: 2012,
    chapters: 29,
    popularity: 98,
    publishedDate: "2012-01-25",
  },
  {
    id: "2",
    title: "KonoSuba: God's Blessing on This Wonderful World!",
    originalTitle: "この素晴らしい世界に祝福を！",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    status: "Completed",
    rating: 8.7,
    genres: ["Comedy", "Fantasy", "Adventure"],
    year: 2013,
    chapters: 17,
    popularity: 95,
    publishedDate: "2013-10-01",
  },
  {
    id: "3",
    title: "Overlord",
    originalTitle: "オーバーロード",
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
    status: "Ongoing",
    rating: 8.6,
    genres: ["Fantasy", "Action", "Dark"],
    year: 2012,
    chapters: 16,
    popularity: 92,
    publishedDate: "2012-07-30",
  },
  {
    id: "4",
    title: "No Game No Life",
    originalTitle: "ノーゲーム・ノーライフ",
    cover:
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?w=300&h=400&fit=crop",
    status: "Hiatus",
    rating: 8.5,
    genres: ["Fantasy", "Comedy", "Ecchi"],
    year: 2012,
    chapters: 12,
    popularity: 89,
    publishedDate: "2012-04-25",
  },
  {
    id: "5",
    title: "The Rising of the Shield Hero",
    originalTitle: "盾の勇者の成り上がり",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    status: "Completed",
    rating: 8.3,
    genres: ["Fantasy", "Adventure", "Drama"],
    year: 2013,
    chapters: 22,
    popularity: 87,
    publishedDate: "2013-08-22",
  },
  {
    id: "6",
    title: "Sword Art Online",
    originalTitle: "ソードアート・オンライン",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    status: "Ongoing",
    rating: 8.1,
    genres: ["Sci-Fi", "Romance", "Action"],
    year: 2009,
    chapters: 26,
    popularity: 96,
    publishedDate: "2009-04-10",
  },
];

const getPublisherTypeLabel = (type: Publisher["type"]) => {
  switch (type) {
    case "ORIGINAL_PUBLISHER":
      return "Original Publisher";
    case "LOCAL_LICENSEE":
      return "Local Licensee";
    case "PLATFORM_HOST":
      return "Platform Host";
    case "FAN_GROUP":
      return "Fan Group";
    case "INDIVIDUAL":
      return "Individual";
    default:
      return type;
  }
};

const getPublisherTypeColor = (type: Publisher["type"]) => {
  switch (type) {
    case "ORIGINAL_PUBLISHER":
      return "bg-blue-100 text-blue-700";
    case "LOCAL_LICENSEE":
      return "bg-green-100 text-green-700";
    case "PLATFORM_HOST":
      return "bg-purple-100 text-purple-700";
    case "FAN_GROUP":
      return "bg-amber-100 text-amber-700";
    case "INDIVIDUAL":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

interface NovelCardProps {
  novel: Novel;
  onAddToList: (novelId: string) => void;
}

function NovelCard({ novel, onAddToList }: NovelCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToList = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAdded(true);
    setIsAdding(false);
    onAddToList(novel.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-emerald-100 text-emerald-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Hiatus":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatPublishedDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={novel.cover}
          alt={novel.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(novel.status)}`}
          >
            {novel.status}
          </span>
        </div>

        {/* Add to List Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            onClick={handleAddToList}
            disabled={isAdding || isAdded}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isAdded
                ? "bg-emerald-500 text-white"
                : "bg-white/90 text-gray-700 hover:bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : isAdded ? (
              <Check size={16} />
            ) : (
              <Plus size={16} />
            )}
          </motion.button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
            <Star size={12} className="text-amber-400 fill-current" />
            <span className="text-white text-xs font-medium">
              {novel.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 min-h-[2.5rem]">
          {novel.title}
        </h3>

        {novel.originalTitle && (
          <p className="text-sm text-gray-500 font-jp line-clamp-1 mb-2">
            {novel.originalTitle}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Calendar size={12} />
          <span>{novel.year}</span>
          {novel.chapters && (
            <>
              <span>•</span>
              <BookOpen size={12} />
              <span>{novel.chapters} vol</span>
            </>
          )}
        </div>

        {/* Published Date */}
        {novel.publishedDate && (
          <div className="flex items-center gap-1 text-xs text-primary mb-2">
            <Building2 size={12} />
            <span>Published {formatPublishedDate(novel.publishedDate)}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {novel.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
            >
              {genre}
            </span>
          ))}
          {novel.genres.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{novel.genres.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PublisherInfoField({
  label,
  value,
  icon: Icon,
  isLink = false,
  linkUrl,
}: {
  label: string;
  value: string | string[];
  icon?: React.ElementType;
  isLink?: boolean;
  linkUrl?: string;
}) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    if (isLink && linkUrl) {
      return (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          {value}
          <ExternalLink size={12} />
        </a>
      );
    }

    return <span className="text-gray-900">{value}</span>;
  };

  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon size={16} className="text-primary mt-0.5 flex-shrink-0" />}
      <div className="min-w-0 flex-1">
        <div className="text-sm text-gray-600 mb-1">{label}</div>
        <div className="font-medium">{renderValue()}</div>
      </div>
    </div>
  );
}

export default function Publisher() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(publisherData.favourites);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleFollow = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    setIsLoading(false);

    toast.success(
      isFollowing
        ? `Unfollowed ${publisherData.name}`
        : `Now following ${publisherData.name}`,
      {
        duration: 2000,
        icon: isFollowing ? "👋" : "❤️",
      }
    );
  };

  const handleAddToList = (novelId: string) => {
    toast.success("Added to reading list", {
      duration: 2000,
      icon: "📚",
    });
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
    { value: "rating", label: "Highest Rated" },
    { value: "popularity", label: "Most Popular" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Completed", label: "Completed" },
    { value: "Hiatus", label: "Hiatus" },
  ];

  const filteredNovels = novelsData.filter(
    (novel) => filterStatus === "all" || novel.status === filterStatus
  );

  const sortedNovels = [...filteredNovels].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.year - a.year;
      case "oldest":
        return a.year - b.year;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "rating":
        return b.rating - a.rating;
      case "popularity":
        return (b.popularity || 0) - (a.popularity || 0);
      default:
        return 0;
    }
  });

  // Dynamically build publisher info fields
  const publisherInfoFields = [
    { label: "Location", value: publisherData.location, icon: MapPin },
    { label: "Founded", value: publisherData.founded, icon: Calendar },
    { label: "Specialties", value: publisherData.specialties, icon: Award },
    {
      label: "Website",
      value: publisherData.website?.replace(/^https?:\/\//, ""),
      icon: Globe,
      isLink: true,
      linkUrl: publisherData.website,
    },
  ].filter((field) => field.value);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Publisher Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Logo/Icon Placeholder */}
          <div className="lg:col-span-1">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square w-full max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
                <Building2 size={80} className="text-primary/60" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Publisher Info */}
          <div className="lg:col-span-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Name and Follow Button */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    {publisherData.name}
                  </h1>

                  {/* Publisher Type Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getPublisherTypeColor(publisherData.type)}`}
                    >
                      <Building2 size={14} />
                      {getPublisherTypeLabel(publisherData.type)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Heart size={14} className="text-red-500" />
                    <span>{followerCount.toLocaleString()} followers</span>
                  </div>
                </div>

                <motion.button
                  onClick={handleFollow}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                    isFollowing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-primary text-white hover:bg-primary/90"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Heart
                      size={18}
                      fill={isFollowing ? "currentColor" : "none"}
                      className={isFollowing ? "text-red-500" : ""}
                    />
                  )}
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </motion.button>
              </div>

              {/* Statistics Cards */}
              {publisherData.statistics && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {publisherData.statistics.totalNovels}
                    </div>
                    <div className="text-sm text-gray-600">Total Novels</div>
                  </div>
                  <div className="bg-surface rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {publisherData.statistics.activeNovels}
                    </div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                  <div className="bg-surface rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {publisherData.statistics.completedNovels}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="bg-surface rounded-xl p-4 border border-gray-100 shadow-sm text-center">
                    <div className="text-2xl font-bold text-amber-600 mb-1">
                      {publisherData.statistics.averageRating}
                    </div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                </div>
              )}

              {/* Publisher Details */}
              {publisherInfoFields.length > 0 && (
                <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {publisherInfoFields.map((field, index) => (
                      <PublisherInfoField
                        key={index}
                        label={field.label}
                        value={field.value!}
                        icon={field.icon}
                        isLink={field.isLink}
                        linkUrl={field.linkUrl}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {publisherData.socialLinks &&
                publisherData.socialLinks.length > 0 && (
                  <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {publisherData.socialLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <link.icon size={16} />
                          <span className="text-sm font-medium">
                            {link.platform}
                          </span>
                          <ExternalLink size={12} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

              {/* Description */}
              {publisherData.description && (
                <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {publisherData.description}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Published Works
              </h2>
              <p className="text-gray-600">
                {sortedNovels.length} novel
                {sortedNovels.length !== 1 ? "s" : ""} published
              </p>
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-surface border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-surface border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Filter size={16} />
                  <span>
                    {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${showSortDropdown ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSortDropdown(false)}
                      />
                      <motion.div
                        className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 min-w-[180px]"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        {sortOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                              sortBy === option.value
                                ? "bg-primary/5 text-primary font-medium"
                                : "text-gray-700"
                            }`}
                            whileHover={{ x: 4 }}
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Novels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {sortedNovels.map((novel, index) => (
              <motion.div
                key={novel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <NovelCard novel={novel} onAddToList={handleAddToList} />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {sortedNovels.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No novels found
              </h3>
              <p className="text-gray-600">
                No novels match the current filter criteria.
              </p>
            </motion.div>
          )}

          {/* Load More */}
          {sortedNovels.length > 0 && (
            <div className="flex justify-center mt-12">
              <motion.button
                className="px-8 py-3 bg-surface border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-primary/30 transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Load More Works
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
