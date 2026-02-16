import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import { FixedAssetRegisterList } from "@/modules/fms/types"
import { Badge } from "@/components/ui"

export function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Draft":
      return "black"
    case "Submitted":
      return "success"
    case "In Maintenance":
      return "info"
    case "Partially Depreciated":
      return "warning"
    case "Fully Depreciated":
      return "danger"
    case "Scrapped":
      return "danger"
    default:
      return "black"
  }
}


const columnHelper = createColumnHelper<FixedAssetRegisterList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("sl", {
        id: "sl",
        size: 60,
        header: "SL",
        cell: ({ row }) => {
          return <div>{row.original.sl}</div>
        },
        enableSorting: false,
      }),
      columnHelper.accessor("assetCode", {
        id: "assetCode",
        size: 240,
        header: tableT("table-text-asset-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetCode}
          </Text>
        ),
      }),
      columnHelper.accessor("assetName", {
        id: "assetName",
        size: 240,
        header: tableT("table-text-asset-name"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetName}
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
      columnHelper.accessor("status", {
        id: "status",
        size: 240,
        header: tableT("table-text-status"),
        cell: ({ row }) => (
          <Badge
            variant="flat"
            rounded="lg"
            color={getBadgeColorByStatus(row.original.status || "")}
            className="tracking-wider">
            {row.original.status}
          </Badge>
        ),
      }),
      columnHelper.accessor("purchaseDate", {
        id: "purchaseDate",
        size: 240,
        header: tableT("table-text-purchase-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.purchaseDate ? dayjs(row.original.purchaseDate).format("DD-MM-YYYY") : "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("availableDate", {
        id: "availableDate",
        size: 240,
        header: tableT("table-text-available-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.availableDate ? dayjs(row.original.availableDate).format("DD-MM-YYYY") : "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("depreciationDate", {
        id: "depreciationDate",
        size: 240,
        header: tableT("table-text-depreciation-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.depreciationDate ? dayjs(row.original.depreciationDate).format("DD-MM-YYYY") : "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("grossPurchaseAmount", {
        id: "grossPurchaseAmount",
        size: 240,
        header: tableT("table-text-gross-purchase-amount"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.grossPurchaseAmount.toLocaleString()}
          </Text>
        ),
      }),
      columnHelper.accessor("assetValue", {
        id: "assetValue",
        size: 240,
        header: tableT("table-text-asset-value"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.assetValue.toLocaleString()}
          </Text>
        ),
      }),
      columnHelper.accessor("location", {
        id: "location",
        size: 340,
        header: tableT("table-text-location"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.location}
          </Text>
        ),
      }),
      columnHelper.accessor("companyName", {
        id: "companyName",
        size: 240,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.companyName}
          </Text>
        ),
      })
    ]
  }, [tableT])

  return columns
}
