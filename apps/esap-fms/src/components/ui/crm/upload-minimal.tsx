"use client"

import Image from "next/image"
import { useCallback } from "react"

import { endsWith } from "lodash"
import isEmpty from "lodash/isEmpty"
import toast from "react-hot-toast"
import { PiFilePdf } from "react-icons/pi"
import { FieldError } from "rizzui"

import { UploadIcon } from "@/components/icons/crm/upload"
import { cn } from "@/utils/cn"

interface UploadZoneProps {
  files?: any
  setFiles: any
  label?: string
  name: string
  _getValues?: any
  setValue: any
  className?: string
  error?: string
}

export default function UploadZone({
  files,
  setFiles,
  label,
  name,
  className,
  setValue,
  error,
}: UploadZoneProps) {
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
      if (!selectedFiles?.length) return

      try {
        const newFiles = Array.from(selectedFiles).map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
        setFiles(newFiles)

        // Here you would typically upload the files to your server
        // For now, we'll simulate a successful upload
        const uploadedFiles = newFiles.map((file) => ({
          name: file.name,
          size: file.size,
          url: file.preview,
        }))
        setValue(name, uploadedFiles)
      } catch (error: any) {
        // console.error(error)
        toast.error(error.message)
      }
    },
    [name, setFiles, setValue]
  );

  return (
    <div className={cn("flex gap-4", className)}>
      {label && (
        <span className="mb-1.5 block font-semibold text-gray-900">
          {label}
        </span>
      )}
      {files.length > 0 && (
        <div className="grid grid-cols-1">
          {files.map((file: any, index: number) => (
            <div
              className="flex min-h-[58px] w-full items-center rounded-xl pe-3"
              key={`${typeof file === "string" ? file : file.name}-${index}`}>
              <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-dashed border-gray-500/20 bg-gray-500/10 object-cover px-2 py-1.5">
                {typeof file === "string" ? (
                  <Image
                    src={file} // Use URL directly if it's a string
                    fill
                    className="object-contain"
                    priority
                    alt={file.split("/").pop() || "file"} // Extract file name from URL
                    sizes="(max-width: 768px) 100vw"
                  />
                ) : (
                  <Image
                    src={URL.createObjectURL(file)} // Create an object URL if it's a File
                    fill
                    className="object-contain"
                    priority
                    alt={file.name}
                    sizes="(max-width: 768px) 100vw"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={cn(
          "rounded-md border-[1.8px] bg-[#f5f1f1] dark:bg-gray-700 h-16 w-16 dark:border-gray-600 p-2 border-dashed",
          !isEmpty(files) &&
          "flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6"
        )}>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-4 p-2 transition-all duration-300",
            isEmpty(files)
              ? "justify-center"
              : "flex-grow justify-center @xl:justify-start"
          )}>
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer items-center gap-4">
            <UploadIcon className="h-7 w-7 text-[#919eab]" />
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {error && <FieldError error={error} />}
    </div>
  )
}

function MediaPreview({
  name,
  url,
  files,
}: {
  name: string
  url: string
  files: string
}) {
  if (endsWith(name, ".pdf")) {
    return <PiFilePdf title={name} className="size-20" />
  }

  const preview_url = files[0]
  const fileName =
    typeof preview_url === "string" && preview_url.includes("/")
      ? preview_url.split("/").pop()
      : ""
  return endsWith(preview_url, ".pdf") ? (
    <a href={preview_url} target="_blank">
      <PiFilePdf title={fileName} className="size-20" />
    </a>
  ) : (
    <Image
      fill={false}
      width={64}
      height={64}
      src={url || preview_url}
      alt="name"
      className="size-16 transform rounded-md object-contain"
    />
  )
}

export function LoadingSpinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#fff" stopOpacity="0" offset="0%" />
          <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#fff" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  )
}
