import { PaginationResponse, QueryOptions } from "./index"

export interface BudgetTemplateQueryOptions extends QueryOptions {
  sort?: string
}

export interface BudgetTemplateList {
  id?: number
  budgetDistributionName: string
  budgetDistributionDetails: BudgetTemplateDetail[]
  actions?: string
}

export interface BudgetTemplateDetail {
  id?: number
  budgetDistributionId?: number
  monthId?: number
  monthName?: string
  budgetPercentage: number
}

export interface BudgetTemplatePaginator
  extends PaginationResponse<BudgetTemplateList> {}
