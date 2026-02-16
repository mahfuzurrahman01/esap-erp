"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useContactsColumns = () => {
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
        <span
          className="block max-w-[200px] truncate font-medium text-gray-900 dark:text-gray-0"
          title={props.row.original.subject}>
          {props.row.original.subject}
        </span>
      ),
    },
    {
      id: "type",
      header: t("table-text-type"),
      accessorKey: "type",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.type}
        </Text>
      ),
    },
    {
      id: "duration",
      header: t("table-text-duration"),
      accessorKey: "duration",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.duration}
        </Text>
      ),
    },
    {
      id: "relatedTo",
      header: t("table-text-related-to"),
      accessorKey: "relatedTo",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.relatedTo}
        </Text>
      ),
    }
  ]
}