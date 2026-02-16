"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { LogsList } from "@/modules/crm/types/logs"
import AssignedToCell from "../user/assigned-to-cell"

const columnHelper = createColumnHelper<LogsList>()

export const useColumn = () => {
  const tableT = useTranslations("table")

  const columns = useMemo(() => {
    const message = tableT("table-text-message")
    const operationName = tableT("table-text-operation-name")
    const ipAddress = tableT("table-text-ip-address")
    const time = tableT("table-text-time")
    const sl = tableT("table-text-sl")
    const user = tableT("table-text-user")

    return [
      columnHelper.display({
        id: "id",
        size: 50,
        header: sl,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.index + 1}
          </Text>
        ),
      }),
      columnHelper.accessor("userId", {
        id: "userId",
        size: 200,
        header: user,
        cell: ({ row }) => {
          if (row.original.userId && row.original.userId.includes("@")) {
            return (
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {row.original.userId}
              </Text>
            );
          } else {
            return <AssignedToCell assignedTo={row.original.userId} />;
          }
        },
        enableSorting: false,
      }),
      columnHelper.accessor("message", {
        id: "message",
        size: 300,
        header: message,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.message}
          </Text>
        ),
      }),
      columnHelper.accessor("actionName", {
        id: "actionName",
        size: 240,
        header: operationName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.actionName}
          </Text>
        ),
      }),
      columnHelper.accessor("ipAddress", {
        id: "ipAddress",
        size: 150,
        header: ipAddress,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.ipAddress}
          </Text>
        ),
      }),
      columnHelper.accessor("timestamp", {
        id: "timestamp",
        size: 150,
        header: time,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.timestamp &&
              dayjs(row.original.timestamp).format("DD/MM/YYYY hh:mm a")}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
