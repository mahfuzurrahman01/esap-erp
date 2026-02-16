import { QueryOptions } from "./index"

export interface TrialBalanceQueryOptions extends QueryOptions {
  companyId?: number | string
  startDate?: string
  endDate?: string
}

export interface TrialBalanceList {
  id: number
  accountName: string
  rootType: string
  debit: number
  credit: number
  children?: TrialBalanceList[]
  isOpen?: boolean
}

export type TrialBalanceResponse = TrialBalanceList[]

// Additional types for UI components
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