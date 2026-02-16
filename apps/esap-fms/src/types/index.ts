import { PaginationResponse } from "../modules/fms/types"

export interface PaginatorInfo<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: any[]
  next_page_url: string | null
  path: string
  pageSize: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface QueryOptions {
  search?: string
  companyId?: string
  language?: string
  pageIndex?: number
  pageSize?: number
}

export interface COAQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
}

export interface COAList {
  id: number
  chartOfAccountName: string
  parentAccount: string
  accountNumber?: string
  accountingTypeId: number
  accountTypeName?: string
  parentAccountId?: number
  parentAccountName?: string
  balanceMustBe?: string
  companyId: number
  companyName?: string
  status: string
  isGroup?: boolean
  reportType?: string
  rootType?: string
  rate?: string
  currency?: number
}

export interface ParentAccount {
  id: number
  chartOfAccountName: string
  root_type: string
  report_type: string
}

export interface ParentAccountQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
}

export interface COAPaginator extends PaginationResponse<COAList> {}
export interface ParentAccountPaginator
  extends PaginationResponse<ParentAccount> {}
