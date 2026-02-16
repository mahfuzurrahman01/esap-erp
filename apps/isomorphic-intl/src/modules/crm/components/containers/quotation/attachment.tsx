"use client"

import { useMemo } from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { DownloadIcon } from "@/components/icons/crm/download"

export default function AttachmentSection({
  fileUrl,
}: {
  fileUrl?: string | null
}) {
  const t = useTranslations("crm")

  const fileName = useMemo(() => {
    if (!fileUrl) return ""
    return fileUrl.split("/").pop()
  }, [fileUrl])

  return (
    <div className="border-b p-6 font-semibold">
      <Text className="text-base font-medium text-black">
        {t("text-attachment")}
      </Text>
      <br />
      <div className="flex items-center space-x-2">
        <Text className="flex font-medium">
          {t("text-documents")}:{" "}
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              download={fileName}
              className="ml-2 flex items-center text-blue-500 hover:underline">
              <span className="mr-2 text-black">{fileName}</span>
              <DownloadIcon className="mr-2 text-red-500" />
            </a>
          )}
        </Text>
      </div>
    </div>
  )
}
