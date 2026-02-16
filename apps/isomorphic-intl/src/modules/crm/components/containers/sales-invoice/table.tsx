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
  useDeleteSalesInvoice,
  useSalesInvoiceList,
} from "@/modules/crm/hooks/use-sales-invoice"
import {
  SalesInvoice,
  SalesInvoiceQueryOptions,
} from "@/modules/crm/types/sales-invoice"

import { useColumn } from "./column"
import SalesInvoiceTableToolbar from "./sales-invoice-table-toolbar"

export default function SalesInvoiceTable() {
  const { direction } = useDirection()
  const deleteSalesInvoice = useDeleteSalesInvoice()
  const columns = useColumn()
  const { params, updateParams } = useQueryParams<SalesInvoiceQueryOptions>({
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
        key: "invoiceDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "delivaryDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "customer",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "courier",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "status",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending } = useSalesInvoiceList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    invoiceDate: params.invoiceDate,
    delivaryDate: params.delivaryDate,
    customer: params.customer,
    courier: params.courier,
    status: params.status,
  })

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<SalesInvoice>({
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
    useTableDelete<SalesInvoice>({
      deleteMutation: deleteSalesInvoice.mutate,
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
        <SalesInvoiceTableToolbar
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
