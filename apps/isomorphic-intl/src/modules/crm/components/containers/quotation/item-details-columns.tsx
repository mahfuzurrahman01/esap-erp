"use client"

import { useProductById } from "@/modules/scm/hooks/inventory/product/use-product"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

export const useItemDetailsColumns = () => {
  const t = useTranslations("form")
  const ProductCell = ({ productId }: { productId: string }) => {
    const tableT = useTranslations("table")
    const { data: productData, isLoading } = useProductById(
      Number(productId)
    ) as {
      data: any
      isLoading: boolean
    }
      
    if (isLoading)
      return (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {tableT("table-text-loading")}
        </Text>
      )
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {productData?.productName || ""}
      </Text>
    )
  }
  return [
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
    {
      id: "productId",
      header: t("form-product"),
      accessorKey: "productId",
      cell: (props: any) => (
        <ProductCell productId={props.row.original.productId} />
      ),
    },
    {
      id: "quantity",
      header: t("form-quantity"),
      accessorKey: "quantity",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.quantity || ""}
        </Text>
      ),
    },
    {
      id: "unitPrice",
      header: t("form-unit-price"),
      accessorKey: "unitPrice",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.unitPrice || 0}
        </Text>
      ),
    },
    {
      id: "total",
      header: t("form-total"),
      accessorKey: "total",
      cell: (props: any) => (
        <Text className="font-medium text-gray-900 dark:text-gray-0">
          {props.row.original.quantity * props.row.original.unitPrice}
        </Text>
      ),
    }
  ]
}
