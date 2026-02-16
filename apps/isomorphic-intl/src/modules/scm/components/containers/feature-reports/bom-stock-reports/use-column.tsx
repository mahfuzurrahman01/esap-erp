"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import { BomStockReports } from "@/modules/scm/types/feature-reports/bom-stock-reports";





const columnHelper = createColumnHelper<BomStockReports>()

export const useBomStockReportsColumn = () => {
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
      columnHelper.accessor("unitName", {
        id: "unitName",
        size: 300,
        header: t("form-unit-name"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        size: 300,
        enableSorting: true,
        header: t("form-quantity"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("unitCost", {
        id: "unitCost",
        size: 300,
        header: t("form-unit-cost"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("totalCost", {
        id: "totalCost",
        size: 300,
        header: t("form-total-cost"),
        enableSorting: true,
        cell: (info) => {
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {info.renderValue() || "-"}
            </Text>
          )
        },
      }),
    ],
    [t, tableT]
  )

  return columns
}