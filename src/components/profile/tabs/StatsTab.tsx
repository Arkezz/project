import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
}: StatCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon size={20} className="text-white" />
            </div>
            <h3 className="font-medium text-gray-700">{title}</h3>
          </div>

          <div className="space-y-1">
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
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
    </motion.div>
  );
}

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  color: string;
}

function ProgressBar({ label, current, total, color }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">
          {current}/{total}
        </span>
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

export default function StatsTab() {
  const currentYear = new Date().getFullYear();

  const stats = [
    {
      title: "Novels Read",
      value: 127,
      subtitle: "All time",
      icon: BookOpen,
      color: "bg-blue-500",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Chapters Read",
      value: "15,432",
      subtitle: "This year",
      icon: Calendar,
      color: "bg-green-500",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Reading Time",
      value: "342h",
      subtitle: "Estimated",
      icon: Clock,
      color: "bg-purple-500",
      trend: { value: 15, isPositive: true },
    },
    {
      title: "Average Rating",
      value: 4.2,
      subtitle: "Out of 5",
      icon: Star,
      color: "bg-amber-500",
    },
    {
      title: "Reading Streak",
      value: 23,
      subtitle: "Days",
      icon: Target,
      color: "bg-red-500",
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Reviews Written",
      value: 34,
      subtitle: "Total",
      icon: Award,
      color: "bg-indigo-500",
    },
  ];

  const readingGoals = [
    { label: "Novels This Year", current: 45, total: 60, color: "bg-blue-500" },
    {
      label: "Chapters This Month",
      current: 234,
      total: 300,
      color: "bg-green-500",
    },
    {
      label: "Reviews This Year",
      current: 8,
      total: 12,
      color: "bg-purple-500",
    },
  ];

  const genreStats = [
    { genre: "Fantasy", count: 45, percentage: 35 },
    { genre: "Action", count: 32, percentage: 25 },
    { genre: "Romance", count: 25, percentage: 20 },
    { genre: "Drama", count: 15, percentage: 12 },
    { genre: "Comedy", count: 10, percentage: 8 },
  ];

  const monthlyData = [
    { month: "Jan", novels: 4, chapters: 120 },
    { month: "Feb", novels: 3, chapters: 95 },
    { month: "Mar", novels: 5, chapters: 150 },
    { month: "Apr", novels: 4, chapters: 130 },
    { month: "May", novels: 6, chapters: 180 },
    { month: "Jun", novels: 5, chapters: 165 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
          <BarChart3 className="text-blue-500" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Reading Statistics</h2>
          <p className="text-gray-600 text-sm">
            Your reading journey at a glance
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Reading Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Target className="text-primary" size={20} />
          Reading Goals {currentYear}
        </h3>

        <div className="space-y-6">
          {readingGoals.map((goal, index) => (
            <motion.div
              key={goal.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProgressBar {...goal} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Genre Distribution & Monthly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genre Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-6">Favorite Genres</h3>

          <div className="space-y-4">
            {genreStats.map((genre, index) => (
              <motion.div
                key={genre.genre}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="font-medium">{genre.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{genre.count}</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${genre.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Monthly Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-6">Monthly Activity</h3>

          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <motion.div
                key={month.month}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="font-medium">{month.month}</span>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} className="text-blue-500" />
                    <span>{month.novels} novels</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-green-500" />
                    <span>{month.chapters} chapters</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Award className="text-amber-500" size={20} />
          Recent Achievements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Speed Reader",
              description: "Read 50 chapters in one day",
              icon: "🚀",
              earned: true,
            },
            {
              title: "Critic",
              description: "Write 10 reviews",
              icon: "📝",
              earned: true,
            },
            {
              title: "Explorer",
              description: "Read novels from 5 different countries",
              icon: "🌍",
              earned: true,
            },
            {
              title: "Dedicated",
              description: "Maintain 30-day reading streak",
              icon: "🔥",
              earned: false,
            },
            {
              title: "Completionist",
              description: "Finish 100 novels",
              icon: "🏆",
              earned: false,
            },
            {
              title: "Social",
              description: "Get 100 likes on reviews",
              icon: "❤️",
              earned: false,
            },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned
                  ? "border-amber-200 bg-amber-50"
                  : "border-gray-200 bg-gray-50 opacity-60"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: achievement.earned ? 1.02 : 1 }}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h4 className="font-medium mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
