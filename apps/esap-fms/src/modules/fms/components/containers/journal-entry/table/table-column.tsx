import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { JournalDetail } from "@/modules/fms/types"

const columnHelper = createColumnHelper<JournalDetail>()

export const useJournalEntryTableColumn = () => {
  const tableT = useTranslations("table")
  const { coa } = useSharedDataHooks(["coa"])
  const { coaOptions } = coa

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
            <Text className="font-medium text-title">{row.index + 1}</Text>
            <Text className="font-medium text-title">
              {coaOptions?.find(
                (option: any) => option.value === row.original.chartOfAccountId
              )?.label || row.original.chartOfAccountId}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("debit", {
        id: "debit",
        size: 100,
        header: tableT("table-text-debit"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.debit?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || "0.00"}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("credit", {
        id: "credit",
        size: 100,
        header: tableT("table-text-credit"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.credit?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || "0.00"}
          </Text>
        ),
        enableSorting: false,
      }),
    ]
  }, [tableT, coaOptions])

  return columns
}
