"use client"

import TableGrid from "@/components/ui/table-grid"

import { ProfitAndLossProps } from "./types"

interface ProfitAndLossReportProps extends ProfitAndLossProps {
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
  isLoading?: boolean
}

const ProfitAndLossReport = ({
  data,
  columns,
  filterValue,
  onFilterChange,
  enableFiltering,
  isLoading,
}: ProfitAndLossReportProps) => {
  return (
    <div className="@container">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns="60px 1fr 200px"
        variant="modern"
        className="min-h-[400px] @4xl:h-[600px]"
        maxHeight="600px"
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        enableFiltering={enableFiltering}
      />
    </div>
  )
}

export default ProfitAndLossReport