"use client"

import { useEffect, useState } from "react"

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
import { DEFAULT_PAGE_SIZE } from "@/config/constants"
import useDebounce from "@/hooks/use-debounce"
import { useTableDelete } from "@/hooks/use-table-delete"
import FiscalYearTableToolbar from "@/modules/fms/components/containers/fiscal-year/fiscal-year-table-toolbar"
import {
  useBulkDeleteFiscalYear,
  useDeleteFiscalYear,
  useFiscalYearList,
} from "@/modules/fms/hooks/use-fiscal-year"
import {
  FiscalYearList,
  FiscalYearQueryOptions,
} from "@/modules/fms/types/fiscal-year"

import { useColumn } from "./use-column"
import { useQueryParams } from "@/hooks/use-query-params"

export default function FiscalYearTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<FiscalYearQueryOptions>({
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

  const { data, isLoading } = useFiscalYearList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const deleteFiscalYear = useDeleteFiscalYear()
  const bulkDeleteFiscalYear = useBulkDeleteFiscalYear()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<FiscalYearList>({
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<FiscalYearList>({
      deleteMutation: deleteFiscalYear.mutate,
      bulkDeleteMutation: bulkDeleteFiscalYear.mutate,
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
      <FiscalYearTableToolbar
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
          columnOrder={columnOrder}
          isLoading={isLoading || deleteFiscalYear.isPending}
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
