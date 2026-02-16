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
import { CurrencyList } from "@/modules/fms/types"

const CurrencyFormDrawerView = dynamic(
  () => import("./currency-form-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<CurrencyList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const name = tableT("table-text-name")
    const symbol = tableT("table-text-symbol")
    const fraction = tableT("table-text-fraction")
    const units = tableT("table-text-units")
    const smallValue = tableT("table-text-small-value")

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
              {name}
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
              {row.original.currencyName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("symbol", {
        id: "symbol",
        size: 100,
        header: symbol,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.symbol}
          </Text>
        ),
      }),
      columnHelper.accessor("fraction", {
        id: "fraction",
        size: 100,
        header: fraction,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.fraction}
          </Text>
        ),
      }),
      columnHelper.accessor("units", {
        id: "units",
        size: 140,
        header: units,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.units}
          </Text>
        ),
      }),
      columnHelper.accessor("units", {
        id: "units",
        size: 140,
        header: units,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.units}
          </Text>
        ),
      }),
      columnHelper.accessor("smallValue", {
        id: "smallValue",
        size: 140,
        header: smallValue,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.smallValue}
          </Text>
        ),
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
                content={tableT("table-text-edit-currency")}
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
                      view: <CurrencyFormDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-currency"
                description={`${tableT("table-text-delete-confirm-currency")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [t, tableT])

  return columns
}
