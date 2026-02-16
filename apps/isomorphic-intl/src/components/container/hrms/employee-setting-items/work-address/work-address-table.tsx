"use client"

import { useMemo } from "react"
import WidgetCard from "@core/components/cards/widget-card"
import { useDirection } from "@core/hooks/use-direction"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import { useWorkAddressTableColumns } from "@/components/container/hrms/employee-setting-items/work-address/use-work-address-table-columns"
import WorkAddressTableToolbar from "@/components/container/hrms/employee-setting-items/work-address/work-address-table-toolbar"
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/container/tan-table/custom-table-components"
import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import {
  useDeleteWorkAddress,
  useWorkAddressList,
} from "@/hooks/hrms/employee/use-work-address"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTableDelete } from "@/hooks/use-table-delete"
import {
  WorkAddress,
  WorkAddressQueryOptions,
} from "@/types/hrms/employee/work-address.types"

export default function WorkAddressTable() {
  const { direction } = useDirection()
  const columns = useWorkAddressTableColumns()
  const deleteWorkAddress = useDeleteWorkAddress()
  const { params, updateParams } = useQueryParams<WorkAddressQueryOptions>({
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
        key: "country",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  const { data, isLoading } = useWorkAddressList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    country: params.country,
  })

  // Memoize to prevent new array reference every render (fixes infinite loop when API returns 404/empty)
  const tableData = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data?.data]
  )

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<WorkAddress>({
      tableData,
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

  const { handleDeleteRow } = useTableDelete<WorkAddress>({
    deleteMutation: deleteWorkAddress.mutate,
    setData,
    resetRowSelection: table.resetRowSelection,
  })

  table.options.meta = {
    ...table.options.meta,
    handleDeleteRow,
  }
  return (
    <>
      <WidgetCard className="card-shadow flex flex-col gap-4 border-none bg-gray-0 dark:bg-gray-800">
        <WorkAddressTableToolbar
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
    </>
  )
}
