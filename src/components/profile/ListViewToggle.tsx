import React from "react";
import { Grid, List } from "lucide-react";

type ViewMode = "grid" | "list";

interface ListViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ListViewToggle({
  viewMode,
  onViewModeChange,
}: ListViewToggleProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`p-1.5 rounded-md transition-colors duration-200 ${
          viewMode === "grid"
            ? "bg-white shadow-sm text-primary"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Grid view"
        aria-pressed={viewMode === "grid"}
      >
        <Grid size={18} />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-1.5 rounded-md transition-colors duration-200 ${
          viewMode === "list"
            ? "bg-white shadow-sm text-primary"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="List view"
        aria-pressed={viewMode === "list"}
      >
        <List size={18} />
      </button>
    </div>
  );
}
