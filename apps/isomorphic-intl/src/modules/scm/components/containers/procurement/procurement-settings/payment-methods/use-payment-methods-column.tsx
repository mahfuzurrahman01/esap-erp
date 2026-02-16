"use client";

import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox, Text } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import EditIconButton from "@/components/base/edit-icon-button";
import ViewIconButton from "@/components/base/view-icon-button";
import { PaymentMethod } from "@/modules/scm/types/procurement/supplier/payment-method-types";



import PaymentMethodsFormDrawerView from "./payment-methods-drawer-form";
import PaymentMethodsDrawerView from "./payment-methods-drawer-view";





const columnHelper = createColumnHelper<PaymentMethod>()

export const usePaymentMethodsTableColumns = () => {
  const t = useTranslations("table")
  const tText = useTranslations("common")
  const name = t("table-text-name")
  const description = t("table-text-description")
  const editPaymentMethod = t("table-text-edit")
  const viewPaymentMethod = t("table-text-view")
  const { openDrawer } = useDrawer()

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        size: 100,
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
      columnHelper.accessor("description", {
        id: "description",
        size: 350,
        header: description,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.description}
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
                        <PaymentMethodsFormDrawerView
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
                      view: (
                        <PaymentMethodsDrawerView initialData={row.original} />
                      ),
                      containerClassName: "max-w-[500px] overflow-auto",
                      placement: "right",
                    })
                  }}
                />
                <DeletePopover
                  translationObjectName="common"
                  title="text-delete-payment-method"
                  description={`${tText("text-delete-payment-method-prompt")} #${row.original.id}`}
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
    [t, name, description, editPaymentMethod, viewPaymentMethod]
  )

  return columns
}