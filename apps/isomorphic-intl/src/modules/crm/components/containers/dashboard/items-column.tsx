import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

const columnHelper = createColumnHelper<any>()

export const useItemsColumn = () => {
  const t = useTranslations("table")

  const columns = useMemo(() => {
    const month = t("table-text-month")
    const saleCount = t("table-text-sale-count")
    const volume = t("table-text-volume")
    const saleValue = t("table-text-sale-value")
    const cost = t("table-text-cost")
    const profit = t("table-text-profit")
    const revenue = t("table-text-revenue")

    return [
      columnHelper.display({
        id: "serial",
        header: "#",
        size: 20,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.row.index + 1}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("salesMonthName", {
        id: "salesMonthName",
        size: 240,
        header: month,
        cell: ({row}) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salesMonthName}, {row.original.salesYear}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("numberOfSales", {
        id: "numberOfSales",
        size: 200,
        header: saleCount,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString()}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("volume", {
        id: "volume",
        size: 140,
        header: volume,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString()}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("saleValue", {
        id: "saleValue",
        size: 140,
        header: saleValue,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString()}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("cost", {
        id: "cost",
        size: 140,
        header: cost,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString() || 0}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("profit", {
        id: "profit",
        size: 140,
        header: profit,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString() || 0}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("revenue", {
        id: "revenue",
        size: 140,
        header: revenue,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString() || 0}
          </Text>
        ),
        enableSorting: false,
      }),
    ]
  }, [t])
  return columns
}
