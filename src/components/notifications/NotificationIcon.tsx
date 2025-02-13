import React from "react";
import { BookOpen, MessageCircle, Star, Users, Bell } from "lucide-react";

const iconMap = {
  chapter: BookOpen,
  reply: MessageCircle,
  mention: Star,
  follow: Users,
  other: Bell,
} as const;

const colorMap = {
  chapter: "text-primary",
  reply: "text-blue-500",
  mention: "text-amber-500",
  follow: "text-green-500",
  other: "text-gray-400",
} as const;

interface NotificationIconProps {
  type: keyof typeof iconMap;
  size?: number;
}

export default function NotificationIcon({
  type,
  size = 20,
}: NotificationIconProps) {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  return <Icon className={colorClass} size={size} />;
}
