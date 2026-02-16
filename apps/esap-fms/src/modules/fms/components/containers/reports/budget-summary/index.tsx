"use client"

import { useEffect } from "react"
import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { TableSkeleton, ChartSkeleton } from "@/components/ui"
import { useQueryParams } from "@/hooks/use-query-params"
import { useBudgetSummaryList } from "@/modules/fms/hooks/use-budget-summary"
import { BudgetSummary, BudgetSummaryQueryOptions } from "@/modules/fms/types/budget-summary"

import BudgetSummaryTableToolbar from "./budget-summary-table-toolbar"
import OperatingBudgetSummary from "./operating-budget-summary"
import { useColumn } from "./use-column"

export default function BudgetSummaryTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<BudgetSummaryQueryOptions>({
    params: [
      {
        key: "search",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "fiscalYear",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "costCenterId",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useBudgetSummaryList({
    fiscalYear: params.fiscalYear,
    costCenterId: params.costCenterId,
  })

  const tableData = data || []

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BudgetSummary>({
      tableData,
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
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
      <BudgetSummaryTableToolbar
        params={params}
        updateParams={updateParams}
      />

      {/* {isLoading ? (
        <ChartSkeleton />
      ) : (
        <OperatingBudgetSummary data={tableData} />
      )} */}

      {isLoading ? (
        <TableSkeleton
          columns={7}
          rows={5}
          columnWidths={[240, 240, 240, 240, 240, 240, 240]}
        />
      ) : (
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
      )}
    </WidgetCard>
  )
}
