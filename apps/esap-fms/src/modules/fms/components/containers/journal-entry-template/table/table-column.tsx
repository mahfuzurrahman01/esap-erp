"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { JournalTemplateView } from "@/modules/fms/types"

const columnHelper = createColumnHelper<JournalTemplateView>()

export const useTemplateTableColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 420,
        header: () => (
          <div className="flex items-center gap-6">
            <Text className="font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-id")}
            </Text>
            <Text className="font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-chart-of-account-name")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-8">
            <Text className="font-medium text-title">
              {row.index + 1}
            </Text>
            <Text className="font-medium text-title">
              {row.original.accounts?.[0]?.accountName || ''}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
    ]
  }, [tableT])

  return columns
}
