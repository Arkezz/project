import React from "react";
import { useFormContext } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import type { Novel } from "../../../types/novel";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

export default function MarkdownEditor() {
  const { watch, setValue } = useFormContext<NovelEditForm>();
  const synopsis = watch("synopsis");

  return (
    <MDEditor
      value={synopsis}
      onChange={(value) => setValue("synopsis", value || "")}
      preview="edit"
      height={300}
      className="prose max-w-none"
    />
  );
}
