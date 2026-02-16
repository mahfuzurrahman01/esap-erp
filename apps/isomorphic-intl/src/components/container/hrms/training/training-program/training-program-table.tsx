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
  useDeleteProgram,
  useProgramList,
} from "@/hooks/hrms/training/program/use-program"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  TrainingProgram,
  TrainingProgramQueryOptions,
} from "@/types/hrms/training/training-program-type"

import TrainingProgramTableToolbar from "./training-program-table-toolbar"
import { useTrainingProgramTableColumns } from "./use-training-program-table-column"

export default function TrainingProgramTable() {
  const { direction } = useDirection()
  const columns = useTrainingProgramTableColumns()
  const deleteTrainingProgram = useDeleteProgram()
  const { params, updateParams } = useQueryParams<TrainingProgramQueryOptions>({
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
        key: "companyName",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "coordinatorId",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useProgramList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    companyName: params.companyName,
    coordinatorId: params.coordinatorId,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<TrainingProgram>({
      tableData: data?.data || [],
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

  const { handleDeleteRow } = useTableDelete<TrainingProgram>({
    deleteMutation: deleteTrainingProgram.mutate,
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
        <TrainingProgramTableToolbar
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
    </>
  )
}
