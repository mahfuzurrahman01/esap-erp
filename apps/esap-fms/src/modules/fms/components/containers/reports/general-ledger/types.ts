import { ColumnDef } from "@tanstack/react-table"

import { GeneralLedgerEntry } from "@/modules/fms/types/general-ledger"

export interface GeneralLedgerProps {
  data?: GeneralLedgerEntry[]
  columns?: ColumnDef<GeneralLedgerEntry>[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}

export interface GeneralLedgerReportProps extends GeneralLedgerProps {
  data: GeneralLedgerEntry[]
  columns: ColumnDef<GeneralLedgerEntry>[]
}
