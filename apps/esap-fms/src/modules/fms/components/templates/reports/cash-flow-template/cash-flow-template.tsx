"use client"

import { useState } from "react"

import WidgetCard from "@core/components/cards/widget-card"

import { useQueryParams } from "@/hooks/use-query-params"
import CashFlowReport from "@/modules/fms/components/containers/reports/cash-flow/cash-flow-report"
import CashFlowState from "@/modules/fms/components/containers/reports/cash-flow/cash-flow-state"
import CashFlowToolbar from "@/modules/fms/components/containers/reports/cash-flow/cash-flow-toolbar"
import OperatingCashFlow from "@/modules/fms/components/containers/reports/cash-flow/operating-cash-flow"
import { CashFlowItem } from "@/modules/fms/components/containers/reports/cash-flow/types"
import { useCashFlowColumns } from "@/modules/fms/components/containers/reports/cash-flow/use-cash-flow-columns"
import { useCashFlow } from "@/modules/fms/hooks/use-cash-flow"
import { CashFlowQueryOptions } from "@/modules/fms/types/cash-flow"

const flattenCashFlowData = (
  section: any,
  expandedRows: Set<string>,
  level = 0
): CashFlowItem[] => {
  if (!section) return []

  const rows: CashFlowItem[] = []

  rows.push({
    id: section.id || "",
    name: section.name || "",
    amount: section.amount || 0,
    level,
    hasChildren: Boolean(section.children?.length),
    isExpanded: expandedRows.has(section.id),
    isParent: true,
  })

  if (expandedRows.has(section.id) && section.children) {
    section.children.forEach((child: any) => {
      rows.push({
        id: child.id || "",
        name: child.name || "",
        amount: child.amount || 0,
        level: level + 1,
        hasChildren: Boolean(child.children?.length),
        isExpanded: expandedRows.has(child.id),
      })
    })
  }

  if (section.total) {
    rows.push({
      id: section.total.id || "",
      name: section.total.name || "",
      amount: section.total.amount || 0,
      level,
      hasChildren: false,
      isTotal: true,
    })
  }

  return rows
}

export default function CashFlowTemplate() {
  const { params, updateParams } = useQueryParams<CashFlowQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data: apiData } = useCashFlow({
    companyId: params.companyId,
  })

  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    new Set(["1000", "2000", "3000"])
  )

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id)
    } else {
      newExpandedRows.add(id)
    }
    setExpandedRows(newExpandedRows)
  }

  const operationsRows = flattenCashFlowData(
    apiData?.operations,
    expandedRows
  )
  const investingRows = flattenCashFlowData(
    apiData?.investing,
    expandedRows
  )
  const financingRows = flattenCashFlowData(
    apiData?.financing,
    expandedRows
  )

  const allRows = [
    ...operationsRows,
    {
      id: "blank-row-1",
      name: "",
      amount: 0,
      level: 0,
      hasChildren: false,
      isBlank: true,
    },
    ...investingRows,
    {
      id: "blank-row-2",
      name: "",
      amount: 0,
      level: 0,
      hasChildren: false,
      isBlank: true,
    },
    ...financingRows,
    {
      id: "blank-row-3",
      name: "",
      amount: 0,
      level: 0,
      hasChildren: false,
      isBlank: true,
    },
    {
      id: apiData?.netChange?.id || "net-change",
      name: apiData?.netChange?.name || "Net Change",
      amount: apiData?.netChange?.amount || 0,
      level: 0,
      hasChildren: false,
      isTotal: true,
    },
  ]

  const columns = useCashFlowColumns(toggleRow)

  const [filterValue, setFilterValue] = useState("")

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
  }

  return (
    <>
      <WidgetCard
        rounded="xl"
        className="card-shadow flex flex-col gap-4 border-none bg-paper px-5 dark:bg-paper lg:px-7">
        <CashFlowToolbar
          params={params}
          updateParams={updateParams}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <CashFlowState />
        <OperatingCashFlow />
        <CashFlowReport
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
