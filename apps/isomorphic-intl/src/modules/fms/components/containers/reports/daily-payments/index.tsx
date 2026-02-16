"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBulkDeleteBank,
  useDeleteBank,
} from "@/modules/fms/hooks/use-bank"

import { useColumn } from "./use-column"
import { useQueryParams } from "@/hooks/use-query-params"
import DailyPaymentsTableToolbar from "./payment-summary-table-toolbar"
import { DailyPaymentsList, DailyPaymentsQueryOptions } from "@/modules/fms/types/daily-payments"
import { useDailyPaymentsList } from "@/modules/fms/hooks/use-daily-payments"

export default function DailyPaymentsTable() {
  const { direction } = useDirection()
  const columns = useColumn()

 const { params, updateParams } = useQueryParams<DailyPaymentsQueryOptions>({
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
         key: "StartDate",
         defaultValue: "",
         parse: (value) => value || "",
       },
       {
         key: "EndDate",
         defaultValue: "",
         parse: (value) => value || "",
       },
       {
         key: "sort",
         defaultValue: "",
         parse: (value) => value || "",
       },
     ],
   })

  const { data, isLoading } : any = useDailyPaymentsList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    StartDate: params.StartDate,
    EndDate: params.EndDate,
    sort: "desc"
  })

  const output:any = Array.isArray(data) ? data : []

  const deleteBank = useDeleteBank()
  const bulkDeleteBank = useBulkDeleteBank()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<DailyPaymentsList>({
      tableData: output,
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<DailyPaymentsList>({
    deleteMutation: deleteBank.mutate,
    bulkDeleteMutation: bulkDeleteBank.mutate,
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
      <DailyPaymentsTableToolbar
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
    </WidgetCard>
  )
}
