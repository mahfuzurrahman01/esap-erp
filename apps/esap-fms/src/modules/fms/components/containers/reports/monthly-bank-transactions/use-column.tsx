"use client"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import dayjs from "dayjs"
import { MonthlyBankTransactionsList } from "@/modules/fms/types/monthly-bank-transactions"

const columnHelper = createColumnHelper<MonthlyBankTransactionsList>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("accountName", {
        id: "accountName",
        size: 250,
        header: ({ table }) => (
          <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
            {tableT("table-text-account-name")}
          </Text>
        ),
        cell: ({ row }) => (
          <Text className="ms-2 font-medium text-title">
            {row.original.accountName}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 140,
        header: tableT("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.amount}
          </Text>
        ),
      }),
      columnHelper.accessor("referenceNumber", {
        id: "referenceNumber",
        size: 160,
        header: tableT("table-text-reference-number"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.referenceNumber}
          </Text>
        ),
      }),
      columnHelper.accessor("transactionDate", {
        id: "transactionDate",
        size: 160,
        header: tableT("table-text-transaction-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.transactionDate &&
              dayjs(row.original.transactionDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("transactionType", {
        id: "transactionType",
        size: 160,
        header: tableT("table-text-transaction-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.transactionType}
          </Text>
        ),
      }),
      columnHelper.accessor("status", {
        id: "status",
        size: 140,
        header: tableT("table-text-status"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.status}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
