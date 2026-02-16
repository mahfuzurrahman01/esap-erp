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
import { Button } from "@/components/ui"

import UploadIcon from "../icons/upload"

type AcceptedFiles = "img" | "pdf" | "csv" | "imgAndPdf" | "all"

interface FileInputProps {
  className?: string
  label?: React.ReactNode
  multiple?: boolean
  btnLabel?: string
  accept?: AcceptedFiles
  onUpload?: (files: File[], parsedData?: any) => void
  actionEnabled?: boolean
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
  actionEnabled?: boolean
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
  actionEnabled = true,
}: FileUploadProps) {
  const { closeModal } = useModal()

  return (
    <div className={cn("m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7", className)}>
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
        actionEnabled={actionEnabled}
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
  btnLabel = "Upload",
  multiple = true,
  accept = "img",
  className,
  onUpload,
  actionEnabled = true,
}: FileInputProps) => {
  const t = useTranslations("common")
  const { closeModal } = useModal()
  const [files, setFiles] = useState<Array<File>>([])
  const imageRef = useRef<HTMLInputElement>(null)

  // function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
  //   const uploadedFiles = (event.target as HTMLInputElement).files
  //   const newFiles = Object.entries(uploadedFiles as object)
  //     .map((file) => {
  //       if (file[1]) return file[1]
  //     })
  //     .filter((file) => file !== undefined)
  //   setFiles((prevFiles) => [...prevFiles, ...newFiles])
  // }

  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files
    if (!uploadedFiles) return

    if (!multiple) {
      // For single file upload, replace existing files
      const newFile = uploadedFiles[0]
      if (newFile) {
        setFiles([newFile])
        handleFileUpload([newFile], actionEnabled) // Automatically upload single file
      }
    } else {
      // For multiple files, append to existing files
      const newFiles = Object.entries(uploadedFiles as object)
        .map((file) => {
          if (file[1]) return file[1]
        })
        .filter((file): file is File => file !== undefined)
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles]
        handleFileUpload(updatedFiles, actionEnabled) // Automatically upload multiple files
        return updatedFiles
      })
    }
  }

  function handleImageDelete(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    ;(imageRef.current as HTMLInputElement).value = ""
  }

  // async function handleFileUpload() {
  //   if (files.length) {
  //     if (accept === "csv" && files[0].type === "text/csv") {
  //       Papa.parse(files[0], {
  //         complete: (results: any) => {
  //           onUpload?.(files, results.data)
  //         },
  //         header: true,
  //         skipEmptyLines: true,
  //       })
  //     } else {
  //       onUpload?.(files)
  //     }

  //     toast.success(<Text as="b">{t("text-file-successfully-added")}</Text>)

  //     setTimeout(() => {
  //       closeModal()
  //     }, 200)
  //   } else {
  //     toast.error(<Text as="b">{t("text-please-drop-your-file")}</Text>)
  //   }
  // }

  async function handleFileUpload(
    filesToUpload: File[],
    actionEnabled: boolean
  ) {
    if (filesToUpload.length) {
      if (accept === "csv" && filesToUpload[0].type === "text/csv") {
        Papa.parse(filesToUpload[0], {
          complete: (results: any) => {
            onUpload?.(filesToUpload, results.data)
          },
          header: true,
          skipEmptyLines: true,
        })
      } else {
        onUpload?.(filesToUpload)
      }

      toast.success(<Text as="b">{t("text-file-successfully-added")}</Text>)

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
        className="mb-6 min-h-[350px] cursor-pointer justify-center border-dashed border-gray-500/20 bg-gray-500/10 hover:border-primary"
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
                <div className="dark:text-title-dark truncate px-2.5 text-title">
                  {file.name}
                </div>
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
      {actionEnabled && (
        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="outline"
            className={cn(
              "w-full max-w-28",
              !files.length && "hidden",
              "w-full"
            )}
            onClick={() => setFiles([])}>
            {t("text-reset")}
          </Button>
          <Button
            className={cn(
              "w-full max-w-28",
              !files.length && "hidden",
              "w-full"
            )}
            onClick={() => handleFileUpload(files, actionEnabled)}>
            <UploadIcon className="me-1.5 size-5" />
            {t("text-upload")}
          </Button>
        </div>
      )}
    </div>
  )
}
