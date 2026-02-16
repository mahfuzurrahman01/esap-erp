import { ColumnDef } from '@tanstack/react-table'
import { GeneralLedgerEntry as GLEntry } from "@/modules/fms/types/general-ledger"

export interface GeneralLedgerEntry {
  id: string
  postingDate: string
  account: string
  debit: number
  credit: number
  balance: number
  voucherType: string
  voucherSubtype: string
  voucherNo: string
}

export interface GeneralLedgerData {
  entries: GeneralLedgerEntry[]
  total: GeneralLedgerEntry
  closing: GeneralLedgerEntry
}

export interface GeneralLedgerProps {
  data?: GLEntry[]
  columns?: ColumnDef<GLEntry>[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}

export interface GeneralLedgerReportProps {
  data: GLEntry[]
  columns: ColumnDef<GLEntry>[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
} 