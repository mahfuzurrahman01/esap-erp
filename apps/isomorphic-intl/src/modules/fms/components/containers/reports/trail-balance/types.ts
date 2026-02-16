import { TrialBalanceList } from "@/modules/fms/types/trial-balance"

export interface TrialBalanceRowData extends Omit<TrialBalanceList, "id"> {
  id: string
  level: number
  hasChildren: boolean
  isExpanded?: boolean
  isParent?: boolean
  isTotal?: boolean
  isBlank?: boolean
  isOpen?: boolean
}

export interface TrialBalanceProps {
  data: TrialBalanceRowData[]
  columns: any[]
  filterValue?: string
  onFilterChange?: (value: string) => void
  enableFiltering?: boolean
}