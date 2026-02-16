"use client"

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
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteStockReplenishment,
  useDeleteStockReplenishment,
  useStockReplanishmentList,
} from "@/modules/scm/hooks/inventory/stock-replanishment/use-stock-replanishment"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  StockReplenishment,
  StockReplenishmentQueryOptions,
} from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"

import StockReplenishmentTableToolbar from "./stock-replenishment-table-toolbar"
import { useStockReplenishmentColumn } from "./use-column"

export default function StockReplenishmentList() {
  const columns = useStockReplenishmentColumn()
  const { direction } = useDirection()

  const deleteStockReplenishment = useDeleteStockReplenishment()
  const bulkDeleteStockReplenishment = useBulkDeleteStockReplenishment()

  const { params, updateParams } =
    useQueryParams<StockReplenishmentQueryOptions>({
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
          key: "status",
          defaultValue: "",
          parse: (label) => label || "",
        },
      ],
    })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useStockReplanishmentList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    status: params.status,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<StockReplenishment>({
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<StockReplenishment>({
      deleteMutation: deleteStockReplenishment.mutate,
      bulkDeleteMutation: bulkDeleteStockReplenishment.mutate,
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
        <StockReplenishmentTableToolbar
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
            isLoading={
              isLoading ||
              deleteStockReplenishment.isPending ||
              bulkDeleteStockReplenishment.isPending
            }
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
