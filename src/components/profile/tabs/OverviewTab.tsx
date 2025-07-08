import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Bookmark,
  FileText,
  Flame,
  Star,
  Calendar,
  Users,
  TrendingUp,
  ChevronRight,
  Target,
  Award,
  Clock,
  Heart,
  MessageSquare,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              size={16}
              className={trend.isPositive ? "" : "rotate-180"}
            />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </motion.div>
  );
}

interface ActivityItemProps {
  type: "started" | "completed" | "rated" | "updated";
  novel: {
    id: string;
    title: string;
    cover: string;
  };
  timestamp: string;
  rating?: number;
  chapter?: number;
}

function ActivityItem({
  type,
  novel,
  timestamp,
  rating,
  chapter,
}: ActivityItemProps) {
  const getActivityText = () => {
    switch (type) {
      case "started":
        return "Started reading";
      case "completed":
        return "Completed";
      case "rated":
        return `Rated ${rating}/5`;
      case "updated":
        return `Updated progress to Chapter ${chapter}`;
      default:
        return "";
    }
  };

  const getActivityColor = () => {
    switch (type) {
      case "started":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "rated":
        return "text-amber-600";
      case "updated":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <motion.div
      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-10 h-14 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={novel.cover}
          alt={novel.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600">
          <span className={`font-medium ${getActivityColor()}`}>
            {getActivityText()}
          </span>
        </p>
        <p
          className="font-medium text-gray-900 line-clamp-1"
          title={novel.title}
        >
          {novel.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>

      <ChevronRight size={16} className="text-gray-400" />
    </motion.div>
  );
}

interface GenreBarProps {
  genre: string;
  count: number;
  percentage: number;
  color: string;
}

function GenreBar({ genre, count, percentage, color }: GenreBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{genre}</span>
        <span className="text-gray-500">{count}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function OverviewTab() {
  const [bioExpanded, setBioExpanded] = useState(false);

  const stats = [
    {
      title: "Novels Read",
      value: 150,
      icon: BookOpen,
      color: "bg-blue-500",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Currently Reading",
      value: 12,
      icon: Bookmark,
      color: "bg-green-500",
      trend: { value: 3, isPositive: true },
    },
    {
      title: "Chapters Read",
      value: "25,847",
      icon: FileText,
      color: "bg-purple-500",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Reading Streak",
      value: 45,
      icon: Flame,
      color: "bg-red-500",
      trend: { value: 15, isPositive: true },
    },
  ];

  const recentActivities: ActivityItemProps[] = [
    {
      type: "completed",
      novel: {
        id: "1",
        title: "The Beginning After The End",
        cover:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=100",
      },
      timestamp: "2 hours ago",
    },
    {
      type: "rated",
      novel: {
        id: "2",
        title: "Omniscient Reader's Viewpoint",
        cover:
          "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=100",
      },
      timestamp: "5 hours ago",
      rating: 5,
    },
    {
      type: "updated",
      novel: {
        id: "3",
        title: "Solo Leveling",
        cover:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=100",
      },
      timestamp: "1 day ago",
      chapter: 245,
    },
    {
      type: "started",
      novel: {
        id: "4",
        title: "Release That Witch",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=100",
      },
      timestamp: "2 days ago",
    },
    {
      type: "completed",
      novel: {
        id: "5",
        title: "Martial Peak",
        cover:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=100",
      },
      timestamp: "3 days ago",
    },
  ];

  const topGenres = [
    { genre: "Fantasy", count: 45, percentage: 30, color: "bg-blue-500" },
    { genre: "Cultivation", count: 38, percentage: 25, color: "bg-purple-500" },
    { genre: "System", count: 32, percentage: 21, color: "bg-green-500" },
    { genre: "Romance", count: 25, percentage: 17, color: "bg-pink-500" },
    { genre: "Action", count: 10, percentage: 7, color: "bg-red-500" },
  ];

  const favoriteGenres = [
    "Fantasy",
    "Cultivation",
    "System",
    "Romance",
    "Action",
    "Adventure",
    "Drama",
  ];

  const friends = [
    {
      id: "1",
      name: "NovelEnthusiast",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: "2",
      name: "DragonReader",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: "3",
      name: "CultivationMaster",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: "4",
      name: "TranslatorSage",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: "5",
      name: "NovelCritic",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: "6",
      name: "BookWorm",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=faces",
    },
  ];

  const userBio =
    "Passionate reader of Asian web novels with a particular love for cultivation and system stories. Always on the lookout for hidden gems and underrated translations. When I'm not reading, I'm probably discussing plot theories in the forums or helping new readers find their next favorite series.";

  return (
    <div className="space-y-6">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio/About Section */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">About</h3>

            <div className="space-y-4">
              <div>
                <p
                  className={`text-gray-700 leading-relaxed ${
                    bioExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  {userBio}
                </p>
                {userBio.length > 150 && (
                  <button
                    onClick={() => setBioExpanded(!bioExpanded)}
                    className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors"
                  >
                    {bioExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Favorite Genres
                </h4>
                <div className="flex flex-wrap gap-2">
                  {favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Link
                  to="/activity"
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  View all
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <ActivityItem {...activity} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Reading Goals Card */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">2024 Reading Goals</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Annual Goal
                  </span>
                  <span className="text-sm text-gray-500">150/200</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    This Month
                  </span>
                  <span className="text-sm text-gray-500">8/15</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "53%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award size={16} className="text-amber-500" />
                  <span>On track to reach your goal!</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Genres Card */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Top Genres</h3>

            <div className="space-y-4">
              {topGenres.map((genre, index) => (
                <motion.div
                  key={genre.genre}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <GenreBar {...genre} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Friends/Following Card */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="text-primary" size={20} />
                <h3 className="text-lg font-semibold">Friends</h3>
              </div>
              <Link
                to="/profile?tab=social"
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Following</span>
                <span className="font-medium">234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Followers</span>
                <span className="font-medium">189</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="grid grid-cols-6 gap-2">
                  {friends.map((friend, index) => (
                    <motion.div
                      key={friend.id}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-8 h-8 rounded-full object-cover"
                        title={friend.name}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                <span className="text-sm">Find Friends</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
