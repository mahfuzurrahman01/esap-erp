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
import {
  useApplicationList,
  useDeleteApplication,
} from "@/hooks/hrms/recruitment/use-applications"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  Application,
  ApplicationQueryOptions,
} from "@/types/hrms/recruitment/applications-type"

import ApplicationTableToolbar from "./application-table-toolbar"
import { useApplicationTableColumns } from "./use-application-table-column"

export default function ApplicationTable() {
  const { direction } = useDirection()
  const columns = useApplicationTableColumns()
  const deleteApplication = useDeleteApplication()

  const { params, updateParams } = useQueryParams<ApplicationQueryOptions>({
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
        key: "jobPositionId",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "departmentId",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "approvalStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useApplicationList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    jobPositionId: params.jobPositionId,
    departmentId: params.departmentId,
    approvalStatus: params.approvalStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Application>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["actions"],
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

  const { handleDeleteRow } = useTableDelete<Application>({
    deleteMutation: deleteApplication.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
  }

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <ApplicationTableToolbar
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
          isLoading={isLoading}
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
  )
}
