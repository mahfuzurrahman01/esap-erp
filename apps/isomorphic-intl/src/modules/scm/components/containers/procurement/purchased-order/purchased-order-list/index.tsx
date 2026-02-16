"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePaginationScm from "@/components/base/api-table-pagination-scm"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeletePurchasedOrder,
  useDeletePurchasedOrder,
  usePurchasedOrderList,
} from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  PurchasedOrder,
  PurchasedOrderQueryOptions,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"

import PurchasedOrderTableToolbar from "./po-table-toolbar"
import { usePurchasedOrderColumn } from "./use-column"

export default function PurchasedOrderTable() {
  const { direction } = useDirection()
  const columns = usePurchasedOrderColumn()

  const deletePurchasedOrder = useDeletePurchasedOrder()
  const bulkDeletePurchasedOrder = useBulkDeletePurchasedOrder()

  const { params, updateParams } = useQueryParams<PurchasedOrderQueryOptions>({
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
        key: "poDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "billingStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "orderAmount",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = usePurchasedOrderList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    poDate: params.poDate,
    billingStatus: params.billingStatus,
    orderAmount: params.orderAmount,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<PurchasedOrder>({
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
        enableColumnResizing: true,
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
      },
    })

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<PurchasedOrder>({
      deleteMutation: deletePurchasedOrder.mutate,
      bulkDeleteMutation: bulkDeletePurchasedOrder.mutate,
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
        <PurchasedOrderTableToolbar
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
            isLoading={isLoading || deletePurchasedOrder.isPending}
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePaginationScm
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
