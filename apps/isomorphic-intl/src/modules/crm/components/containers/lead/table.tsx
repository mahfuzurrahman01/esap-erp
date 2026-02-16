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
import { useBulkDeleteLead, useDeleteLead, useLeadList } from "@/modules/crm/hooks/use-leads"
import { LeadList, LeadQueryOptions } from "@/modules/crm/types/lead"

import { useColumn } from "./column"
import LeadTableToolbar from "./lead-table-toolbar"

export default function LeadTable() {
  const { direction } = useDirection()
  const deleteLead = useDeleteLead()
  const deleteItemBulk = useBulkDeleteLead()
  const columns = useColumn()
  const { params, updateParams } = useQueryParams<LeadQueryOptions>({
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
        key: "name",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "title",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "email",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "phone",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "company",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "region",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "industry",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending } = useLeadList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    name: params.name,
    title: params.title,
    email: params.email,
    phone: params.phone,
    company: params.company,
    region: params.region,
    industry: params.industry,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<LeadList>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<LeadList>({
    deleteMutation: deleteLead.mutate,
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
        <LeadTableToolbar
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
          count={data?.count || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
