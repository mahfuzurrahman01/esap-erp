import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import dayjs from "dayjs"

interface TransactionDetailsColumnsProps {
  onDateChange?: (id: number, date: string) => void
}

export const useTransactionDetailsColumns = ({ onDateChange }: TransactionDetailsColumnsProps = {}) => {
  const t = useTranslations("form")

  const baseColumns = [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      width: "50px",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]

  const editColumns = [
    {
      id: "transactionType",
      header: t("form-transaction-type"),
      accessorKey: "transactionType",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.transactionType}
        </Text>
      ),
    },
    {
      id: "transactionDate",
      header: t("form-transaction-date"),
      accessorKey: "transactionDate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.transactionDate && dayjs(props.row.original.transactionDate).format("DD-MM-YYYY")}
        </Text>
      ),
    },
    {
      id: "referenceNumber",
      header: t("form-reference-number"),
      accessorKey: "referenceNumber",
      cell: (props: any) => {
        const amount = props.row.original.referenceNumber || 0
        return (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {amount}
          </Text>
        )
      },
    },
    {
      id: "amount",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.amount}
        </Text>
      ),
    },
    {
      id: "currentBalance",
      header: t("form-current-balance"),
      accessorKey: "currentBalance",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.currentBalance}
        </Text>
      ),
    },
  ]

  return [...baseColumns, ...editColumns]
}
