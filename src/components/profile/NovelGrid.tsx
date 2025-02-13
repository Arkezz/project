import React from "react";
import { motion } from "framer-motion";
import NovelCard from "../NovelCard";
import novels from "../../data/novelData";

type ViewMode = "grid" | "list";
type ReadingStatus = "reading" | "completed" | "planning" | "paused";

interface NovelGridProps {
  viewMode: ViewMode;
  status: ReadingStatus;
}

export default function NovelGrid({ viewMode, status }: NovelGridProps) {
  // Filter novels based on status
  const filteredNovels = novels.filter(
    (novel) => novel.status.toLowerCase() === status
  );

  if (filteredNovels.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No novels found in this list.</p>
        <button className="mt-4 text-primary hover:underline">
          Browse novels to add
        </button>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          : "space-y-4"
      }
    >
      {filteredNovels.map((novel) => (
        <NovelCard key={novel.id} {...novel} />
      ))}
    </motion.div>
  );
}
