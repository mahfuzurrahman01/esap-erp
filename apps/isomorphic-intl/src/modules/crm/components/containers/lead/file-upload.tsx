"use client"

import Image from "next/image"
import React, { useRef, useState } from "react"

import SimpleBar from "@core/ui/simplebar"
import Upload from "@core/ui/upload"
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import Papa from "papaparse"
import { toast } from "react-hot-toast"
import {
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiXBold,
} from "react-icons/pi"
import { ActionIcon, Text, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { DownloadIcon } from "@/components/icons/crm/download"
import { UploadIcon } from "@/components/icons/crm/upload"
import { Button } from "@/components/ui"

type AcceptedFiles = "img" | "pdf" | "csv" | "imgAndPdf" | "all"

interface FileInputProps {
  className?: string
  label?: React.ReactNode
  multiple?: boolean
  btnLabel?: string
  accept?: AcceptedFiles
  onUpload?: (files: File[], parsedData?: any) => void
}

interface FileUploadProps {
  label?: string
  fieldLabel?: string
  isClose?: boolean
  btnLabel?: string
  multiple?: boolean
  accept?: AcceptedFiles
  onUpload?: (files: File[], parsedData?: any) => void
  className?: string
}

export default function FileUpload({
  label,
  btnLabel = "Upload",
  fieldLabel,
  isClose = false,
  multiple = true,
  accept = "all",
  onUpload,
  className,
}: FileUploadProps) {
  const { closeModal } = useModal()

  return (
    <div className={cn("m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7 dark:bg-gray-700 rounded-lg", className)}>
      {label && (
        <div className="mb-6 flex items-center justify-between">
          <Title as="h3" className="text-lg">
            {label}
          </Title>
          {isClose && (
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => closeModal()}
              className="p-0 text-gray-500 hover:!text-gray-900">
              <PiXBold className="h-[18px] w-[18px]" />
            </ActionIcon>
          )}
        </div>
      )}

      <FileInput
        accept={accept}
        multiple={multiple}
        label={fieldLabel}
        btnLabel={btnLabel}
        onUpload={onUpload}
      />
    </div>
  )
}

const fileType = {
  "text/csv": <PiFileCsv className="h-5 w-5 text-primary" />,
  "text/plain": <PiFile className="h-5 w-5 text-primary" />,
  "application/pdf": <PiFilePdf className="h-5 w-5 text-red-dark" />,
  "application/xml": <PiFileXls className="h-5 w-5 text-primary" />,
  "application/zip": <PiFileZip className="h-5 w-5" />,
  "application/gzip": <PiFileZip className="h-5 w-5" />,
  "application/msword": <PiFileDoc className="h-5 w-5" />,
} as { [key: string]: React.ReactElement }

export const FileInput = ({
  label,
  multiple = true,
  accept = "img",
  className,
  onUpload,
}: FileInputProps) => {
  const t = useTranslations("common")
  const { closeModal } = useModal()
  const [files, setFiles] = useState<Array<File>>([])
  const imageRef = useRef<HTMLInputElement>(null)

  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1]) return file[1]
      })
      .filter((file) => file !== undefined)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  function handleImageDelete(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    ;(imageRef.current as HTMLInputElement).value = ""
  }

  async function handleFileUpload() {
    if (files.length) {
      if (accept === "csv" && files[0].type === "text/csv") {
        Papa.parse(files[0], {
          complete: (results: any) => {
            // //console.log("Parsed CSV:", results.data)
            onUpload?.(files, results.data)
          },
          header: true,
          skipEmptyLines: true,
        })
      } else {
        onUpload?.(files)
      }

      // toast.success(<Text as="b">{t("text-file-successfully-added")}</Text>)

      setTimeout(() => {
        closeModal()
      }, 200)
    } else {
      toast.error(<Text as="b">{t("text-please-drop-your-file")}</Text>)
    }
  }

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={imageRef}
        accept={accept}
        multiple={multiple}
        onChange={(event) => handleFileDrop(event)}
        iconClassName="w-[200px] h-[150px]"
        className="mb-6 min-h-[350px] cursor-pointer justify-center border-dashed border-gray-500/20 bg-gray-500/10 hover:border-gray-500/20"
      />

      {files.length > 1 ? (
        <Text className="mb-2 text-lg text-title">{files.length} files</Text>
      ) : null}

      {files.length > 0 && (
        <SimpleBar className="max-h-[280px]">
          <div className="grid grid-cols-1">
            {files?.map((file: File, index: number) => (
              <div
                className="flex min-h-[58px] w-full items-center rounded-xl pe-3"
                key={file.name}>
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-dashed border-gray-500/20 bg-gray-500/10 object-cover px-2 py-1.5">
                  {file.type.includes("image") ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      fill
                      className="object-contain"
                      priority
                      alt={file.name}
                      sizes="(max-width: 768px) 100vw"
                    />
                  ) : (
                    <>{fileType[file.type]}</>
                  )}
                </div>
                <div className="truncate px-2.5">{file.name}</div>
                <ActionIcon
                  onClick={() => handleImageDelete(index)}
                  size="sm"
                  color="danger"
                  rounded="full"
                  className="ms-auto flex-shrink-0 bg-red p-0">
                  <PiXBold className="w-6" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </SimpleBar>
      )}
      <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="outline"
          className={cn("w-full max-w-28", !files.length && "hidden", "w-full")}
          onClick={() => setFiles([])}>
          Reset
        </Button>
        <a href="/auth/lead-sample.xlsx" download className="btn btn-outline">
          <Button variant="outline" className="w-full max-w-28">
            <DownloadIcon className="me-1.5 size-5" />
            Sample
          </Button>
        </a>
        <Button className="w-full max-w-28" onClick={() => handleFileUpload()}>
          <UploadIcon className="me-1.5 size-5" />
          Upload
        </Button>
      </div>
    </div>
  )
}
