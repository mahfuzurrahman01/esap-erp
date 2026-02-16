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
  useBulkDeleteCustomer,
  useCustomerList,
  useDeleteCustomer,
} from "@/modules/crm/hooks/use-customers"
import {
  CustomerList,
  CustomerQueryOptions,
} from "@/modules/crm/types/customer"

import { useColumn } from "./column"
import CustomerTableToolbar from "./customer-table-toolbar"

export default function CustomerTable() {
  const { direction } = useDirection()
  const deleteCustomer = useDeleteCustomer()
  const deleteItemBulk = useBulkDeleteCustomer()

  const { params, updateParams } = useQueryParams<CustomerQueryOptions>({
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
        key: "email",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "phone",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "company",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "country",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading, isPending, refetch } = useCustomerList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    name: params.name,
    email: params.email,
    phone: params.phone,
    company: params.company,
    country: params.country,
  })

  const columns = useColumn(refetch)

  const { table, setData, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<CustomerList>({
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
    useTableDelete<CustomerList>({
      deleteMutation: deleteCustomer.mutate,
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
        <CustomerTableToolbar
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
