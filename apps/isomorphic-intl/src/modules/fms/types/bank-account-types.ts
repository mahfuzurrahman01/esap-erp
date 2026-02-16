import { PaginationResponse } from "./index"

export interface BankAccountTypeQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  orderBy?: string
  sort?: string
}

export interface BankAccountTypeList {
  id?: number
  bankAccountTypeName: string
  actions?: string
}

export type BankAccountTypePaginator = PaginationResponse<BankAccountTypeList>
