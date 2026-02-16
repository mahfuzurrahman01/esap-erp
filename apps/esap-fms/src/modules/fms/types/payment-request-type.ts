import { PaginationResponse } from "./index"

export interface PaymentRequestTypeQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface PaymentRequestTypeList {
  id?: number
  paymentRequestTypeName: string
  actions?: string
}

export type PaymentRequestTypePaginator = PaginationResponse<PaymentRequestTypeList>
