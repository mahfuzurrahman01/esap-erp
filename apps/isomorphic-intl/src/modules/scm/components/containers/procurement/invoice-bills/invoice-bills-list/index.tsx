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
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteInvoice,
  useDeleteInvoice,
  useInvoiceList,
} from "@/modules/scm/hooks/procurement/invoice/use-invoice"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  Invoice,
  InvoiceQueryOptions,
} from "@/modules/scm/types/procurement/invoice/invoice-types"

import InvoiceBillsTableToolbar from "./invoice-table-toolbar"
import { useInvoiceColumn } from "./use-column"

export default function InvoiceBillsTable() {
  const columns = useInvoiceColumn()
  const { direction } = useDirection()

  const deleteInvoice = useDeleteInvoice()
  const bulkDeleteInvoice = useBulkDeleteInvoice()

  const { params, updateParams } = useQueryParams<InvoiceQueryOptions>({
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
        key: "requisitionNo",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "purchaseOrderNo",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "invoiceBillNo",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "billingStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useInvoiceList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    requisitionNo: params.requisitionNo,
    purchaseOrderNo: params.purchaseOrderNo,
    invoiceBillNo: params.invoiceBillNo,
    billingStatus: params.billingStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Invoice>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Invoice>({
    deleteMutation: deleteInvoice.mutate,
    bulkDeleteMutation: bulkDeleteInvoice.mutate,
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
        <InvoiceBillsTableToolbar
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
            isLoading={
              isLoading ||
              deleteInvoice.isPending ||
              bulkDeleteInvoice.isPending
            }
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
