import React, { useState } from "react";
import {
  AlertTriangle,
  Bookmark,
  BookOpen,
  ChevronDown,
  Heart,
  List,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ReadingListModal from "./ReadingListModal";

interface NovelHeaderProps {
  title: string;
  originalTitle: string;
  cover: string;
  status: string;
  type: string;
  rating: number;
  totalRatings: number;
  chapters: {
    total: number;
    latest: number;
  };
  activeReaders: number;
}

interface ReadingList {
  id: string;
  name: string;
  color: string;
}

export default function NovelHeader({
  title,
  originalTitle,
  cover,
  status,
  type,
  rating,
  totalRatings,
  chapters,
  activeReaders,
  isAdult,
}: NovelHeaderProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showListOptions, setShowListOptions] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(
      isFavorited ? "Removed from favorites" : "Added to favorites",
      {
        icon: "❤️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  const readingLists: ReadingList[] = [
    { id: "planning", name: "Planning to Read", color: "text-blue-600" },
    { id: "reading", name: "Currently Reading", color: "text-green-600" },
    { id: "completed", name: "Completed", color: "text-purple-600" },
    { id: "onhold", name: "On Hold", color: "text-yellow-600" },
    { id: "dropped", name: "Dropped", color: "text-red-600" },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowListOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-20"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="absolute inset-0 bg-banner" />

      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 h-72 rounded-lg overflow-hidden shadow-lg flex-shrink-0 relative group"
          >
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <motion.div
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              initial={false}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white"
              >
                <Heart size={32} fill={isFavorited ? "currentColor" : "none"} />
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="flex-1 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium"
              >
                {status}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="px-2 py-1 bg-surface shadow-sm rounded text-sm"
              >
                {type}
              </motion.span>
              {isAdult && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium flex items-center gap-1.5"
                >
                  <AlertTriangle size={14} />
                  18+
                </motion.span>
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 text-text"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-4 font-kr"
            >
              {originalTitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 text-text"
            >
              <div className="flex items-center gap-2">
                <Star className="text-amber-500" fill="currentColor" />
                <span className="font-medium">{rating}</span>
                <span className="text-sm text-gray-500">
                  ({totalRatings.toLocaleString()} ratings)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <span>Ch. {chapters.total}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{(activeReaders / 1000).toFixed(1)}K readers</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mt-6"
            >
              <div className="relative flex" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(true)}
                  className="btn-primary flex items-center gap-2 rounded-r-none border-r border-primary/20"
                >
                  <List size={20} />
                  Add to Reading List
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowListOptions(!showListOptions)}
                  className="btn-primary px-3 rounded-l-none"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      showListOptions ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>
                <AnimatePresence>
                  {showListOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-12 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 w-48"
                    >
                      <div className="py-1">
                        {readingLists.map((list) => (
                          <motion.button
                            key={list.id}
                            whileHover={{ x: 4 }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 group"
                          >
                            <Bookmark size={16} className={list.color} />
                            <span className="text-sm">{list.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isFavorited
                    ? "bg-red-50 text-red-500"
                    : "bg-surface hover:bg-gray-100"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFavorited ? "filled" : "outline"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Heart
                      size={20}
                      fill={isFavorited ? "currentColor" : "none"}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <ReadingListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        novel={{ title, originalTitle, cover, chapters }}
      />
    </div>
  );
}
