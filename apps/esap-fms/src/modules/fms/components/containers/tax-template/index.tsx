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
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import useDebounce from "@/hooks/use-debounce"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useDeleteTaxTemplate,
  useTaxTemplateList,
} from "@/modules/fms/hooks/use-tax-template"
import { TaxTemplateList, TaxTemplateQueryOptions } from "@/modules/fms/types"

import TaxTemplateTableToolbar from "./tax-template-table-toolbar"
import { useColumn } from "./use-column"

export default function TaxTemplateTable() {
  const columns = useColumn()
  const direction = useDirection()
  const [params, setParams] = useState<TaxTemplateQueryOptions>({
    search: "",
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const deleteTaxTemplate = useDeleteTaxTemplate()

  const updateParams = (newParams: Partial<TaxTemplateQueryOptions>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useTaxTemplateList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc"
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<TaxTemplateList>({
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<TaxTemplateList>({
      deleteMutation: deleteTaxTemplate.mutate,
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
      <TaxTemplateTableToolbar
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
          isLoading={isLoading}
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
