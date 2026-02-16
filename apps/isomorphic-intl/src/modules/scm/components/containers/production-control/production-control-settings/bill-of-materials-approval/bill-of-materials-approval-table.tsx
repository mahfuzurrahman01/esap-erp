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
import {
  useBillOfMaterialsApprovalList,
  useBulkDeleteBillOfMaterialsApproval,
  useDeleteBillOfMaterialsApproval,
} from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials-approval"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  BillOfMaterialsApproval,
  BillOfMaterialsApprovalQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-approval-types"

import BillOfMaterialsApprovalTableToolbar from "./bill-of-materials-approval-table-toolbar"
import { useBillOfMaterialsApprovalTableColumns } from "./use-bill-of-materials-approval-column"

export default function BillOfMaterialsApprovalTable() {
  const { direction } = useDirection()
  const deleteBillOfMaterialsApproval = useDeleteBillOfMaterialsApproval()
  const deleteBillOfMaterialsApprovalBulk =
    useBulkDeleteBillOfMaterialsApproval()
  const columns = useBillOfMaterialsApprovalTableColumns()

  const { params, updateParams } =
    useQueryParams<BillOfMaterialsApprovalQueryOptions>({
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
          key: "approvalStatus",
          defaultValue: "",
          parse: (value) => value || "",
        },
        {
          key: "approvedDate",
          defaultValue: "",
          parse: (value) => value || "",
        },
      ],
    })

  const { data, isLoading } = useBillOfMaterialsApprovalList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    approvalStatus: params.approvalStatus,
    approvedDate: params.approvedDate,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<BillOfMaterialsApproval>({
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
    useTableDelete<BillOfMaterialsApproval>({
      deleteMutation: deleteBillOfMaterialsApproval.mutate,
      bulkDeleteMutation: deleteBillOfMaterialsApprovalBulk.mutate,
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
        <BillOfMaterialsApprovalTableToolbar
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
              deleteBillOfMaterialsApproval.isPending ||
              deleteBillOfMaterialsApprovalBulk.isPending
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
