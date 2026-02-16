"use client"

import { useEffect } from "react"
import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { TableSkeleton } from "@/components/ui"
import { useQueryParams } from "@/hooks/use-query-params"
import { useAssetMovementHistoryList } from "@/modules/fms/hooks/use-asset-movement-history"
import { AssetMovementHistory, AssetMovementHistoryQueryOptions } from "@/modules/fms/types/asset-movement-history"

import AssetMovementHistoryTableToolbar from "./asset-movement-history-table-toolbar"
import { useColumn } from "./use-column"

export default function AssetMovementHistoryTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<AssetMovementHistoryQueryOptions>({
    params: [
      {
        key: "startDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "endDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "purposeOfMovement",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useAssetMovementHistoryList({
    startDate: params.startDate,
    endDate: params.endDate,
    purposeOfMovement: params.purposeOfMovement,
  })

  const tableData = data || []

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<AssetMovementHistory>({
      tableData,
      columnConfig: columns,
      options: {
        enableRowSelection: true,
        columnResizeDirection: direction as any,
        columnResizeMode: "onChange",
        enableColumnResizing: true,
        manualPagination: true,
        onStateChange: (updater) => {
          if ("data" in updater) {
            table.resetRowSelection()
          }
        },
      },
    })

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
      <AssetMovementHistoryTableToolbar
        params={params}
        updateParams={updateParams}
      />

      {isLoading ? (
        <TableSkeleton
          columns={8}
          rows={5}
          columnWidths={[80, 200, 200, 250, 250, 150, 150, 150]}
        />
      ) : (
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
      )}
    </WidgetCard>
  )
}
