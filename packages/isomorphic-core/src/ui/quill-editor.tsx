"use client";

import ReactQuill, { type ReactQuillProps } from "react-quill";
import { FieldError } from "rizzui";
import cn from "../utils/class-names";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps extends ReactQuillProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  toolbarPosition?: "top" | "bottom";
  disabled?: boolean;
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = "top",
  disabled = false,
  ...props
}: QuillEditorProps) {
  const quillModules = {
    toolbar: disabled
      ? false
      : [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
        ],
  };

  return (
    <div className={cn(className)}>
      {label && (
        <label className={cn("mb-1.5 block", labelClassName)}>{label}</label>
      )}
      <ReactQuill
        modules={quillModules}
        className={cn(
          "react-quill",
          toolbarPosition === "bottom" && "react-quill-toolbar-bottom relative",
          disabled &&
            "quill-disabled [&_.ql-disabled]:rounded-lg [&_.ql-disabled]:bg-gray-500/10 [&_.ql-disabled]:!border-transparent",
          className
        )}
        readOnly={disabled}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  );
}
