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
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteSalesOperationPlan,
  useDeleteSalesOperationPlan,
  useSalesOperationPlanList,
} from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-plan"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  SalesOperationPlan,
  SalesOperationPlanQueryOptions,
} from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"

import SalesOperationPlanTableToolbar from "./forecast-table-toolbar"
import { useSalesOperationPlanColumn } from "./use-column"

export default function SalesOperationPlanList() {
  const columns = useSalesOperationPlanColumn()
  const { direction } = useDirection()

  const deleteSalesOperationPlan = useDeleteSalesOperationPlan()
  const bulkDeleteSalesOperationPlan = useBulkDeleteSalesOperationPlan()

  const { params, updateParams } =
    useQueryParams<SalesOperationPlanQueryOptions>({
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
          key: "sku",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "currentSalesData",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "forecastPeriod",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "approvalStatus",
          defaultValue: "",
          parse: (label) => label || "",
        },
      ],
    })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useSalesOperationPlanList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    sku: params.sku,
    currentSalesData: params.currentSalesData,
    forecastPeriod: params.forecastPeriod,
    approvalStatus: params.approvalStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<SalesOperationPlan>({
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
    useTableDelete<SalesOperationPlan>({
      deleteMutation: deleteSalesOperationPlan.mutate,
      bulkDeleteMutation: bulkDeleteSalesOperationPlan.mutate,
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
        <SalesOperationPlanTableToolbar
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
              deleteSalesOperationPlan.isPending ||
              bulkDeleteSalesOperationPlan.isPending
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
