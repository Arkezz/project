import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, HelpCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  description?: string;
  required?: boolean;
}

export default function FormField({
  label,
  error,
  children,
  description,
  required,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        <span className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
          {description && (
            <div className="group relative">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {description}
              </div>
            </div>
          )}
        </span>
      </label>
      {children}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 text-sm text-red-600"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
