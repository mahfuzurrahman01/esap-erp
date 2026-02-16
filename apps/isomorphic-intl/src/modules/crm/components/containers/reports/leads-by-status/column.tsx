"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { LeadsByStatusTypes } from "@/modules/crm/types/leads-report"

const columnHelper = createColumnHelper<LeadsByStatusTypes>()

export const leadStatusOptions = [
  { value: "1", label: "Attempted to Contact" },
  { value: "2", label: "Contact in Future" },
  { value: "3", label: "Contacted" },
  { value: "4", label: "Junk Lead" },
  { value: "5", label: "Lost Lead" },
  { value: "6", label: "Not Contacted" },
  { value: "7", label: "Pre-Qualified" },
  { value: "8", label: "Not Qualified" }
]

export const useColumn = () => {
  const tableT = useTranslations("table")
  const sl = tableT("table-text-sl")
  const company = tableT("table-text-company")
  const leadOwner = tableT("table-text-lead-owner")
  const firstName = tableT("table-text-first-name")
  const leadCount = tableT("table-text-lead-count")
  const status = tableT("table-text-status")

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
      columnHelper.accessor("leadStatus", {
        id: "leadStatus",
        size: 250,
        header: status,
        cell: ({ row }) => {
          const leadStatusValue = row.original.leadStatus
          const statusLabel =
            leadStatusOptions.find((option) => option.value === leadStatusValue)
              ?.label || "Unknown Status"

          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {statusLabel}
            </Text>
          )
        },
        enableSorting: false,
      }),
      columnHelper.accessor("leadStatusCount", {
        id: "leadStatusCount",
        size: 150,
        header: leadCount,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.leadStatusCount}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("leadName", {
        id: "leadName",
        size: 150,
        header: leadOwner,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.leadName}
          </Text>
        ),
      }),
      columnHelper.accessor("company", {
        id: "company",
        size: 350,
        header: company,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.company}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("firstName", {
        id: "firstName",
        size: 150,
        header: firstName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.firstName}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
