"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { Checkbox } from "@/components/ui"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import { CountryList } from "@/modules/fms/types"

const CountryFormDrawerView = dynamic(
  () => import("./country-form-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<CountryList>()

export const useColumn = () => {
  // const { hasAnyRole } = useCurrentRole()
  // const isDeleteVisible = hasAnyRole(ADMIN_MENU_ROLES)
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const name = tableT("table-text-name")
    const code = tableT("table-text-country-code")
    const dateFormat = tableT("table-text-date-format")
    const timeFormat = tableT("table-text-time-format")
    const timeZone = tableT("table-text-time-zone")
    // const createdAt = tableT("table-text-created-at")
    // const updatedAt = tableT("table-text-updated-at")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 260,
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
              {row.original.countryName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("dateFormat", {
        id: "dateFormat",
        size: 180,
        header: dateFormat,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.dateFormat}
          </Text>
        ),
      }),
      columnHelper.accessor("timeFormat", {
        id: "timeFormat",
        size: 180,
        header: timeFormat,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.timeFormat}
          </Text>
        ),
      }),
      columnHelper.accessor("timeZone", {
        id: "timeZone",
        size: 240,
        header: timeZone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.timeZone}
          </Text>
        ),
      }),
      columnHelper.accessor("countryCode", {
        id: "countryCode",
        size: 160,
        header: code,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.countryCode}
          </Text>
        ),
      }),
      // columnHelper.accessor("createdAt", {
      //   id: "createdAt",
      //   size: 140,
      //   header: createdAt,
      //   cell: ({ row }) => (
      //     <Text className="font-medium text-gray-900 dark:text-gray-0">
      //       {row.original.createdAt &&
      //         dayjs(row.original.createdAt).format("DD-MM-YYYY")}
      //     </Text>
      //   ),
      // }),
      // columnHelper.accessor("updatedAt", {
      //   id: "updatedAt",
      //   size: 140,
      //   header: updatedAt,
      //   cell: ({ row }) => (
      //     <Text className="font-medium text-gray-900 dark:text-gray-0">
      //       {row.original.updatedAt &&
      //         dayjs(row.original.updatedAt).format("DD-MM-YYYY")}
      //     </Text>
      //   ),
      // }),
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
                content={tableT("table-text-edit-country")}
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
                      view: <CountryFormDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-country"
                description={`${tableT("table-text-delete-confirm-country")} #${row.original.id}`}
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
  }, [t, tableT])

  return columns
}
