"use client"

import React from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePaginationScm from "@/components/base/api-table-pagination-scm"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteProduct,
  useDeleteProduct,
  useProductList,
} from "@/modules/scm/hooks/inventory/product/use-product"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  Product,
  ProductQueryOptions,
} from "@/modules/scm/types/inventory/products/products-types"

import ProductTableToolbar from "./product-table-toolbar"
import { useProductColumn } from "./use-column"

export default function ProductTable() {
  const columns = useProductColumn()
  const { direction } = useDirection()

  const deleteProduct = useDeleteProduct()
  const bulkDeleteProduct = useBulkDeleteProduct()

  const { params, updateParams } = useQueryParams<ProductQueryOptions>({
    params: [
      {
        key: "search",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "pageIndex",
        defaultValue: 1,
        parse: (value) => Number(value) || 1,
      },
      {
        key: "pageSize",
        defaultValue: 10,
        parse: (value) => Number(value) || 10,
      },
      {
        key: "productName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "productCategoryName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "productType",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "isFixedAsset",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "productCode",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const { data, isLoading } = useProductList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    productCategoryName: params.productCategoryName,
    productType: params.productType,
    isFixedAsset: params.isFixedAsset,
    productCode: params.productCode,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Product>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["action"],
          },
        },
        enableRowSelection: true,
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
      },
    })

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Product>({
    deleteMutation: deleteProduct.mutate,
    bulkDeleteMutation: bulkDeleteProduct.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  // Update table options with delete handlers
  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
        <ProductTableToolbar
          table={table}
          params={params}
          updateParams={updateParams}
        />
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEndColumn}
          sensors={sensors}>
          <MainTable
            table={table}
            variant={"modern"}
            isLoading={isLoading || deleteProduct.isPending}
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePaginationScm
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
