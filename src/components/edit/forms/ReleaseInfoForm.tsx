import React from "react";
import { useFormContext } from "react-hook-form";
import { Calendar, Clock, BookOpen } from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

export default function ReleaseInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<NovelEditForm>();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Start Date"
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

        <FormField label="End Date" error={errors.details?.endDate?.message}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Release Schedule"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Total Chapters"
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
          label="Average Chapter Length"
          error={errors.details?.averageLength?.message}
        >
          <input
            type="text"
            {...register("details.averageLength")}
            className="form-input"
            placeholder="e.g., 2,500 words"
          />
        </FormField>

        <FormField
          label="Release Time (UTC)"
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
  );
}
