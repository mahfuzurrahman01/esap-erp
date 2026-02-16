"use client"

import { useTranslations } from "next-intl"

import { Badge, Input, Select } from "@/components/ui"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"

interface ColumnProps {
  isDisabled: boolean
  onDelete: (index: number) => void
  setValue: (field: string, value: any) => void
}

export const useItemsListColumns = ({
  isDisabled,
  onDelete,
}: ColumnProps) => {
  const t = useTranslations("form")

  const { data: output, isLoading } = useProductList()

  const productOptions = output?.data?.filter((product: any) => product?.sellingPrice > 0)?.map((product: any) => ({
    value: product.id,
    label: product?.productName,
    unitPrice: product?.sellingPrice,
  }))

  const columns = [
    {
      id: "id",
      header: t("form-no"),
      accessorKey: "id",
      cell: (props: any) => <span>{props.row.index + 1}</span>,
    },
    {
      id: "productId",
      header: t("form-product-code"),
      accessorKey: "productId",
      cell: (props: any) => (
        <Select
          options={productOptions}
          value={productOptions?.find(
            (option: any) => option.value == props.row.original.productId
          )}
          isLoading={isLoading}
          isDisabled={isLoading || isDisabled}
          onChange={(option: any) => {
            const selectedProduct = productOptions?.find(
              (p: any) => p.value == option?.value
            )
            props.row.original.productId = option?.value
            props.table.options.meta?.updateData(
              props.row.index,
              "unitPrice",
              selectedProduct?.unitPrice
            )
          }}
          placeholder={isLoading ? t("form-loading") : t("form-select")}
          menuPortalTarget={document.body}
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
          autoComplete="off"
          value={props.value}
          disabled={isDisabled}
          onChange={async (e: any) => {
            const newValue = parseFloat(e.target.value) || 0
            props.row.original.quantity = newValue
            const total = newValue * (props.row.original.unitPrice || 0)
            await props.table.options.meta?.updateData(
              props.row.index,
              "totalPrice",
              total
            )
          }}
          placeholder="0.00"
        />
      ),
    },
    {
      id: "unitPrice",
      header: t("form-unit-price"),
      accessorKey: "unitPrice",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value || ""}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0.00"
          disabled={isDisabled}
        />
      ),
    },
    {
      id: "totalPrice",
      header: t("form-total-price"),
      accessorKey: "totalPrice",
      cell: (props: any) => (
        <Input
          type="number"
          value={props.value}
          readOnly
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="0.00"
          disabled={isDisabled}
        />
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (props: any) => (
        <center>
          <Badge
            variant="flat"
            color="danger"
            rounded="lg"
            className={`cursor-pointer ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
            onClick={isDisabled ? undefined : () => onDelete(props.row.index)}>
            {t("form-delete")}
          </Badge>
        </center>
      ),
    },
  ]

  return columns
}
