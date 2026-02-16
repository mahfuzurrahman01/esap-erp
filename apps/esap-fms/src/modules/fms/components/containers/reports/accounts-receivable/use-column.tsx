"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import { AccountRecivable } from "@/modules/fms/types/account-recivable"


const columnHelper = createColumnHelper<AccountRecivable>()

export const useAccountPayableReportColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-id")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.index + 1}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("invoiceNo", {
        id: "invoiceNo",
        size: 300,
        enableSorting: true,
        header: t("form-invoice-no"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("customer", {
        id: "customer",
        size: 300,
        header: t("form-customer"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.row.original.customer}
          </Text>
        ),
      }),
      columnHelper.accessor("invoiceDate", {
        id: "invoiceDate",
        size: 200,
        header: t("form-invoice-date"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(info.renderValue() || "-").format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("advancedAmount", {
        id: "advancedAmount",
        size: 200,
        header: t("form-advanced-amount"),
        enableSorting: true,
        cell: (info) => {
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {info.renderValue() || "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("invoicedAmount", {
        id: "invoicedAmount",
        size: 200,
        header: t("form-invoiced-amount"),
        enableSorting: true,
        cell: (info) => {
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {info.renderValue() || "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("outstandingAmount", {
        id: "outstandingAmount",
        size: 230,
        header: t("form-outstanding-amount"),
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