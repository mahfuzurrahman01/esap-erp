"use client"

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
  useBulkDeleteWarehouse,
  useDeleteWarehouse,
  useWarehouseList,
} from "@/modules/scm/hooks/inventory/warehouse/use-warehouse"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  Warehouse,
  WarehouseQueryOptions,
} from "@/modules/scm/types/inventory/warehouse/warehouse-types"

import { useWarehouseColumn } from "./use-column"
import WarehouseTableToolbar from "./warehouse-table-toolbar"

export default function WarehouseList() {
  const columns = useWarehouseColumn()
  const { direction } = useDirection()

  const deleteWarehouse = useDeleteWarehouse()
  const bulkDeleteWarehouse = useBulkDeleteWarehouse()

  const { params, updateParams } = useQueryParams<WarehouseQueryOptions>({
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
        key: "companyName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "location",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "managerName",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "capacity",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "inUseCapacity",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "status",
        defaultValue: "",
        parse: (label) => label || "",
      },
    ],
  })

  const { data, isLoading } = useWarehouseList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    location: params.location,
    managerName: params.managerName,
    capacity: params.capacity,
    inUseCapacity: params.inUseCapacity,
    status: params.status,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Warehouse>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Warehouse>({
    deleteMutation: deleteWarehouse.mutate,
    bulkDeleteMutation: bulkDeleteWarehouse.mutate,
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
        <WarehouseTableToolbar
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
            isLoading={isLoading || deleteWarehouse.isPending || bulkDeleteWarehouse.isPending}
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
