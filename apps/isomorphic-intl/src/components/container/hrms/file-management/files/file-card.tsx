"use client"

import { useState } from "react"

import dayjs from "dayjs"
import {
  PiFile,
  PiFileCode,
  PiFileDoc,
  PiFileImage,
  PiFilePdf,
  PiFileXls,
} from "react-icons/pi"
import { Checkbox, Text, Title } from "rizzui"

import { UploadedFile } from "@/types/hrms/file-management/folders.types"

type FileCardProps = {
  file: UploadedFile
  isSelected?: boolean
  onSelect?: (id: number) => void
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()

  switch (extension) {
    case "pdf":
      return <PiFilePdf className="h-12 w-12 text-red-500" />
    case "doc":
    case "docx":
      return <PiFileDoc className="h-12 w-12 text-blue-500" />
    case "xls":
    case "xlsx":
      return <PiFileXls className="h-12 w-12 text-green-500" />
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <PiFileImage className="h-12 w-12 text-purple-500" />
    case "xml":
    case "json":
    case "html":
    case "css":
    case "js":
      return <PiFileCode className="h-12 w-12 text-yellow-500" />
    default:
      return <PiFile className="h-12 w-12 text-gray-500" />
  }
}

export default function FileCard({
  file,
  isSelected,
  onSelect,
}: FileCardProps) {
  const [showCheckBox, setShowCheckBox] = useState(false)

  const handleDownload = () => {
    window.open(file.filePath, "_blank")
  }

  return (
    <div
      onMouseEnter={() => setShowCheckBox(true)}
      onMouseLeave={() => setShowCheckBox(false)}
      className="dropdown-gr card-shadow relative !z-50 mt-1 max-h-40 w-full min-w-[8rem] rounded-lg border border-gray-200 border-transparent bg-paper p-5 transition-all duration-200">
      <div className="absolute right-2 top-2 flex items-center gap-2">
        {(showCheckBox || isSelected) && (
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect?.(file.id)}
            className="cursor-pointer"
            size="sm"
          />
        )}
      </div>

      <div onClick={handleDownload} className="mb-4 cursor-pointer">
        {getFileIcon(file.uploadedFileName)}
      </div>

      <div className="space-y-2">
        <Title
          as="h6"
          className="truncate text-sm font-semibold capitalize text-gray-900">
          {file.uploadedFileName}
        </Title>
        <Text className="text-xs text-gray-500">
          Created on {dayjs(file.createdDate).format("MMM D, YYYY h:mm A")}
        </Text>
      </div>
    </div>
  )
}
