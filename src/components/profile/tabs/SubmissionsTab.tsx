import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const statusConfig = {
  approved: { icon: CheckCircle, color: "text-emerald-500" },
  rejected: { icon: XCircle, color: "text-red-500" },
  pending: { icon: Clock, color: "text-amber-500" },
  review: { icon: AlertCircle, color: "text-blue-500" },
} as const;

export default function SubmissionsTab() {
  const submissions = [
    {
      id: "1",
      type: "Novel Addition",
      title: "Against the Gods",
      status: "approved",
      date: "2024-03-01",
      notes: "Thank you for your contribution!",
    },
    {
      id: "2",
      type: "Translation Update",
      title: "The Beginning After The End - Chapter 420",
      status: "pending",
      date: "2024-03-05",
    },
    {
      id: "3",
      type: "Information Correction",
      title: "Solo Leveling - Author Information",
      status: "review",
      date: "2024-03-04",
      notes: "Under review by moderators",
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Submission Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Submissions", value: "34" },
          { label: "Approved", value: "28" },
          { label: "Pending", value: "4" },
          { label: "Contribution Score", value: "156" },
        ].map(({ label, value }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-surface p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-xl font-semibold mt-1">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Submissions List */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Submissions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {submissions.map((submission) => {
            const StatusIcon = statusConfig[submission.status].icon;

            return (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.01)" }}
                transition={{ duration: 0.2 }}
                className="p-6 flex items-center gap-4"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText size={24} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {submission.type}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {submission.date}
                    </span>
                  </div>
                  <h4 className="font-medium mt-1">{submission.title}</h4>
                  {submission.notes && (
                    <p className="text-sm text-gray-600 mt-1">
                      {submission.notes}
                    </p>
                  )}
                </div>
                <div
                  className={`flex items-center gap-1 ${statusConfig[submission.status].color}`}
                >
                  <StatusIcon size={16} />
                  <span className="text-sm capitalize">
                    {submission.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Submit New Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="btn-primary"
        >
          Submit New Content
        </motion.button>
      </div>
    </div>
  );
}
