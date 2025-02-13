import React from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Edit,
  Settings,
  BookOpen,
  Trophy,
  Globe,
  MessageCircle,
} from "lucide-react";

export default function ProfileHeader() {
  const defaultBanner =
    "https://s4.anilist.co/file/anilistcdn/user/banner/b749709-NL5ZKZoCj9AU.jpg";
  const defaultAvatar =
    "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b749709-d10WtjTrjyWK.png";

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-64 md:h-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <img
          src={defaultBanner}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors">
          <Camera size={20} />
        </button>

        {/* Currently Reading Badge */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="px-3 py-1 text-xs text-white/80">
            Currently Reading
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-white/10 transition-colors cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=100"
              alt="Currently Reading"
              className="w-10 h-14 object-cover rounded"
            />
            <div>
              <p className="text-sm text-white font-medium line-clamp-1">
                The Beginning After The End
              </p>
              <p className="text-xs text-white/80">Chapter 324</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-4 md:pb-6">
            <div className="flex items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface overflow-hidden">
                  <img
                    src={defaultAvatar}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-surface hover:bg-gray-50 rounded-full shadow-md transition-colors">
                  <Camera size={16} className="text-gray-600" />
                </button>

                {/* Level Badge */}
                <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                  Lv. 42
                </div>
              </motion.div>

              <div className="ml-4 md:ml-6 text-white">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold">John Doe</h1>
                  <div className="flex gap-1">
                    <Trophy size={16} className="text-amber-400" />
                    <span className="text-sm text-white/90">Novel Sage</span>
                  </div>
                </div>
                <p className="text-white/80 mt-1">
                  Cultivation Expert • Joined March 2024
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-2">
                  <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <Globe size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <MessageCircle size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <BookOpen size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <button className="btn-primary">Edit Profile</button>
              <button className="p-2.5 bg-surface/80 hover:bg-surface rounded-lg transition-colors">
                <Settings size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
