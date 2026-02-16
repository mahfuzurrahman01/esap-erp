"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { PurchaseOrderTrends } from "@/modules/scm/types/feature-reports/purchase-order-trends"

const columnHelper = createColumnHelper<PurchaseOrderTrends>()

export const usePurchaseOrderTrendsColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(
    () => [
      columnHelper.accessor("sl", {
        id: "sl",
        size: 100,
        header: tableT("table-text-id"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("productName", {
        id: "productName",
        size: 300,
        header: t("form-product-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("totalQty", {
        id: "totalQty",
        size: 300,
        header: t("form-total-qty"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("totalAmount", {
        id: "totalAmount",
        size: 300,
        header: t("form-total-amount"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
    ],
    [t, tableT]
  )

  return columns
}
