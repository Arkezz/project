import { useState } from "react";
import type { Notification } from "../types/notifications";

// Mock data - in a real app, this would come from an API
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "chapter",
    message: 'Chapter 324 of "The Beginning After The End" is now available',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    novel: {
      title: "The Beginning After The End",
      slug: "the-beginning-after-the-end",
    },
  },
  {
    id: "2",
    type: "reply",
    message:
      'NovelSage replied to your comment in "Theory: The True Identity of the Black Dragon"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    type: "chapter",
    message: 'Chapter 551 of "Omniscient Reader\'s Viewpoint" is now available',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: true,
    novel: {
      title: "Omniscient Reader's Viewpoint",
      slug: "omniscient-readers-viewpoint",
    },
  },
  {
    id: "4",
    type: "mention",
    message: "DragonHunter mentioned you in a thread",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    user: {
      id: "dragonhunter",
      name: "DragonHunter",
      avatar:
        "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b6232361-HMFWxCIxRFoI.png", // Random Pixiv image URL
    },
    read: true,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
  };
}
