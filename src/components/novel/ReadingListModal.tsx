import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  Clock,
  BookOpen,
  Tag,
  Lock,
  X,
  Repeat,
  Eye,
  EyeOff,
  Globe,
} from "lucide-react";
import { format } from "date-fns";

interface ReadingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  novel: {
    title: string;
    originalTitle: string;
    cover: string;
    chapters: {
      total: number;
      latest: number;
    };
  };
}

const statusOptions = [
  {
    id: "planning",
    label: "Planning to Read",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "reading",
    label: "Currently Reading",
    color: "bg-green-50 text-green-700",
  },
  {
    id: "completed",
    label: "Completed",
    color: "bg-purple-50 text-purple-700",
  },
  { id: "onhold", label: "On Hold", color: "bg-yellow-50 text-yellow-700" },
  { id: "dropped", label: "Dropped", color: "bg-red-50 text-red-700" },
];

export default function ReadingListModal({
  isOpen,
  onClose,
  novel,
}: ReadingListModalProps) {
  const [status, setStatus] = React.useState("planning");
  const [currentChapter, setCurrentChapter] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [rereadCount, setRereadCount] = React.useState(0);

  const handleSave = () => {
    // Save logic here
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Enhanced Header */}
            <div className="relative">
              {/* Banner Background */}
              <div
                className="absolute inset-0 bg-cover bg-center h-32 blur-sm opacity-30"
                style={{ backgroundImage: `url(${novel.cover})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/5" />

              {/* Content */}
              <div className="relative p-6">
                <div className="flex gap-4">
                  <motion.img
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    src={novel.cover}
                    alt={novel.title}
                    className="w-24 h-36 object-cover rounded-lg shadow-xl ring-2 ring-white"
                  />
                  <div className="flex-1">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-900">
                        {novel.title}
                      </h2>
                      <p className="text-gray-600 font-kr mt-1">
                        {novel.originalTitle}
                      </p>

                      {/* Privacy Toggle */}
                      <div className="mt-4 flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsPrivate(!isPrivate)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            isPrivate
                              ? "bg-gray-900 text-white"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {isPrivate ? (
                            <>
                              <EyeOff size={16} />
                              Private
                            </>
                          ) : (
                            <>
                              <Globe size={16} />
                              Public
                            </>
                          )}
                        </motion.button>

                        {/* Reread Counter */}
                        <div className="flex items-center gap-2">
                          <Repeat size={16} className="text-gray-500" />
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                setRereadCount(Math.max(0, rereadCount - 1))
                              }
                              className="px-2 py-1 text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">
                              {rereadCount}x
                            </span>
                            <button
                              onClick={() => setRereadCount(rereadCount + 1)}
                              className="px-2 py-1 text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Reading Status */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Reading Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setStatus(option.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        status === option.id
                          ? option.color
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Progress
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max={novel.chapters.total}
                      value={currentChapter}
                      onChange={(e) =>
                        setCurrentChapter(Number(e.target.value))
                      }
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>Chapter {currentChapter}</span>
                      <span>of {novel.chapters.total}</span>
                    </div>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min="0"
                      max={novel.chapters.total}
                      value={currentChapter}
                      onChange={(e) =>
                        setCurrentChapter(Number(e.target.value))
                      }
                      className="form-input text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Dates and Rating */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= (hoverRating || rating)
                              ? "text-amber-400 fill-current"
                              : "text-gray-300"
                          } transition-colors`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your personal notes..."
                  className="form-input min-h-[100px] resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                Save to List
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
