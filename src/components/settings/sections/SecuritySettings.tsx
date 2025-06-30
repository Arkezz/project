import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  MapPin,
  Clock,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function SecuritySettings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

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
    if (!is2FAEnabled) {
      setShowVerificationModal(true);
    } else {
      setIs2FAEnabled(false);
      toast.success("Two-factor authentication disabled");
    }
  };

  const confirmEnable2FA = () => {
    setShowVerificationModal(false);
    setIs2FAEnabled(true);
    toast.success("Two-factor authentication enabled");
  };

  const recentLogins = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Tokyo, Japan",
      ip: "192.168.1.xxx",
      time: "Today, 10:45 AM",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Tokyo, Japan",
      ip: "192.168.1.xxx",
      time: "Yesterday, 8:30 PM",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      location: "Osaka, Japan",
      ip: "192.168.2.xxx",
      time: "May 15, 2024, 3:20 PM",
      current: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

        {/* Password Change */}
        <form onSubmit={handlePasswordChange} className="space-y-4 mb-8">
          <h3 className="text-lg font-medium mb-4">Change Password</h3>

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
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Password strength:</p>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-3/4 rounded-full"></div>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-gray-500">
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Contains uppercase letters
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Contains numbers
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  Contains special characters
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Key size={18} />
                <span>Update Password</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Two-Factor Authentication */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              <h3 className="font-medium">Two-Factor Authentication</h3>
            </div>
            <button
              onClick={toggle2FA}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                is2FAEnabled ? "bg-green-500" : "bg-gray-200 shadow-inner"
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: is2FAEnabled ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Add an extra layer of security to your account by requiring both
            your password and a verification code from your phone.
          </p>
          {is2FAEnabled ? (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              <Smartphone size={16} />
              <span>2FA is currently enabled</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
              <AlertTriangle size={16} />
              <span>Your account is not fully protected</span>
            </div>
          )}
        </div>

        {/* Recent Login Activity */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Recent Login Activity</h3>
          <div className="space-y-4">
            {recentLogins.map((login) => (
              <div
                key={login.id}
                className={`p-4 rounded-lg border shadow-md ${login.current ? "border-green-300 bg-green-50" : "border-gray-200"}`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <MapPin size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{login.device}</p>
                        {login.current && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {login.location} • {login.ip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{login.time}</span>
                  </div>
                </div>
                {!login.current && (
                  <div className="mt-3 flex justify-end">
                    <motion.button
                      className="text-red-600 text-sm flex items-center gap-1 hover:underline"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogOut size={14} />
                      <span>Terminate Session</span>
                    </motion.button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <motion.button
              className="text-primary text-sm hover:underline flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View full login history
            </motion.button>
          </div>
        </div>
      </div>

      {/* 2FA Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              Enable Two-Factor Authentication
            </h3>
            <p className="text-gray-600 mb-6">
              Scan the QR code with an authenticator app like Google
              Authenticator or Authy to get your verification codes.
            </p>

            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gray-100 rounded-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  alt="2FA QR Code"
                  className="w-40 h-40"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                placeholder="Enter 6-digit code"
              />
            </div>

            <div className="flex justify-end gap-3">
              <motion.button
                onClick={() => setShowVerificationModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={confirmEnable2FA}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Verify & Enable
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
