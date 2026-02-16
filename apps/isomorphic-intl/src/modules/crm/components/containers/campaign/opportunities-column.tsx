"use client"

import { formatDate } from "@/utils/format-date"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useOpportunitiesColumn = () => {
  const t = useTranslations("table")
  return [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
    {
      id: "name",
      header: t("table-text-name"),
      accessorKey: "name",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.name} {props.row.original.lastName}
        </Text>
      ),
    },
    {
      id: "amount",
      header: t("table-text-amount"),
      accessorKey: "amount",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.amount}
        </Text>
      ),
    },
    {
      id: "closingDate",
      header: t("table-text-closing-date"),
      accessorKey: "closingDate",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {formatDate(props.row.original.closingDate, "DD/MM/YYYY")}
        </Text>
      ),
    },
    {
      id: "stage",
      header: t("table-text-stage"),
      accessorKey: "stage",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.stage}
        </Text>
      ),
    }
  ]
}


