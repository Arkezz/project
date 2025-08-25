import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  Shield,
  Key,
  Loader2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

interface PasskeyDisableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type ConfirmationMethod = "password" | "type-disable";

export default function PasskeyDisableModal({
  isOpen,
  onClose,
  onSuccess,
}: PasskeyDisableModalProps) {
  const { removePasskey, auth } = useAuth();
  const [confirmationMethod, setConfirmationMethod] =
    useState<ConfirmationMethod>("password");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [typeConfirmation, setTypeConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleClose = () => {
    setPassword("");
    setTypeConfirmation("");
    setErrors([]);
    setIsLoading(false);
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (confirmationMethod === "password") {
      if (!password.trim()) {
        newErrors.push("Password is required to disable passkey");
      }
    } else {
      if (typeConfirmation !== "DISABLE") {
        newErrors.push('Please type "DISABLE" exactly to confirm');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleDisablePasskey = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      // Simulate password verification for demo
      if (confirmationMethod === "password") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate password validation (in real app, this would be server-side)
        if (password !== "password") {
          // Demo password
          throw new Error("Incorrect password");
        }
      }

      // Remove the passkey
      const success = await removePasskey();

      if (success) {
        toast.success("Passkey has been disabled successfully");
        onSuccess?.();
        handleClose();
      } else {
        throw new Error("Failed to disable passkey");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to disable passkey";
      setErrors([errorMessage]);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Disable Passkey
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Warning Section */}
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-800 mb-2">
                      Security Warning
                    </h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>
                        • You'll lose the enhanced security of passkey
                        authentication
                      </li>
                      <li>
                        • You'll need to rely on email and password for login
                      </li>
                      <li>
                        • Your account will be more vulnerable to phishing
                        attacks
                      </li>
                      <li>
                        • You can re-enable passkey authentication anytime
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Confirmation Method Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose confirmation method:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="confirmationMethod"
                      value="password"
                      checked={confirmationMethod === "password"}
                      onChange={(e) =>
                        setConfirmationMethod(
                          e.target.value as ConfirmationMethod
                        )
                      }
                      className="text-primary focus:ring-primary/20"
                    />
                    <Lock size={18} className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Confirm with Password
                      </p>
                      <p className="text-sm text-gray-600">
                        Enter your account password
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="confirmationMethod"
                      value="type-disable"
                      checked={confirmationMethod === "type-disable"}
                      onChange={(e) =>
                        setConfirmationMethod(
                          e.target.value as ConfirmationMethod
                        )
                      }
                      className="text-primary focus:ring-primary/20"
                    />
                    <Key size={18} className="text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Type Confirmation
                      </p>
                      <p className="text-sm text-gray-600">
                        Type "DISABLE" to confirm
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Confirmation Input */}
              <div className="mb-6">
                {confirmationMethod === "password" ? (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Enter your password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
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
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="typeConfirmation"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Type{" "}
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-red-600">
                        DISABLE
                      </span>{" "}
                      to confirm
                    </label>
                    <input
                      type="text"
                      id="typeConfirmation"
                      value={typeConfirmation}
                      onChange={(e) => setTypeConfirmation(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                      placeholder="Type DISABLE here"
                      autoComplete="off"
                    />
                    {typeConfirmation && typeConfirmation !== "DISABLE" && (
                      <p className="mt-1 text-sm text-red-600">
                        Please type "DISABLE" exactly as shown
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Error Messages */}
              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertTriangle size={16} />
                    <span className="font-medium text-sm">
                      Please fix the following:
                    </span>
                  </div>
                  <ul className="text-sm text-red-600 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleDisablePasskey}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Disabling...
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} />
                      Disable Passkey
                    </>
                  )}
                </motion.button>
              </div>

              {/* Additional Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> You can re-enable passkey
                  authentication at any time from your security settings. We
                  recommend keeping it enabled for better security.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
