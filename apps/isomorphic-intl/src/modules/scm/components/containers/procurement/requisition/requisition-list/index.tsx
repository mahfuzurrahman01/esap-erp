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
import useDebounce from "@/hooks/use-debounce"
import { useQueryParams } from "@/hooks/use-query-params"
import {
  useBulkDeleteRequisition,
  useDeleteRequisition,
  useRequisitionList,
} from "@/modules/scm/hooks/procurement/requisition/use-requisition"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  Requisition,
  RequisitionQueryOptions,
} from "@/modules/scm/types/procurement/requisition/requisition-types"

import RequisitionTableToolbar from "./requisition-table-toolbar"
import { useRequisitionColumn } from "./use-column"

export default function RequisitionTable() {
  const { direction } = useDirection()
  const columns = useRequisitionColumn()

  const deleteRequisition = useDeleteRequisition()
  const bulkDeleteRequisition = useBulkDeleteRequisition()

  const { params, updateParams } = useQueryParams<RequisitionQueryOptions>({
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
        key: "requestedBy",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "billingStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "priority",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useRequisitionList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    requestedBy: params.requestedBy,
    billingStatus: params.billingStatus,
    priority: params.priority,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<Requisition>({
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

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<Requisition>(
    {
      deleteMutation: deleteRequisition.mutate,
      bulkDeleteMutation: bulkDeleteRequisition.mutate,
      setData,
      resetRowSelection: table.resetRowSelection,
    }
  )

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
        <RequisitionTableToolbar
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
              deleteRequisition.isPending ||
              bulkDeleteRequisition.isPending
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
