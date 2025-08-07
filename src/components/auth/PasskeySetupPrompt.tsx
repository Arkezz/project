import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Key,
  Shield,
  Smartphone,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface PasskeySetupPromptProps {
  onSkip: () => void;
}

export default function PasskeySetupPrompt({
  onSkip,
}: PasskeySetupPromptProps) {
  const { setupPasskey } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSetupPasskey = async () => {
    setIsLoading(true);
    const success = await setupPasskey();

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    setIsLoading(false);
  };

  const handleSkip = () => {
    onSkip();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Passkey Setup Complete!
          </h3>
          <p className="text-green-700">
            Your passkey has been successfully configured. You can now use it
            for secure, passwordless authentication.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Redirecting you to your dashboard...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="text-primary" size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Secure Your Account with Passkeys
        </h3>
        <p className="text-gray-600">
          Set up a passkey for faster, more secure logins without passwords
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Shield className="text-blue-600 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Enhanced Security
            </h4>
            <p className="text-sm text-blue-700">
              Passkeys use advanced cryptography and can't be phished or stolen
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          <Smartphone className="text-green-600 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-green-900 mb-1">
              Convenient Access
            </h4>
            <p className="text-sm text-green-700">
              Use your fingerprint, face, or device PIN to sign in instantly
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <CheckCircle2 className="text-purple-600 mt-0.5" size={20} />
          <div>
            <h4 className="font-medium text-purple-900 mb-1">
              No More Passwords
            </h4>
            <p className="text-sm text-purple-700">
              Never worry about forgetting or managing passwords again
            </p>
          </div>
        </div>
      </div>

      {/* Browser Compatibility Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-700">
          <strong>Note:</strong> Passkeys work on modern browsers and devices
          with biometric capabilities. You can always use email & password as a
          backup.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <motion.button
          onClick={handleSetupPasskey}
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Setting up passkey...
            </>
          ) : (
            <>
              <Key size={18} />
              Set Up Passkey
              <ArrowRight size={16} />
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleSkip}
          disabled={isLoading}
          className="w-full border border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X size={16} />
          Skip for now
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        You can set up a passkey later in your security settings
      </p>
    </motion.div>
  );
}
