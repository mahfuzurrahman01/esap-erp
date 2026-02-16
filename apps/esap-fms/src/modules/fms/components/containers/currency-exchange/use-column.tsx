"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { ActionIcon, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { Checkbox } from "@/components/ui"
import { CurrencyExchangeList } from "@/modules/fms/types"

const CurrencyFormDrawerView = dynamic(
  () => import("./currency-exchange-form-drawer-view"),
  {
    ssr: false,
  }
)

const columnHelper = createColumnHelper<CurrencyExchangeList>()

export const useColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

  const columns = useMemo(() => {
    const serialNumber = tableT("table-text-serial-number")
    const currencyDate = tableT("table-text-currency-date")
    const currencyFrom = tableT("table-text-currency-from")
    const currencyTo = tableT("table-text-currency-to")
    const exchangeRate = tableT("table-text-exchange-rate")
    const isPurchase = tableT("table-text-is-purchase")
    const isSelling = tableT("table-text-is-selling")
    const action = tableT("table-text-action")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 400,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {serialNumber}
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
              {row.original.currencyExchangeNo}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("dateOfEstablishment", {
        id: "dateOfEstablishment",
        size: 180,
        header: currencyDate,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.dateOfEstablishment &&
              dayjs(row.original.dateOfEstablishment).format("DD-MM-YYYY")}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("currencyFrom", {
        id: "currencyFrom",
        size: 180,
        header: currencyFrom,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.currencyFrom?.currencyName}
          </Text>
        ),
      }),
      columnHelper.accessor("currencyTo", {
        id: "currencyTo",
        size: 180,
        header: currencyTo,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.currencyTo?.currencyName}
          </Text>
        ),
      }),
      columnHelper.accessor("exchangeRate", {
        id: "exchangeRate",
        size: 180,
        header: exchangeRate,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.exchangeRate}
          </Text>
        ),
      }),
      columnHelper.accessor("isPurchase", {
        id: "isPurchase",
        size: 140,
        header: isPurchase,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.isPurchase ? "Yes" : "No"}
          </Text>
        ),
      }),
      columnHelper.accessor("isSelling", {
        id: "isSelling",
        size: 140,
        header: isSelling,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.isSelling ? "Yes" : "No"}
          </Text>
        ),
      }),
      columnHelper.accessor("action", {
        id: "action",
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
