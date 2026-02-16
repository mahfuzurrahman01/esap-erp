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
import {
  useBulkDeleteOpportunity,
  useDeleteOpportunity,
  useOpportunityList,
} from "@/modules/crm/hooks/use-opportunities"
import {
  OpportunityList,
  OpportunityQueryOptions,
} from "@/modules/crm/types/opportunity"

import { useColumn } from "./column"
import OpportunityTableToolbar from "./opportunity-table-toolbar"

export default function OpportunityTable() {
  const { direction } = useDirection()
  const deleteOpportunity = useDeleteOpportunity()
  const deleteItemBulk = useBulkDeleteOpportunity()
  const columns = useColumn()
  const { params, updateParams } = useQueryParams<OpportunityQueryOptions>({
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
        key: "lead",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "customer",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "closingDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "amount",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "probability",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "type",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "stage",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending } = useOpportunityList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    lead: params.lead,
    customer: params.customer,
    closingDate: params.closingDate,
    amount: params.amount,
    probability: params.probability,
    type: params.type,
    stage: params.stage,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<OpportunityList>({
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<OpportunityList>({
      deleteMutation: deleteOpportunity.mutate,
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
        <OpportunityTableToolbar
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
