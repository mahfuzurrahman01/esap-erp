"use client"

import { taskStatusOptions } from "@/data/crm/campaign"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import { getApprovalStatusBadge } from "../approvals/status-badge"
import { formatDate } from "@/utils/format-date"

export const useTasksColumns = () => {
  const t = useTranslations("table")
  return [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
    {
      id: "subject",
      header: t("table-text-subject"),
      accessorKey: "subject",
      cell: (props: any) => (
        <span
            className="block max-w-[200px] truncate font-medium text-gray-900 dark:text-gray-0"
            title={props.row.original.subject}>
            {props.row.original.subject}
          </span>
      ),
    },
    {
      id: "deadline",
      header: t("table-text-deadline"),
      accessorKey: "deadline",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {formatDate(props.row.original.dueDate, "DD/MM/YYYY")}
        </Text>
      ),
    },
    {
      id: "priority",
      header: t("table-text-priority"),
      accessorKey: "priority",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.priority}
        </Text>
      ),
    },
    {
      id: "status",
      header: t("table-text-status"),
      accessorKey: "status",
      cell: (props: any) => {
        const statusLabel =
            taskStatusOptions.find(
              (option) => option.value === props.row.original.status
            )?.label || props.row.original.status
        return props.row.original.status ? getApprovalStatusBadge(statusLabel) : null
      },
    }
  ]
}