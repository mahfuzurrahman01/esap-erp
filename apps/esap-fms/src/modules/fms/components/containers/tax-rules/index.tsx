"use client"

import { useState, useEffect } from "react"

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
import TableToolbar from "@/components/container/tan-table/table-toolbar"
import { DEFAULT_PAGE_SIZE } from "@/config/constants"
import useDebounce from "@/hooks/use-debounce"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useDeleteTaxRule,
  useTaxRuleList,
} from "@/modules/fms/hooks/use-tax-rule"
import { TaxRuleList, TaxRuleQueryOptions } from "@/modules/fms/types/tax-rule"

import { useColumn } from "./use-column"
import TaxRuleTableToolbar from "./tax-rule-table-toolbar"

export default function TaxRuleTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const [params, setParams] = useState<TaxRuleQueryOptions>({
    search: "",
    pageIndex: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const updateParams = (newParams: Partial<TaxRuleQueryOptions>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useTaxRuleList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const deleteTaxRule = useDeleteTaxRule()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<TaxRuleList>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        enableRowSelection: true,
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<TaxRuleList>(
    {
      deleteMutation: deleteTaxRule.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    }
  )

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
      <TaxRuleTableToolbar table={table} params={params} updateParams={updateParams} />
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant={"modern"}
          columnOrder={columnOrder}
          isLoading={isLoading || deleteTaxRule.isPending}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
        />
      </DndContext>
      <ApiTablePagination
        table={table}
        params={params}
        count={data?.count ?? 0}
        updateParams={updateParams}
      />
    </WidgetCard>
  )
}
