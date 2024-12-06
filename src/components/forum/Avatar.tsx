import React from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
  showBorder?: boolean;
  isOnline?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export default function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  className = "",
  showBorder = true,
  isOnline,
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const getFallback = () => {
    if (fallback) return fallback.slice(0, 2).toUpperCase();
    return alt.slice(0, 2).toUpperCase();
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {error || !src ? (
        <div
          className={`
            ${sizeMap[size]} 
            ${showBorder ? "ring-2 ring-gray-100" : ""} 
            ${className}
            flex items-center justify-center
            rounded-lg bg-gradient-to-br from-primary/10 to-primary/20
            text-primary font-medium
          `}
          title={alt}
        >
          {fallback ? (
            <span className="text-sm">{getFallback()}</span>
          ) : (
            <User className="w-1/2 h-1/2" />
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={`
            ${sizeMap[size]} 
            ${showBorder ? "ring-2 ring-gray-100" : ""} 
            ${className}
            rounded-lg object-cover bg-transparent
          `}
        />
      )}

      {isOnline && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
      )}
    </motion.div>
  );
}
