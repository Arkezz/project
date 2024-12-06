import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export default function CommentForm({ onSubmit, onCancel }: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-xl shadow-sm p-4"
    >
      <MDEditor
        value={content}
        onChange={(value) => setContent(value || "")}
        preview="edit"
        height={200}
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!content.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
