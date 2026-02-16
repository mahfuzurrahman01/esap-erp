"use client"

import { useCallback, useRef, useState } from "react"

import ImageUploadIcon from "@/components/icons/scm/image-upload-icon"
import UploadFilePinIcon from "@/components/icons/upload-file-pin"
import { cn } from "@/utils/cn"

export type AcceptedFileTypes = {
  "image/*": string[]
  "application/pdf": string[]
  "application/msword": string[]
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": string[]
  "application/vnd.ms-excel": string[]
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": string[]
  [key: string]: string[]
}

interface SimpleFileUploadProps {
  iconClassName?: string
  maxSize?: number
  acceptedFiles?: (keyof AcceptedFileTypes)[]
  onFileSelect?: (files: File[]) => void
  onValidationError?: (error: string) => void
  multiple?: boolean
  className?: string
}

export default function SimpleFileUpload({
  iconClassName = "h-4 w-4",
  maxSize = 5 * 1024 * 1024,
  acceptedFiles = ["image/*", "application/pdf"],
  onFileSelect,
  onValidationError,
  multiple = false,
  className = "",
}: SimpleFileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > maxSize) {
        return `File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
      }

      const fileType = file.type
      const isValidType = acceptedFiles.some((type) => {
        const typeStr = String(type)
        if (typeStr.endsWith("/*")) {
          const generalType = typeStr.split("/")[0]
          return fileType.startsWith(`${generalType}/`)
        }
        return type === fileType
      })

      if (!isValidType) {
        return `File ${file.name} has an invalid type. Accepted types: ${acceptedFiles.join(", ")}`
      }

      return null
    },
    [maxSize, acceptedFiles]
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])
      const validFiles: File[] = []
      const errors: string[] = []

      files.forEach((file) => {
        const error = validateFile(file)
        if (error) {
          errors.push(error)
        } else {
          validFiles.push(file)
        }
      })

      if (errors.length > 0) {
        onValidationError?.(errors.join("\n"))
      }

      if (validFiles.length > 0) {
        setSelectedFiles((prevFiles) =>
          multiple ? [...prevFiles, ...validFiles] : validFiles
        )
        onFileSelect?.(validFiles)
      }
    },
    [validateFile, multiple, onFileSelect, onValidationError]
  )

  const handleClick = () => {
    if (selectedFiles.length > 0) {
      setSelectedFiles([])
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } else {
      inputRef.current?.click()
    }
  }

  return (
    <div className={`w-1/2 ${className}`}>
      <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-gray-500/20">
        {acceptedFiles.includes("image/*") ? (
          <ImageUploadIcon
            className={cn(

              iconClassName,
              `h-8 w-8 items-center justify-center ${selectedFiles.length > 0 ? "text-primary" : ""}`
            )}
            onClick={handleClick}
          />
        ) : (
          <UploadFilePinIcon
            className={cn(
              iconClassName,
              `h-8 w-8 items-center justify-center ${selectedFiles.length > 0 ? "text-primary" : ""}`
            )}
            onClick={handleClick}
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={acceptedFiles.join(",")}
        multiple={multiple}
        onChange={handleFileChange}
      />

      {/* {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center rounded p-2">
              <span className="text-sm text-gray-600 mr-2">{file.name}</span>
              <span className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  )
}
