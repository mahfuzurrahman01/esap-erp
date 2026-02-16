"use client"

import { useTanStackTable } from "@/components/container/tan-table/custom-table-components/use-tanstack-table"
import { useSalesReportList } from "@/modules/crm/hooks/use-sales-report"
import React from "react"
import MainTable from "../table/table"
import { useItemsColumn } from "./items-column"
import { useTranslations } from "next-intl"
import SkeletonLoader from "@/components/base/skeleton-loader"

export default function TopProducts() {
  const t = useTranslations("crm")
  const { data: output, isLoading } = useSalesReportList()
  const tableData = output?.data || []
  const columns = useItemsColumn()
  const { table, columnOrder } = useTanStackTable<any>({
    tableData: tableData,
    columnConfig: columns,
  })
  return (
    <>
      <h4 className="py-4 ml-5 text-[#1C252E]">{t("text-sales-report")}</h4>
      <div className="dashboard-top-products overflow-hidden rounded-lg bg-white p-7 shadow-md dark:bg-gray-700">
        {isLoading ? <SkeletonLoader row={1} /> : <MainTable table={table} columnOrder={columnOrder} variant={"modern"} />}
      </div>
    </>
  )
}
