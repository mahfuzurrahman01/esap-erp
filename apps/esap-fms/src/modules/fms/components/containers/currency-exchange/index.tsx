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
  useBulkDeleteCurrencyExchange,
  useCurrencyExchangeList,
  useDeleteCurrencyExchange,
} from "@/modules/fms/hooks/use-currency-exchange"
import {
  CurrencyExchangeList,
  CurrencyExchangeQueryOptions,
} from "@/modules/fms/types"

import CurrencyExchangeTableToolbar from "./currency-exchange-table-toolbar"
import { useColumn } from "./use-column"

export default function CurrencyExchangeTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const [params, setParams] = useState<CurrencyExchangeQueryOptions>({
    search: "",
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const updateParams = (newParams: Partial<CurrencyExchangeQueryOptions>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useCurrencyExchangeList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc"
  })

  const deleteCurrency = useDeleteCurrencyExchange()
  const bulkDeleteCurrency = useBulkDeleteCurrencyExchange()

  const { table, setData, columnOrder, handleDragEndColumn, sensors } =
    useTanStackTable<CurrencyExchangeList>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            right: ["action"],
          },
        },
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
    useTableDelete<CurrencyExchangeList>({
      deleteMutation: deleteCurrency.mutate,
      bulkDeleteMutation: bulkDeleteCurrency.mutate,
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
        <CurrencyExchangeTableToolbar
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
            isLoading={isLoading || deleteCurrency.isPending}
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
    </>
  )
}
