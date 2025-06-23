import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  UserMinus,
  MessageSquare,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ExternalLink,
  Hash,
  Clock,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing?: boolean;
  followerCount?: number;
  joinDate?: string;
}

interface Thread {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  replyCount: number;
  viewCount: number;
  lastReply?: {
    author: string;
    content: string;
    date: string;
  };
}

interface Comment {
  id: string;
  content: string;
  threadTitle: string;
  threadId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

// Mock data
const mockFollowers: User[] = [
  {
    id: "1",
    username: "NovelEnthusiast",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=faces",
    bio: "Love reading cultivation novels and system stories. Always looking for recommendations!",
    followerCount: 234,
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    username: "DragonReader",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=160&h=160&fit=crop&crop=faces",
    bio: "Korean web novel translator and avid reader. Specializing in fantasy and romance.",
    followerCount: 567,
    joinDate: "2022-08-20",
  },
  {
    id: "3",
    username: "CultivationMaster",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
    bio: "Dao of reading novels. Currently at the peak of Mount TBR.",
    followerCount: 123,
    joinDate: "2023-03-10",
  },
];

const mockFollowing: User[] = [
  {
    id: "4",
    username: "TranslatorSage",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
    bio: "Professional translator for Chinese web novels. Quality over quantity!",
    isFollowing: true,
    followerCount: 1234,
    joinDate: "2021-05-12",
  },
  {
    id: "5",
    username: "NovelCritic",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces",
    bio: "Honest reviews and deep analysis of web novels. No spoilers, just quality insights.",
    isFollowing: true,
    followerCount: 890,
    joinDate: "2022-02-28",
  },
];

const mockThreads: Thread[] = [
  {
    id: "1",
    title: "Theory: The True Identity of the Black Dragon in TBATE Chapter 420",
    category: "Novel Discussion",
    createdAt: "2024-03-10T12:00:00Z",
    replyCount: 156,
    viewCount: 2345,
    lastReply: {
      author: "TheoryMaster",
      content:
        "I think you're onto something with the ancient prophecy connection...",
      date: "2024-03-12T08:30:00Z",
    },
  },
  {
    id: "2",
    title: "Best Cultivation Novels of 2024 - Updated List",
    category: "Recommendations",
    createdAt: "2024-03-08T15:30:00Z",
    replyCount: 89,
    viewCount: 1567,
    lastReply: {
      author: "CultivationFan",
      content:
        "Great list! I'd also add 'Martial Peak' to the recommendations.",
      date: "2024-03-11T14:20:00Z",
    },
  },
  {
    id: "3",
    title: "Translation Quality Discussion - What Makes a Good Translation?",
    category: "Translation",
    createdAt: "2024-03-05T09:15:00Z",
    replyCount: 234,
    viewCount: 3456,
    lastReply: {
      author: "TranslatorPro",
      content:
        "Consistency in terminology is absolutely crucial for reader immersion.",
      date: "2024-03-10T16:45:00Z",
    },
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This is exactly what I was thinking! The foreshadowing in the earlier chapters really supports this theory. Especially the part about the ancient bloodline...",
    threadTitle:
      "Theory: The True Identity of the Black Dragon in TBATE Chapter 420",
    threadId: "1",
    createdAt: "2024-03-11T10:30:00Z",
    upvotes: 45,
    downvotes: 2,
  },
  {
    id: "2",
    content:
      "I disagree with putting Martial Peak so high on the list. While it has good world-building, the repetitive plot structure really hurts the overall experience.",
    threadTitle: "Best Cultivation Novels of 2024 - Updated List",
    threadId: "2",
    createdAt: "2024-03-09T14:20:00Z",
    upvotes: 23,
    downvotes: 8,
  },
  {
    id: "3",
    content:
      "As someone who's been translating for 5+ years, I can't stress enough how important it is to maintain character voice consistency throughout the translation.",
    threadTitle:
      "Translation Quality Discussion - What Makes a Good Translation?",
    threadId: "3",
    createdAt: "2024-03-07T11:45:00Z",
    upvotes: 67,
    downvotes: 1,
  },
];

type SocialTab = "followers" | "following" | "threads" | "comments";
type SortOption =
  | "newest"
  | "oldest"
  | "most_active"
  | "most_viewed"
  | "most_upvoted";

interface UserCardProps {
  user: User;
  showFollowButton?: boolean;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
}

function UserCard({
  user,
  showFollowButton = true,
  onFollow,
  onUnfollow,
}: UserCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowAction = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (user.isFollowing) {
      onUnfollow?.(user.id);
      toast.success(`Unfollowed ${user.username}`);
    } else {
      onFollow?.(user.id);
      toast.success(`Now following ${user.username}`);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
      whileHover={{ y: -2 }}
      layout
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {user.username}
            </h3>
            {showFollowButton && (
              <motion.button
                onClick={handleFollowAction}
                disabled={isLoading}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  user.isFollowing
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : user.isFollowing ? (
                  <UserMinus size={14} />
                ) : (
                  <UserPlus size={14} />
                )}
                <span>{user.isFollowing ? "Unfollow" : "Follow"}</span>
              </motion.button>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{user.bio}</p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            {user.followerCount && (
              <span>{user.followerCount.toLocaleString()} followers</span>
            )}
            {user.joinDate && (
              <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ThreadCardProps {
  thread: Thread;
}

function ThreadCard({ thread }: ThreadCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
      whileHover={{ y: -2 }}
      layout
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
            {thread.title}
          </h3>
          <ExternalLink
            size={16}
            className="text-gray-400 flex-shrink-0 mt-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {thread.category}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(thread.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{thread.replyCount} replies</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{thread.viewCount.toLocaleString()} views</span>
            </div>
          </div>
        </div>

        {thread.lastReply && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600 line-clamp-2">
              <span className="font-medium">{thread.lastReply.author}:</span>{" "}
              {thread.lastReply.content}
            </p>
            <span className="text-xs text-gray-400 mt-1 block">
              {formatDate(thread.lastReply.date)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
      whileHover={{ y: -2 }}
      layout
    >
      <div className="space-y-3">
        <p className="text-gray-700 line-clamp-3">{comment.content}</p>

        <div className="flex items-center gap-2">
          <Hash size={14} className="text-gray-400" />
          <a
            href={`/thread/${comment.threadId}`}
            className="text-sm text-primary hover:text-primary/80 font-medium line-clamp-1 flex-1"
          >
            {comment.threadTitle}
          </a>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </span>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <ThumbsUp size={14} />
              <span>{comment.upvotes}</span>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <ThumbsDown size={14} />
              <span>{comment.downvotes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialTab() {
  const [activeTab, setActiveTab] = useState<SocialTab>("followers");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [followers, setFollowers] = useState(mockFollowers);
  const [following, setFollowing] = useState(mockFollowing);

  const handleFollow = (userId: string) => {
    // In a real app, this would make an API call
    console.log("Following user:", userId);
  };

  const handleUnfollow = (userId: string) => {
    setFollowing((prev) => prev.filter((user) => user.id !== userId));
  };

  const getSortOptions = (
    tab: SocialTab
  ): { value: SortOption; label: string }[] => {
    switch (tab) {
      case "followers":
      case "following":
        return [
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ];
      case "threads":
        return [
          { value: "newest", label: "Newest" },
          { value: "most_active", label: "Most Active" },
          { value: "most_viewed", label: "Most Viewed" },
        ];
      case "comments":
        return [
          { value: "newest", label: "Newest" },
          { value: "most_upvoted", label: "Most Upvoted" },
        ];
      default:
        return [];
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "followers":
        return (
          <div className="space-y-4">
            {followers.map((user) => (
              <UserCard key={user.id} user={user} showFollowButton={false} />
            ))}
          </div>
        );

      case "following":
        return (
          <div className="space-y-4">
            {following.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
              />
            ))}
          </div>
        );

      case "threads":
        return (
          <div className="space-y-4">
            {mockThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        );

      case "comments":
        return (
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getTabStats = (tab: SocialTab) => {
    switch (tab) {
      case "followers":
        return followers.length;
      case "following":
        return following.length;
      case "threads":
        return mockThreads.length;
      case "comments":
        return mockComments.length;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
          <Users className="text-blue-500" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Social Activity</h2>
          <p className="text-gray-600 text-sm">
            Connect with the community and track your engagement
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2">
          {[
            { id: "followers", label: "Followers", icon: Users },
            { id: "following", label: "Following", icon: UserPlus },
            { id: "threads", label: "Forum Posts", icon: MessageSquare },
            { id: "comments", label: "Comments", icon: MessageCircle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as SocialTab)}
              className={`relative flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors duration-200 ${
                activeTab === id
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
              <span className="text-sm text-gray-400">
                ({getTabStats(id as SocialTab)})
              </span>
              {activeTab === id && (
                <motion.div
                  layoutId="activeSocialTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          >
            {getSortOptions(activeTab).map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <motion.button
          className="px-6 py-3 bg-surface border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Load more
        </motion.button>
      </div>
    </div>
  );
}
