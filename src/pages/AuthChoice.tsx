import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookMarked, Key, Mail, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function AuthChoice() {
  const [rememberPreference, setRememberPreference] = useState(false);
  const [isPasskeySupported, setIsPasskeySupported] = useState(
    typeof window !== "undefined" && !!window.PublicKeyCredential
  );
  const navigate = useNavigate();
  const { loginWithPasskey } = useAuth();

  const handlePasskeyLogin = async () => {
    const success = await loginWithPasskey();
    if (success) {
      navigate("/");
    }
  };

  const handleMethodChoice = (method: "email" | "passkey") => {
    if (rememberPreference) {
      localStorage.setItem("preferred_auth_method", method);
    }

    if (method === "email") {
      navigate("/login");
    } else {
      handlePasskeyLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookMarked className="text-primary" size={32} />
            <h1 className="text-2xl font-bold">NoviList</h1>
          </div>
          <p className="text-gray-600">Choose your preferred login method</p>
        </div>

        <div className="bg-surface rounded-xl shadow-lg p-8 space-y-6">
          {/* Passkey Option */}
          {isPasskeySupported && (
            <motion.button
              onClick={() => handleMethodChoice("passkey")}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Key className="text-primary" size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Login with Passkey
                  </h3>
                  <p className="text-sm text-gray-600">
                    Secure, fast authentication using your device's biometrics
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield size={14} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      Most Secure
                    </span>
                  </div>
                </div>
                <ArrowRight
                  className="text-gray-400 group-hover:text-primary transition-colors"
                  size={20}
                />
              </div>
            </motion.button>
          )}

          {/* Email & Password Option */}
          <motion.button
            onClick={() => handleMethodChoice("email")}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Mail className="text-gray-600" size={24} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Login with Email & Password
                </h3>
                <p className="text-sm text-gray-600">
                  Traditional login method with your email and password
                </p>
              </div>
              <ArrowRight
                className="text-gray-400 group-hover:text-primary transition-colors"
                size={20}
              />
            </div>
          </motion.button>

          {/* Remember Preference */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberPreference}
              onChange={(e) => setRememberPreference(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary/20"
            />
            <span className="text-sm text-gray-600">
              Remember my preference for next time
            </span>
          </label>

          {/* Browser Compatibility Notice */}
          {!isPasskeySupported && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-700">
                <strong>Note:</strong> Passkey authentication is not supported
                in your current browser. Please use email & password login or
                update to a modern browser.
              </p>
            </div>
          )}

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
