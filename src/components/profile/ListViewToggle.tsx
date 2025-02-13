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
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === "grid"
            ? "bg-white shadow-sm text-primary"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === "list"
            ? "bg-white shadow-sm text-primary"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <List size={20} />
      </button>
    </div>
  );
}
