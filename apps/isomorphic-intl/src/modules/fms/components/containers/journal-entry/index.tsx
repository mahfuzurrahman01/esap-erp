"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { useEffect } from "react"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBulkDeleteJournalEntry,
  useDeleteJournalEntry,
  useJournalEntryList,
} from "@/modules/fms/hooks/use-journal-entry"
import { JournalEntryList, JournalEntryQueryOptions } from "@/modules/fms/types"

import JournalEntryTableToolbar from "./journal-entry-table-toolbar"
import { useColumn } from "./use-column"

export default function JournalEntryTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<JournalEntryQueryOptions>({
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
        key: "postingDateFrom",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "postingDateTo",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "journalTypeId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "journalTemplateId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "minAmount",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "maxAmount",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading } = useJournalEntryList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    postingDateFrom: params.postingDateFrom,
    postingDateTo: params.postingDateTo,
    journalTypeId: params.journalTypeId,
    companyId: params.companyId,
    journalTemplateId: params.journalTemplateId,
    minAmount: params.minAmount,
    maxAmount: params.maxAmount,
    sort: "desc",
  })

  const deleteJournalEntry = useDeleteJournalEntry()
  const bulkDeleteJournalEntry = useBulkDeleteJournalEntry()

  const { table, setData, columnOrder, sensors, handleDragEndColumn } =
    useTanStackTable<JournalEntryList>({
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
    useTableDelete<JournalEntryList>({
      deleteMutation: deleteJournalEntry.mutate,
      bulkDeleteMutation: bulkDeleteJournalEntry.mutate,
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
      <JournalEntryTableToolbar
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
