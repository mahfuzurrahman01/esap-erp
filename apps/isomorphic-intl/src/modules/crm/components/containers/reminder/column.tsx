"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { useTaskById } from "@/modules/crm/hooks/use-task"
import { ReminderList } from "@/modules/crm/types/reminder"
import { Task } from "@/modules/crm/types/task"
import { taskStatusOptions } from "@/data/crm/campaign"
import { getApprovalStatusBadge } from "../approvals/status-badge"

const columnHelper = createColumnHelper<ReminderList>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const TaskCell = ({ taskId }: { taskId?: string }) => {
    const tableT = useTranslations("table")
    const { data: task, isLoading } = useTaskById(taskId) as {
      data: Task | undefined
      isLoading: boolean
    }
    if (isLoading)
      return (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {tableT("table-text-loading")}
        </Text>
      )
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {task?.subject}
      </Text>
    )
  }

  const columns = useMemo(() => {
    const type = tableT("table-text-type")
    const task = tableT("table-text-task")
    const status = tableT("table-text-status")
    const id = tableT("table-text-id")

    return [
      columnHelper.display({
        id: "serial",
        header: id,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.shortOrder}
          </Text>
        ),
        size: 20,
      }),
      columnHelper.accessor("type", {
        id: "type",
        size: 250,
        header: type,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.type}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("taskId", {
        id: "taskId",
        size: 350,
        header: task,
        cell: ({ row }) => {
          return <TaskCell taskId={row.original.taskId} />
        },
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 250,
        header: status,
        cell: ({ row }) => {
          const statusLabel =
            taskStatusOptions.find(
              (option) => option.value === row.original.status
            )?.label || row.original.status
          return row.original.status ? getApprovalStatusBadge(statusLabel) : null
        },
        enableSorting: false,
      }),
    ]
  }, [tableT])

  return columns
}
