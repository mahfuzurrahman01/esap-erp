"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";



import { Badge, Input, Select } from "@/components/ui";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { selectedProductTemplateId } from "@/modules/scm/store/global-store-state";
import { requisitionItemRowsAtom } from "@/modules/scm/store/requisition-store";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";
import { Text } from "rizzui/typography";





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
  const [, setSelectedProductTemplate] = useAtom(selectedProductTemplateId)

  const [, setRequisitionItemRows] = useAtom(requisitionItemRowsAtom)

  const { unit, productCode } = useSCMSharedDataHook([
    "unit",
    "productCode",
  ])

  const { unitOptions, isUnitLoading } = unit
  const { productCodeOptions, isProductCodeLoading } = productCode

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
      id: "productId",
      header: t("form-product-code"),
      accessorKey: "productId",
      cell: (props: any) => (
        <Text className="text-title">{props.row.original.productName}</Text>
      ),
    },
    {
      id: "quantity",
      header: t("form-quantity"),
      accessorKey: "quantity",
      cell: (props: any) => <Text className="text-title">{props.row.original.quantity}</Text>,
    },
    {
      id: "itemUnitId",
      header: t("form-unit"),
      accessorKey: "itemUnitId",
      cell: (props: any) => <Text className="text-title">{props.row.original.itemUnitName}</Text>,
    },
    {
      id: "unitCost",
      header: t("form-unit-price"),
      accessorKey: "unitCost",
      cell: (props: any) => <Text className="text-title">{props.row.original.unitCost}</Text>,
    },
    {
      id: "totalCost",
      header: t("form-total-price"),
      accessorKey: "totalCost",
      cell: (props: any) => <Text className="text-title">{props.row.original.totalCost}</Text>,
    },
  ]



  const columns = [
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
          onChange={(option: any) => {
            const productId = option?.value ?? null
            setSelectedProductTemplate(productId)
            setRequisitionItemRows((prev) => {
              const newRows = [...prev]
              newRows[props.row.index] = {
                ...newRows[props.row.index],
                productId: productId,
              }
              return newRows
            })
            return props.table.options.meta?.updateData(
              props.row.index,
              "productId",
              option?.value ?? 0
            )
          }}
          isLoading={isProductCodeLoading}
          isDisabled={isFieldDisabled}
          placeholder={t("form-product-code")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(productCodeOptions.length)}
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
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0"
          disabled={isFieldDisabled}
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
          isDisabled={isFieldDisabled || true}
          placeholder={t("form-unit")}
          menuPortalTarget={document.body}
          styles={GetMenuListStyles(unitOptions.length)}
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
          disabled={isFieldDisabled || true}
        />
      ),
    },
    {
      id: "totalCost",
      header: t("form-total-price"),
      accessorKey: "totalCost",
      cell: (props: any) => (
        <Input
          type="number"
          value={Number(props.row.original.totalCost || 0).toFixed(2)}
          readOnly
          placeholder="0.00"
          disabled={isFieldDisabled}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => {
        return (
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className="cursor-pointer"
            onClick={() => {
              onDelete(props.row.index)
              setRequisitionItemRows((prev) => {
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

  return [...baseColumns, ...(isFieldDisabled ? viewColumns : columns)]
}