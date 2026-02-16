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
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteWorkOrder,
  useDeleteWorkOrder,
  useWorkOrderTrackingList,
} from "@/modules/scm/hooks/production-control/work-order-tracking/use-work-order"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  WorkOrder,
  WorkOrderQueryOptions,
} from "@/modules/scm/types/production-control/work-order-tracking/work-order-types"

import { useWorkOrderTrackingColumn } from "./use-column"
import WorkOrderTrackingTableToolbar from "./work-order-tracking-table-toolbar"

export default function WorkOrderTrackingList() {
  const { direction } = useDirection()
  const columns = useWorkOrderTrackingColumn()

  const deleteWorkOrderTracking = useDeleteWorkOrder()
  const bulkDeleteWorkOrderTracking = useBulkDeleteWorkOrder()

  const { params, updateParams } = useQueryParams<WorkOrderQueryOptions>({
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
        key: "workCenter",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "assignedTo",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "workOrder",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "progressStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useWorkOrderTrackingList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    workCenter: params.workCenter,
    assignedTo: params.assignedTo,
    workOrder: params.workOrder,
    progressStatus: params.progressStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<WorkOrder>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<WorkOrder>({
    deleteMutation: deleteWorkOrderTracking.mutate,
    bulkDeleteMutation: bulkDeleteWorkOrderTracking.mutate,
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
        <WorkOrderTrackingTableToolbar
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
              deleteWorkOrderTracking.isPending ||
              bulkDeleteWorkOrderTracking.isPending
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
