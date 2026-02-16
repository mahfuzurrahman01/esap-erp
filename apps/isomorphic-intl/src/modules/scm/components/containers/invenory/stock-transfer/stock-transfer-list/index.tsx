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
  useBulkDeleteStockTransfer,
  useDeleteStockTransfer,
  useStockTransferList,
} from "@/modules/scm/hooks/inventory/stock-transfer/use-stock-transfer"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  StockTransfer,
  StockTransferQueryOptions,
} from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"

import StockTransferTableToolbar from "./stock-transfer-table-toolbar"
import { useStockTransferColumn } from "./use-column"

export default function StockTransferList() {
  const { direction } = useDirection()
  const columns = useStockTransferColumn()

  const deleteStockTransfer = useDeleteStockTransfer()
  const bulkDeleteStockTransfer = useBulkDeleteStockTransfer()

  const { params, updateParams } = useQueryParams<StockTransferQueryOptions>({
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
        key: "stockTransferNo",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "status",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useStockTransferList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    stockTransferNo: params.stockTransferNo,
    status: params.status,
  })



  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<StockTransfer>({
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
    useTableDelete<StockTransfer>({
      deleteMutation: deleteStockTransfer.mutate,
      bulkDeleteMutation: bulkDeleteStockTransfer.mutate,
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
        <StockTransferTableToolbar
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
            isLoading={isLoading || deleteStockTransfer.isPending || bulkDeleteStockTransfer.isPending}
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
