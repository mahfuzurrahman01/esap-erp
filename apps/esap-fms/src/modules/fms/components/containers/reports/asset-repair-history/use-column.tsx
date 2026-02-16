"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { AssetRepairHistory } from "@/modules/fms/types/asset-repair-history"

const columnHelper = createColumnHelper<AssetRepairHistory>()

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
      columnHelper.accessor("assetRepairCode", {
        id: "assetRepairCode",
        size: 200,
        header: tableT("table-text-repair-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetRepairCode}
          </Text>
        ),
      }),
      columnHelper.accessor("repairDate", {
        id: "repairDate",
        size: 150,
        header: tableT("table-text-repair-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.repairDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("repairDescription", {
        id: "repairDescription",
        size: 300,
        header: tableT("table-text-repair-description"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.repairDescription}
          </Text>
        ),
      }),
      columnHelper.accessor("downTime", {
        id: "downTime",
        size: 160,
        header: tableT("table-text-down-time"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.downTime} days
          </Text>
        ),
      }),
      columnHelper.accessor("repairCost", {
        id: "repairCost",
        size: 150,
        header: tableT("table-text-repair-cost"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            ${parseFloat(row.original.repairCost).toLocaleString()}
          </Text>
        ),
      }),
      columnHelper.accessor("repairStatus", {
        id: "repairStatus",
        size: 180,
        header: tableT("table-text-repair-status"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.repairStatus}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
