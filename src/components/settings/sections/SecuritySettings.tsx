import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Smartphone, Github, Key, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password updated successfully");
    }, 1500);
  };

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(is2FAEnabled ? "2FA disabled" : "2FA enabled");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

        {/* Password Change */}
        <form onSubmit={handlePasswordChange} className="space-y-4 mb-8">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Two-Factor Authentication */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              <h3 className="font-medium">Two-Factor Authentication</h3>
            </div>
            <button
              onClick={toggle2FA}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                is2FAEnabled ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: is2FAEnabled ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Add an extra layer of security to your account by requiring both
            your password and your phone.
          </p>
          {is2FAEnabled && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <Smartphone size={16} />
              <span>2FA is currently enabled</span>
            </div>
          )}
        </div>

        {/* Connected Accounts */}
        <div>
          <h3 className="font-medium mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {[
              { name: "GitHub", icon: Github, connected: true },
              // { name: 'Google', icon: Google, connected: false },
            ].map(({ name, icon: Icon, connected }) => (
              <div
                key={name}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{name}</span>
                </div>
                <button
                  className={`px-4 py-1.5 rounded-lg text-sm ${
                    connected
                      ? "border-2 border-red-200 text-red-600 hover:bg-red-50"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
