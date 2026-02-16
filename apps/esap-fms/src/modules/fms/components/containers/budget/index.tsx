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
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import { useBudgetList, useDeleteBudget, useBulkDeleteBudget } from "@/modules/fms/hooks/use-budget"
import { BudgetList, BudgetQueryOptions } from "@/modules/fms/types"

import BudgetTableToolbar from "./budget-table-toolbar"
import { useColumn } from "./use-column"
import { useEffect } from "react"

export default function BudgetTable() {
  const columns = useColumn()
  const direction = useDirection()

  const deleteBudget = useDeleteBudget()
  const bulkDeleteBudget = useBulkDeleteBudget()

  const { params, updateParams } = useQueryParams<BudgetQueryOptions>({
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
        key: "budgetAgainstId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "fiscalYear",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useBudgetList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    budgetAgainstId: params.budgetAgainstId,
    companyId: params.companyId,
    fiscalYear: params.fiscalYear,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BudgetList>({
      tableData: data?.data || [],
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

  useEffect(() => {
    if (data?.data) {
      setData(data.data)
    }
  }, [data?.data, setData])

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<BudgetList>({
    deleteMutation: deleteBudget.mutate,
    bulkDeleteMutation: bulkDeleteBudget.mutate,
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
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <BudgetTableToolbar
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
          variant="modern"
          columnOrder={columnOrder}
          isLoading={isLoading || deleteBudget.isPending}
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
  )
}
