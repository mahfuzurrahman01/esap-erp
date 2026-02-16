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
  useBillOfMaterialsList,
  useBulkDeleteBillOfMaterials,
  useDeleteBillOfMaterials,
} from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  BillOfMaterials,
  BillOfMaterialsQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"

import BillOfMaterialsTableToolbar from "./bill-of-materials-table-toolbar"
import { useBillOfMaterialsColumn } from "./use-column"

export default function BillOfMaterialsList() {
  const { direction } = useDirection()
  const columns = useBillOfMaterialsColumn()

  const deleteBillOfMaterials = useDeleteBillOfMaterials()
  const bulkDeleteBillOfMaterials = useBulkDeleteBillOfMaterials()

  const { params, updateParams } = useQueryParams<BillOfMaterialsQueryOptions>({
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
        parse: (label) => label || "",
      },
      {
        key: "workCenter",
        defaultValue: "",
        parse: (label) => label || "",
      },
      {
        key: "approvalStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useBillOfMaterialsList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    productName: params.productName,
    workCenter: params.workCenter,
    approvalStatus: params.approvalStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BillOfMaterials>({
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
    useTableDelete<BillOfMaterials>({
      deleteMutation: deleteBillOfMaterials.mutate,
      bulkDeleteMutation: bulkDeleteBillOfMaterials.mutate,
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
        <BillOfMaterialsTableToolbar
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
              deleteBillOfMaterials.isPending ||
              bulkDeleteBillOfMaterials.isPending
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
