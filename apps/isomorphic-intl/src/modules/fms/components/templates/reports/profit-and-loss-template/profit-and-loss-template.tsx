"use client"

import { useEffect, useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"

import { useQueryParams } from "@/hooks/use-query-params"
import ProfitAndLossReport from "@/modules/fms/components/containers/reports/profit-and-loss-statement/profit-and-loss-report"
import ProfitAndLossState from "@/modules/fms/components/containers/reports/profit-and-loss-statement/profit-and-loss-state"
import ProfitAndLossToolbar from "@/modules/fms/components/containers/reports/profit-and-loss-statement/profit-and-loss-toolbar"
import { flattenProfitAndLossData, resetIdCounter } from "@/modules/fms/components/containers/reports/profit-and-loss-statement/transform-profit-and-loss-data"
import { useProfitAndLossColumns } from "@/modules/fms/components/containers/reports/profit-and-loss-statement/use-profit-and-loss-columns"
import { useProfitAndLoss } from "@/modules/fms/hooks/use-profit-and-loss"
import { ProfitAndLossQueryOptions } from "@/modules/fms/types/profit-and-loss"

const generateId = (name: string) => {
  return `acc_${name.toLowerCase().replace(/\s+/g, '_')}`
}

export default function ProfitAndLossTemplate() {
  const { params, updateParams } = useQueryParams<ProfitAndLossQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: 1,
        parse: (value) => value || "",
      },
      {
        key: "startDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
      {
        key: "endDate",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data: apiData, isLoading } = useProfitAndLoss({
    companyId: params.companyId,
    startDate: params.startDate,
    endDate: params.endDate,
  })

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id)
    } else {
      newExpandedRows.add(id)
    }
    setExpandedRows(newExpandedRows)
  }

  useEffect(() => {
    if (apiData) {
      resetIdCounter()
      const initialExpandedRows = new Set<string>()

      // Add main categories
      apiData.profitAndLossStatements.forEach((statement) => {
        const mainId = generateId(statement.accountName)
        initialExpandedRows.add(mainId)
      })

      setExpandedRows(initialExpandedRows)
    }
  }, [apiData])

  const allRows = apiData?.profitAndLossStatements
    ? apiData.profitAndLossStatements.reduce((acc: any[], statement, index) => {
      resetIdCounter() // Reset counter for each main statement to ensure consistent IDs
      const rows = flattenProfitAndLossData(
        { ...statement, id: generateId(statement.accountName) },
        expandedRows,
        0,
        true
      )
      if (index < apiData.profitAndLossStatements.length - 1) {
        rows.push({
          id: `blank-row-${index}`,
          name: "",
          amount: 0,
          level: 0,
          hasChildren: false,
          isBlank: true,
        })
      }
      return [...acc, ...rows]
    }, [])
    : []

  const columns = useProfitAndLossColumns(toggleRow)

  const [filterValue, setFilterValue] = useState("")

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
        <ProfitAndLossToolbar
          params={params}
          updateParams={updateParams}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <ProfitAndLossState profitAndLoss={apiData} />
        <ProfitAndLossReport
          data={allRows}
          columns={columns}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          enableFiltering={true}
        />
      </WidgetCard>
    </>
  )
}