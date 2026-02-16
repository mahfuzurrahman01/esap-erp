"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import { ForecastReviewAnalytics } from "@/modules/scm/types/feature-reports/forecast-review-analytics";





const columnHelper = createColumnHelper<ForecastReviewAnalytics>()

export const useForecastReviewAnalyticsColumn = () => {
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
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("forecastPeriod", {
        id: "forecastPeriod",
        size: 300,
        header: t("form-forecast-period"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("currentSalesData", {
        id: "currentSalesData",
        size: 300,
        enableSorting: true,
        header: t("form-current-sales-data"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("plannedSalesTarget", {
        id: "plannedSalesTarget",
        size: 300,
        header: t("form-planned-sales-target"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("demandVariationPercentage", {
        id: "demandVariationPercentage",
        size: 300,
        header: t("form-demand-variation-percentage"),
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