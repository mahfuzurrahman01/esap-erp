"use client"

import TableGrid from "@/components/ui/table-grid"

import { BalanceSheetProps } from "./types"

interface BalanceSheetReportProps extends BalanceSheetProps {
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
  isLoading?: boolean
}

const BalanceSheetReport = ({
  data,
  columns,
  filterValue,
  onFilterChange,
  enableFiltering,
  isLoading,
}: BalanceSheetReportProps) => {
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

export default BalanceSheetReport
