import { PaginationResponse, QueryOptions } from "./index"

export interface BalanceSheetQueryOptions extends QueryOptions {
  companyId?: number | string
  startDate?: string
  endDate?: string
}

export interface BalanceSheetAccount {
  accountName: string
  amount: number
  childAccounts: BalanceSheetAccount[]
}

export interface BalanceSheetResponse {
  totalAssets: number
  totalLiabilities: number
  totalEquity: number
  provisionalPnL: number
  balanceSheets: BalanceSheetAccount[]
}

export type BalanceSheetPaginator = PaginationResponse<BalanceSheetAccount>

// Additional types for UI components
export interface BalanceSheetRowData extends BalanceSheetAccount {
  id: string
  level: number
  hasChildren: boolean
  isExpanded?: boolean
  isParent?: boolean
  isTotal?: boolean
  isBlank?: boolean
}
