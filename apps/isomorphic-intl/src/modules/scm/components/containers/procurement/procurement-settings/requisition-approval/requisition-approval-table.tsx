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
  useBulkDeleteRequisitionApproval,
  useDeleteRequisitionApproval,
  useRequisitionApprovalList,
} from "@/modules/scm/hooks/procurement/requisition/use-requisition-approval"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  RequisitionApproval,
  RequisitionApprovalQueryOptions,
} from "@/modules/scm/types/procurement/requisition/requisition-approval-types"

import RequisitionApprovalTableToolbar from "./requisition-approval-table-toolbar"
import { useRequisitionApprovalTableColumns } from "./use-requisition-approval-column"

export default function RequisitionApprovalTable() {
  const { direction } = useDirection()
  const deleteRequisitionApproval = useDeleteRequisitionApproval()
  const deleteRequisitionApprovalBulk = useBulkDeleteRequisitionApproval()
  const columns = useRequisitionApprovalTableColumns()

  const { params, updateParams } =
    useQueryParams<RequisitionApprovalQueryOptions>({
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
      ],
    })

  const { data, isLoading } = useRequisitionApprovalList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<RequisitionApproval>({
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
    useTableDelete<RequisitionApproval>({
      deleteMutation: deleteRequisitionApproval.mutate,
      bulkDeleteMutation: deleteRequisitionApprovalBulk.mutate,
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
        <RequisitionApprovalTableToolbar
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
              deleteRequisitionApproval.isPending ||
              deleteRequisitionApprovalBulk.isPending
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
