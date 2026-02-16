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
import { useBillList, useBulkDeleteBill, useDeleteBill } from "@/modules/crm/hooks/use-bill"
import { BillList, BillQueryOptions } from "@/modules/crm/types/bill"

import BillTableToolbar from "./bill-table-toolbar"
import { useColumn } from "./columns"

export default function BillTable() {
  const { direction } = useDirection()
  const deleteBill = useDeleteBill()
  const deleteItemBulk = useBulkDeleteBill()

  const { params, updateParams } = useQueryParams<BillQueryOptions>({
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
        key: "amount",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "type",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "paymentMethod",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "category",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending, refetch } = useBillList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    amount: params.amount,
    type: params.type,
    paymentMethod: params.paymentMethod,
    category: params.category,
  })

  const columns = useColumn(refetch)

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<BillList>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<BillList>({
    deleteMutation: deleteBill.mutate,
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
        <BillTableToolbar
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
