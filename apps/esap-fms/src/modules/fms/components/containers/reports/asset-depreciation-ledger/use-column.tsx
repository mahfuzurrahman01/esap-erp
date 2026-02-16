"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { AssetDepreciationLedgerList } from "@/modules/fms/types"

const columnHelper = createColumnHelper<AssetDepreciationLedgerList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("sl", {
        id: "sl",
        size: 60,
        header: "SL",
        cell: ({ row }: any) => {
          return <div>{row.original.sl}</div>
        },
        enableSorting: false,
      }),
      columnHelper.accessor("assetDepreciationCode", {
        id: "assetDepreciationCode",
        size: 240,
        header: tableT("table-text-asset-depreciation-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetDepreciationCode}
          </Text>
        ),
      }),
      columnHelper.accessor("purchaseDate", {
        id: "purchaseDate",
        size: 240,
        header: tableT("table-text-purchase-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.purchaseDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("depreciationDate", {
        id: "depreciationDate",
        size: 240,
        header: tableT("table-text-depreciation-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.depreciationDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("scheduleDate", {
        id: "scheduleDate",
        size: 240,
        header: tableT("table-text-schedule-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {dayjs(row.original.scheduleDate).format("DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("purchaseAmount", {
        id: "purchaseAmount",
        size: 240,
        header: tableT("table-text-purchase-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.purchaseAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("depreciationAmount", {
        id: "depreciationAmount",
        size: 240,
        header: tableT("table-text-depreciation-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.depreciationAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("accumulatedDepreciationAmount", {
        id: "accumulatedDepreciationAmount",
        size: 240,
        header: tableT("table-text-accumulated-depreciation-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.accumulatedDepreciationAmount}
          </Text>
        ),
      }),
      columnHelper.accessor("companyName", {
        id: "companyName",
        size: 240,
        header: tableT("table-text-company-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("assetCategory", {
        id: "assetCategory",
        size: 240,
        header: tableT("table-text-asset-category"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetCategory}
          </Text>
        ),
      }),
      columnHelper.accessor("assetLocation", {
        id: "assetLocation",
        size: 240,
        header: tableT("table-text-asset-location"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetLocation}
          </Text>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
