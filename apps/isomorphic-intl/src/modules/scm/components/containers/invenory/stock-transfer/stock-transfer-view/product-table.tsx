"use client"

import { useMemo } from "react"

import { useDirection } from "@core/hooks/use-direction"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import MainTable from "@/components/base/table/main-table"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  StockTransfer,
  StockTransferDetails,
} from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"

const columnHelper = createColumnHelper<StockTransferDetails>()

const useStockTransferColumn = () => {
  const t = useTranslations("form")

  const column = useMemo(() => {
    return [
      columnHelper.accessor("productName", {
        id: "productName",
        size: 240,
        header: t("form-product-name"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() as string}
          </Text>
        ),
      }),
      columnHelper.accessor("quantity", {
        id: "quantity",
        size: 240,
        header: t("form-quantity"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() as number}
          </Text>
        ),
      }),
      columnHelper.accessor("currentStock", {
        id: "currentStock",
        size: 240,
        header: t("form-current-stock"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() as number}
          </Text>
        ),
      }),
    ]
  }, [t])

  return column
}

function ProductDetailsListTable({
  initialData,
}: {
  initialData: StockTransfer
}) {
  const columns = useStockTransferColumn()
  const { direction } = useDirection()

  const { table, columnOrder } = useTanStackTable<StockTransferDetails>({
    tableData: initialData?.stockTransferDetails || [],
    columnConfig: columns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      columnResizeDirection: direction as any,
      columnResizeMode: "onChange",
    },
  })
  return (
    <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />
  )
}

export default function ProductViewTable({
  initialData,
}: {
  initialData: StockTransfer
}) {
  const t = useTranslations("common")
  return (
    <div className="mt-4 @container">
      <Text className="my-2 ml-6 text-base font-medium">
        {t("text-product-information")}
      </Text>
      <ProductDetailsListTable initialData={initialData} />
    </div>
  )
}
