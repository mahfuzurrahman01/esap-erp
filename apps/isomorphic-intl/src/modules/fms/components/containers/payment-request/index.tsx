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
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBulkDeletePaymentRequest,
  useDeletePaymentRequest,
  usePaymentRequestList,
} from "@/modules/fms/hooks/use-payments-request"
import {
  PaymentRequestList,
  PaymentRequestQueryOptions,
} from "@/modules/fms/types"

import PaymentRequestTableToolbar from "./payment-request-table-toolbar"
import { useColumn } from "./use-column"
import { useEffect } from "react"

export default function PaymentRequestTable() {
  const { direction } = useDirection()
  const deletePaymentRequest = useDeletePaymentRequest()
  const bulkDeletePaymentRequest = useBulkDeletePaymentRequest()

  const { params, updateParams } = useQueryParams<PaymentRequestQueryOptions>({
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
    ],
  })

  const { data, isLoading, refetch } = usePaymentRequestList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc",
  })

  const columns = useColumn(refetch)

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<PaymentRequestList>({
      tableData: data?.data || [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["actions"],
          },
        },
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

  useEffect(() => {
    if (data?.data) {
      setData(data.data)
      table.resetRowSelection()
    }
  }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<PaymentRequestList>({
      deleteMutation: deletePaymentRequest.mutate,
      bulkDeleteMutation: bulkDeletePaymentRequest.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <PaymentRequestTableToolbar
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
          variant="modern"
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
        count={data?.count || 0}
        updateParams={updateParams}
      />
    </WidgetCard>
  )
}
