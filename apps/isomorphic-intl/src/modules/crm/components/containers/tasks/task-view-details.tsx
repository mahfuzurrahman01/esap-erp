"use client"

import { useTranslations } from "next-intl"
import DrawerHeader from "@/components/base/drawer-header"
import { DownloadIcon } from "@/components/icons/crm/download"
import { Task } from "@/modules/crm/types/task"
import { formatDate } from "@/utils/format-date"
import { taskStatusOptions } from "@/data/crm/campaign"

type TaskViewDetailsProps = {
  dataById: Task | undefined
  assignedTo?: string
  handleCloseDrawer: () => void
}

export default function TaskViewDetails({
  dataById,
  assignedTo,
  handleCloseDrawer,
}: TaskViewDetailsProps) {
  const t = useTranslations("crm")
  function getStatusLabel(value: string) {
    const option = taskStatusOptions.find((option) => option.value === value)
    return option ? option.label : "-"
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-task-details")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-id"), value: dataById?.shortOrder },
                { label: t("text-subject"), value: dataById?.subject },
                { label: t("text-ticket"), value: dataById?.ticket?.subject },
                { label: t("text-assigned-to"), value: assignedTo },
                {
                  label: t("text-start-date"),
                  value: dataById?.startDate ? formatDate(dataById?.startDate, "DD/MM/YYYY") : "",
                },
                {
                  label: t("text-end-date"),
                  value: dataById?.dueDate ? formatDate(dataById?.dueDate, "DD/MM/YYYY") : "",
                },
                { label: t("text-priority"), value: dataById?.priority },
                {
                  label: t("text-repeat-date"),
                  value: dataById?.repeatDate ? formatDate(dataById?.repeatDate, "DD/MM/YYYY") : "",
                },
                {
                  label: t("text-attachment"),
                  value: dataById?.filePath ? (
                    <div className="flex items-center space-x-2">
                      <a
                        href={String(dataById?.filePath)}
                        download={String(dataById?.filePath).split("/").pop()}
                        className="text-gray-900 dark:text-gray-0"
                        title="Download Attachment"
                        rel="noopener noreferrer">
                        <p className="flex">
                          {String(dataById?.filePath).split("/").pop()}{" "}
                          <DownloadIcon className="ml-2 text-gray-900 dark:text-gray-0" />
                        </p>
                      </a>
                    </div>
                  ) : (
                    t("text-no-attachment")
                  ),
                },
                { label: t("text-status"), value: getStatusLabel(dataById?.status ?? "") },
                { label: t("text-description"), value: dataById?.description },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="whitespace-nowrap border-b border-dotted border-gray-500/20">
                  <td className="font-base w-1/3 py-4 pr-4 text-gray-500 dark:text-gray-400">
                    {item.label}
                  </td>
                  <td className="py-4 font-semibold text-gray-900 dark:text-gray-0">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
