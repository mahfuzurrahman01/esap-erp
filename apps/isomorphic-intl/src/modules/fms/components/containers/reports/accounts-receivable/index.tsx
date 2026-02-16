"use client"

import React from "react"

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

import AccountPayableTableToolbar from "./account-receivable-table-toolbar"
import { useAccountPayableReportColumn } from "./use-column"
import useDebounce from "@/hooks/use-debounce"
import { AccountRecivable, AccountRecivableQueryOptions } from "@/modules/crm/types/account-recivable"
import { useAccountRecivableList } from "@/modules/crm/hooks/use-account-recivable"

export default function AccountReceivableReportList() {
  const columns = useAccountPayableReportColumn()
  const { direction } = useDirection()

  const { params, updateParams } = useQueryParams<AccountRecivableQueryOptions>({
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
        key: "invoiceDateFrom",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "deliveryDateFrom",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "customerId",
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

  const { data, isLoading, isPending } = useAccountRecivableList({
    search: debouncedSearchTerm,
    page: params.pageIndex,
    pageSize: params.pageSize,
    invoiceDateFrom: params.invoiceDateFrom,
    deliveryDateFrom: params.deliveryDateFrom,
    customerId: params.customerId,
    courier: params.courier,
    status: params.status,
  })

  const { table, sensors, columnOrder, handleDragEndColumn } =
    useTanStackTable<AccountRecivable>({
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

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
        <AccountPayableTableToolbar
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
            isLoading={isLoading || isPending}
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
      </WidgetCard>
    </>
  )
}
