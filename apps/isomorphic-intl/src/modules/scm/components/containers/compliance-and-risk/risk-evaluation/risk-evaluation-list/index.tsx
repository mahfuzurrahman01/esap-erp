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
  useBulkDeleteRiskEvaluation,
  useDeleteRiskEvaluation,
  useRiskEvaluationList,
} from "@/modules/scm/hooks/compliance-and-risk/risk-evaluation/use-risk-evaluation"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  RiskEvaluation,
  RiskEvaluationQueryOptions,
} from "@/modules/scm/types/compliance-and-risk/risk-evaluation"

import RiskEvaluationTableToolbar from "./risk-evaluation-table-toolbar"
import { useRiskEvaluationColumn } from "./use-column"

export default function RiskEvaluationTable() {
  const columns = useRiskEvaluationColumn()
  const { direction } = useDirection()

  const deleteRiskEvaluation = useDeleteRiskEvaluation()
  const bulkDeleteRiskEvaluation = useBulkDeleteRiskEvaluation()

  const { params, updateParams } = useQueryParams<RiskEvaluationQueryOptions>({
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
        key: "riskType",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "riskImpact",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "mitigationStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useRiskEvaluationList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    riskType: params.riskType,
    riskImpact: params.riskImpact,
    mitigationStatus: params.mitigationStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<RiskEvaluation>({
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
    useTableDelete<RiskEvaluation>({
      deleteMutation: deleteRiskEvaluation.mutate,
      bulkDeleteMutation: bulkDeleteRiskEvaluation.mutate,
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
        <RiskEvaluationTableToolbar
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
              deleteRiskEvaluation.isPending ||
              bulkDeleteRiskEvaluation.isPending
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
