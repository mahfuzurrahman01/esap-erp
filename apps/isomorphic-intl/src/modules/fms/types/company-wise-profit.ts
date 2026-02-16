import { QueryOptions } from "./index"

export interface CompanyWiseProfitQueryOptions extends QueryOptions {
  companyId?: number | string
}

export interface CompanyWiseProfitResponse {
  companyId: number
  companyName: string
  totalProfit: number
  profitPercentage: number
}
