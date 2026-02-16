"use client"

import { useState } from "react"

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
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  useDeleteSLAMonitor,
  useSLAMonitoringList,
} from "@/modules/scm/hooks/procurement/supplier/use-sla-monitoring"
import {
  ServiceLevelAgreementMonitoring,
  ServiceLevelAgreementMonitoringQueryOptions,
} from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types"

import { useSLAMonitoringColumn } from "./use-column"

export default function SLAMonitoringList() {
  const columns = useSLAMonitoringColumn()
  const { direction } = useDirection()

  const { mutate: deleteSLAMonitor, isPending: isDeleting } =
    useDeleteSLAMonitor()

  const [params, setParams] =
    useState<ServiceLevelAgreementMonitoringQueryOptions>({
      search: "",
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
    })

  const updateParams = (
    newParams: Partial<ServiceLevelAgreementMonitoringQueryOptions>
  ) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const { data, isLoading } = useSLAMonitoringList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<ServiceLevelAgreementMonitoring>({
      tableData: data?.length ? data : [],
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
    useTableDelete<ServiceLevelAgreementMonitoring>({
      deleteMutation: deleteSLAMonitor,
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
        {/* <SupplierTableToolbar
          table={table}
          searchTerm={params.search ?? ""}
          setSearchTerm={updateParams}
        /> */}
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEndColumn}
          sensors={sensors}>
          <MainTable
            table={table}
            columnOrder={columnOrder}
            variant={"modern"}
            isLoading={isLoading || isDeleting}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
        <ApiTablePaginationScm
          table={table}
          params={params}
          count={data?.length || 0}
          updateParams={updateParams}
        />
      </WidgetCard>
    </>
  )
}
