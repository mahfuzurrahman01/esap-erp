"use client"

import Link from "next/link"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Button, Text } from "rizzui"

import PdfIcon from "@/components/icons/pdf-icon"
import Box from "@/components/ui/box"
import { Compliance } from "@/modules/scm/types/compliance-and-risk/compliance-types"
import { processDescription } from "@/modules/scm/utils/html-to-covert"

import { getComplianceStatusBadge } from "../compliance-list/status-badge"

export default function ComplianceView({
  initialData,
}: {
  initialData: Compliance
}) {
  const t = useTranslations("common")
  return (
    <Box>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 p-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-compliance-area")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.complianceArea}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-regulation-standard")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.regulationStandard}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-task-name")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.taskName}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-assigned-to-name")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.assignedToName}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-due-date")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.dueDate
                ? dayjs(initialData.dueDate).isValid()
                  ? dayjs(initialData.dueDate).format("YYYY-MM-DD")
                  : "N/A"
                : "N/A"}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-completion-status")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.completionStatus
                ? getComplianceStatusBadge(initialData?.completionStatus)
                : "pending"}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-comments")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {processDescription(initialData?.comments || "", false)}
            </Text>
          </div>
          <div className="col-span-2">
            <div className="flex items-center justify-between">
              <Text className="font-base w-full text-gray-500 dark:text-gray-400">
                {t("text-proof-document")}
              </Text>
              {initialData?.proofDocumentUrl === null ? (
                <></>
              ) : (
                <div className="flex w-full items-center justify-between rounded-lg">
                  <div className="flex items-center">
                    <PdfIcon className="mr-2 h-8 w-8" />
                    <Text className="font-base text-gray-900 dark:text-gray-0">
                      {t("text-document")}
                    </Text>
                  </div>
                  <Button variant="outline">
                    <Link href={initialData?.proofDocumentUrl || ""} download>
                      {t("text-download")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
