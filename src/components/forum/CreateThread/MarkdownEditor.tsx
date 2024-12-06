import React, { useCallback } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Bold, Italic, Link, List, Code } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
}: MarkdownEditorProps) {
  const insertMarkdown = useCallback(
    (prefix: string, suffix: string = "") => {
      const textarea = document.querySelector(
        ".markdown-textarea"
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);
      const newText =
        value.substring(0, start) +
        prefix +
        selectedText +
        suffix +
        value.substring(end);

      onChange(newText);

      // Reset cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    },
    [value, onChange]
  );

  const renderPreview = () => {
    const sanitizedHtml = DOMPurify.sanitize(marked(value));
    return { __html: sanitizedHtml };
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => insertMarkdown("**", "**")}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("*", "*")}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("[", "](url)")}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Link"
        >
          <Link size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("- ")}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("```\n", "\n```")}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Code Block"
        >
          <Code size={18} />
        </button>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        <div className="p-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="markdown-textarea w-full h-[400px] resize-none focus:outline-none"
          />
        </div>
        <div className="p-4 prose prose-sm max-w-none overflow-y-auto h-[400px]">
          {value ? (
            <div dangerouslySetInnerHTML={renderPreview()} />
          ) : (
            <div className="text-gray-400 italic">
              Preview will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
