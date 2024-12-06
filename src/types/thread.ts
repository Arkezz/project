export interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  novel?: {
    title: string;
    slug: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  lastReply?: string;
  replyCount: number;
  viewCount: number;
  upvotes: number;
  isPinned?: boolean;
  isLocked?: boolean;
  isSolved?: boolean;
  comments: ThreadComment[];
}

export interface ThreadComment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  createdAt: string;
  upvotes: number;
  replies?: ThreadComment[];
}
