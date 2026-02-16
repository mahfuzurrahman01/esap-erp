"use client"

import { useAssetRepairHistoryList } from "@/modules/fms/hooks/use-asset-repair-history"
import { AssetRepairHistory, AssetRepairHistoryQueryOptions } from "@/modules/fms/types/asset-repair-history"

import { useColumn } from "./use-column"
import WidgetCard from "@core/components/cards/widget-card"
import { TableSkeleton } from "@/components/ui"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import { useDirection } from "@core/hooks/use-direction"
import { DragAbleCellWrapper } from "@/components/container/tan-table/custom-table-components"
import AssetRepairHistoryTableToolbar from "./asset-repair-history-table-toolbar"
import { closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import MainTable from "@/components/base/table/main-table"
import { DragAbleHeadWrapper } from "@/components/container/tan-table/custom-table-components"
import { DndContext } from "@dnd-kit/core"

export default function AssetRepairHistoryReport() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } = useQueryParams<AssetRepairHistoryQueryOptions>({
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
        key: "repairStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useAssetRepairHistoryList({
    startDate: params.startDate,
    endDate: params.endDate,
    repairStatus: params.repairStatus,
  })

  const tableData = data || []

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<AssetRepairHistory>({
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
      <AssetRepairHistoryTableToolbar
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
