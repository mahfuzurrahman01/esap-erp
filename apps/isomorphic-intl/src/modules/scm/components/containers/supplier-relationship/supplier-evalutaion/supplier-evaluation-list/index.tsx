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
  useBulkDeleteSupplierEvaluation,
  useDeleteSupplierEvaluation,
  useSupplierEvaluationList,
} from "@/modules/scm/hooks/supplier-relationship/supplier-evaluation/use-supplier-evaluation"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  SupplierEvaluation,
  SupplierEvaluationQueryOptions,
} from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"

import SupplierEvaluationTableToolbar from "./supplier-evaluation-table-toolbar"
import { useSupplierEvaluationColumn } from "./use-column"

export default function SupplierEvaluationList() {
  const columns = useSupplierEvaluationColumn()
  const { direction } = useDirection()

  const deleteSupplierEvaluation = useDeleteSupplierEvaluation()
  const bulkDeleteSupplierEvaluation = useBulkDeleteSupplierEvaluation()

  const { params, updateParams } =
    useQueryParams<SupplierEvaluationQueryOptions>({
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
          key: "supplierName",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "evaluator",
          defaultValue: "",
          parse: (label) => label || "",
        },
        {
          key: "overallScore",
          defaultValue: "",
          parse: (label) => label || "",
        },
      ],
    })

  const { data, isLoading } = useSupplierEvaluationList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    supplierName: params.supplierName,
    evaluator: params.evaluator,
    overallScore: params.overallScore,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<SupplierEvaluation>({
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
    useTableDelete<SupplierEvaluation>({
      deleteMutation: deleteSupplierEvaluation.mutate,
      bulkDeleteMutation: bulkDeleteSupplierEvaluation.mutate,
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
        <SupplierEvaluationTableToolbar
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
              deleteSupplierEvaluation.isPending ||
              bulkDeleteSupplierEvaluation.isPending
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
