"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { BudgetSummary } from "@/modules/fms/types/budget-summary"

const columnHelper = createColumnHelper<BudgetSummary>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("budgetName", {
        id: "budgetName",
        size: 240,
        header: tableT("table-text-budget-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.budgetName}
          </Text>
        ),
      }),
      columnHelper.accessor("fiscalYear", {
        id: "fiscalYear",
        size: 240,
        header: tableT("table-text-fiscal-year"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.fiscalYear}
          </Text>
        ),
      }),
      columnHelper.accessor("startDate", {
        id: "startDate",
        size: 240,
        header: tableT("table-text-start-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.startDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        size: 240,
        header: tableT("table-text-end-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.endDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("totalBudgetAmount", {
        id: "totalBudgetAmount",
        size: 240,
        header: tableT("table-text-total-budget-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            ${row.original.totalBudgetAmount.toLocaleString()}
          </Text>
        ),
      }),
      columnHelper.accessor("costCenter", {
        id: "costCenter",
        size: 240,
        header: tableT("table-text-cost-center"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.costCenter}
          </Text>
        ),
      }),
      // columnHelper.accessor("budgetDistribution", {
      //   id: "budgetDistribution",
      //   size: 240,
      //   header: tableT("table-text-budget-distribution"),
      //   cell: ({ row }) => {
      //     const distribution = row.original.budgetDistribution
      //       .sort((a, b) => {
      //         const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      //         return months.indexOf(a.month) - months.indexOf(b.month)
      //       })
      //       .map(d => `${d.month}: ${d.percentage}%`)
      //       .join(", ")
      //     return (
      //       <Text className="font-medium text-gray-900 dark:text-gray-0">
      //         {distribution}
      //       </Text>
      //     )
      //   },
      // }),
    ]
  }, [tableT])

  return columns
}
