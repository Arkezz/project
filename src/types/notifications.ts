export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  type: "chapter" | "reply" | "mention" | "follow" | "other";
  message: string;
  timestamp: string;
  read: boolean;
  novel?: {
    title: string;
    slug: string;
    coverImage?: string;
  };
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
}
