"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Badge, Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { AssetList } from "@/modules/fms/types"

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

const columnHelper = createColumnHelper<AssetList>()

export const useColumn = () => {
  const { hasAnyRole } = useCurrentRole()
  const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
  const tableT = useTranslations("table")
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 250,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-id")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
            />
            <Text className="ms-2 font-medium text-title">
              {row.original.assetSerialNumber}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("assetName", {
        id: "assetName",
        size: 300,
        header: tableT("table-text-title"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.assetName}
          </Text>
        ),
      }),
      columnHelper.accessor("assetCategory.assetCategoryName", {
        id: "assetCategoryName",
        size: 280,
        header: tableT("table-text-category"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.assetCategory?.assetCategoryName}
          </Text>
        ),
      }),
      columnHelper.accessor("assetLocation.assetLocationName", {
        id: "assetLocationName",
        size: 280,
        header: tableT("table-text-location"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.assetLocation?.assetLocationName}
          </Text>
        ),
      }),
      columnHelper.accessor("assetStatus", {
        id: "assetStatus",
        size: 240,
        header: tableT("table-text-status"),
        cell: ({ row }) => (
          <Badge
            variant="flat"
            rounded="lg"
            color={getBadgeColorByStatus(row.original.assetStatus || "")}
            className="tracking-wider">
            {row.original.assetStatus}
          </Badge>
        ),
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        size: isDeleteVisible ? 160 : 120,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <>
            <div className="flex items-center justify-end gap-3 pe-3">
              <Tooltip
                size="sm"
                content={tableT("table-text-edit-asset")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editAsset(row.original.id ?? 0)}
                  aria-label="Edit asset">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <Tooltip
                size="sm"
                content={tableT("table-text-view-asset")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewAsset(row.original.id ?? 0)}
                  aria-label="View asset">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    rounded="lg"
                    className="h-6 w-7 border-gray-500/20">
                    <EyeIcon className="h-4 w-4" />
                  </ActionIcon>
                </Link>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-account"
                description={`${tableT("table-text-delete-confirm-asset")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
              {/* {isDeleteVisible && (
              )} */}
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
