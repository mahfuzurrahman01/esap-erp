"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteStockTransferApproval,
  useDeleteStockTransferApproval,
  useStockTransferApprovalList,
} from "@/modules/scm/hooks/inventory/stock-transfer/use-stock-transfer-approval"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  StockTransferApproval,
  StockTransferApprovalQueryOptions,
} from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-approval"

import StockTransferApprovalTableToolbar from "./stock-transfer-approval-table-toolbar"
import { useStockTransferApprovalTableColumns } from "./use-stock-transfer-approval-column"

export default function StockTransferApprovalTable() {
  const { direction } = useDirection()
  const deleteStockTransferApproval = useDeleteStockTransferApproval()
  const deleteStockTransferApprovalBulk = useBulkDeleteStockTransferApproval()
  const columns = useStockTransferApprovalTableColumns()

  const { params, updateParams } =
    useQueryParams<StockTransferApprovalQueryOptions>({
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

  const { data, isLoading } = useStockTransferApprovalList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    approvalStatus: params.approvalStatus,
    approvalDate: params.approvalDate,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<StockTransferApproval>({
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
    useTableDelete<StockTransferApproval>({
      deleteMutation: deleteStockTransferApproval.mutate,
      bulkDeleteMutation: deleteStockTransferApprovalBulk.mutate,
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
        <StockTransferApprovalTableToolbar
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
              deleteStockTransferApproval.isPending ||
              deleteStockTransferApprovalBulk.isPending
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
