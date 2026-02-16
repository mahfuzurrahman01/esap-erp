import { PaginationResponse, QueryOptions } from "./index"

export interface PaymentTypeQueryOptions extends QueryOptions {
  search?: string
  orderBy?: string
  sortedBy?: string
}

export interface PaymentTypeList {
  id: number
  paymentTypeName: string
  createdBy?: number
  updatedBy?: number
  isActive?: boolean
  isDeleted?: boolean
}

export interface PaymentTypePaginator
  extends PaginationResponse<PaymentTypeList> {}
