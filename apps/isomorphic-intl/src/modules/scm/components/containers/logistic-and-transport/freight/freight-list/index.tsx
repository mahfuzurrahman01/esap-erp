"use client"

import React from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePaginationScm from "@/components/base/api-table-pagination-scm"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteFreight,
  useDeleteFreight,
  useFreightList,
} from "@/modules/scm/hooks/logistic-and-transport/freight/use-freight"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  Freight,
  FreightQueryOptions,
} from "@/modules/scm/types/logistics-and-transport/freight/freight-types"

import FreightTableToolbar from "./freight-table-toolbar"
import { useFreightColumn } from "./use-column"

export default function FreightList() {
  const columns = useFreightColumn()
  const { direction } = useDirection()

  const deleteFreight = useDeleteFreight()
  const bulkDeleteFreight = useBulkDeleteFreight()

  const { params, updateParams } = useQueryParams<FreightQueryOptions>({
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
        key: "carrierName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "origin",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "destination",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const { data, isLoading } = useFreightList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    carrierName: params.carrierName,
    origin: params.origin,
    destination: params.destination,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Freight>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["action"],
          },
        },
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Freight>({
    deleteMutation: deleteFreight.mutate,
    bulkDeleteMutation: bulkDeleteFreight.mutate,
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
        <FreightTableToolbar
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
            isLoading={
              isLoading ||
              deleteFreight.isPending ||
              bulkDeleteFreight.isPending
            }
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePaginationScm
          table={table}
          params={params}
          count={data?.count || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
