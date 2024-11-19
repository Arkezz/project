import { motion } from 'framer-motion';
import React from 'react';

interface CategoryPillProps {
  name: string;
  count: number;
}

export default function CategoryPill({ name, count }: CategoryPillProps) {
  return (
    <motion.button
      className="px-4 py-2 rounded-full bg-surface hover:bg-primary/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="font-medium">{name}</span>
      <span className="ml-2 text-sm text-gray-500">({count})</span>
    </motion.button>
  );
}