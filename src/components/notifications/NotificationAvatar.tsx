import React from "react";
import { User } from "../../types/notifications";
import { motion } from "framer-motion";

interface NotificationAvatarProps {
  user?: User;
}

export default function NotificationAvatar({ user }: NotificationAvatarProps) {
  if (!user) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200" />
    );
  }

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-medium">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
