"use client"

import Image from "next/image"
import React, { useRef } from "react"

import SimpleBar from "@core/ui/simplebar";
import Upload from "@core/ui/upload";
import cn from "@core/utils/class-names";
import { useTranslations } from "next-intl";
import {
  PiXBold,
} from "react-icons/pi"
import { ActionIcon, Text, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal";

type AcceptedFiles = "img" | "pdf" | "csv" | "imgAndPdf" | "all"

interface FileInputProps {
  className?: string
  label?: React.ReactNode
  multiple?: boolean
  btnLabel?: string
  accept?: AcceptedFiles
  onUpload?: (files: File[], parsedData?: any) => void
  file: File | string
  setFile: any
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
  file: File | string
  setFile: any
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
  file,
  setFile,
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
        file={file}
        setFile={setFile}
      />
    </div>
  )
}

export const FileInput = ({
  label,

  multiple = true,
  accept = "img",
  className,
  onUpload,
  file,
  setFile,
}: FileInputProps) => {
  const t = useTranslations("common");
  const imageRef = useRef<HTMLInputElement>(null);

  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile); // Replace the existing file
    }
  }

  function handleImageDelete() {
    setFile(null);
    if (imageRef.current) {
      imageRef.current.value = "";
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
        className="mb-6 min-h-[350px] cursor-pointer justify-center border-dashed border-gray-500/20 bg-gray-500/10 hover:border-green-500"
      />

      {file && (
        <SimpleBar className="max-h-[280px]">
          <div className="grid grid-cols-1">
            <div
              className="flex min-h-[58px] w-full items-center rounded-xl pe-3"
              key={typeof file === "string" ? file : file.name}
            >
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-dashed border-gray-500/20 bg-gray-500/10 object-cover px-2 py-1.5">
                {typeof file === "string" ? (
                  <Image
                    src={file} // Use URL directly if it's a string
                    fill
                    className="object-contain"
                    priority
                    alt={file.split("/").pop() || "file"}
                    sizes="(max-width: 768px) 100vw"
                  />
                ) : (
                  <Image
                    src={URL.createObjectURL(file)}
                    fill
                    className="object-contain"
                    priority
                    alt={file.name}
                    sizes="(max-width: 768px) 100vw"
                  />
                )}
              </div>
              <div className="truncate px-2.5">
                {typeof file === "string" ? file.split("/").pop() : file.name}
              </div>
              <ActionIcon
                onClick={handleImageDelete}
                size="sm"
                color="danger"
                rounded="full"
                className="ms-auto flex-shrink-0 bg-red p-0"
              >
                <PiXBold className="w-6" />
              </ActionIcon>
            </div>
          </div>
        </SimpleBar>
      )}
    </div>
  )
}
