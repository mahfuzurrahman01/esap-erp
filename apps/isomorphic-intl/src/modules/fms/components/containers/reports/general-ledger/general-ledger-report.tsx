"use client"

import { ColumnDef } from "@tanstack/react-table"
import TableGrid, { Column } from "@/components/ui/table-grid"
import { GeneralLedgerProps } from "./types"
import { GeneralLedgerEntry } from "@/modules/fms/types/general-ledger"

interface GeneralLedgerReportProps extends GeneralLedgerProps {
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}

const convertToTableColumns = (columns: ColumnDef<GeneralLedgerEntry>[]): Column[] => {
  return columns.map((col) => {
    const header = typeof col.header === 'function'
      ? col.header({} as any)
      : col.header as string

    const baseColumn: Column = {
      id: col.id as string,
      header: header,
      accessorKey: col.id as string,
    }

    if (typeof col.cell === 'function') {
      baseColumn.cell = (props) => {
        const cellFn = col.cell as any
        return cellFn({
          row: {
            original: props.row.original,
            index: props.row.index
          },
          getValue: () => props.value,
        })
      }
    }

    return baseColumn
  })
}

export default function GeneralLedgerReport({
  data = [],
  columns = [],
  filterValue,
  onFilterChange,
  enableFiltering,
}: GeneralLedgerReportProps) {
  const tableColumns = convertToTableColumns(columns)

  return (
    <div className="@container">
      <TableGrid
        data={data}
        columns={tableColumns}
        gridTemplateColumns="60px 200px 240px 200px 200px 200px 200px 240px"
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
