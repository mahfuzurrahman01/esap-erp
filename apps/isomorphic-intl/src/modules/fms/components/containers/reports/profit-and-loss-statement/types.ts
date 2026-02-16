import { ProfitAndLossAccount } from "@/modules/fms/types/profit-and-loss"

export type ProfitAndLossItem = ProfitAndLossAccount & {
  id: string
  level?: number
  hasChildren?: boolean
  isExpanded?: boolean
  isParent?: boolean
  isBlank?: boolean
  isTotal?: boolean
}

export interface ProfitAndLossProps {
  data: ProfitAndLossItem[]
  columns: any[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}