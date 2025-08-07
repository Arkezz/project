import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import PasskeySetupPrompt from "./PasskeySetupPrompt";

interface EmailVerificationProps {
  email: string;
}

export default function EmailVerification({ email }: EmailVerificationProps) {
  const { resendVerification, verifyEmail } = useAuth();
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPasskeySetup, setShowPasskeySetup] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  // Simulate email verification check
  useEffect(() => {
    const checkVerification = setInterval(async () => {
      // In a real app, this would poll the server or use WebSocket
      // For demo, we'll simulate verification after 10 seconds
      const timeElapsed = 60 - countdown;
      if (timeElapsed > 10 && !isVerified) {
        setIsVerified(true);
        setShowPasskeySetup(true);
        clearInterval(checkVerification);
      }
    }, 1000);

    return () => clearInterval(checkVerification);
  }, [countdown, isVerified]);

  const handleResend = async () => {
    setIsResending(true);
    const success = await resendVerification();
    if (success) {
      setCountdown(60);
    }
    setIsResending(false);
  };

  if (showPasskeySetup) {
    return <PasskeySetupPrompt onSkip={() => setShowPasskeySetup(false)} />;
  }

  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Email Verified!
          </h3>
          <p className="text-green-700">
            Your email has been successfully verified. You can now access all
            features of NoviList.
          </p>
        </div>
      </motion.div>
    );
  }

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

        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Demo:</strong> Email verification will complete
            automatically in a few seconds.
          </p>
        </div>

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
