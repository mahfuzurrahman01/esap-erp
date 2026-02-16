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
  useBulkDeleteCompany,
  useCompanyList,
  useDeleteCompany,
} from "@/modules/fms/hooks/use-company"
import { CompanyList, CompanyQueryOptions } from "@/modules/fms/types"

import CompanyTableToolbar from "./company-table-toolbar"
import { useColumn } from "./use-column"
import { useEffect } from "react"

export default function CompanyTable() {
  const columns = useColumn()
  const direction = useDirection()

  const { params, updateParams } = useQueryParams<CompanyQueryOptions>({
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
        key: "countryId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "currencyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
      {
        key: "dateOfEstablishment",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "sort",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data, isLoading } = useCompanyList({
    search: params.search,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
    sort: "desc",
  })

  const deleteCompany = useDeleteCompany()
  const bulkDeleteCompany = useBulkDeleteCompany()

  const { table, setData, sensors, handleDragEndColumn, columnOrder } =
    useTanStackTable<CompanyList>({
      tableData: data?.data || [],
      columnConfig: columns,
      options: {
        initialState: {
          columnPinning: {
            left: ["id"],
            right: ["actions"],
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

    useEffect(() => {
      if (data?.data) {
        setData(data.data)
        table.resetRowSelection()
      }
    }, [data?.data, setData, table])

  const { handleDeleteRow, handleMultipleDelete } = useTableDelete<CompanyList>(
    {
      deleteMutation: deleteCompany.mutate,
      bulkDeleteMutation: bulkDeleteCompany.mutate,
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
        <CompanyTableToolbar
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
            isLoading={isLoading || deleteCompany.isPending}
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
