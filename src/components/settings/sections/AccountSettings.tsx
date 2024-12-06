import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AccountSettings() {
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState("/default-avatar.jpg");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload
      setTimeout(() => {
        setAvatar(URL.createObjectURL(file));
        setIsUploading(false);
        toast.success("Profile picture updated successfully");
      }, 1500);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 5242880, // 5MB
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

        {/* Profile Picture */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div
                {...getRootProps()}
                className={`
                  absolute inset-0 rounded-full flex items-center justify-center
                  bg-black/50 opacity-0 hover:opacity-100 transition-opacity
                  cursor-pointer
                `}
              >
                <input {...getInputProps()} />
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1 text-sm text-gray-600">
              <p className="mb-1">Upload a new profile picture</p>
              <p>JPG, PNG or GIF. Maximum file size 5MB.</p>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="mb-6">
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
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              placeholder="Enter username"
            />
            {isCheckingUsername && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bio
          </label>
          <div className="relative">
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
              placeholder="Tell us about yourself..."
            />
            <span className="absolute bottom-2 right-2 text-xs text-gray-400">
              {bio.length}/160
            </span>
          </div>
        </div>

        {/* Save Button */}
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      {/* Danger Zone */}
      <div className="pt-8 border-t border-gray-200">
        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
        <button className="px-6 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
