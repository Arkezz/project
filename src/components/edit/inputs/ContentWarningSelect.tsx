import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import type { Novel } from "../../../types/novel";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

const AVAILABLE_WARNINGS = [
  "Violence",
  "Gore",
  "Strong Language",
  "Sexual Content",
  "Discrimination",
  "Death",
  "Trauma",
  "Self Harm",
  "Suicide",
  "Abuse",
];

export default function ContentWarningSelect() {
  const [search, setSearch] = useState("");
  const { watch, setValue } = useFormContext<NovelEditForm>();
  const selectedWarnings = watch("contentWarnings") || [];

  const filteredWarnings = AVAILABLE_WARNINGS.filter(
    (warning) =>
      warning.toLowerCase().includes(search.toLowerCase()) &&
      !selectedWarnings.includes(warning)
  );

  const handleSelect = (warning: string) => {
    setValue("contentWarnings", [...selectedWarnings, warning]);
    setSearch("");
  };

  const handleRemove = (warning: string) => {
    setValue(
      "contentWarnings",
      selectedWarnings.filter((w) => w !== warning)
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedWarnings.map((warning) => (
          <span
            key={warning}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium"
          >
            {warning}
            <button
              type="button"
              onClick={() => handleRemove(warning)}
              className="ml-1 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          placeholder="Search content warnings..."
        />

        {search && filteredWarnings.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {filteredWarnings.map((warning) => (
              <button
                key={warning}
                type="button"
                onClick={() => handleSelect(warning)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
              >
                {warning}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
