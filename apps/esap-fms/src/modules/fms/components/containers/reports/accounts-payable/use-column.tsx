"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { AccountPayableReport } from "@/modules/scm/types/feature-reports/account-payable-reports"

const columnHelper = createColumnHelper<AccountPayableReport>()

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
              {row.original.sl}
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
      columnHelper.accessor("party", {
        id: "party",
        size: 300,
        header: t("form-supplier"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("payableAccount", {
        id: "payableAccount",
        size: 200,
        header: t("form-payable-account"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
        enableSorting: true,
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
      columnHelper.accessor("dueDate", {
        id: "dueDate",
        size: 200,
        header: t("form-due-date"),
        enableSorting: true,
        cell: (info) => {
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {dayjs(info.renderValue() || "-").format("DD-MM-YYYY")}
            </Text>
          )
        },
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
      columnHelper.accessor("paidAmount", {
        id: "paidAmount",
        size: 200,
        header: t("form-paid-amount"),
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
      columnHelper.accessor("totalAmountDue", {
        id: "totalAmountDue",
        size: 200,
        header: t("form-total-amount-due"),
        enableSorting: true,
        cell: (info) => {
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {info.renderValue() || "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("currency", {
        id: "currency",
        size: 200,
        header: t("form-currency"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}
