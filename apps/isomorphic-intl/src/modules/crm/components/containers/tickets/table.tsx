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
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import { useBulkDeleteTicket, useDeleteTicket, useTicketList } from "@/modules/crm/hooks/use-ticket"
import { TicketList, TicketQueryOptions } from "@/modules/crm/types/ticket"

import { useColumn } from "./column"
import TicketTableToolbar from "./ticket-table-toolbar"

export default function TicketsTable() {
  const { direction } = useDirection()
  const deleteTicket = useDeleteTicket()
  const deleteItemBulk = useBulkDeleteTicket()
  const columns = useColumn()
  const { params, updateParams } = useQueryParams<TicketQueryOptions>({
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
        key: "service",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "project",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "email",
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

  const { data, isLoading, isPending } = useTicketList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    subject: params.subject,
    service: params.service,
    project: params.project,
    email: params.email,
    status: params.status,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<TicketList>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<TicketList>({
    deleteMutation: deleteTicket.mutate,
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

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
        <TicketTableToolbar
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
      </WidgetCard>
    </>
  )
}
