"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { InventoryShortageStorage } from "@/modules/scm/types/feature-reports/inventory-shortage-storage"

const columnHelper = createColumnHelper<InventoryShortageStorage>()

export const useInventoryShortageStorageColumn = () => {
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
      columnHelper.accessor("warehouse", {
        id: "warehouse",
        size: 300,
        header: t("form-warehouse"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("sku", {
        id: "sku",
        size: 300,
        header: t("form-sku"),
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
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 300,
        header: t("form-status"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("reorderQuantity", {
        id: "reorderQuantity",
        size: 300,
        header: t("form-reorder-quantity"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("actualQuantity", {
        id: "actualQuantity",
        size: 300,
        header: t("form-actual-quantity"),
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
