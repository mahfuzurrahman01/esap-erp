"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"
import { useTranslations } from "next-intl"

import ApiTablePagination from "@/components/base/api-table-pagination"
import MainTable from "@/components/base/table/main-table"
import TableToolbar from "@/components/container/tan-table/table-toolbar"
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import useDebounce from "@/hooks/use-debounce"
import { useCOAList } from "@/modules/fms/hooks/use-coa"
import { COAList, COAQueryOptions } from "@/modules/fms/types"

import { useTanStackTable } from "../custom-table-components/use-tanstack-table"
import { useColumn } from "./use-column"

export default function EnhancedTanTable() {
  const t = useTranslations("common") //use your translation here; ex: scm, fm, hrms, etc.
  const columns = useColumn()

  const [params, setParams] = useState<COAQueryOptions>({
    search: "",
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const updateParams = (newParams: Partial<COAQueryOptions>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }))
  }

  const debouncedSearchTerm = useDebounce(params.search, 500)

  const { data, isLoading } = useCOAList({
    search: debouncedSearchTerm,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  const { table, setData } = useTanStackTable<COAList>({
    tableData: data?.data ?? [],
    columnConfig: columns,
    options: {
      initialState: {
        columnPinning: {
          left: ["id"],
          right: ["report_type"],
        },
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      filterFns: {
        statusFilter: (row, columnId, value) => {
          if (!value) return false
          let status =
            row.original[columnId].toLowerCase() === value.toLowerCase()
              ? true
              : false
          return status
        },
        // priceFilter: (row, columnId, value) => {
        //   if (!value) return false
        //   // //console.log('custom filter conditions', row, columnId, value);
        //   return true
        // },
        // createdDate: (row, columnId, value) => {
        //   if (!value) return false
        //   // //console.log('custom filter conditions', row, columnId, value);
        //   return true
        // },
        // dueDate: (row, columnId, value) => {
        //   if (!value) return false
        //   // //console.log('custom filter conditions', row, columnId, value);
        //   return true
        // },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id))
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r.id)))
          table.resetRowSelection()
        },
      },
      enableColumnResizing: false,
    },
  })

  return (
    <>
      <WidgetCard
        title={t("text-accounts-table")}
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper dark:bg-paper">
        <TableToolbar table={table} />
        <MainTable table={table} isLoading={isLoading} variant={"modern"} />
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
