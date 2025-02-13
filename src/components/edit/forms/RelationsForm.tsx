import React from "react";
import { useFormContext } from "react-hook-form";
import { Plus, User, Building2 } from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

export default function RelationsForm() {
  const { register, watch, setValue } = useFormContext<NovelEditForm>();
  const creators = watch("creators") || [];
  const publishers = watch("publishers") || [];

  const addCreator = () => {
    setValue("creators", [...creators, { name: "", role: "Author" }]);
  };

  const addPublisher = () => {
    setValue("publishers", [...publishers, { name: "", type: "Original" }]);
  };

  const removeCreator = (index: number) => {
    setValue(
      "creators",
      creators.filter((_, i) => i !== index)
    );
  };

  const removePublisher = (index: number) => {
    setValue(
      "publishers",
      publishers.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Creators</h3>
          <button
            type="button"
            onClick={addCreator}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Creator
          </button>
        </div>

        <div className="space-y-4">
          {creators.map((creator, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 space-y-4">
                <FormField label="Name">
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      {...register(`creators.${index}.name`)}
                      className="form-input pl-10"
                      placeholder="Enter creator name"
                    />
                  </div>
                </FormField>

                <FormField label="Original Name">
                  <input
                    {...register(`creators.${index}.originalName`)}
                    className="form-input font-kr"
                    placeholder="Enter original name"
                  />
                </FormField>

                <FormField label="Role">
                  <select
                    {...register(`creators.${index}.role`)}
                    className="form-select"
                  >
                    <option value="Author">Author</option>
                    <option value="Artist">Artist</option>
                    <option value="Illustrator">Illustrator</option>
                  </select>
                </FormField>
              </div>

              <button
                type="button"
                onClick={() => removeCreator(index)}
                className="mt-8 p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Plus className="rotate-45" size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Publishers</h3>
          <button
            type="button"
            onClick={addPublisher}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Publisher
          </button>
        </div>

        <div className="space-y-4">
          {publishers.map((publisher, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 space-y-4">
                <FormField label="Name">
                  <div className="relative">
                    <Building2
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      {...register(`publishers.${index}.name`)}
                      className="form-input pl-10"
                      placeholder="Enter publisher name"
                    />
                  </div>
                </FormField>

                <FormField label="Type">
                  <select
                    {...register(`publishers.${index}.type`)}
                    className="form-select"
                  >
                    <option value="Original">Original Publisher</option>
                    <option value="Licensed">Licensed Publisher</option>
                  </select>
                </FormField>

                <FormField label="Website">
                  <input
                    {...register(`publishers.${index}.website`)}
                    type="url"
                    className="form-input"
                    placeholder="Enter website URL"
                  />
                </FormField>
              </div>

              <button
                type="button"
                onClick={() => removePublisher(index)}
                className="mt-8 p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Plus className="rotate-45" size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
