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
  useBulkDeleteCountry,
  useCountryList,
  useDeleteCountry,
} from "@/modules/fms/hooks/use-country"
import { CountryList, CountryQueryOptions } from "@/modules/fms/types"

import CountryTableToolbar from "./country-table-toolbar"
import { useColumn } from "./use-column"
import { useQueryParams } from "@/hooks/use-query-params"

export default function CountryTable() {
  const { direction } = useDirection()
  const deleteCountry = useDeleteCountry()
  const bulkDeleteCountry = useBulkDeleteCountry()

  const columns = useColumn()
  const { params, updateParams } = useQueryParams<CountryQueryOptions>({
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
        key: "sort",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading, isPending } = useCountryList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc",
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<CountryList>({
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

    useEffect(() => {
      if (data?.data) {
        setData(data.data)
        table.resetRowSelection()
      }
    }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<CountryList>(
    {
      deleteMutation: deleteCountry.mutate,
      bulkDeleteMutation: bulkDeleteCountry.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    }
  )

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
        <CountryTableToolbar
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
            isLoading={isLoading || isPending || deleteCountry.isPending}
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
