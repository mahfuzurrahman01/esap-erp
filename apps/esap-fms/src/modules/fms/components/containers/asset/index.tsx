"use client"

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
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useAssetList,
  useBulkDeleteAsset,
  useDeleteAsset,
} from "@/modules/fms/hooks/use-asset"
import { AssetList, AssetQueryOptions } from "@/modules/fms/types"

import AssetTableToolbar from "./asset-table-toolbar"
import { useColumn } from "./use-column"
import { useEffect } from "react"

export default function AssetTable() {
  const { direction } = useDirection()
  const columns = useColumn()
  const deleteAsset = useDeleteAsset()
  const bulkDeleteAsset = useBulkDeleteAsset()

  const { params, updateParams } = useQueryParams<AssetQueryOptions>({
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
        key: "assetCategoryId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "assetLocationId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "maintainerId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "departmentId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading } = useAssetList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    assetCategoryId: params.assetCategoryId,
    assetLocationId: params.assetLocationId,
    maintainerId: params.maintainerId,
    departmentId: params.departmentId,
    financeBookId: params.financeBookId,
    sort: "desc",
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<AssetList>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            right: ["actions"],
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

  useEffect(() => {
    if (data?.data) {
      setData(data.data)
    }
  }, [data?.data, setData])

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<AssetList>({
    deleteMutation: deleteAsset.mutate,
    bulkDeleteMutation: bulkDeleteAsset.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
    handleMultipleDelete,
  }

  return (
    <WidgetCard
      rounded="xl"
      className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
      <AssetTableToolbar
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
          variant="modern"
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
        count={data?.count || 0}
        updateParams={updateParams}
      />
    </WidgetCard>
  )
}
