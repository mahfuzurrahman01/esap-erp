import { PaginationResponse, QueryOptions } from "./index"

export interface TransactionPaymentTypeQueryOptions extends QueryOptions {
  search?: string
}

export interface TransactionPaymentTypeList {
  id: number
  transactionPaymentTypeName: string
  createdBy?: number
  updatedBy?: number
  isActive?: boolean
  isDeleted?: boolean
}

export interface TransactionPaymentTypePaginator
  extends PaginationResponse<TransactionPaymentTypeList> {}
