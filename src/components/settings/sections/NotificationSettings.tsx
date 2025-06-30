import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, BookOpen, MessageCircle, Star, Mail } from "lucide-react";
import { toast } from "sonner";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "chapter_updates",
      title: "Chapter Updates",
      description:
        "Get notified when new chapters are available for novels you follow",
      icon: BookOpen,
      enabled: true,
    },
    {
      id: "comments",
      title: "Comments & Replies",
      description:
        "Receive notifications when someone replies to your comments",
      icon: MessageCircle,
      enabled: true,
    },
    {
      id: "recommendations",
      title: "Recommendations",
      description:
        "Get personalized novel recommendations based on your reading history",
      icon: Star,
      enabled: false,
    },
    {
      id: "newsletter",
      title: "Weekly Newsletter",
      description:
        "Receive weekly updates about trending novels and community highlights",
      icon: Mail,
      enabled: false,
    },
  ]);

  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [pushEnabled, setPushEnabled] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    toast.success("Notification preference updated");
  };

  const requestPushPermission = () => {
    setPushEnabled(true);
    toast.success("Push notifications enabled");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>

        {/* Push Notifications */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="text-primary" size={20} />
              <h3 className="font-medium">Push Notifications</h3>
            </div>
            <button
              onClick={requestPushPermission}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                pushEnabled ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: pushEnabled ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Receive notifications even when you're not actively browsing
          </p>
        </div>

        {/* Email Frequency */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Email Digest Frequency</h3>
          <select
            value={emailFrequency}
            onChange={(e) => setEmailFrequency(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="realtime">Real-time</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
            <option value="never">Never</option>
          </select>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {settings.map(({ id, title, description, icon: Icon, enabled }) => (
              <div
                key={id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <Icon size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">{title}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    enabled ? "bg-green-500" : "bg-gray-200 shadow-inner"
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
