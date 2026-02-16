"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { serviceLevelAgreements } from "@/modules/scm/types/procurement/supplier/contract-types"

const columnHelper = createColumnHelper<serviceLevelAgreements>()

export const useSlaColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const Criteria = t("form-service-level-agreement-sla-criteria")
    const Metric = t("form-service-level-agreement-sla-metric")

    return [
      columnHelper.accessor("criteria", {
        id: "criteria",
        size: 240,
        header: Criteria,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {String(info.renderValue())}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("metric", {
        id: "metric",
        size: 240,
        header: Metric,
        enableSorting: false,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {Number(info.renderValue())}
          </Text>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
