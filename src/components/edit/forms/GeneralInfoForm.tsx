import React from "react";
import { useFormContext } from "react-hook-form";
import { Upload } from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";
import GenreSelect from "../inputs/GenreSelect";
import ContentWarningSelect from "../inputs/ContentWarningSelect";
import MarkdownEditor from "../inputs/MarkdownEditor";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

export default function GeneralInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<NovelEditForm>();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FormField label="English Title" error={errors.title?.message}>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="form-input"
              placeholder="Enter English title"
            />
          </FormField>

          <FormField
            label="Original Title"
            error={errors.originalTitle?.message}
          >
            <input
              type="text"
              {...register("originalTitle")}
              className="form-input"
              placeholder="Enter original title"
            />
          </FormField>

          <FormField label="Type">
            <select {...register("type")} className="form-select">
              <option value="Web Novel">Web Novel</option>
              <option value="Light Novel">Light Novel</option>
              <option value="Published Novel">Published Novel</option>
            </select>
          </FormField>

          <FormField label="Status">
            <select {...register("status")} className="form-select">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Hiatus">Hiatus</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </FormField>
        </div>

        <div className="space-y-6">
          <FormField label="Cover Image">
            <div className="flex items-center justify-center w-full">
              <label className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG or WEBP (max. 2MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle file upload
                    console.log(e.target.files);
                  }}
                />
              </label>
            </div>
          </FormField>
        </div>
      </div>

      <div className="space-y-6">
        <FormField label="Genres & Tags">
          <GenreSelect />
        </FormField>

        <FormField label="Content Warnings">
          <ContentWarningSelect />
        </FormField>

        <FormField label="Synopsis">
          <MarkdownEditor />
        </FormField>
      </div>
    </div>
  );
}
