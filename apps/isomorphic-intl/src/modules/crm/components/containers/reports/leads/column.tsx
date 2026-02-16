"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { LeadsByCompany } from "@/modules/crm/types/leads-report"

const columnHelper = createColumnHelper<LeadsByCompany>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const sl = tableT("table-text-sl")
  const company = tableT("table-text-company")
  const month = tableT("table-text-month")
  const quarter = tableT("table-text-quarter")
  const year = tableT("table-text-year")
  const leadCount = tableT("table-text-lead-count")

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
      columnHelper.accessor("numbersOfLead", {
        id: "numbersOfLead",
        size: 150,
        header: leadCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.numbersOfLead}
          </Text>
        ),
        enableSorting: false,
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
    ]
  }, [tableT])

  return columns
}
