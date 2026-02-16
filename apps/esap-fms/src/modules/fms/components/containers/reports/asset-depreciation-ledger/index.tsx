"use client"

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
import { useQueryParams } from "@/hooks/use-query-params"
import { useAssetDepreciationLedgerList } from "@/modules/fms/hooks/use-asset-depreciation-ledger"
import {
  AssetDepreciationLedgerList,
  AssetDepreciationLedgerQueryOptions,
} from "@/modules/fms/types"

import AssetDepreciationLedgerTableToolbar from "./asset-depreciation-ledger-table-toolbar"
import OperatingAssetDepreciation from "./operating-asset-depreciation"
import { useColumn } from "./use-column"

export default function AssetDepreciationLedgerTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } =
    useQueryParams<AssetDepreciationLedgerQueryOptions>({
      params: [
        {
          key: "search",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "companyId",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "assetCategoryId",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "assetLocationId",
          defaultValue: "",
          parse: (value) => value || "",
        },
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
      ],
    })

  const { data, isLoading } = useAssetDepreciationLedgerList({
    search: params.search,
    companyId: params.companyId,
    assetCategoryId: params.assetCategoryId,
    assetLocationId: params.assetLocationId,
    startDate: params.startDate,
    endDate: params.endDate,
  })

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<AssetDepreciationLedgerList>({
      // @ts-ignore
      tableData: data || [],
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

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
      <AssetDepreciationLedgerTableToolbar
        params={params}
        updateParams={updateParams}
      />

      {/* @ts-ignore */}
      <OperatingAssetDepreciation data={data || []} />
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
      {/* <ApiTablePagination
        table={table}
        params={params}
        count={data?.count || 0}
        updateParams={updateParams}
      /> */}
    </WidgetCard>
  )
}
