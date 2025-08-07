import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookMarked,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EmailVerification from "../components/auth/EmailVerification";
import FormValidation from "../components/auth/FormValidation";
import PasswordStrength from "../components/auth/PasswordStrength";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    };
  };

  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setIsUsernameChecking(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - "admin" and "test" are taken
    const taken = ["admin", "test", "user"].includes(username.toLowerCase());
    setUsernameAvailable(!taken);
    setIsUsernameChecking(false);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameAvailable(null);

    // Debounce username check
    const timeoutId = setTimeout(() => {
      checkUsernameAvailability(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (!email)
      validationErrors.push({ field: "email", message: "Email is required" });
    else if (!validateEmail(email))
      validationErrors.push({
        field: "email",
        message: "Please enter a valid email address",
      });

    if (!username)
      validationErrors.push({
        field: "username",
        message: "Username is required",
      });
    else if (username.length < 3)
      validationErrors.push({
        field: "username",
        message: "Username must be at least 3 characters long",
      });
    else if (usernameAvailable === false)
      validationErrors.push({
        field: "username",
        message: "Username is already taken",
      });

    if (!password)
      validationErrors.push({
        field: "password",
        message: "Password is required",
      });
    else if (!validatePassword(password).isValid)
      validationErrors.push({
        field: "password",
        message: "Password does not meet security requirements",
      });

    if (password !== confirmPassword)
      validationErrors.push({
        field: "confirmPassword",
        message: "Passwords do not match",
      });

    if (!agreeToTerms)
      validationErrors.push({
        field: "agreeToTerms",
        message: "You must agree to the terms",
      });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);

    const success = await register({
      email,
      username,
      password,
      confirmPassword,
    });

    if (success) {
      setVerificationSent(true);
    }

    setIsLoading(false);
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
          <p className="text-gray-600">
            Join the community of novel enthusiasts
          </p>
        </div>

        <AnimatePresence mode="wait">
          {verificationSent ? (
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface rounded-xl shadow-lg p-8 text-center"
            >
              <EmailVerification email={email} />
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Return to login
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface rounded-xl shadow-lg p-8"
            >
              <FormValidation errors={errors} />
              <form className="space-y-6" onSubmit={handleSignup}>
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
                      disabled={isLoading}
                      className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    {email && validateEmail(email) && (
                      <CheckCircle2
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                        size={18}
                      />
                    )}
                  </div>
                </div>

                {/* Username Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      disabled={isLoading}
                      className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isUsernameChecking ? (
                        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                      ) : usernameAvailable === true ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : usernameAvailable === false ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      ) : null}
                    </div>
                  </div>
                  {username.length >= 3 && usernameAvailable !== null && (
                    <p
                      className={`text-xs ${usernameAvailable ? "text-green-600" : "text-red-600"}`}
                    >
                      {usernameAvailable
                        ? "Username is available"
                        : "Username is already taken"}
                    </p>
                  )}
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
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      disabled={isLoading}
                      className="pl-10 pr-12 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <PasswordStrength
                    password={password}
                    isVisible={isPasswordFocused}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className="pl-10 pr-12 py-2 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-600">
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword &&
                    password === confirmPassword &&
                    password.length > 0 && (
                      <p className="text-xs text-green-600">Passwords match</p>
                    )}
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

                {/* Terms Agreement */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    disabled={isLoading}
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to NoviList's{" "}
                    <Link
                      to="/terms"
                      className="text-primary hover:text-primary/80"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:text-primary/80"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Sign Up Button */}
                <motion.button
                  type="submit"
                  disabled={
                    !agreeToTerms || isLoading || usernameAvailable === false
                  }
                  className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Log in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
