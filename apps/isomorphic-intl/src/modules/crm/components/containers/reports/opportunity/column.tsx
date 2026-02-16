"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import { OpportunityReport } from "@/modules/crm/types/opportunity-report"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<OpportunityReport>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const sl = tableT("table-text-sl")
  const stage = tableT("table-text-stage")
  const stageCount = tableT("table-text-stage-count")
  const customerName = tableT("table-text-customer")
  const closingDate = tableT("table-text-closing-date")
  const probability = tableT("table-text-probability")
  const amount = tableT("table-text-amount")

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
      columnHelper.accessor("stage", {
        id: "stage",
        size: 350,
        header: stage,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.stage}
          </Text>
        ),
      }),
      columnHelper.accessor("stageCount", {
        id: "stageCount",
        size: 150,
        header: stageCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.stageCount}
          </Text>
        ),
      }),
      columnHelper.accessor("customerName", {
        id: "customerName",
        size: 150,
        header: customerName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.customerName || "N/A"}
          </Text>
        ),
      }),
      columnHelper.accessor("closingDate", {
        id: "closingDate",
        size: 150,
        header: closingDate,
        cell: ({ row }) => {
          const date = row.original.closingDate 
            ? new Date(row.original.closingDate) 
            : null;
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : ""}
            </Text>
          );
        },
      }),
      columnHelper.accessor("probability", {
        id: "probability",
        size: 150,
        header: probability,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.probability}%
          </Text>
        ),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 150,
        header: amount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.amount}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}