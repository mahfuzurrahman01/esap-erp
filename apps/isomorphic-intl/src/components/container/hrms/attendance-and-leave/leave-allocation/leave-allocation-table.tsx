"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import LeaveAllocationTableToolbar from "@/components/container/hrms/attendance-and-leave/leave-allocation/leave-allocation-table-toolbar"
import { useLeaveAllocationTableColumns } from "@/components/container/hrms/attendance-and-leave/leave-allocation/use-leave-allocation-table-columns"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  useDeleteLeaveAllocation,
  useLeaveAllocationList,
} from "@/hooks/hrms/attendance-and-leave/use-leave-allocation"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  LeaveAllocation,
  LeaveAllocationQueryOptions,
} from "@/types/hrms/attendance-and-leave/leave-allocation.types"

export default function LeaveAllocationTable() {
  const { direction } = useDirection()
  const columns = useLeaveAllocationTableColumns()
  const deleteLeaveAllocation = useDeleteLeaveAllocation()
  const { params, updateParams } = useQueryParams<LeaveAllocationQueryOptions>({
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
        key: "leaveTypeId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "departmentId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "managerId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading, isPending } = useLeaveAllocationList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    leaveTypeId: params.leaveTypeId,
    managerId: params.managerId,
    departmentId: params.departmentId,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<LeaveAllocation>({
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
    useTableDelete<LeaveAllocation>({
      deleteMutation: deleteLeaveAllocation.mutate,
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
        <LeaveAllocationTableToolbar
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
