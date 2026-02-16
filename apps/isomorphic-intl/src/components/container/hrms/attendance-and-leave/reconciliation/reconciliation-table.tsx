"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import ReconciliationTableToolbar from "@/components/container/hrms/attendance-and-leave/reconciliation/reconciliation-table-toolbar"
import { useReconciliationTableColumns } from "@/components/container/hrms/attendance-and-leave/reconciliation/use-reconciliation-table-column"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  useDeleteReconciliation,
  useReconciliationList,
} from "@/hooks/hrms/attendance-and-leave/use-reconciliation"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  ReconciliationQueryOptions,
  ReconciliationRequest,
} from "@/types/hrms/attendance-and-leave/reconciliation.types"

export default function ReconciliationTable() {
  const direction = useDirection()
  const columns = useReconciliationTableColumns()
  const deleteReconciliation = useDeleteReconciliation()
  const { params, updateParams } = useQueryParams<ReconciliationQueryOptions>({
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
        key: "departmentId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading, isPending } = useReconciliationList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    departmentId: params.departmentId,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<ReconciliationRequest>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
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
    useTableDelete<ReconciliationRequest>({
      deleteMutation: deleteReconciliation.mutate,
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
      <WidgetCard className="card-shadow flex flex-col gap-4 border-none bg-gray-0 dark:bg-gray-800">
        <ReconciliationTableToolbar
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
            variant="modern"
            columnOrder={columnOrder}
            isLoading={isLoading || isPending}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePagination
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
