import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Loader2, Sun, Moon, Laptop, Trash, Edit } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import MDEditor from "@uiw/react-md-editor";

export default function AccountSettings() {
  const [isUploading, setIsUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b749709-d10WtjTrjyWK.png"
  );
  const [banner, setBanner] = useState(
    "https://s4.anilist.co/file/anilistcdn/user/banner/b749709-NL5ZKZoCj9AU.jpg"
  );
  const [username, setUsername] = useState("NovelReader");
  const [displayName, setDisplayName] = useState("Novel Reader");
  const [bio, setBio] = useState(
    "I'm an avid reader of web novels, particularly enjoying fantasy and progression genres. Currently reading The Beginning After The End and Omniscient Reader's Viewpoint."
  );
  const [theme, setTheme] = useState("system");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const onAvatarDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Avatar image must be less than 5MB");
        return;
      }

      setIsUploading(true);
      // Simulate upload
      setTimeout(() => {
        setAvatar(URL.createObjectURL(file));
        setIsUploading(false);
        toast.success("Profile picture updated successfully");
      }, 1500);
    }
  }, []);

  const onBannerDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        toast.error("Banner image must be less than 8MB");
        return;
      }

      setIsBannerUploading(true);
      // Simulate upload
      setTimeout(() => {
        setBanner(URL.createObjectURL(file));
        setIsBannerUploading(false);
        toast.success("Banner image updated successfully");
      }, 1800);
    }
  }, []);

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({
    onDrop: onAvatarDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onBannerDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 8 * 1024 * 1024, // 8MB
    multiple: false,
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (value.length >= 3) {
      setIsCheckingUsername(true);
      // Simulate API check
      setTimeout(() => {
        setIsCheckingUsername(false);
        if (value === "taken") {
          toast.error("Username is already taken");
        }
      }, 1000);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(
      `Theme changed to ${newTheme === "system" ? "system default" : newTheme}`
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Profile Settings
        </h2>

        {/* Profile Preview */}
        <div className="mb-6 sm:mb-8 bg-gray-50 rounded-xl overflow-hidden">
          <div className="relative h-32 sm:h-48 bg-gradient-to-r from-primary/10 to-primary/5">
            {banner && (
              <img
                src={banner}
                alt="Profile Banner"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

            <div
              {...getBannerRootProps()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <input {...getBannerInputProps()} />
              {isBannerUploading ? (
                <motion.div
                  className="bg-black/70 backdrop-blur-sm p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  className="bg-black/70 backdrop-blur-sm p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-3 sm:mx-4">
                <div className="flex items-end">
                  <div className="relative">
                    <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full overflow-hidden">
                      <img
                        src={avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      {...getAvatarRootProps()}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                    >
                      <input {...getAvatarInputProps()} />
                      {isUploading ? (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 sm:mb-4 ml-3 sm:ml-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold">
                      {displayName}
                    </h3>
                    <p className="text-sm opacity-90">@{username}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 text-sm text-gray-600">
            <p className="line-clamp-3 sm:line-clamp-2">
              {bio.length > 100 ? bio.substring(0, 100) + "..." : bio}
            </p>
          </div>
        </div>

        {/* Username */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-base"
              placeholder="Enter username"
            />
            {isCheckingUsername && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            This will be your unique identifier on NoviList
          </p>
        </div>

        {/* Display Name */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-base"
            placeholder="Enter display name"
          />
        </div>

        {/* Bio */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bio
          </label>
          <div
            data-color-mode="light"
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <MDEditor
              value={bio}
              onChange={(value) => setBio(value || "")}
              preview="edit"
              height={200}
              className="prose max-w-none"
              data-color-mode="light"
              visibleDragBar={false}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 leading-relaxed">
            Markdown supported. Tell others about yourself and your reading
            preferences. Keep it concise and engaging.
          </p>
        </div>

        {/* Theme Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Theme
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.button
              onClick={() => handleThemeChange("light")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                theme === "light"
                  ? "border-primary bg-primary/5 text-primary shadow-md"
                  : "border-gray-200 hover:border-primary/30 text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sun size={18} className="flex-shrink-0" />
              <span className="font-medium">Light</span>
            </motion.button>

            <motion.button
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                theme === "dark"
                  ? "border-primary bg-primary/5 text-primary shadow-md"
                  : "border-gray-200 hover:border-primary/30 text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Moon size={18} className="flex-shrink-0" />
              <span className="font-medium">Dark</span>
            </motion.button>

            <motion.button
              onClick={() => handleThemeChange("system")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                theme === "system"
                  ? "border-primary bg-primary/5 text-primary shadow-md"
                  : "border-gray-200 hover:border-primary/30 text-gray-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Laptop size={18} className="flex-shrink-0" />
              <span className="font-medium">System</span>
            </motion.button>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save Changes
        </motion.button>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 sm:pt-8 border-t border-gray-200">
        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash size={18} />
            Delete Account
          </motion.button>

          <motion.button
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-amber-200 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit size={18} />
            Request Username Change
          </motion.button>
        </div>
      </div>
    </div>
  );
}
