"use client"

import TableGrid from "@/components/ui/table-grid"

import { TrialBalanceProps } from "./types"

const TrialBalanceReport = ({
  data,
  columns,
  filterValue,
  onFilterChange,
  enableFiltering,
}: TrialBalanceProps) => {
  return (
    <div className="@container">
      <TableGrid
        data={data}
        columns={columns}
        gridTemplateColumns="60px 1fr repeat(2, 200px)"
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

export default TrialBalanceReport
