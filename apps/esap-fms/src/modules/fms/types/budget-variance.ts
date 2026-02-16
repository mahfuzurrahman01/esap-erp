export interface BudgetVarianceQueryOptions {
  fiscalYearId?: string
  costCenterId?: string
  budgetAgainstId?: string
  reportType?: string
  fromDate?: string
  toDate?: string
}

export interface BudgetVarianceItem {
  sl: number
  costCenter: string
  chartOfAccount: string
  // Yearly format
  budgetAmount?: number
  actualAmount?: number
  variance?: number
  // Monthly format
  budget_January?: number
  actual_January?: number
  variance_January?: number
  budget_February?: number
  actual_February?: number
  variance_February?: number
  budget_March?: number
  actual_March?: number
  variance_March?: number
  budget_April?: number
  actual_April?: number
  variance_April?: number
  budget_May?: number
  actual_May?: number
  variance_May?: number
  budget_June?: number
  actual_June?: number
  variance_June?: number
  budget_July?: number
  actual_July?: number
  variance_July?: number
  budget_August?: number
  actual_August?: number
  variance_August?: number
  budget_September?: number
  actual_September?: number
  variance_September?: number
  budget_October?: number
  actual_October?: number
  variance_October?: number
  budget_November?: number
  actual_November?: number
  variance_November?: number
  budget_December?: number
  actual_December?: number
  variance_December?: number
}

export type BudgetVarianceResponse = BudgetVarianceItem[]
