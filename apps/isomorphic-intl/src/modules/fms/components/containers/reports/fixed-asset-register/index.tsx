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
import { useFixedAssetRegisterList } from "@/modules/fms/hooks/use-fixed-asset-register"
import {
  FixedAssetRegisterList,
  FixedAssetRegisterQueryOptions,
} from "@/modules/fms/types"

import FixedAssetRegisterTableToolbar from "./fixed-asset-register-table-toolbar"
import OperatingFixedAsset from "./operating-fixed-asset"
import { useColumn } from "./use-column"

export default function FixedAssetRegisterTable() {
  const { direction } = useDirection()
  const columns = useColumn()

  const { params, updateParams } =
    useQueryParams<FixedAssetRegisterQueryOptions>({
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

  const { data, isLoading } = useFixedAssetRegisterList({
    search: params.search,
    companyId: params.companyId,
    assetCategoryId: params.assetCategoryId,
    assetLocationId: params.assetLocationId,
    startDate: params.startDate,
    endDate: params.endDate,
  })

  const { table, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<FixedAssetRegisterList>({
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
      <FixedAssetRegisterTableToolbar
        params={params}
        updateParams={updateParams}
      />
      {/* @ts-ignore */}
      <OperatingFixedAsset data={data || []} />
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
