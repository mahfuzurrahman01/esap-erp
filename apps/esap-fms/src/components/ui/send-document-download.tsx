import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"

import FileDownloadIcon from "../icons/file-download-icon"
import UploadFilePinIcon from "../icons/upload-file-pin"
import Button from "./button"

interface DocumentDownloaderProps {
  url: string
}

export default function SendDocumentDownload({ url }: DocumentDownloaderProps) {
  const t = useTranslations("common")
  return (
    <div className="mx-auto my-2 flex !w-[99%] items-center justify-between rounded-lg bg-gray-400/20 px-4 py-1.5 text-gray-800 dark:bg-gray-700 dark:text-gray-0">
      <div className="flex items-center gap-2 text-gray-500/80">
        <UploadFilePinIcon className="h-6 w-6" />

        <span className="text-sm">{1} {t("text-attachments")}</span>
      </div>
      <div className="flex items-center">
        <Button variant="text">
          <FileDownloadIcon className="h-6 w-6" />
          <Link href={url} download>
            {t("text-download")}
          </Link>
        </Button>
      </div>
    </div>
  )
}
