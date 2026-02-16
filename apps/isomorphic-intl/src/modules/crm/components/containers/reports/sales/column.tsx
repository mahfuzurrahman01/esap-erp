"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { SalesReportList } from "@/modules/crm/types/sales-report"

const columnHelper = createColumnHelper<SalesReportList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const sl = tableT("table-text-sl")
  const month = tableT("table-text-month")
  const volume = tableT("table-text-volume")
  const cost = tableT("table-text-cost")
  const discount = tableT("table-text-discount")
  const tax = tableT("table-text-tax")
  const profit = tableT("table-text-profit")
  const revenue = tableT("table-text-revenue")
  const salesCount = tableT("table-text-sales-count")
  const saleValue = tableT("table-text-sale-value")

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
      columnHelper.accessor("salesMonthName", {
        id: "salesMonthName",
        size: 250,
        header: month,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.salesMonthName}, {row.original.salesYear}
          </Text>
        ),
      }),
      columnHelper.accessor("numberOfSales", {
        id: "numberOfSales",
        size: 180,
        header: salesCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.numberOfSales}
          </Text>
        ),
      }),
      columnHelper.accessor("volume", {
        id: "volume",
        size: 150,
        header: volume,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.volume}
          </Text>
        ),
      }),
      columnHelper.accessor("saleValue", {
        id: "saleValue",
        size: 150,
        header: saleValue,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.saleValue}
          </Text>
        ),
      }),
      columnHelper.accessor("cost", {
        id: "cost",
        size: 150,
        header: cost,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.cost}
          </Text>
        ),
      }),
      columnHelper.accessor("discount", {
        id: "discount",
        size: 150,
        header: discount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.discount}
          </Text>
        ),
      }),
      columnHelper.accessor("tax", {
        id: "tax",
        size: 150,
        header: tax,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.tax}
          </Text>
        ),
      }),
      columnHelper.accessor("profit", {
        id: "profit",
        size: 150,
        header: profit,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.profit}
          </Text>
        ),
      }),
      columnHelper.accessor("revenue", {
        id: "revenue",
        size: 150,
        header: revenue,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.revenue}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
