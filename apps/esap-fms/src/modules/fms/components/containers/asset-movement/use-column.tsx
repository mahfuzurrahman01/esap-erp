"use client"

import Link from "next/link"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import { Checkbox } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { AssetMovementList } from "@/modules/fms/types"
import { formatDate } from "@/utils/format-date"

const columnHelper = createColumnHelper<AssetMovementList>()

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
              {row.original.assetMovementSerialNumber}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("purposeOfMovement", {
        id: "purposeOfMovement",
        size: 240,
        header: tableT("table-text-type"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.purposeOfMovement}
          </Text>
        ),
      }),
      columnHelper.accessor("transactionDate", {
        id: "transactionDate",
        size: 240,
        header: tableT("table-text-transaction-date"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {formatDate(row.original.transactionDate, "DD-MM-YYYY")}
          </Text>
        ),
      }),
      columnHelper.accessor("asset.assetSerialNumber", {
        id: "assetSerialNumber",
        size: 240,
        header: tableT("table-text-asset"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.asset?.assetSerialNumber}
          </Text>
        ),
      }),
      columnHelper.accessor("company.companyName", {
        id: "companyName",
        size: 240,
        header: tableT("table-text-company"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.company?.companyName}
          </Text>
        ),
      }),
      columnHelper.accessor("assetLocation.assetLocationName", {
        id: "assetLocationName",
        size: 240,
        header: tableT("table-text-asset-location"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.assetLocation?.assetLocationName}
          </Text>
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
                content={tableT("table-text-edit-asset-movement")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.editAssetMovement(row.original.id ?? 0)}
                  aria-label="Edit account">
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
                content={tableT("table-text-view-asset-movement")}
                placement="top"
                rounded="lg"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <Link
                  href={routes.fms.viewAssetMovement(row.original.id ?? 0)}
                  aria-label="View account">
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
              {isDeleteVisible && (
                <DeletePopover
                  title="table-text-delete-account"
                  description={`${tableT("table-text-delete-confirm-asset-movement")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
              )}
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
