"use client"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import dayjs from "dayjs"
import { PaymentSummaryList } from "@/modules/fms/types/payment-summary"

const columnHelper = createColumnHelper<PaymentSummaryList>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("companyName", {
        id: "companyName",
        size: 350,
        header: ({ table }) => (
          <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
            {tableT("table-text-company-name")}
          </Text>
        ),
        cell: ({ row }) => (
          <Text className="ms-2 font-medium text-title">
            {row.original.companyName}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("totalPaymentAmount", {
        id: "totalPaymentAmount",
        size: 340,
        header: tableT("table-text-total-payment-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.totalPaymentAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("totalPayments", {
        id: "totalPayments",
        size: 360,
        header: tableT("table-text-total-payment"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.totalPayments}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
