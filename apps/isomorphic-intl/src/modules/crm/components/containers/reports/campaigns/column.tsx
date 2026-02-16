"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { CampaignReportList } from "@/modules/crm/types/campaign-report"

const columnHelper = createColumnHelper<CampaignReportList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const sl = tableT("table-text-sl")
  const company = tableT("table-text-company")
  const month = tableT("table-text-month")
  const quarter = tableT("table-text-quarter")
  const year = tableT("table-text-year")
  const source = tableT("table-text-source")
  const campaignCount = tableT("table-text-campaign-count")

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
      columnHelper.accessor("clientCompany", {
        id: "clientCompany",
        size: 350,
        header: company,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.clientCompany}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("numberOfCampaign", {
        id: "numberOfCampaign",
        size: 150,
        header: campaignCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.numberOfCampaign}
          </Text>
        ),
      }),
      columnHelper.accessor("month", {
        id: "month",
        size: 150,
        header: month,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.month}
          </Text>
        ),
      }),
      columnHelper.accessor("quarter", {
        id: "quarter",
        size: 150,
        header: quarter,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.quarter}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("year", {
        id: "year",
        size: 150,
        header: year,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.year}
          </Text>
        ),
      }),
      columnHelper.accessor("source", {
        id: "source",
        size: 150,
        header: source,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.source}
          </Text>
        ),
        enableSorting: false,
      }),
    ]
  }, [tableT])

  return columns
}
