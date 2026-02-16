"use client"

import { useEffect, useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"

import { useQueryParams } from "@/hooks/use-query-params"
import TrialBalanceReport from "@/modules/fms/components/containers/reports/trail-balance/trail-balance-report"
import TrialBalanceToolbar from "@/modules/fms/components/containers/reports/trail-balance/trial-balance-toolbar"
import { flattenTrialBalanceData, resetIdCounter } from "@/modules/fms/components/containers/reports/trail-balance/transform-trial-balance-data"
import { useTrialBalanceColumns } from "@/modules/fms/components/containers/reports/trail-balance/use-trial-balance-columns"
import { useTrialBalance } from "@/modules/fms/hooks/use-trial-balance"
import { TrialBalanceQueryOptions, TrialBalanceList } from "@/modules/fms/types/trial-balance"
import { TrialBalanceRowData } from "@/modules/fms/components/containers/reports/trail-balance/types"

const generateId = (name: string) => {
  return `acc_${name.toLowerCase().replace(/\s+/g, "_")}`
}

export default function TrialBalanceTemplate() {
  const { params, updateParams } = useQueryParams<TrialBalanceQueryOptions>({
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

  const { data: apiData, isLoading } = useTrialBalance({
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
    if (Array.isArray(apiData) && apiData.length > 0) {
      resetIdCounter()
      const initialExpandedRows = new Set<string>()

      // Add main categories
      apiData.forEach((item: TrialBalanceList) => {
        const mainId = generateId(item.accountName)
        initialExpandedRows.add(mainId)
      })

      setExpandedRows(initialExpandedRows)
    }
  }, [apiData])

  const allRows = Array.isArray(apiData) && apiData.length > 0
    ? apiData.reduce((acc: TrialBalanceRowData[], item: TrialBalanceList, index: number) => {
      resetIdCounter() // Reset counter for each main item to ensure consistent IDs
      const rows = flattenTrialBalanceData(
        item,
        expandedRows,
        0,
        true
      )
      if (index < apiData.length - 1) {
        rows.push({
          id: `blank-row-${index}`,
          accountName: "",
          debit: 0,
          credit: 0,
          level: 0,
          hasChildren: false,
          isBlank: true,
          rootType: item.rootType,
          children: []
        })
      }
      return [...acc, ...rows]
    }, [])
    : []

  const columns = useTrialBalanceColumns(toggleRow)

  const [filterValue, setFilterValue] = useState("")

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
        <TrialBalanceToolbar
          params={params}
          updateParams={updateParams}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <TrialBalanceReport
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