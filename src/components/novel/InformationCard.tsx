import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Book,
  BookOpen,
  Building2,
  Calendar,
  Globe,
  Languages,
  Layers,
  Library,
  Star,
  Users,
} from "lucide-react";

interface NovelInformation {
  author: string;
  artist: string;
  publisher: {
    original: string;
    english?: string;
  };
  license: {
    status: "Licensed" | "Not Licensed" | "Fan Translation";
    publisher?: string;
  };
  translation: {
    status: "Ongoing" | "Complete" | "Dropped";
    progress: number;
    lastUpdate: string;
  };
  format: string;
  demographic: string;
  serialization: {
    magazine?: string;
    platform: string;
    frequency: string;
  };
  statistics: {
    rank: number;
    popularity: number;
    readers: number;
    favorites: number;
    rating: number;
    reviews: number;
  };
}

interface InformationCardProps {
  info: NovelInformation;
}

export default function InformationCard({ info }: InformationCardProps) {
  const sections = [
    {
      title: "Publication",
      items: [
        { icon: Book, label: "Author", value: info.author },
        { icon: BookOpen, label: "Artist", value: info.artist },
        {
          icon: Building2,
          label: "Original Publisher",
          value: info.publisher.original,
        },
        info.publisher.english && {
          icon: Globe,
          label: "English Publisher",
          value: info.publisher.english,
        },
      ].filter(Boolean),
    },
    {
      title: "Release",
      items: [
        {
          icon: Library,
          label: "License Status",
          value: info.license.status,
          className:
            info.license.status === "Licensed" ? "text-green-600" : undefined,
        },
        info.license.publisher && {
          icon: Building2,
          label: "Licensed By",
          value: info.license.publisher,
        },
        {
          icon: Languages,
          label: "Translation",
          value: `${info.translation.status} (${info.translation.progress}%)`,
          subtext: `Last updated ${info.translation.lastUpdate}`,
        },
      ].filter(Boolean),
    },
    {
      title: "Information",
      items: [
        { icon: Layers, label: "Format", value: info.format },
        { icon: Users, label: "Demographic", value: info.demographic },
        info.serialization.magazine && {
          icon: Calendar,
          label: "Magazine",
          value: info.serialization.magazine,
        },
        {
          icon: Globe,
          label: "Platform",
          value: info.serialization.platform,
        },
      ].filter(Boolean),
    },
    {
      title: "Statistics",
      items: [
        {
          icon: Award,
          label: "Rank",
          value: `#${info.statistics.rank.toLocaleString()}`,
        },
        {
          icon: Award,
          label: "Popularity",
          value: `#${info.statistics.popularity.toLocaleString()}`,
        },
        {
          icon: Users,
          label: "Readers",
          value: info.statistics.readers.toLocaleString(),
        },
        {
          icon: Star,
          label: "Rating",
          value: `${
            info.statistics.rating
          } (${info.statistics.reviews.toLocaleString()} reviews)`,
        },
      ],
    },
  ];

  return (
    <motion.div
      className="bg-surface rounded-lg shadow-sm p-4"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {sections.map((section, sectionIndex) => (
        <div key={section.title} className={sectionIndex > 0 ? "mt-6" : ""}>
          <h3 className="font-medium mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2 text-gray-500">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  <div className={`text-right ${item.className || ""}`}>
                    <span>{item.value}</span>
                    {item.subtext && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.subtext}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
