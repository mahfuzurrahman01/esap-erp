"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import EditIconButton from "@/components/base/edit-icon-button";
import ViewIconButton from "@/components/base/view-icon-button";
import { Item } from "@/modules/scm/types/production-control/bill-of-materials/items-types";



import ItemsFormDrawerView from "./item-drawer-form";
import ItemsDrawerView from "./item-drawer-view";





const columnHelper = createColumnHelper<Item>()

export const useItemTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
  const itemCode = t("table-text-item-code")
  const itemName = t("table-text-item-name")
  const description = t("table-text-description")
  const unitPrice = t("table-text-unit-price")
  const editItem = t("table-text-edit")
  const viewItem = t("table-text-view")
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
              {itemCode}
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
              {row.original.itemCode}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("itemName", {
        id: "itemName",
        size: 240,
        header: itemName,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.itemName}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 240,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
          </Text>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("unitPrice", {
        id: "unitPrice",
        size: 240,
        header: unitPrice,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.unitPrice}
          </Text>
        ),
        enableSorting: true,
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
                  description={`${tText("text-delete-prompt")} #${row.original.id}`}
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
    [t, itemCode, itemName, description, unitPrice, editItem, viewItem]
  )

  return columns
}