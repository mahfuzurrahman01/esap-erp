import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { ProductView } from "@/modules/crm/types/product"
import { useProductById } from "@/modules/scm/hooks/inventory/product/use-product"

const columnHelper = createColumnHelper<any>()

const ProductCell = ({ productId }: { productId: string }) => {
  const tableT = useTranslations("table")
  const { data: productData, isLoading } = useProductById(
    Number(productId)
  ) as {
    data: ProductView | undefined
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
      {productData?.name || ""}
    </Text>
  )
}

export const useItemsColumn = () => {
  const t = useTranslations("table")

  const columns = useMemo(() => {
    const product = t("table-text-product")
    const quantity = t("table-text-quantity")
    const unitPrice = t("table-text-unit-price")
    const totalPrice = t("table-text-total-price")

    return [
      columnHelper.display({
        id: "serial",
        header: "#",
        size: 50,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.row.index + 1}
          </Text>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("productId", {
        id: "productId",
        size: 200,
        header: product,
        cell: ({ row }) => {
          return <ProductCell productId={row.original.productId} />
        },
        enableSorting: false,
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        size: 200,
        header: quantity,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString()}
          </Text>
        ),
      }),
      columnHelper.accessor("unitPrice", {
        id: "unitPrice",
        size: 180,
        header: unitPrice,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue()?.toString()}
          </Text>
        ),
      }),
      columnHelper.accessor("total", {
        id: "total",
        size: 180,
        header: totalPrice,
        cell: ({ row }) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {row.original.quantity * row.original.unitPrice}
          </Text>
        ),
      }),
    ]
  }, [t])
  return columns
}
