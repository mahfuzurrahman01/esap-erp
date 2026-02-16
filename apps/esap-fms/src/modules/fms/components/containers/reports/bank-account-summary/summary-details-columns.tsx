import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"

export const useSummaryDetailsColumns = () => {
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
      id: "bankName",
      header: t("form-bank-name"),
      accessorKey: "bankName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.bankName}
        </Text>
      ),
    },
    {
      id: "accountName",
      header: t("form-account-name"),
      accessorKey: "accountName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.accountName}
        </Text>
      ),
    },
    {
      id: "accountNumber",
      header: t("form-account-number"),
      accessorKey: "accountNumber",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.accountNumber}
        </Text>
      ),
    },
    {
      id: "accountType",
      header: t("form-account-type"),
      accessorKey: "accountType",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.accountType}
        </Text>
      ),
    },
    {
      id: "company",
      header: t("form-company"),
      accessorKey: "company",
      cell: (props: any) => {
        const amount = props.row.original.company || 0
        return (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {amount}
          </Text>
        )
      },
    },
    {
      id: "currency",
      header: t("form-currency"),
      accessorKey: "currency",
      cell: (props: any) => {
        const amount = props.row.original.currency || 0
        return (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {amount}
          </Text>
        )
      },
    },
    {
      id: "totalBalance",
      header: t("form-balance"),
      accessorKey: "totalBalance",
      cell: (props: any) => {
        const amount = props.row.original.totalBalance || 0
        return (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {amount}
          </Text>
        )
      },
    },
  ]

  return [...baseColumns, ...editColumns]
}
