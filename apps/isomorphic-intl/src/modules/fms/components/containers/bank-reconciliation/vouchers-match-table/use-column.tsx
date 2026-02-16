import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import Checkbox from "@/components/ui/checkbox"

import { VoucherMatchItem } from "@/modules/fms/store/voucher-match-store"

const columnHelper = createColumnHelper<VoucherMatchItem>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 60,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onChange={() => table.toggleAllPageRowsSelected()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected()}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("documentType", {
        id: "documentType",
        size: 200,
        header: tableT("table-text-document-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.documentType}
          </Text>
        ),
      }),
      columnHelper.accessor("documentNumber", {
        id: "documentNumber",
        size: 200,
        header: tableT("table-text-document-number"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.documentNumber}
          </Text>
        ),
      }),
      columnHelper.accessor("referenceDate", {
        id: "referenceDate",
        size: 200,
        header: tableT("table-text-reference-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.referenceDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        size: 200,
        header: tableT("table-text-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.amount}
          </Text>
        ),
      }),
      columnHelper.accessor("referenceNumber", {
        id: "referenceNumber",
        size: 250,
        header: tableT("table-text-reference-number"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.referenceNumber}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
