import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    const success = await resetPassword(email);

    if (success) {
      setIsSuccess(true);
    } else {
      setError("Failed to send reset email. Please try again.");
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setIsSuccess(false);
    setIsLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Reset Password
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </p>

                    <label
                      htmlFor="reset-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="reset-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="pl-10 pr-4 py-3 w-full rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Enter your email"
                        autoComplete="email"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>

                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isLoading || !email}
                      className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail size={16} />
                          Send Reset Link
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-50 rounded-full w-fit mx-auto">
                    <CheckCircle2 className="text-green-500" size={32} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Reset Link Sent!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We've sent a password reset link to{" "}
                      <strong>{email}</strong>. Check your inbox and follow the
                      instructions to reset your password.
                    </p>
                    <p className="text-sm text-gray-500">
                      Didn't receive the email? Check your spam folder or try
                      again in a few minutes.
                    </p>
                  </div>

                  <motion.button
                    onClick={handleClose}
                    className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Done
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
