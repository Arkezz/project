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
  CheckCircle2,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../../hooks/useAuth";
import PasskeyDisableModal from "../../auth/PasskeyDisableModal";

export default function SecuritySettings() {
  const { auth, setupPasskey, removePasskey } = useAuth();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasskeySetup, setShowPasskeySetup] = useState(false);
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false);
  const [showPasskeyDisableModal, setShowPasskeyDisableModal] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password updated successfully");
    }, 1500);
  };

  const handleSetupPasskey = async () => {
    setIsPasskeyLoading(true);
    const success = await setupPasskey();
    if (success) {
      setShowPasskeySetup(false);
    }
    setIsPasskeyLoading(false);
  };

  const handleRemovePasskey = async () => {
    setShowPasskeyDisableModal(true);
  };

  const handlePasskeyDisableSuccess = () => {
    // Refresh the component state or trigger a re-render
    toast.success("Passkey has been successfully disabled");
  };

  const isPasskeySupported =
    typeof window !== "undefined" && !!window.PublicKeyCredential;

  const togglePasskeySetup = () => {
    if (auth.user?.passkeyEnabled) {
      handleRemovePasskey();
    } else {
      setShowPasskeySetup(true);
    }
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
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

          {/* Passkey Authentication */}
          <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Key className="text-primary" size={20} />
                <h3 className="font-medium">Passkey Authentication</h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    auth.user?.passkeyEnabled
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {auth.user?.passkeyEnabled ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={togglePasskeySetup}
                  disabled={!isPasskeySupported || isPasskeyLoading}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    auth.user?.passkeyEnabled
                      ? "bg-green-500"
                      : "bg-gray-200 shadow-inner"
                  } disabled:opacity-50`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
                    animate={{ x: auth.user?.passkeyEnabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Use your device's biometrics or PIN for secure, passwordless
              authentication. Passkeys are more secure than passwords and can't
              be phished.
            </p>

            {!isPasskeySupported ? (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                <AlertTriangle size={16} />
                <span>Passkeys are not supported in your current browser</span>
              </div>
            ) : auth.user?.passkeyEnabled ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle2 size={16} />
                  <span>Passkey is active and ready to use</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Enhanced Security Active</p>
                    <p>Your account is protected with passkey authentication</p>
                  </div>
                  <motion.button
                    onClick={handleRemovePasskey}
                    disabled={isPasskeyLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 border border-red-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isPasskeyLoading ? (
                      <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Disable
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                  <AlertTriangle size={16} />
                  <span>Your account could be more secure with a passkey</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Passkey Not Set Up</p>
                    <p>Enable passkey for enhanced security and convenience</p>
                  </div>
                  <motion.button
                    onClick={() => setShowPasskeySetup(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={16} />
                    Set Up Passkey
                  </motion.button>
                </div>
              </div>
            )}
          </div>

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

        {/* Passkey Setup Modal */}
        {showPasskeySetup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Set Up Passkey</h3>
                <button
                  onClick={() => setShowPasskeySetup(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <AlertTriangle size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="text-blue-600" size={20} />
                  <div>
                    <p className="font-medium text-blue-900">
                      Enhanced Security
                    </p>
                    <p className="text-sm text-blue-700">
                      Passkeys can't be phished or stolen
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Smartphone className="text-green-600" size={20} />
                  <div>
                    <p className="font-medium text-green-900">Easy Access</p>
                    <p className="text-sm text-green-700">
                      Use biometrics or device PIN
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                <p className="text-sm text-amber-700">
                  Your device will prompt you to create a passkey using your
                  fingerprint, face recognition, or device PIN.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setShowPasskeySetup(false)}
                  disabled={isPasskeyLoading}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSetupPasskey}
                  disabled={isPasskeyLoading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isPasskeyLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <Key size={16} />
                      Set Up Passkey
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Passkey Disable Modal */}
        <PasskeyDisableModal
          isOpen={showPasskeyDisableModal}
          onClose={() => setShowPasskeyDisableModal(false)}
          onSuccess={handlePasskeyDisableSuccess}
        />
      </div>
    </>
  );
}
