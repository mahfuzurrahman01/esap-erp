import { PaginationResponse, QueryOptions } from "./index"

export interface BankTransactionStatusQueryOptions extends QueryOptions {
  search?: string
  orderBy?: string
  sortedBy?: string
}

export interface BankTransactionStatusList {
  id: number
  bankTransactionStatusName: string
  createdBy?: number
  updatedBy?: number
  isActive?: boolean
  isDeleted?: boolean
}

export interface BankTransactionStatusPaginator
  extends PaginationResponse<BankTransactionStatusList> {}
