"use client"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import DeletePopover from "@/components/base/delete-popover"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import EditIconButton from "@/components/base/edit-icon-button"
import ViewIconButton from "@/components/base/view-icon-button"
import { WarehouseManager } from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"

import ItemsFormDrawerView from "./warehouse-manager-drawer-form"
import ItemsDrawerView from "./warehouse-manager-drawer-view"
import { useCurrentRole } from "@/hooks/use-current-role"

const columnHelper = createColumnHelper<WarehouseManager>()

export const useWarehouseManagerTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])
  const name = t("table-text-name")
  const contact = t("table-text-contact")
  const description = t("table-text-description")
  const editSupplierCategory = t("table-text-edit")
  const viewSupplierCategory = t("table-text-view")
  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
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
              {t("table-text-id")}
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
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.id}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("name", {
        id: "name",
        size: 350,
        header: name,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.name}
          </Text>
        ),
      }),
      columnHelper.accessor("contact", {
        id: "contact",
        size: 350,
        header: contact,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.contact}
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
                {
                  isAuthority && (
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
                  )
                }
                
                <ViewIconButton
                  onClick={() => {
                    openDrawer({
                      view: <ItemsDrawerView initialData={row.original} />,
                      containerClassName: "max-w-[500px] overflow-auto",
                      placement: "right",
                    })
                  }}
                />
               {
                isAuthority && (
                   <DeletePopover
                  translationObjectName="common"
                  title="text-delete"
                  description={`${tText("text-delete-prompt")} #${row.original.id}`}
                  onDelete={() =>
                    meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                  }
                />
                )
               }
              </div>
            </>
          )
        },
      }),
    ],
    [t, name, contact, description, editSupplierCategory, viewSupplierCategory]
  )

  return columns
}
