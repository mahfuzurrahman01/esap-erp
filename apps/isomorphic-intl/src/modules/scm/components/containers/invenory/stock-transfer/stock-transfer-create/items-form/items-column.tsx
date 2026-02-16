"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Text } from "rizzui/typography";



import { Badge, Input, Select } from "@/components/ui";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { stockItemsId, stockTransferItemRowsAtom } from "@/modules/scm/store/global-store-state";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";





interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

export const useItemsListColumns = ({
  isFieldDisabled,
  onDelete,
}: ColumnProps) => {
  const t = useTranslations("form")

  const [, setStockTransferItemRows] = useAtom(stockTransferItemRowsAtom)

  const [, setStockItems] = useAtom(stockItemsId)

  const { productCode, stock } = useSCMSharedDataHook(["productCode", "stock"])

  const { productCodeOptions, isProductCodeLoading } = productCode
  const { stockOptions, isStockLoading } = stock

  const baseColumns = [
    {
      id: "id",
      header: "SN",
      accessorKey: "id",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.index + 1}
        </Text>
      ),
    },
  ]


  const view = [
    {
      id: "inventoryId",
      header: t("form-sku"),
      accessorKey: "inventoryId",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.inventoryId}
        </Text>
      ),
    },
    {
      id: "productName",
      header: t("form-product-name"),
      accessorKey: "productName",
      cell: (props: any) => (

        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.productName}
        </Text>

      ),
    },

    {
      id: "currentStock",
      header: t("form-current-stock"),
      accessorKey: "currentStock",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.currentStock}
        </Text>
      ),

    },
    {
      id: "quantity",
      header: t("form-quantity"),
      accessorKey: "quantity",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.quantity}
        </Text>
      ),

    },
  ]


  const columns = [
    {
      id: "inventoryId",
      header: t("form-sku"),
      accessorKey: "inventoryId",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"

          options={stockOptions}
          value={
            stockOptions.find(
              (option: any) => option.value === props.row.original.inventoryId
            ) || null
          }

          onChange={(option: any) => {
            const stockId = option?.value ?? null
            setStockItems(stockId)
            setStockTransferItemRows((prev) => {
              const newRows = [...prev]

              newRows[props.row.index] = {
                ...newRows[props.row.index],
                inventoryId: stockId,
                productId: null,
              }
              return newRows
            })

            return props.table.options.meta?.updateData(
              props.row.index,
              "inventoryId",
              option?.value ?? 0
            )
          }}
          isLoading={isStockLoading}
          isDisabled={isFieldDisabled}
          placeholder={t("form-sku")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(stockOptions.length)}
        />
      ),
    },
    {
      id: "productId",
      header: t("form-product-code"),
      accessorKey: "productId",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={productCodeOptions}
          value={FindSelectOption(
            productCodeOptions,
            props.row.original.productId
          )}
          onChange={(option: any) => {
            // const productId = option?.value ?? null
            // setSelectedProductTemplate(productId)
            props.onChange(option?.value ?? 0)
            return props.table.options.meta?.updateData(
              props.row.index,
              "productId",
              option?.value ?? 0
            )
          }}
          isLoading={isProductCodeLoading || isStockLoading}
          isDisabled={isFieldDisabled || true}
          placeholder={t("form-product-code")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(productCodeOptions.length)}
        />
      ),
    },
    {
      id: "currentStock",
      header: t("form-current-stock"),
      accessorKey: "currentStock",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value || ""}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0"
          disabled={isFieldDisabled || true}
          error={props.error ? t(props.error) : ""}
        />
      ),
    },
    {
      id: "quantity",
      header: t("form-quantity"),
      accessorKey: "quantity",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) => {
            const newValue = Number(e.target.value)
            const currentStock = props.row.original.currentStock || 0

            if (newValue <= 0) {
              props.table.options.meta?.updateData(
                props.row.index,
                "error",
                t("form-quantity-must-be-greater-than-zero")
              )
            } else if (newValue > currentStock) {
              props.table.options.meta?.updateData(
                props.row.index,
                "error",
                `${t("form-quantity-cannot-exceed-current-stock")} (${currentStock})`
              )
            } else {
              props.table.options.meta?.updateData(
                props.row.index,
                "error",
                ""
              )
            }

            props.onChange(newValue)
          }}
          placeholder="0"
          disabled={isFieldDisabled}
          error={props.row.original.error || ""}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => {
        if (isFieldDisabled) {
          return null
        }
        return (
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => {
              onDelete(props.row.index)
              setStockTransferItemRows((prev) => {
                const newRows = [...prev]
                newRows.splice(props.row.index, 1)
                return newRows
              })
            }}>
            {t("form-delete")}
          </Badge>
        )
      },
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? view : columns)]
}