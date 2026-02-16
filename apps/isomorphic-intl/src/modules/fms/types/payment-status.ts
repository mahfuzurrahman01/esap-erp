import { PaginationResponse, QueryOptions } from "./index"

export interface PaymentStatusQueryOptions extends QueryOptions {
  search?: string
  orderBy?: string
  sortedBy?: string
}

export interface PaymentStatusList {
  id: number
  paymentStatusName: string
  createdBy?: number
  updatedBy?: number
  isActive?: boolean
  isDeleted?: boolean
}

export interface PaymentStatusPaginator
  extends PaginationResponse<PaymentStatusList> {}
