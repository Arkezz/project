import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookMarked, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import FormValidation from "../components/auth/FormValidation";
import { useAuth } from "../hooks/useAuth";
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isRateLimited) {
      return;
    }

    const validationErrors = [];

    if (!email)
      validationErrors.push({ field: "email", message: "Email is required" });
    else if (!/\S+@\S+\.\S+/.test(email))
      validationErrors.push({
        field: "email",
        message: "Email format is invalid",
      });

    if (!password)
      validationErrors.push({
        field: "password",
        message: "Password is required",
      });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);

    const success = await login({ email, password, rememberMe });

    if (success) {
      navigate("/");
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsRateLimited(true);
        setTimeout(() => {
          setIsRateLimited(false);
          setLoginAttempts(0);
        }, 300000); // 5 minutes
      }
    }

    setIsLoading(false);
  };

  return (
    <>
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
            <p className="text-gray-600">
              Welcome back to your reading journey
            </p>
            <Link
              to="/auth-choice"
              className="text-sm text-primary hover:text-primary/80 transition-colors mt-2 inline-block"
            >
              ← Choose different login method
            </Link>
          </div>

          {/* Login Form */}
          <div className="bg-surface rounded-xl shadow-lg p-8">
            <FormValidation errors={errors} />

            {/* Rate Limiting Warning */}
            {isRateLimited && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">
                  Too many failed login attempts. Please wait 5 minutes before
                  trying again.
                </p>
              </div>
            )}

            {loginAttempts > 0 && loginAttempts < 5 && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-600">
                  {5 - loginAttempts} login attempts remaining before temporary
                  lockout.
                </p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || isRateLimited}
                    className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isRateLimited}
                    className="pl-10 pr-12 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || isRateLimited}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading || isRateLimited}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  disabled={isLoading || isRateLimited}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Captcha Box */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-200 animate-pulse" />
                    <span className="text-sm text-gray-600">
                      I'm not a robot
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">reCAPTCHA</div>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading || isRateLimited}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 space-y-4 text-center">
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            By logging in, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:text-primary/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}
