"use client"

import { formatDate } from "@/utils/format-date"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useMeetingsColumns = () => {
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
      id: "title",
      header: t("table-text-title"),
      accessorKey: "title",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.title}
        </Text>
      ),
    },
    {
      id: "location",
      header: t("table-text-location"),
      accessorKey: "location",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.location}
        </Text>
      ),
    },
    {
      id: "meetingTime",
      header: t("table-text-meeting-time"),
      accessorKey: "meetingTime",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {formatDate(props.row.original.meetingTime, "hh:mm a")}
        </Text>
      ),
    }
  ]
}