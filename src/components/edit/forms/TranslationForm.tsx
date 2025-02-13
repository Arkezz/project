import React from "react";
import { useFormContext } from "react-hook-form";
import { Globe, Percent, Calendar } from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

export default function TranslationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<NovelEditForm>();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Translation Status"
          error={errors.translation?.status?.message}
          required
        >
          <select {...register("translation.status")} className="form-select">
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Licensed">Licensed</option>
            <option value="Dropped">Dropped</option>
          </select>
        </FormField>

        <FormField
          label="Translation Language"
          error={errors.translation?.language?.message}
          required
        >
          <div className="relative">
            <Globe
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("translation.language")}
              className="form-select pl-10"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
            </select>
          </div>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Translation Progress"
          error={errors.translation?.progress?.message}
          required
        >
          <div className="relative">
            <Percent
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="number"
              min="0"
              max="100"
              {...register("translation.progress")}
              className="form-input pl-10"
              placeholder="Enter progress percentage"
            />
          </div>
        </FormField>

        <FormField
          label="Translation Group"
          error={errors.translation?.group?.message}
        >
          <input
            {...register("translation.group")}
            className="form-input"
            placeholder="Enter translation group name"
          />
        </FormField>
      </div>

      <FormField
        label="Last Update"
        error={errors.translation?.lastUpdate?.message}
        required
      >
        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="date"
            {...register("translation.lastUpdate")}
            className="form-input pl-10"
          />
        </div>
      </FormField>

      <div className="p-4 bg-primary/5 rounded-lg">
        <h4 className="font-medium mb-2">Translation Guidelines</h4>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• Ensure consistent terminology throughout translations</li>
          <li>• Maintain original honorifics when appropriate</li>
          <li>• Include translation notes for cultural references</li>
          <li>
            • Keep names in their original format unless officially localized
          </li>
        </ul>
      </div>
    </div>
  );
}
