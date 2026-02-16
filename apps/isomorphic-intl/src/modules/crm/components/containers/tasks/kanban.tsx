"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"

import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useDeleteTask, useTaskList } from "@/modules/crm/hooks/use-task"
import { TaskList, TaskQueryOptions } from "@/modules/crm/types/task"

import { useColumn } from "./column"
import KanbanBoard from "./kanban-board"
import TaskTableToolbar from "./task-table-toolbar"

export default function TasksCardView() {
  const { direction } = useDirection()
  const deleteTask = useDeleteTask()
  const columns = useColumn()
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
        key: "startDate",
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

  const { data, isLoading } = useTaskList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    subject: params.subject,
    startDate: params.startDate,
    dueDate: params.dueDate,
    priority: params.priority,
    status: params.status,
  })

  const { table, setData } = useTanStackTable<TaskList>({
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
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  // Update table options with delete handlers
  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  if(isLoading){
    return <SkeletonLoader />
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="flex flex-col gap-4 border-none bg-paper dark:bg-paper lg:py-0">
        <TaskTableToolbar
          table={table}
          params={params}
          updateParams={updateParams}
          isKanban={true}
        />
        <KanbanBoard taskData={data?.data} />
      </WidgetCard>
    </>
  )
}
