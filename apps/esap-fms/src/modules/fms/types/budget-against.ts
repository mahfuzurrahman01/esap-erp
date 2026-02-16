import { PaginationResponse } from "./index"

export interface BudgetAgainstQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
}

export interface BudgetAgainstList {
  id?: number
  budgetAgainstName: string
  actions?: string
}

export type BudgetAgainstPaginator = PaginationResponse<BudgetAgainstList>
