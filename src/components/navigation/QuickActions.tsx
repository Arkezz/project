import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickActionItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  badge?: string;
}

function QuickActionItem({
  icon: Icon,
  label,
  onClick,
  badge,
}: QuickActionItemProps) {
  return (
    <motion.button
      className="group relative bg-surface text-gray-700 p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={label}
    >
      <Icon size={20} />
      {badge && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );
}

interface QuickActionsProps {
  children: React.ReactNode;
}

function QuickActions({ children }: QuickActionsProps) {
  return <div className="flex flex-col items-end gap-3">{children}</div>;
}

QuickActions.Item = QuickActionItem;

export default QuickActions;
