import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  BookMarked,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

type VerificationState =
  | "loading"
  | "success"
  | "error"
  | "expired"
  | "already-verified";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, resendVerification } = useAuth();

  const [verificationState, setVerificationState] =
    useState<VerificationState>("loading");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token) {
      setVerificationState("error");
      setErrorMessage("Invalid verification link. No token provided.");
      return;
    }

    verifyToken();
  }, [token]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const verifyToken = async () => {
    try {
      setVerificationState("loading");

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!token) {
        throw new Error("No token provided");
      }

      // Simulate different scenarios based on token value for demo
      if (token === "expired") {
        setVerificationState("expired");
        setErrorMessage(
          "This verification link has expired. Please request a new one."
        );
      } else if (token === "invalid") {
        setVerificationState("error");
        setErrorMessage(
          "Invalid verification token. Please check your link or request a new one."
        );
      } else if (token === "already-verified") {
        setVerificationState("already-verified");
      } else {
        // Successful verification
        const success = await verifyEmail(token);
        if (success) {
          setVerificationState("success");
          toast.success("Email verified successfully!");
        } else {
          throw new Error("Verification failed");
        }
      }
    } catch (error) {
      setVerificationState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again."
      );
      toast.error("Email verification failed");
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Email address not found. Please sign up again.");
      return;
    }

    setIsResending(true);
    try {
      const success = await resendVerification();
      if (success) {
        setCountdown(60);
        toast.success("Verification email sent! Check your inbox.");
      }
    } catch (error) {
      toast.error("Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (verificationState) {
      case "loading":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Your Email
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verified Successfully!
              </h1>
              <p className="text-gray-600">
                Your email has been verified. You can now access all features of
                NoviList.
              </p>
            </div>
            <div className="space-y-3">
              <motion.button
                onClick={handleContinue}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to NoviList
                <ArrowRight size={18} />
              </motion.button>
              <p className="text-sm text-gray-500">
                Welcome to the community of novel enthusiasts!
              </p>
            </div>
          </motion.div>
        );

      case "already-verified":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Already Verified
              </h1>
              <p className="text-gray-600">
                Your email address has already been verified. You can sign in to
                your account.
              </p>
            </div>
            <div className="space-y-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        );

      case "expired":
      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {verificationState === "expired"
                  ? "Link Expired"
                  : "Verification Failed"}
              </h1>
              <p className="text-gray-600 mb-4">{errorMessage}</p>
            </div>

            {email && (
              <div className="space-y-3">
                <motion.button
                  onClick={handleResendVerification}
                  disabled={isResending || countdown > 0}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw size={18} />
                      Resend in {countdown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />
                      Resend Verification Email
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-gray-500">
                  We'll send a new verification link to {email}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Need to sign up again?
              </Link>
            </div>
          </motion.div>
        );

      default:
        return null;
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
        </div>

        {/* Main Content */}
        <div className="bg-surface rounded-xl shadow-lg p-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link to="/support" className="text-primary hover:text-primary/80">
              Contact Support
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
