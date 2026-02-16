"use client"

import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
// import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteWarehouseManager,
  useDeleteWarehouseManager,
  useWarehouseManagerList,
} from "@/modules/scm/hooks/inventory/warehouse/use-warehouse-manager"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  WarehouseManager,
  WarehouseManagerQueryOptions,
} from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"

import { useWarehouseManagerTableColumns } from "./use-warehouse-manager-column"
import WarehouseManagerTableToolbar from "./warehouse-manager-table-toolbar"

export default function WarehouseManagerTable() {
  const { direction } = useDirection()
  const deleteWarehouseManager = useDeleteWarehouseManager()
  const deleteWarehouseManagerBulk = useBulkDeleteWarehouseManager()
  const columns = useWarehouseManagerTableColumns()

  const { params, updateParams } = useQueryParams<WarehouseManagerQueryOptions>(
    {
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
    }
  )

  const { data, isLoading } = useWarehouseManagerList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<WarehouseManager>({
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

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<WarehouseManager>({
      deleteMutation: deleteWarehouseManager.mutate,
      bulkDeleteMutation: deleteWarehouseManagerBulk.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    })

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
        <WarehouseManagerTableToolbar
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
            isLoading={
              isLoading ||
              deleteWarehouseManager.isPending ||
              deleteWarehouseManagerBulk.isPending
            }
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
    </>
  )
}
