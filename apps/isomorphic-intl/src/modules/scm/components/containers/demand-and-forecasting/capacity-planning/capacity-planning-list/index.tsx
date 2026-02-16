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
  useBulkDeleteCapacityPlanning,
  useCapacityPlanningList,
  useDeleteCapacityPlanning,
} from "@/modules/scm/hooks/demand-and-forecasting/capacity-planning/use-capacity-planning"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  CapacityPlanning,
  CapacityPlanningQueryOptions,
} from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types"

import CapacityPlanningTableToolbar from "./capacity-planning-table-toolbar"
import { useCapacityPlanningColumn } from "./use-column"

export default function CapacityPlanningList() {
  const columns = useCapacityPlanningColumn()
  const { direction } = useDirection()

  const deleteCapacityPlanning = useDeleteCapacityPlanning()
  const bulkDeleteCapacityPlanning = useBulkDeleteCapacityPlanning()

  const { params, updateParams } = useQueryParams<CapacityPlanningQueryOptions>(
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
        {
          key: "productName",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "sku",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "minManufactCapacity",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "maxManufactCapacity",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "minSupplierCapacity",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "maxSupplierCapacity",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "minWarehouseCapacity",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "maxWarehouseCapacity",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "createdDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "updatedDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
      ],
    }
  )

  // const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useCapacityPlanningList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    sku: params.sku,
    minManufactCapacity: params.minManufactCapacity,
    maxManufactCapacity: params.maxManufactCapacity,
    minSupplierCapacity: params.minSupplierCapacity,
    maxSupplierCapacity: params.maxSupplierCapacity,
    minWarehouseCapacity: params.minWarehouseCapacity,
    maxWarehouseCapacity: params.maxWarehouseCapacity,
    createdDate: params.createdDate,
    updatedDate: params.updatedDate,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<CapacityPlanning>({
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
    useTableDelete<CapacityPlanning>({
      deleteMutation: deleteCapacityPlanning.mutate,
      bulkDeleteMutation: bulkDeleteCapacityPlanning.mutate,
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
        <CapacityPlanningTableToolbar
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
              deleteCapacityPlanning.isPending ||
              bulkDeleteCapacityPlanning.isPending
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
