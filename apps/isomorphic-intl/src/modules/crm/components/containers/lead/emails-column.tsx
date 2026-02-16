"use client"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useEmailsColumn = () => {
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
      id: "subject",
      header: t("table-text-subject"),
      accessorKey: "subject",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.subject || ""}
        </Text>
      ),
    },
    {
      id: "sendFor",
      header: t("table-text-recipient"),
      accessorKey: "sendFor",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.sendFor || ""}
        </Text>
      ),
    },
    {
      id: "sendAt",
      header: t("table-text-sent-time"),
      accessorKey: "sendAt",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {dayjs(props.row.original.sendAt).format("DD/MM/YYYY hh:mm a")}
        </Text>
      ),
    },
  ]
}
