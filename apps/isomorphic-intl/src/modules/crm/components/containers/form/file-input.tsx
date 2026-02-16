import React, { InputHTMLAttributes, Ref, forwardRef } from "react"

type FileInputProps = InputHTMLAttributes<HTMLInputElement>

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        type="file"
        ref={ref}
        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border file:bg-gray-50 file:px-4 file:py-2 hover:file:bg-gray-100"
        {...props}
      />
    )
  }
)

FileInput.displayName = "FileInput"

export default FileInput
