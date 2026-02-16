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
import { DEFAULT_PAGE_SIZE } from "@/config/constants"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useBankList,
  useBulkDeleteBank,
  useDeleteBank,
} from "@/modules/fms/hooks/use-bank"
import { BankList, BankQueryOptions } from "@/modules/fms/types"

import BankTableToolbar from "./bank-table-toolbar"
import { useColumn } from "./use-column"

export default function BankTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const [params, setParams] = useState<BankQueryOptions>({
    search: "",
    pageIndex: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const updateParams = (newParams: Partial<BankQueryOptions>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const { data, isLoading } = useBankList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc"
  })

  const deleteBank = useDeleteBank()
  const bulkDeleteBank = useBulkDeleteBank()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BankList>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<BankList>({
    deleteMutation: deleteBank.mutate,
    bulkDeleteMutation: bulkDeleteBank.mutate,
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
      <BankTableToolbar
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
        count={data?.count ?? 0}
        updateParams={updateParams}
      />
    </WidgetCard>
  )
}
