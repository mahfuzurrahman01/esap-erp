import { BalanceSheetAccount } from "@/modules/fms/types/balance-sheet"

export interface BalanceSheetItem extends BalanceSheetAccount {
  id: string
  level?: number
  hasChildren?: boolean
  isExpanded?: boolean
  isParent?: boolean
  isBlank?: boolean
  isTotal?: boolean
}

export interface BalanceSheetProps {
  data: BalanceSheetItem[]
  columns: any[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}
