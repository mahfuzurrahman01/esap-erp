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
  useBulkDeleteTermsAndConditions,
  useDeleteTermsAndConditions,
  useTermsAndConditionsList,
} from "@/modules/fms/hooks/use-terms-and-conditions"
import {
  TermsAndConditionsList,
  TermsAndConditionsQueryOptions,
} from "@/modules/fms/types"

import { useColumn } from "./use-column"
import TermsAndConditionsTableToolbar from "./terms-and-conditions-table-toolbar"
import { useEffect } from "react"

export default function TermsAndConditionsTable() {
  const { direction } = useDirection()
  const columns = useColumn()
  const deleteTermsAndConditions = useDeleteTermsAndConditions()
  const bulkDeleteTermsAndConditions = useBulkDeleteTermsAndConditions()

  const { params, updateParams } =
    useQueryParams<TermsAndConditionsQueryOptions>({
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
    })

  const { data, isLoading } = useTermsAndConditionsList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    isDisabled: params.isDisabled,
    isSelling: params.isSelling,
    isBuying: params.isBuying,
    sort: "desc"
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<TermsAndConditionsList>({
      tableData: data?.data ?? [],
      columnConfig: columns,
      options: {
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
      table.resetRowSelection()
    }
  }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } =
    useTableDelete<TermsAndConditionsList>({
      deleteMutation: deleteTermsAndConditions.mutate,
      bulkDeleteMutation: bulkDeleteTermsAndConditions.mutate,
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
      <TermsAndConditionsTableToolbar
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
