import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmailVerificationProps {
  email: string;
}

export default function EmailVerification({ email }: EmailVerificationProps) {
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Verification email sent successfully!");
      setCountdown(60);
    } catch (error) {
      toast.error("Failed to send verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-surface rounded-lg shadow-sm border border-gray-200"
      >
        <Mail className="mx-auto mb-4 text-primary" size={32} />
        <h3 className="text-lg font-semibold mb-2">Check your email</h3>
        <p className="text-gray-600 mb-4">
          We've sent a verification link to
          <br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>

        <button
          onClick={handleResend}
          disabled={countdown > 0 || isResending}
          className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Mail size={18} />
          )}
          {countdown > 0
            ? `Resend in ${countdown}s`
            : "Resend verification email"}
        </button>
      </motion.div>
    </div>
  );
}
