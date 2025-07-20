import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Camera,
  Loader2,
  Sun,
  Moon,
  Laptop,
  Trash,
  Edit,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showUsernameChangeModal, setShowUsernameChangeModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [newUsernameRequest, setNewUsernameRequest] = useState("");
  const [usernameChangeReason, setUsernameChangeReason] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isSubmittingUsernameChange, setIsSubmittingUsernameChange] =
    useState(false);

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

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    setIsDeletingAccount(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Account deletion request submitted");
    setShowDeleteAccountModal(false);
    setDeleteConfirmation("");
    setIsDeletingAccount(false);
  };

  const handleUsernameChangeRequest = async () => {
    if (!newUsernameRequest.trim()) {
      toast.error("Please enter a new username");
      return;
    }

    if (!usernameChangeReason.trim()) {
      toast.error("Please provide a reason for the username change");
      return;
    }

    setIsSubmittingUsernameChange(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Username change request submitted for review");
    setShowUsernameChangeModal(false);
    setNewUsernameRequest("");
    setUsernameChangeReason("");
    setIsSubmittingUsernameChange(false);
  };

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Profile Settings
          </h2>

          {/* Profile Preview */}
          <div className="mb-6 sm:mb-8 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative h-32 sm:h-48 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
              {banner && (
                <img
                  src={banner}
                  alt="Profile Banner"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

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
                <div className="mx-4 sm:mx-6">
                  <div className="flex items-end justify-between pb-0">
                    <div className="relative">
                      <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
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

                    <div className="mb-3 sm:mb-4 ml-3 sm:ml-4 text-white flex-1">
                      <h3 className="text-lg sm:text-xl font-bold mb-1">
                        {displayName}
                      </h3>
                      <p className="text-sm opacity-90">@{username}</p>
                    </div>

                    {/* Preview Action Buttons */}
                    <div className="mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg shadow-lg">
                        <div className="w-4 h-4 bg-white/20 rounded" />
                        <span className="text-sm text-white font-medium">
                          Follow
                        </span>
                      </div>
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg">
                        <div className="w-4 h-4 bg-white/40 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 text-sm text-gray-600 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Bio Preview</h4>
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
              onClick={() => setShowDeleteAccountModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash size={18} />
              Delete Account
            </motion.button>

            <motion.button
              onClick={() => setShowUsernameChangeModal(true)}
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

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteAccountModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteAccountModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delete Account
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDeleteAccountModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">
                      This action cannot be undone
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>
                        • All your reading lists will be permanently deleted
                      </li>
                      <li>• Your reviews and comments will be removed</li>
                      <li>
                        • Your profile and all associated data will be lost
                      </li>
                      <li>• You will lose access to all premium features</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type{" "}
                      <span className="font-mono bg-gray-100 px-1 rounded">
                        DELETE
                      </span>{" "}
                      to confirm
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all"
                      placeholder="Type DELETE here"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <motion.button
                      onClick={() => setShowDeleteAccountModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleDeleteAccount}
                      disabled={
                        deleteConfirmation !== "DELETE" || isDeletingAccount
                      }
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isDeletingAccount ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash size={16} />
                          Delete Account
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Username Change Request Modal */}
      <AnimatePresence>
        {showUsernameChangeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUsernameChangeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Edit className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Request Username Change
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowUsernameChangeModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">
                      Username Change Policy
                    </h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>
                        • Username changes are reviewed by our moderation team
                      </li>
                      <li>• Processing typically takes 3-5 business days</li>
                      <li>
                        • You can only request a change once every 6 months
                      </li>
                      <li>
                        • The new username must be available and follow our
                        guidelines
                      </li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Username
                    </label>
                    <input
                      type="text"
                      value={newUsernameRequest}
                      onChange={(e) => setNewUsernameRequest(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      placeholder="Enter your desired username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Change
                    </label>
                    <textarea
                      value={usernameChangeReason}
                      onChange={(e) => setUsernameChangeReason(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                      placeholder="Please explain why you want to change your username..."
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <motion.button
                      onClick={() => setShowUsernameChangeModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleUsernameChangeRequest}
                      disabled={
                        !newUsernameRequest.trim() ||
                        !usernameChangeReason.trim() ||
                        isSubmittingUsernameChange
                      }
                      className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmittingUsernameChange ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Edit size={16} />
                          Submit Request
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
