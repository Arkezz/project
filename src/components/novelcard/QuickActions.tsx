import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Heart, List, Check, Pause, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

type ReadingStatus = "reading" | "planning" | "completed" | "dropped" | null;

interface QuickActionsProps {
  novelId: string;
  show: boolean;
  onAction?: (type: "favorite" | "status", success: boolean) => void;
}

const statusConfig = {
  reading: {
    label: "Reading",
    icon: BookOpen,
    color: "bg-primary",
  },
  planning: {
    label: "Plan to Read",
    icon: List,
    color: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    icon: Check,
    color: "bg-emerald-500",
  },
  dropped: {
    label: "Dropped",
    icon: Pause,
    color: "bg-gray-500",
  },
} as const;

export default function QuickActions({
  novelId,
  show,
  onAction,
}: QuickActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    "favorite" | "status" | null
  >(null);

  const handleFavorite = async () => {
    if (loadingAction) return;

    try {
      setLoadingAction("favorite");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setIsFavorite((prev) => !prev);
      toast.success(
        !isFavorite ? "Added to favorites" : "Removed from favorites",
        {
          duration: 2000,
          className: "novel-toast",
          icon: !isFavorite ? "❤️" : "💔",
        }
      );

      onAction?.("favorite", true);
    } catch (error) {
      toast.error("Failed to update favorites", {
        duration: 3000,
        className: "novel-toast error",
      });
      onAction?.("favorite", false);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleStatusChange = async (status: ReadingStatus) => {
    if (loadingAction || status === readingStatus) return;

    try {
      setLoadingAction("status");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setReadingStatus(status);
      setShowStatusMenu(false);

      if (status) {
        const config = statusConfig[status];
        toast.success(`Added to ${config.label.toLowerCase()}`, {
          duration: 2000,
          className: "novel-toast",
          icon: React.createElement(config.icon, { size: 16 }),
        });
      } else {
        toast.success("Removed from reading list", {
          duration: 2000,
          className: "novel-toast",
        });
      }

      onAction?.("status", true);
    } catch (error) {
      toast.error("Failed to update reading status", {
        duration: 3000,
        className: "novel-toast error",
      });
      onAction?.("status", false);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute top-2 right-2 flex gap-1 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 hover:bg-white text-gray-700"
            } transition-colors shadow-sm backdrop-blur-sm disabled:opacity-50`}
            onClick={handleFavorite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loadingAction !== null}
          >
            {loadingAction === "favorite" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
            )}
          </motion.button>

          <div className="relative">
            <motion.button
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                readingStatus
                  ? statusConfig[readingStatus].color + " text-white"
                  : "bg-white/90 hover:bg-white text-gray-700"
              } transition-colors shadow-sm backdrop-blur-sm disabled:opacity-50`}
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loadingAction !== null}
            >
              {loadingAction === "status" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : readingStatus ? (
                React.createElement(statusConfig[readingStatus].icon, {
                  size: 14,
                })
              ) : (
                <List size={14} />
              )}
            </motion.button>

            <AnimatePresence>
              {showStatusMenu && (
                <motion.div
                  className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200/80 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="py-1 w-32 space-y-0.5">
                    {(
                      Object.entries(statusConfig) as [
                        ReadingStatus,
                        typeof statusConfig.reading
                      ][]
                    ).map(([status, config]) => (
                      <motion.button
                        key={status}
                        className={`w-full px-2 py-1.5 text-xs text-left flex items-center gap-1.5 transition-colors ${
                          readingStatus === status
                            ? `${config.color} text-white`
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleStatusChange(status)}
                        whileHover={{ x: 2 }}
                      >
                        <config.icon size={12} />
                        {config.label}
                      </motion.button>
                    ))}

                    {readingStatus && (
                      <>
                        <div className="h-px bg-gray-100 mx-2" />
                        <motion.button
                          className="w-full px-2 py-1.5 text-xs text-left text-red-600 hover:bg-gray-50 flex items-center gap-1.5"
                          onClick={() => handleStatusChange(null)}
                          whileHover={{ x: 2 }}
                        >
                          <X size={12} />
                          Remove
                        </motion.button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
