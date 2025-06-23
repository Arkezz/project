import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Heart, X, GripVertical, BookOpen, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface FavoriteNovel {
  id: string;
  title: string;
  originalTitle?: string;
  cover: string;
  rating?: number;
  totalChapters?: number;
  status: "ongoing" | "completed" | "hiatus";
  addedDate: string;
}

// Mock data - in a real app, this would come from your API
const initialFavorites: FavoriteNovel[] = [
  {
    id: "1",
    title: "The Beginning After The End",
    originalTitle: "디 비기닝 애프터 디 엔드",
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=500",
    rating: 4.8,
    totalChapters: 420,
    status: "ongoing",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Omniscient Reader's Viewpoint",
    originalTitle: "전지적 독자 시점",
    cover:
      "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?q=80&w=500",
    rating: 4.9,
    totalChapters: 551,
    status: "completed",
    addedDate: "2024-01-10",
  },
  {
    id: "3",
    title: "Solo Leveling",
    originalTitle: "나 혼자만 레벨업",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500",
    rating: 4.7,
    totalChapters: 270,
    status: "completed",
    addedDate: "2024-01-08",
  },
  {
    id: "4",
    title: "Release That Witch",
    originalTitle: "放开那个女巫",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500",
    rating: 4.5,
    totalChapters: 1498,
    status: "completed",
    addedDate: "2024-01-05",
  },
  {
    id: "5",
    title: "Martial Peak",
    originalTitle: "武炼巅峰",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500",
    rating: 4.6,
    totalChapters: 6000,
    status: "ongoing",
    addedDate: "2024-01-03",
  },
];

const statusColors = {
  ongoing: "text-emerald-500",
  completed: "text-blue-500",
  hiatus: "text-amber-500",
} as const;

interface FavoriteCardProps {
  novel: FavoriteNovel;
  onRemove: (id: string) => void;
  isDragging?: boolean;
}

function FavoriteCard({ novel, onRemove, isDragging }: FavoriteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsRemoving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    onRemove(novel.id);
    toast.success(`Removed "${novel.title}" from favorites`, {
      icon: "💔",
      duration: 3000,
    });
  };

  return (
    <Reorder.Item
      value={novel}
      id={novel.id}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileDrag={{
        scale: 1.05,
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      dragListener={false}
      style={{
        opacity: isRemoving ? 0 : 1,
        transform: isRemoving ? "scale(0.8)" : "scale(1)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <motion.div
        className={`relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
          isDragging ? "cursor-grabbing" : "cursor-pointer"
        }`}
        whileHover={{ y: -4 }}
        layout
      >
        {/* Drag Handle */}
        <motion.div
          className="absolute top-2 left-2 z-20 p-1.5 bg-black/60 backdrop-blur-sm rounded-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onPointerDown={(e) =>
            e.currentTarget
              .closest('[data-framer-name="Reorder.Item"]')
              ?.dispatchEvent(
                new PointerEvent("pointerdown", {
                  pointerId: e.pointerId,
                  bubbles: true,
                })
              )
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <GripVertical size={14} className="text-white" />
        </motion.div>

        {/* Remove Button */}
        <motion.button
          onClick={handleRemove}
          className="absolute top-2 right-2 z-20 p-1.5 bg-red-500/90 backdrop-blur-sm text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isRemoving}
        >
          <X size={14} />
        </motion.button>

        {/* Cover Image */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={novel.cover}
            alt={novel.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Status Badge */}
          <div className="absolute bottom-2 left-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white`}
            >
              {novel.status === "ongoing"
                ? "Ongoing"
                : novel.status === "completed"
                  ? "Complete"
                  : "Hiatus"}
            </span>
          </div>

          {/* Favorite Heart */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Heart size={16} className="text-red-500 fill-current" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 space-y-2">
          <div>
            <h3
              className="font-medium text-sm leading-tight line-clamp-2 min-h-[2.5rem]"
              title={novel.title}
            >
              {novel.title}
            </h3>
            {novel.originalTitle && (
              <p
                className="text-xs text-gray-500 line-clamp-1 mt-1"
                title={novel.originalTitle}
              >
                {novel.originalTitle}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            {novel.totalChapters && (
              <div className="flex items-center gap-1 text-gray-600">
                <BookOpen size={12} />
                <span>{novel.totalChapters.toLocaleString()} ch</span>
              </div>
            )}

            {novel.rating && (
              <div className="flex items-center gap-1 text-amber-500">
                <span>★</span>
                <span className="font-medium">{novel.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary/30 rounded-xl" />
        )}
      </motion.div>
    </Reorder.Item>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Heart size={32} className="text-primary" />
      </motion.div>

      <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Start building your collection by adding novels you love to your
        favorites. They'll appear here for easy access.
      </p>

      <motion.button
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={18} />
        <span>Discover Novels</span>
      </motion.button>
    </motion.div>
  );
}

export default function FavoritesTab() {
  const [favorites, setFavorites] = useState<FavoriteNovel[]>(initialFavorites);
  const [isDragging, setIsDragging] = useState(false);

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((novel) => novel.id !== id));
  };

  const handleReorder = (newOrder: FavoriteNovel[]) => {
    setFavorites(newOrder);

    // Simulate saving to backend
    toast.success("Favorites order updated", {
      icon: "✨",
      duration: 2000,
    });
  };

  if (favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-lg">
            <Heart className="text-red-500" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Favorite Novels</h2>
            <p className="text-gray-600 text-sm">
              {favorites.length} novel{favorites.length !== 1 ? "s" : ""} in
              your favorites
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <GripVertical size={16} />
          <span>Drag to reorder</span>
        </div>
      </div>

      {/* Favorites Grid */}
      <Reorder.Group
        axis="y"
        values={favorites}
        onReorder={handleReorder}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4"
        layoutScroll
        style={{ overflow: "visible" }}
      >
        <AnimatePresence mode="popLayout">
          {favorites.map((novel) => (
            <FavoriteCard
              key={novel.id}
              novel={novel}
              onRemove={handleRemove}
              isDragging={isDragging}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Footer Info */}
      <div className="flex items-center justify-center pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Sparkles size={16} />
          <span>Your favorites are automatically synced across devices</span>
        </div>
      </div>
    </div>
  );
}
