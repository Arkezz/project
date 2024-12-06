import React from "react";
import { LucideIcon } from "lucide-react";
import ViewAllButton from "./ViewAllButton";
import NovelGrid from "../../NovelGrid";

interface NovelSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  type: "trending" | "new" | "regional" | "reading" | "completed";
  viewAllLink: string;
}

export default function NovelSection({
  title,
  icon: Icon,
  iconColor,
  type,
  viewAllLink,
}: NovelSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon className={iconColor} size={24} />
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <ViewAllButton href={viewAllLink} />
      </div>
      <NovelGrid type={type} />
    </section>
  );
}
