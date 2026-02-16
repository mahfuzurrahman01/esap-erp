"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useCustomersColumn = () => {
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
      id: "firstName",
      header: t("table-text-full-name"),
      accessorKey: "firstName",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.firstName} {props.row.original.lastName}
        </Text>
      ),
    },
    {
      id: "email",
      header: t("table-text-email"),
      accessorKey: "email",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.email}
        </Text>
      ),
    },
    {
      id: "phone",
      header: t("table-text-phone"),
      accessorKey: "phone",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.phone}
        </Text>
      ),
    },
    {
      id: "address",
      header: t("table-text-address"),
      accessorKey: "address",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.city}
        </Text>
      ),
    }
  ]
}


