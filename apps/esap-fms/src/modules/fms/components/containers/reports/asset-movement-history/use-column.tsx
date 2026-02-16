"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { AssetMovementHistory } from "@/modules/fms/types/asset-movement-history"

const columnHelper = createColumnHelper<AssetMovementHistory>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("sl", {
        id: "sl",
        size: 80,
        header: tableT("table-text-sl"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.sl}
          </Text>
        ),
      }),
      columnHelper.accessor("assetCode", {
        id: "assetCode",
        size: 200,
        header: tableT("table-text-asset-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetCode}
          </Text>
        ),
      }),
      columnHelper.accessor("movementCode", {
        id: "movementCode",
        size: 200,
        header: tableT("table-text-movement-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.movementCode}
          </Text>
        ),
      }),
      columnHelper.accessor("fromLocation", {
        id: "fromLocation",
        size: 250,
        header: tableT("table-text-from-location"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.fromLocation}
          </Text>
        ),
      }),
      columnHelper.accessor("toLocation", {
        id: "toLocation",
        size: 250,
        header: tableT("table-text-to-location"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.toLocation}
          </Text>
        ),
      }),
      columnHelper.accessor("movementDate", {
        id: "movementDate",
        size: 180,
        header: tableT("table-text-movement-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.movementDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("purposeOfMovement", {
        id: "purposeOfMovement",
        size: 150,
        header: tableT("table-text-purpose"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.purposeOfMovement}
          </Text>
        ),
      }),
      columnHelper.accessor("handledBy", {
        id: "handledBy",
        size: 150,
        header: tableT("table-text-handled-by"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.handledBy}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
