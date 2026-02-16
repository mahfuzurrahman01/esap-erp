"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { SlaList } from "@/modules/crm/types/sla"

import { getApprovalStatusBadge } from "../approvals/status-badge"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<SlaList>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const task = tableT("table-text-task")
    const status = tableT("table-text-status")
    const responseTime = tableT("table-text-response-time")
    const resolutionTime = tableT("table-text-resolution-time")

    return [
      columnHelper.accessor("name", {
        id: "name",
        size: 300,
        header: task,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.name}
          </Text>
        ),
      }),
      columnHelper.accessor("responseTime", {
        id: "responseTime",
        size: 240,
        header: responseTime,
        cell: ({ row }) => {
          const date = row.original.responseTime 
            ? new Date(row.original.responseTime) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("resolutionTime", {
        id: "resolutionTime",
        size: 150,
        header: resolutionTime,
        cell: ({ row }) => {
          const date = row.original.resolutionTime 
            ? new Date(row.original.resolutionTime) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 150,
        header: status,
        cell: (row) => row.renderValue() && getApprovalStatusBadge(row.renderValue()),
        enableSorting: false,
      }),
    ]
  }, [tableT])

  return columns
}
