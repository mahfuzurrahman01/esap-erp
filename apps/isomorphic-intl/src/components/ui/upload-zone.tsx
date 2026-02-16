"use client"

import { useCallback, useEffect, useState } from "react"

import cn from "@core/utils/class-names"
import isEmpty from "lodash/isEmpty"
import { useTranslations } from "next-intl"
import { useDropzone } from "react-dropzone"
import { FileWithPath } from "react-dropzone"
import toast from "react-hot-toast"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, FieldError, Text } from "rizzui"

import FileUploadIcon from "../icons/file-upload-icon"
import PdfIconTwo from "../icons/pdf-icon-two"

interface UploadZoneProps {
  label?: string
  name?: string
  className?: string
  error?: string
  onChange?: (file: File | null) => void
  value?: File | File[] | null | string
  defaultValue?: string
}

interface FileType {
  name: string
  url: string
  size: number
}

interface UploadButtonsProps {
  files: any[]
  isLoading: boolean
  onClear: () => void
  onUpload: () => void
}

export default function UploadZone({
  label,
  className,
  error,
  onChange,
  value,
  defaultValue,
  name,
}: UploadZoneProps) {
  const t = useTranslations("common")
  const tForm = useTranslations("form")
  const [files, setFiles] = useState<FileWithPath[]>(() =>
    value ? [value as FileWithPath] : []
  )

  useEffect(() => {
    if (value) {
      setFiles([value as FileWithPath])
    } else {
      setFiles([])
    }
  }, [value])

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const filteredFiles = acceptedFiles.filter((file) =>
        file.type.includes("application/pdf")
      )
      const newFiles = [
        ...filteredFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]
      setFiles(newFiles) // Update only this component's files
      if (onChange) {
        onChange(newFiles[0] || null)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    noClick: true, // Prevent click on the root element
  })

  const handleUpload = async () => {
    try {
      if (files.length > 0) {
        toast.success(
          <Text as="b" className="font-semibold">
            {tForm("form-upload-success")}
          </Text>
        )
      } else {
        toast.error(
          <Text as="b" className="font-semibold">
            {tForm("form-upload-error")}
          </Text>
        )
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className={cn("grid @container", className)}>
      {label && (
        <span className="mb-1.5 block font-semibold text-gray-900">
          {label}
        </span>
      )}
      <div
        {...getRootProps()}
        className={cn(
          `rounded-md border-[1.8px] border-dashed ${defaultValue || files.length > 0 ? "border-red-500/40 bg-red-500/10" : "border-gray-700 hover:border-primary"}`,
          !isEmpty(files) &&
            "flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6"
        )}>
        <div
          className={cn(
            "flex cursor-pointer flex-col items-center px-6 py-5 transition-all duration-300",
            isEmpty(files)
              ? "justify-center"
              : "flex-grow justify-center @xl:justify-start"
          )}>
          <label
            onClick={open}
            className="flex cursor-pointer flex-col items-center">
            <FileUploadIcon
              className={`h-12 w-12 ${defaultValue || files.length > 0 ? "main-error" : ""}`}
            />
            {defaultValue || files.length > 0 ? (
              <></>
            ) : (
              <Text className="text-base font-medium">
                {tForm("form-drop-or-select")}
              </Text>
            )}
          </label>
          <input {...getInputProps()} />
        </div>
      </div>

      {files.length > 0 && (
        <>
          {defaultValue || files.length > 0 ? (
            <>
              <div className="col-span-full flex items-center justify-between rounded-lg pt-4">
                <div className="flex items-center">
                  <PdfIconTwo className="mr-2 h-8 w-8" />
                  <Text className="font-base text-gray-900 dark:text-gray-0">
                    {files[0].name}
                  </Text>
                </div>
                <div>
                  <ActionIcon
                    onClick={() => setFiles([])}
                    size="sm"
                    color="danger"
                    rounded="full"
                    className="ms-auto flex-shrink-0 bg-red p-0">
                    <PiXBold className="w-6" />
                  </ActionIcon>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {/* <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="outline"
          className={cn("w-full max-w-28", !files.length && "hidden", "w-full")}
          onClick={() => setFiles([])}>
          {tForm("form-reset")}
        </Button>
        <Button className="w-full max-w-28" onClick={() => handleUpload()}>
          <UploadIcon className="me-1.5 size-5" />
          {tForm("form-upload")}
        </Button>
      </div> */}

      {error && <FieldError error={error} />}
    </div>
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
