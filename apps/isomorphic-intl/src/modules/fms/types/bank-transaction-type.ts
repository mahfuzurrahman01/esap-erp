import { PaginationResponse, QueryOptions } from "./index"

export interface BankTransactionTypeQueryOptions extends QueryOptions {
  search?: string
  orderBy?: string
  sortedBy?: string
}

export interface BankTransactionTypeList {
  id: number
  bankTransactionName: string
  createdBy?: number
  updatedBy?: number
  isActive?: boolean
  isDeleted?: boolean
}

export interface BankTransactionTypePaginator
  extends PaginationResponse<BankTransactionTypeList> {}
