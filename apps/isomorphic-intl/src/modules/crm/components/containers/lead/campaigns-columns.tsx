"use client"

import { formatDate } from "@/utils/format-date"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useCampaignsColumns = () => {
  const t = useTranslations("form")
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
      header: t("form-subject"),
      accessorKey: "subject",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.subject || ""}
        </Text>
      ),
    },
    {
      id: "deadline",
      header: t("form-deadline"),
      accessorKey: "deadline",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.deadline ? formatDate(props.row.original.deadline, "DD/MM/YYYY") : ""}
        </Text>
      ),
    },
    {
      id: "service",
      header: t("form-service"),
      accessorKey: "service",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.service || 0}
        </Text>
      ),
    },
    {
      id: "source",
      header: t("form-source"),
      accessorKey: "source",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.source || 0}
        </Text>
      ),
    }
  ]
}
