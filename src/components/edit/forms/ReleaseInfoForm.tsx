import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  BookOpen,
  Globe,
  Settings,
  Zap,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap max-w-xs"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReleaseInfoForm() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<NovelEditForm>();

  const [releaseMode, setReleaseMode] = useState<"manual" | "automated">(
    "manual"
  );
  const [apiConnectionStatus, setApiConnectionStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const testApiConnection = async () => {
    setApiConnectionStatus("testing");
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setApiConnectionStatus(Math.random() > 0.5 ? "success" : "error");
  };

  const syncNow = async () => {
    setApiConnectionStatus("testing");
    // Simulate sync
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLastSyncTime(new Date());
    setApiConnectionStatus("success");
  };

  return (
    <div className="space-y-8">
      {/* Release Schedule Mode Selection */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Settings className="text-purple-600" size={20} />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Release Schedule Configuration
              </h3>
              <p className="text-sm text-gray-600">
                Choose how chapter releases are managed
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              type="button"
              onClick={() => setReleaseMode("manual")}
              className={`p-4 rounded-xl border-2 transition-all ${
                releaseMode === "manual"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Calendar
                  className={
                    releaseMode === "manual" ? "text-primary" : "text-gray-400"
                  }
                  size={24}
                />
                <h4 className="font-medium">Manual Entry</h4>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Manually set release schedules and chapter information
              </p>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setReleaseMode("automated")}
              className={`p-4 rounded-xl border-2 transition-all ${
                releaseMode === "automated"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap
                  className={
                    releaseMode === "automated"
                      ? "text-primary"
                      : "text-gray-400"
                  }
                  size={24}
                />
                <h4 className="font-medium">Automated Sync</h4>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                  Future Feature
                </span>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Automatically sync with external sources for real-time updates
              </p>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Manual Entry Form */}
      <AnimatePresence>
        {releaseMode === "manual" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Publication Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Original publication dates and chapter details
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Publication Period */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  Original Publication Period
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label={
                      <div className="flex items-center gap-2">
                        Start Date
                        <Tooltip content="Original release start date of the novel">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Tooltip>
                      </div>
                    }
                    error={errors.details?.startDate?.message}
                    required
                  >
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="date"
                        {...register("details.startDate")}
                        className="form-input pl-10"
                      />
                    </div>
                  </FormField>

                  <FormField
                    label={
                      <div className="flex items-center gap-2">
                        End Date
                        <Tooltip content="Original release end date of the novel (if completed)">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Tooltip>
                      </div>
                    }
                    error={errors.details?.endDate?.message}
                  >
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="date"
                        {...register("details.endDate")}
                        className="form-input pl-10"
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Release Schedule */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  Release Schedule
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Frequency"
                    error={errors.releaseSchedule?.frequency?.message}
                    required
                  >
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <select
                        {...register("releaseSchedule.frequency")}
                        className="form-select pl-10"
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-weekly">Bi-weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Irregular">Irregular</option>
                      </select>
                    </div>
                  </FormField>

                  <FormField
                    label="Release Day"
                    error={errors.releaseSchedule?.day?.message}
                  >
                    <div className="relative">
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <select
                        {...register("releaseSchedule.day")}
                        className="form-select pl-10"
                      >
                        <option value="">Select day...</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </FormField>

                  <FormField
                    label={
                      <div className="flex items-center gap-2">
                        Release Time (UTC)
                        <Tooltip content="Expected time of chapter release in UTC">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Tooltip>
                      </div>
                    }
                    error={errors.releaseSchedule?.time?.message}
                  >
                    <input
                      type="time"
                      {...register("releaseSchedule.time")}
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              {/* Chapter Information */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  Chapter Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label={
                      <div className="flex items-center gap-2">
                        Total Chapters
                        <Tooltip content="Total chapters in the original novel">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Tooltip>
                      </div>
                    }
                    error={errors.details?.chapters?.message}
                    required
                  >
                    <div className="relative">
                      <BookOpen
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="number"
                        {...register("details.chapters")}
                        className="form-input pl-10"
                        placeholder="Enter total chapters"
                      />
                    </div>
                  </FormField>

                  <FormField
                    label={
                      <div className="flex items-center gap-2">
                        Average Chapter Length
                        <Tooltip content="Average length of chapters (e.g., '2,500 words', '10 pages')">
                          <HelpCircle size={14} className="text-gray-400" />
                        </Tooltip>
                      </div>
                    }
                    error={errors.details?.averageLength?.message}
                  >
                    <input
                      type="text"
                      {...register("details.averageLength")}
                      className="form-input"
                      placeholder="e.g., 2,500 words"
                    />
                  </FormField>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Automated Sync Configuration */}
      <AnimatePresence>
        {releaseMode === "automated" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Zap className="text-amber-600" size={20} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Automated Sync Configuration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Connect to external sources for automatic updates
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Future Feature Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-amber-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-amber-900">
                      Future Feature
                    </h4>
                    <p className="text-sm text-amber-800 mt-1">
                      This is a design placeholder for the upcoming automated
                      sync feature. The interface is ready for implementation
                      when the backend API is available.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Configuration */}
              <div className="space-y-4">
                <FormField label="Source URL" required>
                  <div className="relative">
                    <Globe
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="url"
                      className="form-input pl-10"
                      placeholder="https://api.example.com/novel-updates"
                      disabled
                    />
                  </div>
                </FormField>

                <FormField label="API Key">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter API key (if required)"
                    disabled
                  />
                </FormField>

                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={testApiConnection}
                    disabled={apiConnectionStatus === "testing"}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {apiConnectionStatus === "testing" ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Test Connection
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={syncNow}
                    disabled={apiConnectionStatus !== "success"}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={16} />
                    Sync Now
                  </motion.button>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-2 text-sm">
                  {apiConnectionStatus === "success" && (
                    <>
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-green-700">
                        Connection successful
                      </span>
                    </>
                  )}
                  {apiConnectionStatus === "error" && (
                    <>
                      <XCircle size={16} className="text-red-500" />
                      <span className="text-red-700">Connection failed</span>
                    </>
                  )}
                  {apiConnectionStatus === "testing" && (
                    <>
                      <RefreshCw
                        size={16}
                        className="text-blue-500 animate-spin"
                      />
                      <span className="text-blue-700">
                        Testing connection...
                      </span>
                    </>
                  )}
                </div>

                {/* Last Sync Info */}
                {lastSyncTime && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle size={16} />
                      <span>Last synced: {lastSyncTime.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
