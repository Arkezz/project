import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ViewAllButtonProps {
  href: string;
}

export default function ViewAllButton({ href }: ViewAllButtonProps) {
  return (
    <Link to={href}>
      <motion.button
        className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/90 transition-colors sm:px-6 sm:py-3 sm:text-base"
        whileHover={{ x: 4 }}
        whileTap={{ x: 0 }}
      >
        <span>View all</span>
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </motion.button>
    </Link>
  );
}
