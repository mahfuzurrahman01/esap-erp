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
import { usePurchaseOrderTrendsReport } from "@/modules/scm/hooks/feature-reports/use-feature-reports"
import {
  PurchaseOrderTrends,
  PurchaseOrderTrendsQueryOptions,
} from "@/modules/scm/types/feature-reports/purchase-order-trends"

import { usePurchaseOrderTrendsColumn } from "./use-column"
import PurchaseOrderTrendsTableToolbar from "./purchase-order-trends-table-toolbar"

export default function PurchaseOrderTrendsReportList() {
  const columns = usePurchaseOrderTrendsColumn()
  const { direction } = useDirection()

  const { params, updateParams } =
    useQueryParams<PurchaseOrderTrendsQueryOptions>({
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
          key: "productName",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "fromDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "toDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
      ],
    })

  const { data, isLoading } = usePurchaseOrderTrendsReport({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    fromDate: params.fromDate,
    toDate: params.toDate,
  })

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<PurchaseOrderTrends>({
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
        <PurchaseOrderTrendsTableToolbar
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
