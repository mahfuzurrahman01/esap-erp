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
  useBulkDeleteSalesOperationApproval,
  useDeleteSalesOperationApproval,
  useSalesOperationApprovalList,
} from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-approval"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import { SalesOperationApproval } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-approval-types"
import { StockReplanishmentApprovalQueryOptions } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types"

import SalesOperationApprovalTableToolbar from "./sales-operatin-approval-table-toolbar"
import { useSalesOperationApprovalTableColumns } from "./use-sales-operatin-approval-column"

export default function SalesOperationApprovalTable() {
  const { direction } = useDirection()
  const deleteSalesOperationApproval = useDeleteSalesOperationApproval()
  const deleteSalesOperationApprovalBulk = useBulkDeleteSalesOperationApproval()
  const columns = useSalesOperationApprovalTableColumns()

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

  const { data, isLoading } = useSalesOperationApprovalList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    approvalStatus: params.approvalStatus,
    approvalDate: params.approvalDate,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<SalesOperationApproval>({
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
    useTableDelete<SalesOperationApproval>({
      deleteMutation: deleteSalesOperationApproval.mutate,
      bulkDeleteMutation: deleteSalesOperationApprovalBulk.mutate,
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
        <SalesOperationApprovalTableToolbar
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
              deleteSalesOperationApproval.isPending ||
              deleteSalesOperationApprovalBulk.isPending
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
