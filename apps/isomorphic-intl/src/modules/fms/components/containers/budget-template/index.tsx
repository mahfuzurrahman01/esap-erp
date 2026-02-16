"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { useEffect } from "react"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBudgetTemplateList,
  useBulkDeleteBudgetTemplate,
  useDeleteBudgetTemplate,
} from "@/modules/fms/hooks/use-budget-template"
import {
  BudgetTemplateList,
  BudgetTemplateQueryOptions,
} from "@/modules/fms/types"

import BudgetTemplateTableToolbar from "./budget-template-table-toolbar"
import { useColumn } from "./use-column"
import { useQueryParams } from "@/hooks/use-query-params"

export default function BudgetTemplateTable() {
  const columns = useColumn()
  const direction = useDirection()
  const deleteBudgetTemplate = useDeleteBudgetTemplate()
  const bulkDeleteBudgetTemplate = useBulkDeleteBudgetTemplate()

  const { params, updateParams } = useQueryParams<BudgetTemplateQueryOptions>({
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
    ],
  })

  const { data, isLoading } = useBudgetTemplateList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc"
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BudgetTemplateList>({
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
        table.resetRowSelection()
      }
    }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<BudgetTemplateList>({
      deleteMutation: deleteBudgetTemplate.mutate,
      bulkDeleteMutation: bulkDeleteBudgetTemplate.mutate,
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
      <BudgetTemplateTableToolbar
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
          isLoading={isLoading || deleteBudgetTemplate.isPending}
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
