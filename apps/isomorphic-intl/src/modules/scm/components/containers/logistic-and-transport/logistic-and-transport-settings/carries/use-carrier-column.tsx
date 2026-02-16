"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EditIconButton from "@/components/base/edit-icon-button"
import ViewIconButton from "@/components/base/view-icon-button"
import { Carrier } from "@/modules/scm/types/logistics-and-transport/carriers/carriers-types"

import ItemsFormDrawerView from "./carrier-drawer-form"
import ItemsDrawerView from "./carrier-drawer-view"

const columnHelper = createColumnHelper<Carrier>()

export const useCarriersTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
  const name = t("table-text-name")
  const phone = t("table-text-phone")
  const email = t("table-text-email")
  const address = t("table-text-address")
  const editSupplierCategory = t("table-text-edit")
  const viewSupplierCategory = t("table-text-view")
  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 100,
        header: ({ table }) => (
          <span className="inline-block">
            <div className="flex items-center gap-12">
              <Checkbox
                aria-label="Select all rows"
                checked={table.getIsAllPageRowsSelected()}
                onChange={() => table.toggleAllPageRowsSelected()}
                inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
                iconClassName="w-[18px] h-[18px]"
              />
              <Text className="font-medium text-gray-900 dark:text-gray-0">
                {name}
              </Text>
            </div>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-12">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="text-title dark:text-title">
              {row.original.carrierName}
            </Text>
          </div>
        ),
      }),

      columnHelper.accessor("phone", {
        id: "phone",
        size: 160,
        header: phone,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.phone}
          </Text>
        ),
      }),
      columnHelper.accessor("email", {
        id: "email",
        size: 160,
        header: email,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.email}
          </Text>
        ),
      }),
      columnHelper.accessor("address", {
        id: "address",
        size: 160,
        header: address,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.address}
          </Text>
        ),
      }),

      columnHelper.accessor("id", {
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
        }) => {
          return (
            <>
              <div className="flex items-center justify-end gap-3 pe-3">
                <EditIconButton
                  onClick={() =>
                    openDrawer({
                      view: (
                        <ItemsFormDrawerView
                          isEditForm
                          initialData={row.original}
                        />
                      ),
                      placement: "right",
                      containerClassName: "max-w-[26.25rem]",
                    })
                  }
                />
                <ViewIconButton
                  onClick={() => {
                    openDrawer({
                      view: <ItemsDrawerView initialData={row.original} />,
                      containerClassName: "max-w-[500px] overflow-auto",
                      placement: "right",
                    })
                  }}
                />
                <DeletePopover
                  translationObjectName="common"
                  title="text-delete"
                  description={`${tText("text-delete-items-prompt")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
              </div>
            </>
          )
        },
      }),
    ],
    [t, name, phone, email, address, editSupplierCategory, viewSupplierCategory]
  )

  return columns
}
