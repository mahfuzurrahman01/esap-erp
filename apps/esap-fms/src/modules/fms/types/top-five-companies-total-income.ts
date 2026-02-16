import { QueryOptions } from "./index"

export interface TopFiveCompaniesTotalIncomeQueryOptions extends QueryOptions {
  companyId?: number | string
}

export interface TopFiveCompanyData {
  totalIncome: number
  growthPercentage: number
}