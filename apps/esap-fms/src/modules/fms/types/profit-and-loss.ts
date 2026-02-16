import { PaginationResponse, QueryOptions } from "./index"

export interface ProfitAndLossQueryOptions extends QueryOptions {
  companyId?: number | string
  startDate?: string
  endDate?: string
}

export interface ProfitAndLossAccount {
  accountName: string
  amount: number
  childAccounts: ProfitAndLossAccount[]
}

export interface ProfitAndLossResponse {
  totalIncome: number
  totalExpense: number
  totalEquity: number
  profit: number
  profitAndLossStatements: ProfitAndLossAccount[]
}

export type ProfitAndLossPaginator = PaginationResponse<ProfitAndLossAccount>
