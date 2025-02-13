import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ValidationError {
  field: string;
  message: string;
}

interface FormValidationProps {
  errors: ValidationError[];
}

export default function FormValidation({ errors }: FormValidationProps) {
  if (errors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
    >
      <div className="flex items-center gap-2 text-red-600 mb-2">
        <AlertCircle size={18} />
        <span className="font-medium">Please fix the following errors:</span>
      </div>
      <ul className="space-y-1 text-sm text-red-600">
        {errors.map((error, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            • {error.message}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
