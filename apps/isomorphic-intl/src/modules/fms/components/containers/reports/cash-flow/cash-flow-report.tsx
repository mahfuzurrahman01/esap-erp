"use client"

import TableGrid from "@/components/ui/table-grid"

import { CashFlowProps } from "./types"

interface CashFlowReportProps extends CashFlowProps {
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}

export default function CashFlowReport({
  data,
  columns,
  filterValue,
  onFilterChange,
  enableFiltering,
}: CashFlowReportProps) {
  return (
    <div className="@container">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns="60px 1fr 200px"
        variant="modern"
        className="min-h-[400px] @4xl:h-[740px]"
        maxHeight="740px"
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        enableFiltering={enableFiltering}
      />
    </div>
  )
}
