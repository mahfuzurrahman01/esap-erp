"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { TicketsReportList } from "@/modules/crm/types/tickets-report"

const columnHelper = createColumnHelper<TicketsReportList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const sl = tableT("table-text-sl")
  const month = tableT("table-text-month")
  const quarter = tableT("table-text-quarter")
  const year = tableT("table-text-year")
  const ticketCount = tableT("table-text-ticket-count")
  const taskCount = tableT("table-text-task-count")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("sl", {
        id: "sl",
        size: 10,
        header: sl,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.index + 1}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("numberOfTask", {
        id: "numberOfTask",
        size: 150,
        header: ticketCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.numberOfTask}
          </Text>
        ),
      }),
      columnHelper.accessor("numberOfTicket", {
        id: "numberOfTicket",
        size: 150,
        header: taskCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.numberOfTicket}
          </Text>
        ),
      }),
      columnHelper.accessor("month", {
        id: "month",
        size: 350,
        header: month,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.month}
          </Text>
        ),
      }),
      columnHelper.accessor("quarter", {
        id: "quarter",
        size: 150,
        header: quarter,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.quarter}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("year", {
        id: "year",
        size: 150,
        header: year,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.year}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
