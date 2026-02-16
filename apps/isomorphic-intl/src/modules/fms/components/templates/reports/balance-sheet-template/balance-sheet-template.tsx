"use client"

import { useEffect, useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"

import { useQueryParams } from "@/hooks/use-query-params"
import BalanceSheetReport from "@/modules/fms/components/containers/reports/balance-sheet/balance-sheet-report"
import BalanceSheetState from "@/modules/fms/components/containers/reports/balance-sheet/balance-sheet-state"
import BalanceSheetToolbar from "@/modules/fms/components/containers/reports/balance-sheet/balance-sheet-toolbar"
import { flattenBalanceSheetData, resetIdCounter } from "@/modules/fms/components/containers/reports/balance-sheet/transform-balance-sheet-data"
import { useBalanceSheetColumns } from "@/modules/fms/components/containers/reports/balance-sheet/use-balance-sheet-columns"
import { useBalanceSheet } from "@/modules/fms/hooks/use-balance-sheet"
import { BalanceSheetQueryOptions } from "@/modules/fms/types/balance-sheet"

const generateId = (name: string) => {
  return `acc_${name.toLowerCase().replace(/\s+/g, '_')}`
}

export default function BalanceSheetTemplate() {
  const { params, updateParams } = useQueryParams<BalanceSheetQueryOptions>({
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

  const { data: apiData, isLoading } = useBalanceSheet({
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
      apiData.balanceSheets.forEach((statement) => {
        const mainId = generateId(statement.accountName)
        initialExpandedRows.add(mainId)
      })

      setExpandedRows(initialExpandedRows)
    }
  }, [apiData])

  const allRows = apiData?.balanceSheets
    ? apiData.balanceSheets.reduce((acc: any[], statement, index) => {
      resetIdCounter() // Reset counter for each main statement to ensure consistent IDs
      const rows = flattenBalanceSheetData(
        { ...statement, id: generateId(statement.accountName) },
        expandedRows,
        0,
        true
      )
      if (index < apiData.balanceSheets.length - 1) {
        rows.push({
          id: `blank-row-${index}`,
          accountName: "",
          amount: 0,
          level: 0,
          hasChildren: false,
          isBlank: true,
          childAccounts: [],
        })
      }
      return [...acc, ...rows]
    }, [])
    : []

  const columns = useBalanceSheetColumns(toggleRow)

  const [filterValue, setFilterValue] = useState("")

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
        <BalanceSheetToolbar
          params={params}
          updateParams={updateParams}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <BalanceSheetState balanceSheet={apiData} />
        <BalanceSheetReport
          data={allRows}
          columns={columns}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          enableFiltering={true}
          isLoading={isLoading}
        />
      </WidgetCard>
    </>
  )
}
