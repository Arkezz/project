import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  isVisible: boolean;
}

export default function PasswordStrength({
  password,
  isVisible,
}: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const rules = [
    { test: /.{8,}/, text: "At least 8 characters" },
    { test: /[A-Z]/, text: "One uppercase letter" },
    { test: /[a-z]/, text: "One lowercase letter" },
    { test: /[0-9]/, text: "One number" },
    { test: /[^A-Za-z0-9]/, text: "One special character" },
  ];

  useEffect(() => {
    const passedRules = rules.filter((rule) => rule.test.test(password)).length;
    setStrength((passedRules / rules.length) * 100);
  }, [password]);

  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (password) {
      setShowRules(true);
      setTimer(setTimeout(() => setShowRules(false), 3000));
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [password]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 space-y-3"
    >
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${strength}%`,
              backgroundColor:
                strength < 40
                  ? "#ef4444"
                  : strength < 70
                  ? "#f59e0b"
                  : "#22c55e",
            }}
            animate={{ width: `${strength}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-600">
          Password strength:{" "}
          {strength < 40 ? "Weak" : strength < 70 ? "Medium" : "Strong"}
        </p>
      </div>

      {/* Rules */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showRules ? 1 : 0 }}
        className="space-y-1"
      >
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {rule.test.test(password) ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <X size={14} className="text-gray-400" />
            )}
            <span
              className={
                rule.test.test(password) ? "text-gray-700" : "text-gray-500"
              }
            >
              {rule.text}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
