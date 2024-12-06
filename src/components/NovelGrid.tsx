import { motion } from "framer-motion";
import React from "react";
import NovelCard from "./NovelCard";
import novels from "../data/novelData";

interface NovelGridProps {
  type: "trending" | "new" | "regional" | "reading" | "completed";
}

export default function NovelGrid({ type }: NovelGridProps) {
  return (
    <motion.div
      className="w-full p-0 m-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {novels.slice(0, 6).map((novel) => (
        <NovelCard key={novel.id} {...novel} />
      ))}
    </motion.div>
  );
}

