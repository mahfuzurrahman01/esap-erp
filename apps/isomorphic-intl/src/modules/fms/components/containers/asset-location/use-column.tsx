"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"
import { Checkbox } from "@/components/ui"
import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { AssetLocationList } from "@/modules/fms/types"

const AssetLocationFormDrawerView = dynamic(
  () => import("./asset-location-form-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<AssetLocationList>()

export const useColumn = () => {
  // const { hasAnyRole } = useCurrentRole()
  // const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-title")}
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
              {row.original.assetLocationName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("actions", {
        id: "actions",
        size: 160,
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
                content={tableT("table-text-edit-asset-location")}
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ActionIcon
                  as="button"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20"
                  onClick={() => {
                    openDrawer({
                      view: (
                        <AssetLocationFormDrawerView id={row.original.id} />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-asset-location"
                description={`${tableT("table-text-delete-confirm-asset-location")} #${row.original.id}`}
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
