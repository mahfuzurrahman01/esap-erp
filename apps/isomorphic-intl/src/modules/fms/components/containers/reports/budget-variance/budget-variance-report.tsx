"use client"

import TableGrid, { Column } from "@/components/ui/table-grid"
import { ColumnDef } from "@tanstack/react-table"
import { BudgetVarianceItem } from "@/modules/fms/types/budget-variance"

interface BudgetVarianceReportProps {
  data: BudgetVarianceItem[]
  columns: ColumnDef<BudgetVarianceItem>[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}

const convertToTableColumns = (columns: ColumnDef<BudgetVarianceItem>[]): Column[] => {
  return columns.map((col) => {
    const baseColumn: Partial<Column> = {
      id: col.id as string,
      header: (typeof col.header === 'function' ? col.header({} as any) : col.header) as string,
    }

    if ('accessorKey' in col) {
      baseColumn.accessorKey = col.accessorKey as string
      if (col.cell) {
        baseColumn.cell = (props) => {
          return (col.cell as any)({
            row: { original: props.row.original, index: props.row.index },
            getValue: () => props.value
          })
        }
      }
    } else if ('accessorFn' in col) {
      baseColumn.accessorKey = col.id as string
      baseColumn.cell = (props) => {
        const value = (col.accessorFn as any)(props.row.original)
        if (typeof col.cell === 'function') {
          return (col.cell as any)({
            getValue: () => value,
            row: { original: props.row.original, index: props.row.index }
          })
        }
        return value
      }
    } else if (typeof col.cell === 'function') {
      baseColumn.cell = (props) => {
        return (col.cell as any)({
          getValue: () => props.value,
          row: { original: props.row.original, index: props.row.index }
        })
      }
    }

    return baseColumn as Column
  })
}

const getGridTemplateColumns = (columns: ColumnDef<BudgetVarianceItem>[]): string => {
  const columnWidths = columns.map((col) => {
    const id = col.id as string

    // ID column
    if (id === 'sl') return '60px'

    // Cost Center and Chart of Account columns
    if (id === 'costCenter' || id === 'chartOfAccount') return '1fr'

    // Monthly columns (budget, actual, variance for each month)
    if (id.includes('_January') || id.includes('_February') ||
      id.includes('_March') || id.includes('_April') ||
      id.includes('_May') || id.includes('_June') ||
      id.includes('_July') || id.includes('_August') ||
      id.includes('_September') || id.includes('_October') ||
      id.includes('_November') || id.includes('_December')) {
      return '1fr'
    }

    // Yearly columns (budgetAmount, actualAmount, variance)
    if (id === 'budgetAmount' || id === 'actualAmount' || id === 'variance') {
      return '200px'
    }

    return '150px' // Default width for any other columns
  })

  return columnWidths.join(' ')
}

export default function BudgetVarianceReport({
  data = [],
  columns = [],
  filterValue,
  onFilterChange,
  enableFiltering,
}: BudgetVarianceReportProps) {
  const tableColumns = convertToTableColumns(columns)
  const gridTemplateColumns = getGridTemplateColumns(columns)

  return (
    <div className="@container">
      <TableGrid
        data={data}
        columns={tableColumns}
        gridTemplateColumns={gridTemplateColumns}
        className="min-h-[400px] @4xl:h-[600px]"
        maxHeight="600px"
        variant="modern"
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        enableFiltering={enableFiltering}
      />
    </div>
  )
}
