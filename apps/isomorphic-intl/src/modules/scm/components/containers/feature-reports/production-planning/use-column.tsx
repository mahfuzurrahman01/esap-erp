"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import { ProductionPlanningReport } from "@/modules/scm/types/feature-reports/production-planning-report"
import { getWorkOrderTrackingStatusBadge } from "../../production-control/work-order-tracking/work-order-tracking-list/status-badge"

const columnHelper = createColumnHelper<ProductionPlanningReport>()

export const useProductionPlanningColumn = () => {
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
      columnHelper.accessor("workCenter", {
        id: "workCenter",
        size: 300,
        header: t("form-work-center"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("assignTo", {
        id: "assignTo",
        size: 300,
        header: t("form-employee"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("workProgress", {
        id: "workProgress",
        size: 300,
        header: t("form-work-progress"),
        cell: (info) => getWorkOrderTrackingStatusBadge(info.renderValue()),
        enableSorting: true,
      }),
      columnHelper.accessor("orderQuantity", {
        id: "orderQuantity",
        size: 300,
        header: t("form-order-quantity"),
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
