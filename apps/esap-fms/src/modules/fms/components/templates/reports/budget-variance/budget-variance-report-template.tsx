"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"

import { useQueryParams } from "@/hooks/use-query-params"
import BudgetVarianceReport from "@/modules/fms/components/containers/reports/budget-variance/budget-variance-report"
import BudgetVarianceToolbar from "@/modules/fms/components/containers/reports/budget-variance/budget-variance-toolbar"
import { useBudgetVarianceColumns } from "@/modules/fms/components/containers/reports/budget-variance/use-budget-variance-columns"
import { useBudgetVariance } from "@/modules/fms/hooks/use-budget-variance"
import { BudgetVarianceQueryOptions } from "@/modules/fms/types/budget-variance"

export default function BudgetVarianceReportTemplate() {
  const [filterValue, setFilterValue] = useState("")
  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  const { params, updateParams } = useQueryParams<BudgetVarianceQueryOptions>({
    params: [
      {
        key: "fiscalYearId",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "costCenterId",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "budgetAgainstId",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "reportType",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "fromDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "toDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data } = useBudgetVariance({
    fiscalYearId: params.fiscalYearId,
    costCenterId: params.costCenterId,
    budgetAgainstId: params.budgetAgainstId,
    reportType: params.reportType,
    fromDate: params.fromDate,
    toDate: params.toDate,
  })

  const columns = useBudgetVarianceColumns(params.reportType)

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
        <BudgetVarianceToolbar
          params={params}
          updateParams={updateParams}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <BudgetVarianceReport
          data={data || []}
          columns={columns}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          enableFiltering={true}
        />
      </WidgetCard>
    </>
  )
}
