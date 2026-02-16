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
import { useAccountPayableReport } from "@/modules/scm/hooks/feature-reports/use-feature-reports"

import { useAccountPayableReportColumn } from "./use-column"
import { AccountPayableReport, AccountPayableReportsQueryOptions } from "@/modules/scm/types/feature-reports/account-payable-reports"
import AccountPayableTableToolbar from "./forecast-review-analytics-table-toolbar"

export default function AccountPayableReportList() {
  const columns = useAccountPayableReportColumn()
  const { direction } = useDirection()

  const { params, updateParams } =
    useQueryParams<AccountPayableReportsQueryOptions>({
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
          key: "party",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "dueDate",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "payableAccount",
          defaultValue: "",
          parse: (value) => value || "",
        },
      ],
    })


  const { data, isLoading } = useAccountPayableReport({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    party: params.party,
    dueDate: params.dueDate,
    payableAccount: params.payableAccount,
  })

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<AccountPayableReport>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
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
            isLoading={isLoading}
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
