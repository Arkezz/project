import { motion } from "framer-motion";
import React from "react";

interface ProgressBarProps {
  progress: number;
  status: "reading" | "completed" | "paused" | "on_hold";
}

const statusColors = {
  reading: "bg-primary",
  completed: "bg-emerald-500",
  paused: "bg-amber-500",
  on_hold: "bg-gray-400",
} as const;

export default function ProgressBar({ progress, status }: ProgressBarProps) {
  if (progress === 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
      <motion.div
        className={`h-full bg-[#42758F]`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
