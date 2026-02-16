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
  useBulkDeleteRiskAssessment,
  useDeleteRiskAssessment,
  useRiskAssessmentList,
} from "@/modules/scm/hooks/supplier-relationship/risk-assessment/use-risk-assessment"
import { useTableDelete } from "@/modules/scm/hooks/use-table-delete"
import {
  RiskAssessment,
  RiskAssessmentQueryOptions,
} from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types"

import RiskAssessmentTableToolbar from "./risk-assessment-table-toolbar"
import { useRiskAssessmentColumn } from "./use-column"

export default function RiskAssessmentList() {
  const columns = useRiskAssessmentColumn()
  const { direction } = useDirection()

  const deleteRiskAssessment = useDeleteRiskAssessment()
  const bulkDeleteRiskAssessment = useBulkDeleteRiskAssessment()

  const { params, updateParams } = useQueryParams<RiskAssessmentQueryOptions>({
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
        key: "riskType",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "riskStatus",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useRiskAssessmentList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    supplierName: params.supplierName,
    riskType: params.riskType,
    riskStatus: params.riskStatus,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<RiskAssessment>({
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
    useTableDelete<RiskAssessment>({
      deleteMutation: deleteRiskAssessment.mutate,
      bulkDeleteMutation: bulkDeleteRiskAssessment.mutate,
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
        <RiskAssessmentTableToolbar
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
              deleteRiskAssessment.isPending ||
              bulkDeleteRiskAssessment.isPending
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
