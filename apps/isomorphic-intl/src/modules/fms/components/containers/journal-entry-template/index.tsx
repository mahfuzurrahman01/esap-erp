"use client"

import { useEffect, useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { closestCenter } from "@dnd-kit/core"
import { DndContext } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import TableToolbar from "@/components/container/tan-table/table-toolbar"
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import useDebounce from "@/hooks/use-debounce"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBulkDeleteJournalTemplate,
  useDeleteJournalEntryTemplate,
  useJournalEntryTemplateList,
} from "@/modules/fms/hooks/use-journal-entry-template"
import { JournalEntryQueryOptions, JournalTemplate } from "@/modules/fms/types"

import { useColumn } from "./use-column"
import JournalEntryTemplateTableToolbar from "./journal-entry-template-table-toolbar"

export default function JournalEntryTemplateTable() {
  const { direction } = useDirection()
  const columns = useColumn()
  const deleteJournalEntryTemplate = useDeleteJournalEntryTemplate()
  const bulkDeleteJournalTemplate = useBulkDeleteJournalTemplate()

  const [params, setParams] = useState<JournalEntryQueryOptions>({
    search: "",
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const updateParams = (newParams: Partial<JournalEntryQueryOptions>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const debouncedSearchTerm = useDebounce(params.search, 500) // 500ms delay

  const { data, isLoading } = useJournalEntryTemplateList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc",
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<JournalTemplate>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        enableRowSelection: true,
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
      },
    })

  useEffect(() => {
    if (data?.data) {
      setData(data.data)
      table.resetRowSelection()
    }
  }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<JournalTemplate>({
      deleteMutation: deleteJournalEntryTemplate.mutate,
      bulkDeleteMutation: bulkDeleteJournalTemplate.mutate,
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
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <JournalEntryTemplateTableToolbar table={table} params={params} updateParams={updateParams} />
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant={"modern"}
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
        count={data?.count ?? 0}
        updateParams={updateParams}
      />
    </WidgetCard>
  )
}
