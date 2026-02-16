"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PencilIcon from "@/components/icons/pencil"
import { BankList } from "@/modules/fms/types"

const BankFormDrawerView = dynamic(() => import("./bank-form-drawer-view"), {
  ssr: false,
})

const columnHelper = createColumnHelper<BankList>()

export const useColumn = () => {
  const tableT = useTranslations("table")
  const { openDrawer } = useDrawer()

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
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {tableT("table-text-bank-name")}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-title">
              {row.original.bankName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("bankWebsite", {
        id: "bankWebsite",
        size: 140,
        header: tableT("table-text-bank-website"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.bankWebsite}
          </Text>
        ),
      }),
      columnHelper.accessor("swiftCode", {
        id: "swiftCode",
        size: 140,
        header: tableT("table-text-swift-code"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.swiftCode}
          </Text>
        ),
      }),
      columnHelper.accessor("routingNumber", {
        id: "routingNumber",
        size: 140,
        header: tableT("table-text-routing-number"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.routingNumber}
          </Text>
        ),
      }),
      columnHelper.accessor("contactNumber", {
        id: "contactNumber",
        size: 140,
        header: tableT("table-text-contact-number"),
        cell: ({ row }) => (
          <Text className="font-medium text-title">
            {row.original.contactNumber}
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
                content={tableT("table-text-edit-bank")}
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
                      view: <BankFormDrawerView id={row.original.id} />,
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }}>
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
              <DeletePopover
                title="table-text-delete-bank"
                description={`${tableT("table-text-delete-confirm-bank")} #${row.original.id}`}
                onDelete={() =>
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }
              />
            </div>
          </>
        ),
      }),
    ]
  }, [tableT])

  return columns
}
