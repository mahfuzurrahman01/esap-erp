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
import {
  useProductionPlanning,
} from "@/modules/scm/hooks/feature-reports/use-feature-reports"

import {
  ProductionPlanningReport,
  ProductionPlanningReportQueryOptions,
} from "@/modules/scm/types/feature-reports/production-planning-report"

import ProductionPlanningTableToolbar from "./production-planning-table-toolbar"
import { useProductionPlanningColumn } from "./use-column"

export default function ProductionPlanningReportList() {
  const columns = useProductionPlanningColumn()
  const { direction } = useDirection()

  const { params, updateParams } =
    useQueryParams<ProductionPlanningReportQueryOptions>({
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
          key: "workCenter",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "productName",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "assignTo",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "workProgress",
          defaultValue: "",
          parse: (value) => value || "",
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

  const { data, isLoading } = useProductionPlanning({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    workCenter: params.workCenter,
    productName: params.productName,
    assignTo: params.assignTo,
    workProgress: params.workProgress,
    fromDate: params.fromDate,
    toDate: params.toDate,
  })

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<ProductionPlanningReport>({
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
        <ProductionPlanningTableToolbar
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
