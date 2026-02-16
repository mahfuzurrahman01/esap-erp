"use client"

import { useState } from "react"

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
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import { useBulkDeleteTask, useDeleteTask, useTaskList } from "@/modules/crm/hooks/use-task"
import { TaskList, TaskQueryOptions } from "@/modules/crm/types/task"

import { useColumn } from "./column"
import TaskTableToolbar from "./task-table-toolbar"
import KanbanBoard from "./kanban-board"

export default function TasksTable() {
  const { direction } = useDirection()
  const deleteTask = useDeleteTask()
  const deleteItemBulk = useBulkDeleteTask()
  const columns = useColumn()
  const [isShowingCard, setIsShowingCard] = useState(false)
  const { params, updateParams } = useQueryParams<TaskQueryOptions>({
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
        key: "subject",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "ticket",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "dueDate",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "priority",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "status",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending } = useTaskList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    subject: params.subject,
    startDate: params.startDate,
    dueDate: params.dueDate,
    priority: params.priority,
    status: params.status,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<TaskList>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<TaskList>({
    deleteMutation: deleteTask.mutate,
    bulkDeleteMutation: deleteItemBulk.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  // Update table options with delete handlers
  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }
  const kanbanData = data?.data?.filter(d => d.status)

  return (
    <>
      <WidgetCard
        rounded="xl"
        className={`${
          isShowingCard
            ? "flex flex-col gap-4 border-none bg-transparent dark:bg-gray-900"
            : "card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper"
        }`}>
        <TaskTableToolbar
          table={table}
          params={params}
          isKanban={isShowingCard}
          updateParams={updateParams}
          isShowingCard={isShowingCard}
          setIsShowingCard={setIsShowingCard}
        />
        {!isShowingCard ? 
          (<>
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={handleDragEndColumn}
              sensors={sensors}>
              <MainTable
                table={table}
                columnOrder={columnOrder}
                isLoading={isLoading || isPending}
                variant={"modern"}
                components={{
                  headerCell: DragAbleHeadWrapper,
                  bodyCell: DragAbleCellWrapper,
                }}
              />
            </DndContext>
            <ApiTablePagination
              table={table}
              params={params}
              count={data?.total || 0}
              updateParams={updateParams}
            />
          </>) :
          (
            <KanbanBoard taskData={kanbanData} />
          )
        }
      </WidgetCard>
    </>
  )
}
