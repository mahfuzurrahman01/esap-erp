"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";



import { Input, Select } from "@/components/ui";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { materialAvailabilityItemRowsAtom, stockTemplateId } from "@/modules/scm/store/global-store-state";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";
import { Text } from "rizzui/typography";





interface ColumnProps {
  isFieldDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

export const useItemsListColumns = ({
  isFieldDisabled,
}: ColumnProps) => {
  const t = useTranslations("form")
  const [, setSelectedStockTemplate] = useAtom(stockTemplateId)

  const [, setMaterialAvailabilityItemRows] = useAtom(
    materialAvailabilityItemRowsAtom
  )

  const { unit, productCode, stock } = useSCMSharedDataHook([
    "unit",
    "productCode",
    "stock",
  ])

  const { unitOptions, isUnitLoading } = unit
  const { productCodeOptions, isProductCodeLoading } = productCode
  const { stockOptions, isStockLoading } = stock

  const baseColumns = [
    {
      id: "id",
      header: t("form-no"),
      accessorKey: "id",
      cell: (props: any) => <span>{props.row.index + 1}</span>,
    },
  ]

  const viewColumns = [
    {
      id: "inventoryId",
      header: t("form-sku"),
      accessorKey: "inventoryId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.sku}</Text>
      ),
    },
    {
      id: "productId",
      header: t("form-product-code"),
      accessorKey: "productId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.productName}</Text>
      ),
    },
    {
      id: "itemUnitId",
      header: t("form-unit"),
      accessorKey: "itemUnitId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.itemUnitName}</Text>
      ),
    },
    {
      id: "requiredQuantity",
      header: t("form-required-quantity"),
      accessorKey: "requiredQuantity",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.requiredQuantity}</Text>
      ),
    },
    {
      id: "availableQuantity",
      header: t("form-available-quantity"),
      accessorKey: "availableQuantity",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.availableQuantity}</Text>
      ),
    },
    {
      id: "shortage",
      header: t("form-shortage"),
      accessorKey: "shortage",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.shortage}</Text>
      ),
    },
    {
      id: "unitCost",
      header: t("form-unit-price"),
      accessorKey: "unitCost",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.unitCost}</Text>
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
            const inventoryId = option?.value ?? null
            setSelectedStockTemplate(inventoryId)
            setMaterialAvailabilityItemRows((prev) => {
              const newRows = [...prev]
              newRows[props.row.index] = {
                ...newRows[props.row.index],
                inventoryId: inventoryId,
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
          isDisabled={true}
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
          value={
            productCodeOptions.find(
              (option: any) => option.value === props.row.original.productId
            ) || null
          }
          onChange={(selectedValue: any) => {
            props.onChange(selectedValue.value)
            props.table.options.meta?.updateData(
              props.row.index,
              "productId",
              selectedValue.value
            )
          }}
          isLoading={isProductCodeLoading}
          isDisabled={true}
          placeholder={t("form-product-code")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(productCodeOptions.length)}

        />
      ),
    },
    {
      id: "itemUnitId",
      header: t("form-unit"),
      accessorKey: "itemUnitId",
      cell: (props: any) => (
        <Select
          labelClassName="text-title"
          options={unitOptions}
          value={FindSelectOption(unitOptions, props.value)}
          onChange={(selectedValue: any) => {
            props.onChange(selectedValue.value)
            props.table.options.meta?.updateData(
              props.row.index,
              "itemUnitId",
              selectedValue.value
            )
          }}
          isLoading={isUnitLoading}
          isDisabled={true}
          placeholder={t("form-unit")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(unitOptions.length)}

        />
      ),
    },
    {
      id: "requiredQuantity",
      header: t("form-required-quantity"),
      accessorKey: "requiredQuantity",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0"
          disabled={true}
        />

      ),
    },
    {
      id: "availableQuantity",
      header: t("form-available-quantity"),
      accessorKey: "availableQuantity",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0"
          disabled={true}
        />
      ),
    },

    {
      id: "shortage", // Changed from totalPrice
      header: t("form-shortage"),
      accessorKey: "shortage", // Changed from totalPrice
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.shortage || 0}
          readOnly
          placeholder="0.00"
          disabled={true}
        />
      ),
    },

    {
      id: "unitCost",
      header: t("form-unit-price"),
      accessorKey: "unitCost",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.row.original.unitCost || ""} // Changed from props.getValue()
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0
            props.table.options.meta?.updateData(
              props.row.index,
              "unitCost",
              value
            )
          }}
          placeholder="0.00"
          disabled={true}
        />
      ),
    },
  ]

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : columns)]
}