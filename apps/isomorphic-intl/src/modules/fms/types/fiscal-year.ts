import { PaginationResponse } from "./index"

export interface FiscalYearQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
}

export interface FiscalYearList {
  id?: number
  yearRange: string
  startDate: string
  endDate: string
  actions?: string
}

export type FiscalYearPaginator = PaginationResponse<FiscalYearList>
