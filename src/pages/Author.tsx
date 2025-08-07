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
  User,
  Award,
  GraduationCap,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
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
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
  color: string;
}

interface Author {
  id: string;
  name: string;
  originalName?: string;
  alternateNames?: string[];
  avatar: string;
  origin?: string;
  nationality?: string;
  birthDate?: string;
  yearsActive?: string;
  bio?: string;
  education?: string[];
  awards?: string[];
  website?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLink[];
  followers: number;
  verified?: boolean;
}

type SortOption =
  | "newest"
  | "oldest"
  | "title-asc"
  | "title-desc"
  | "rating"
  | "popularity";

// Enhanced mock author data with flexible information
const authorData: Author = {
  id: "1",
  name: "Aya Hirakawa",
  originalName: "ひらかわあや",
  alternateNames: ["A. Hirakawa", "平川彩"],
  avatar:
    "https://s4.anilist.co/file/anilistcdn/staff/large/n102723-Xa9aB5VFrLE8.jpg",
  origin: "Tokyo, Japan",
  nationality: "Japanese",
  birthDate: "1985-03-15",
  yearsActive: "2004-Present",
  bio: "Japanese novelist known for romantic comedies with androgynous characters. Her works often explore themes of identity and relationships in modern society. Winner of multiple literary awards including the Naoki Prize.",
  education: ["Tokyo University - Literature", "Creative Writing Workshop"],
  awards: [
    "Naoki Prize 2019",
    "Romance Writers Award 2021",
    "Literary Excellence Award 2022",
  ],
  website: "https://ayahirakawa.com",
  email: "contact@ayahirakawa.com",
  socialLinks: [
    {
      platform: "Twitter",
      url: "https://twitter.com/ayahirakawa_art",
      icon: Twitter,
      color: "text-blue-500",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/ayahirakawa",
      icon: Instagram,
      color: "text-pink-500",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/ayahirakawa",
      icon: Facebook,
      color: "text-blue-600",
    },
  ],
  followers: 12100,
  verified: true,
};

// Enhanced mock novels data
const novelsData: Novel[] = [
  {
    id: "1",
    title: "Love in the Digital Age",
    originalTitle: "デジタル時代の恋",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    status: "Ongoing",
    rating: 8.7,
    genres: ["Romance", "Drama", "Slice of Life"],
    year: 2022,
    chapters: 45,
    popularity: 95,
  },
  {
    id: "2",
    title: "Midnight Café Chronicles",
    originalTitle: "真夜中のカフェ物語",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    status: "Completed",
    rating: 9.2,
    genres: ["Romance", "Comedy", "Supernatural"],
    year: 2020,
    chapters: 120,
    popularity: 88,
  },
  {
    id: "3",
    title: "The Art of Forgetting",
    originalTitle: "忘れる技術",
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
    status: "Completed",
    rating: 8.9,
    genres: ["Drama", "Psychological", "Romance"],
    year: 2019,
    chapters: 85,
    popularity: 82,
  },
  {
    id: "4",
    title: "Summer Rain Melodies",
    originalTitle: "夏雨のメロディー",
    cover:
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?w=300&h=400&fit=crop",
    status: "Ongoing",
    rating: 8.4,
    genres: ["Romance", "Music", "Youth"],
    year: 2023,
    chapters: 28,
    popularity: 76,
  },
  {
    id: "5",
    title: "Crossroads of Destiny",
    originalTitle: "運命の交差点",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    status: "Hiatus",
    rating: 8.1,
    genres: ["Drama", "Romance", "Fantasy"],
    year: 2021,
    chapters: 67,
    popularity: 71,
  },
  {
    id: "6",
    title: "Urban Legends",
    originalTitle: "都市伝説",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    status: "Completed",
    rating: 7.8,
    genres: ["Mystery", "Supernatural", "Thriller"],
    year: 2018,
    chapters: 95,
    popularity: 65,
  },
];

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

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Calendar size={12} />
          <span>{novel.year}</span>
          {novel.chapters && (
            <>
              <span>•</span>
              <BookOpen size={12} />
              <span>{novel.chapters} ch</span>
            </>
          )}
        </div>

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

function AuthorInfoField({
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
        <div className="space-y-1">
          {value.map((item, index) => (
            <div key={index} className="text-gray-900">
              {item}
            </div>
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

export default function Author() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(authorData.followers);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    setIsLoading(false);

    toast.success(
      isFollowing
        ? `Unfollowed ${authorData.name}`
        : `Now following ${authorData.name}`,
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

  const sortedNovels = [...novelsData].sort((a, b) => {
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

  // Dynamically build author info fields
  const authorInfoFields = [
    { label: "Origin", value: authorData.origin, icon: MapPin },
    { label: "Nationality", value: authorData.nationality, icon: MapPin },
    {
      label: "Birth Date",
      value: authorData.birthDate
        ? new Date(authorData.birthDate).toLocaleDateString()
        : undefined,
      icon: Calendar,
    },
    { label: "Years Active", value: authorData.yearsActive, icon: Clock },
    { label: "Education", value: authorData.education, icon: GraduationCap },
    { label: "Awards", value: authorData.awards, icon: Award },
    {
      label: "Website",
      value: authorData.website?.replace(/^https?:\/\//, ""),
      icon: Globe,
      isLink: true,
      linkUrl: authorData.website,
    },
    { label: "Email", value: authorData.email, icon: Mail },
  ].filter((field) => field.value);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Author Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Avatar */}
          <div className="lg:col-span-1">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square w-full max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                {authorData.avatar ? (
                  <img
                    src={authorData.avatar}
                    alt={authorData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30">
                    <User size={80} className="text-primary/60" />
                  </div>
                )}

                {/* Verified badge */}
                {authorData.verified && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Author Info */}
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
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {authorData.name}
                  </h1>

                  {/* Alternate names */}
                  <div className="space-y-1 mb-3">
                    {authorData.originalName && (
                      <p className="text-xl text-gray-600 font-jp">
                        {authorData.originalName}
                      </p>
                    )}
                    {authorData.alternateNames &&
                      authorData.alternateNames.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {authorData.alternateNames.map((name, index) => (
                            <span
                              key={index}
                              className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      )}
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

              {/* Author Details - Flexible Grid */}
              {authorInfoFields.length > 0 && (
                <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {authorInfoFields.map((field, index) => (
                      <AuthorInfoField
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
              {authorData.socialLinks && authorData.socialLinks.length > 0 && (
                <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Social Media
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {authorData.socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors ${link.color}`}
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

              {/* Bio */}
              {authorData.bio && (
                <div className="bg-surface rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {authorData.bio}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Works</h2>
              <p className="text-gray-600">
                {novelsData.length} novel{novelsData.length !== 1 ? "s" : ""}{" "}
                published
              </p>
            </div>

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

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <motion.button
              className="px-8 py-3 bg-surface border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-primary/30 transition-all duration-200 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Works
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
