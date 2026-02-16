"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
// import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteStockReplanishmentApproval,
  useDeleteStockReplanishmentApproval,
  useStockReplanishmentApprovalList,
} from "@/modules/scm/hooks/inventory/stock-replanishment/use-stock-replanishment-approval"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  StockReplanishmentApproval,
  StockReplanishmentApprovalQueryOptions,
} from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types"

import StockReplenishmentApprovalTableToolbar from "./stock-replenishment-approval-table-toolbar"
import { useStockReplenishmentApprovalTableColumns } from "./use-stock-replenishment-approval-column"

export default function StockReplenishmentApprovalTable() {
  const { direction } = useDirection()
  const columns = useStockReplenishmentApprovalTableColumns()
  const deleteStockReplenishmentApproval = useDeleteStockReplanishmentApproval()

  const deleteStockReplenishmentApprovalBulk =
    useBulkDeleteStockReplanishmentApproval()
  const { params, updateParams } =
    useQueryParams<StockReplanishmentApprovalQueryOptions>({
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
          key: "approvalStatus",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "approvalDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
      ],
    })

  const { data, isLoading } = useStockReplanishmentApprovalList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    approvalStatus: params.approvalStatus,
    approvalDate: params.approvalDate,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<StockReplanishmentApproval>({
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
    useTableDelete<StockReplanishmentApproval>({
      deleteMutation: deleteStockReplenishmentApproval.mutate,
      bulkDeleteMutation: deleteStockReplenishmentApprovalBulk.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    })

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
        <StockReplenishmentApprovalTableToolbar
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
            columnOrder={columnOrder}
            isLoading={
              isLoading ||
              deleteStockReplenishmentApproval.isPending ||
              deleteStockReplenishmentApprovalBulk.isPending
            }
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePagination
          table={table}
          params={params}
          count={data?.count ?? 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
