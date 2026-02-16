"use client"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import dayjs from "dayjs"
import { DailyPaymentsList } from "@/modules/fms/types/daily-payments"

const columnHelper = createColumnHelper<DailyPaymentsList>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("postingDate", {
        id: "postingDate",
        size: 350,
        header: ({ table }) => (
          <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
            {tableT("table-text-posting-date")}
          </Text>
        ),
        cell: ({ row }) => (
          <Text className="ms-2 font-medium text-title">
            {row.original.postingDate && dayjs(row.original.postingDate).format("DD-MM-YYYY")}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("totalAmount", {
        id: "totalAmount",
        size: 340,
        header: tableT("table-text-total-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.totalAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("paymentCount", {
        id: "paymentCount",
        size: 360,
        header: tableT("table-text-payment-count"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.paymentCount}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
