"use client"

import { useEffect } from "react"

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
import { useTableDelete } from "@/hooks/use-table-delete"

import { useColumn } from "./use-column"
import { useDeleteZatcaCategory, useZatcaCategoryList } from "@/modules/fms/hooks"
import { ZatcaCategoryList, ZatcaCategoryQueryOptions } from "@/modules/fms/types"
import ZatcaCategoryTableToolbar from "./zatca-category-table-toolbar"
import { useBulkDeleteZatcaCategory } from "@/modules/fms/hooks/use-zatca-category"
import { useQueryParams } from "@/hooks/use-query-params"

export default function ZatcaTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<ZatcaCategoryQueryOptions>({
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

  const { data, isLoading } = useZatcaCategoryList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc"
  })

  const deleteZatca = useDeleteZatcaCategory()
  const bulkDeleteZatcaCategory = useBulkDeleteZatcaCategory()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<ZatcaCategoryList>({
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
      table.resetRowSelection()
    }
  }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<ZatcaCategoryList>({
      deleteMutation: deleteZatca.mutate,
      bulkDeleteMutation: bulkDeleteZatcaCategory.mutate,
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
      <ZatcaCategoryTableToolbar table={table} params={params} updateParams={updateParams} />
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}>
        <MainTable
          table={table}
          variant={"modern"}
          columnOrder={columnOrder}
          isLoading={isLoading || deleteZatca.isPending}
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
