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
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBulkDeleteModeOfPayment,
  useDeleteModeOfPayment,
  useModeOfPaymentList,
} from "@/modules/fms/hooks/use-mode-of-payment"
import { ModeOfPaymentList } from "@/modules/fms/types/mode-of-payment"

import { useColumn } from "./use-column"
import ModeOfPaymentTableToolbar from "./mode-of-payment-table-toolbar"
import { ModeOfPaymentTypeQueryOptions } from "@/modules/fms/types"
import { useQueryParams } from "@/hooks/use-query-params"

export default function ModeOfPaymentTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<ModeOfPaymentTypeQueryOptions>({
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
        key: "companyId",
        defaultValue: "",
        parse: (value) => Number(value) || 10,
      },
    ],
  })

  const { data, isLoading } = useModeOfPaymentList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    companyId: params.companyId,
    sort: "desc"
  })

  const deleteModeOfPayment = useDeleteModeOfPayment()
  const bulkDeleteModeOfPayment = useBulkDeleteModeOfPayment()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<ModeOfPaymentList>({
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
    }
  }, [data?.data, setData])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<ModeOfPaymentList>({
      deleteMutation: deleteModeOfPayment.mutate,
      bulkDeleteMutation: bulkDeleteModeOfPayment.mutate,
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
      <ModeOfPaymentTableToolbar table={table} params={params} updateParams={updateParams} />
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
