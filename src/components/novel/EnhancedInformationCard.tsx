import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Edit,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Heart,
  Eye,
  Clock,
  MapPin,
  Flag,
  CheckCircle,
  XCircle,
  FileText,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

interface NovelInformation {
  id: string;
  titles: {
    english: string;
    native?: string;
    romaji?: string;
    synonyms?: string[];
  };
  format: {
    type: "Web Novel" | "Light Novel" | "Published Novel" | "Manhwa" | "Manga";
    status: "Ongoing" | "Completed" | "Hiatus" | "Cancelled";
    originalLanguage: string;
    region: string;
  };
  temporal: {
    startDate: string;
    endDate?: string;
    lastUpdate?: string;
  };
  statistics: {
    averageScore: number;
    meanScore: number;
    popularity: number;
    favorites: number;
    rank?: number;
    readers: number;
    reviews: number;
  };
  production: {
    studios?: string[];
    publishers: string[];
    producers?: string[];
    source?: string;
  };
  author: string;
  artist?: string;
  license: {
    status: "Licensed" | "Not Licensed" | "Fan Translation";
    publisher?: string;
  };
  translation: {
    status: "Ongoing" | "Complete" | "Dropped";
    progress: number;
    lastUpdate: string;
  };
  serialization: {
    magazine?: string;
    platform: string;
    frequency: string;
  };
  // New publication fields
  publication?: {
    statusInCOO?: string;
    totalChapters?: number;
    completionStatus?: "Completed" | "Ongoing" | "Hiatus";
    licensed?: boolean;
    completelyTranslated?: boolean;
    originalPublisher?: string;
    englishPublisher?: string;
  };
}

interface EnhancedInformationCardProps {
  info: NovelInformation;
}

export default function EnhancedInformationCard({
  info,
}: EnhancedInformationCardProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "titles",
    "format",
    "publication",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatScore = (score: number) => {
    return `${Math.round(score * 10)}%`;
  };

  const StatusBadge = ({
    status,
    type,
  }: {
    status: boolean | string;
    type: "boolean" | "status";
  }) => {
    if (type === "boolean") {
      return (
        <div className="flex items-center gap-2">
          {status ? (
            <>
              <CheckCircle size={14} className="text-green-500" />
              <span className="font-medium text-green-700">Yes</span>
            </>
          ) : (
            <>
              <XCircle size={14} className="text-red-500" />
              <span className="font-medium text-red-700">No</span>
            </>
          )}
        </div>
      );
    }

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          status === "Completed"
            ? "bg-green-100 text-green-700"
            : status === "Ongoing"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const sections = [
    {
      id: "titles",
      title: "Titles",
      icon: Languages,
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              English
            </label>
            <p className="font-medium">{info.titles.english}</p>
          </div>
          {info.titles.native && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Native
              </label>
              <p className="font-medium font-cn">{info.titles.native}</p>
            </div>
          )}
          {info.titles.romaji && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Romaji
              </label>
              <p className="font-medium">{info.titles.romaji}</p>
            </div>
          )}
          {info.titles.synonyms && info.titles.synonyms.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Synonyms
              </label>
              <div className="flex flex-wrap gap-1 mt-1">
                {info.titles.synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "format",
      title: "Format & Status",
      icon: Layers,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Type
            </label>
            <p className="font-medium">{info.format.type}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Status
            </label>
            <StatusBadge status={info.format.status} type="status" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Language
            </label>
            <div className="flex items-center gap-2">
              <Flag size={14} className="text-gray-400" />
              <span className="font-medium">
                {info.format.originalLanguage}
              </span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Region
            </label>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              <span className="font-medium">{info.format.region}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "publication",
      title: "Publication Details",
      icon: FileText,
      content: (
        <div className="space-y-4">
          {/* Status in COO and Chapters */}
          <div className="grid grid-cols-1 gap-3">
            {info.publication?.statusInCOO && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status in COO
                </label>
                <p className="font-medium">{info.publication.statusInCOO}</p>
              </div>
            )}

            {info.publication?.totalChapters && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Chapters
                </label>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-primary" />
                  <span className="font-medium">
                    {info.publication.totalChapters.toLocaleString()} Chapters
                    {info.publication.completionStatus && (
                      <span className="ml-2">
                        (
                        <StatusBadge
                          status={info.publication.completionStatus}
                          type="status"
                        />
                        )
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* License and Translation Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Licensed
              </label>
              <StatusBadge
                status={info.publication?.licensed ?? false}
                type="boolean"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Completely Translated
              </label>
              <StatusBadge
                status={info.publication?.completelyTranslated ?? false}
                type="boolean"
              />
            </div>
          </div>

          {/* Publishers */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Original Publisher
              </label>
              {info.publication?.originalPublisher ? (
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400" />
                  <span className="font-medium">
                    {info.publication.originalPublisher}
                  </span>
                </div>
              ) : (
                <span className="text-gray-400 italic">Not specified</span>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                English Publisher
              </label>
              {info.publication?.englishPublisher ? (
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400" />
                  <span className="font-medium">
                    {info.publication.englishPublisher}
                  </span>
                </div>
              ) : (
                <span className="text-gray-400 italic">N/A</span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "temporal",
      title: "Timeline",
      icon: Calendar,
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Start Date
            </label>
            <p className="font-medium">{formatDate(info.temporal.startDate)}</p>
          </div>
          {info.temporal.endDate && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                End Date
              </label>
              <p className="font-medium">{formatDate(info.temporal.endDate)}</p>
            </div>
          )}
          {info.temporal.lastUpdate && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Last Update
              </label>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="font-medium">
                  {formatDate(info.temporal.lastUpdate)}
                </span>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "statistics",
      title: "Statistics",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatScore(info.statistics.averageScore)}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Average Score
              </div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatScore(info.statistics.meanScore)}
              </div>
              <div className="text-xs text-purple-600 font-medium">
                Mean Score
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {info.statistics.rank && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-amber-500" />
                  <span className="text-gray-600">Rank</span>
                </div>
                <span className="font-medium">
                  #{info.statistics.rank.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-gray-600">Popularity</span>
              </div>
              <span className="font-medium">
                #{info.statistics.popularity.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-blue-500" />
                <span className="text-gray-600">Readers</span>
              </div>
              <span className="font-medium">
                {info.statistics.readers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-red-500" />
                <span className="text-gray-600">Favorites</span>
              </div>
              <span className="font-medium">
                {info.statistics.favorites.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "production",
      title: "Production",
      icon: Building2,
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Author
            </label>
            <p className="font-medium">{info.author}</p>
          </div>
          {info.artist && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Artist
              </label>
              <p className="font-medium">{info.artist}</p>
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Publishers
            </label>
            <div className="flex flex-wrap gap-1 mt-1">
              {info.production.publishers.map((publisher, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {publisher}
                </span>
              ))}
            </div>
          </div>
          {info.production.source && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Source
              </label>
              <p className="font-medium">{info.production.source}</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="bg-surface rounded-lg shadow-sm overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Information</h3>
          <Link
            to={`/novel/${info.id}/edit`}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const Icon = section.icon;

          return (
            <div key={section.id} className="overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-primary" />
                  <span className="font-medium text-gray-900">
                    {section.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">{section.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
