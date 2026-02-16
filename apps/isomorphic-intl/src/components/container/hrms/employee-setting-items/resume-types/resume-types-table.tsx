"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import ResumeTypesTableToolbar from "@/components/container/hrms/employee-setting-items/resume-types/resume-types-table-toolbar"
import { useResumeTypesTableColumns } from "@/components/container/hrms/employee-setting-items/resume-types/use-resume-types-table-columns"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  useDeleteResumeType,
  useResumeTypeList,
} from "@/hooks/hrms/employee/use-resume-type"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  ResumeType,
  ResumeTypeQueryOptions,
} from "@/types/hrms/employee/resume-types.types"

export default function ResumeTypesTable() {
  const { direction } = useDirection()
  const deleteResumeType = useDeleteResumeType()
  const columns = useResumeTypesTableColumns()

  const { params, updateParams } = useQueryParams<ResumeTypeQueryOptions>({
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

  const { data, isLoading, isPending } = useResumeTypeList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<ResumeType>({
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

  const { handleDeleteRow } = useTableDelete<ResumeType>({
    deleteMutation: deleteResumeType.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
  }

  return (
    <>
      <WidgetCard className="card-shadow flex flex-col gap-4 border-none bg-gray-0 dark:bg-gray-800">
        <ResumeTypesTableToolbar
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
