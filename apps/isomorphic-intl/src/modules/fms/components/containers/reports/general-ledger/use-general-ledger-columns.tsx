"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { Text } from "rizzui"

import { GeneralLedgerEntry } from "@/modules/fms/types/general-ledger"
import { cn } from "@/utils/cn"

export const useGeneralLedgerColumns = (): ColumnDef<GeneralLedgerEntry>[] => {
  const columns: ColumnDef<GeneralLedgerEntry>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return <div>{row.index + 1}</div>
      },
    },
    {
      id: "postingDate",
      header: "Posting Date",
      accessorKey: "postingDate",
      cell: ({ row }: any) => {
        return <div>{row.original.postingDate ? dayjs(row.original.postingDate).format("DD-MM-YYYY") : ""}</div>
      },
    },
    {
      id: "account",
      header: "Account",
      accessorKey: "account",
      cell: ({ row }: any) => {
        const isSpecialRow = [
          "Opening Balance",
          "Total",
          "Closing Balance",
        ].includes(row.original.account)
        return (
          <div
            className={cn(
              isSpecialRow && "font-bold",
              row.original.account === "Opening Balance" && "text-title",
              row.original.account === "Total" && "text-title",
              row.original.account === "Closing Balance" && "text-green-600"
            )}>
            {row.original.account}
          </div>
        )
      },
    },
    {
      id: "debit",
      header: () => (
        <Text className="text-right font-semibold">Debit (SAR)</Text>
      ),
      accessorKey: "debit",
      cell: ({ row }: any) => {
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        }).format(row.original.debit)

        const isSpecialRow = [
          "Opening Balance",
          "Total",
          "Closing Balance",
        ].includes(row.original.account)

        return (
          <div className={cn("text-right", isSpecialRow && "font-semibold")}>
            {formattedAmount}
          </div>
        )
      },
    },
    {
      id: "credit",
      header: () => (
        <Text className="text-right font-semibold">Credit (SAR)</Text>
      ),
      accessorKey: "credit",
      cell: ({ row }: any) => {
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        }).format(row.original.credit)

        const isSpecialRow = [
          "Opening Balance",
          "Total",
          "Closing Balance",
        ].includes(row.original.account)

        return (
          <div className={cn("text-right", isSpecialRow && "font-semibold")}>
            {formattedAmount}
          </div>
        )
      },
    },
    {
      id: "balance",
      header: () => (
        <Text className="text-right font-semibold">Balance (SAR)</Text>
      ),
      accessorKey: "balance",
      cell: ({ row }: any) => {
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        }).format(Math.abs(row.original.balance))

        const isSpecialRow = [
          "Opening Balance",
          "Total",
          "Closing Balance",
        ].includes(row.original.account)

        return (
          <div
            className={cn(
              "text-right",
              row.original.balance < 0 ? "text-red-500" : "",
              isSpecialRow && "font-semibold"
            )}>
            {`${row.original.balance < 0 ? "-" : ""}${formattedAmount}`}
          </div>
        )
      },
    },
    {
      id: "voucherType",
      header: "Voucher Type",
      accessorKey: "voucherType",
      cell: ({ row }: any) => {
        return <div>{row.original.voucherType || ""}</div>
      },
    },
    {
      id: "voucherNo",
      header: "Voucher No",
      accessorKey: "voucherNo",
      cell: ({ row }: any) => {
        return <div>{row.original.voucherNo || ""}</div>
      },
    },
  ]

  return columns
}
