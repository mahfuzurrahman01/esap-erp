import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { BudgetTemplateDetail } from "@/modules/fms/types"

const columnHelper = createColumnHelper<BudgetTemplateDetail>()

export const useBudgetTemplateTableColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 80,
        header: tableT("table-text-id"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.index + 1}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("monthName", {
        id: "monthName",
        size: 240,
        header: tableT("table-text-month-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.monthName}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("budgetPercentage", {
        id: "budgetPercentage",
        size: 240,
        header: tableT("table-text-budget-percentage"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.budgetPercentage}%
          </Text>
        ),
        enableSorting: false,
      }),
    ]
  }, [tableT])

  return columns
}
