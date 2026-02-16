import { PaginationResponse, QueryOptions } from "./index"

export interface BudgetDistribution {
  month: string
  percentage: number
}

export interface BudgetSummary {
  budgetName: string
  fiscalYear: string
  startDate: string
  endDate: string
  totalBudgetAmount: number
  budgetDistribution: BudgetDistribution[]
  costCenter: string
}

export interface BudgetSummaryQueryOptions {
  search?: string
  fiscalYear?: string
  costCenterId?: string
}

export type BudgetSummaryResponse = BudgetSummary[]
