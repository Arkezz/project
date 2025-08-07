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
  isDeleted?: boolean;
  deletionInfo?: {
    deletionType: "user" | "moderator" | "admin";
    deletedAt: string;
    deletedBy?: {
      name: string;
      role: "user" | "moderator" | "admin";
    };
    reason?: string;
  };
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
  parentId?: string;
  quotedContent?: string;
  quotedAuthor?: {
    name: string;
  };
  quotedTimestamp?: string;
  quotedIsDeleted?: boolean;
  quotedDeletionInfo?: {
    deletionType: "user" | "moderator" | "admin";
    deletedAt: string;
    deletedBy?: {
      name: string;
      role: "user" | "moderator" | "admin";
    };
  };
  replies?: ThreadComment[];
  isDeleted?: boolean;
  deletionInfo?: {
    deletionType: "user" | "moderator" | "admin";
    deletedAt: string;
    deletedBy?: {
      name: string;
      role: "user" | "moderator" | "admin";
    };
    reason?: string;
    originalContent?: string;
  };
}
