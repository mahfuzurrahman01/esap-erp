import { QueryOptions } from "./index"

export interface IncomeStatementQueryOptions extends QueryOptions {
  companyId?: number | string
  year?: number | string
}

export interface IncomeStatementData {
  month?: string
  income?: number
  expense?: number
  profit?: number
}

export interface IncomeStatementResponse {
  incomeStatement: IncomeStatementData[]
}
