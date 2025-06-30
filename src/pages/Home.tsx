import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
  Heart,
  Coffee,
} from "lucide-react";
import { Link } from "react-router-dom";
import NovelGrid from "../components/NovelGrid";
import CategoryPill from "../components/CategoryPill";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const genres = [
  { name: "Fantasy", count: 284 },
  { name: "Cultivation", count: 192 },
  { name: "System", count: 145 },
  { name: "Romance", count: 123 },
  { name: "Action", count: 187 },
  { name: "Adventure", count: 165 },
  { name: "Drama", count: 98 },
  { name: "Comedy", count: 74 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000"
            alt="Library background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -80],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ duration: 0.4 }}
                >
                  <Coffee className="text-white" size={28} />
                </motion.div>
                <motion.div
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.1, rotate: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <BookOpen className="text-white" size={28} />
                </motion.div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Keep track of your
                <span className="block bg-gradient-to-r from-primary/90 to-accent/90 bg-clip-text text-transparent">
                  reading journey
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                A simple place to organize your web novel collection, track your
                progress, and discover your next great read. No fuss, just
                books.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                className="group relative px-8 py-3 bg-primary text-white rounded-lg font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start tracking
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </motion.button>

              <motion.button
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium text-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse novels
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1.5" />
          </div>
        </motion.div>
      </motion.section>

      {/* Trending Novels Section */}
      <motion.section
        className="py-16 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="text-primary" size={24} />
              <h2 className="text-3xl font-bold text-gray-900">
                What's popular
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what other readers are enjoying right now
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <NovelGrid type="trending" />
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/15 transition-colors font-medium"
            >
              See more trending
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Discover by Genre Section */}
      <motion.section
        className="py-16 bg-surface/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find your genre
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore different types of stories and find what you love
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <CategoryPill name={genre.name} count={genre.count} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/genres"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              Browse all genres
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Recently Updated Section */}
      <motion.section
        className="py-16 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="text-primary" size={24} />
              <h2 className="text-3xl font-bold text-gray-900">
                Fresh updates
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out the latest chapters and new releases
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <NovelGrid type="new" />
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/updates"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/15 transition-colors font-medium"
            >
              See all updates
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-primary/8 via-accent/3 to-primary/8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-primary" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to organize your reading?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start tracking your novels, mark your progress, and never lose
              your place again. It's free and always will be.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <motion.button
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium text-lg shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get started
              </motion.button>
              <motion.button
                className="px-8 py-3 bg-white text-primary rounded-lg font-medium text-lg border border-primary/20 hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn more
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
