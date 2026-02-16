import {
  PaginationResponse,
} from "./index"

export interface PaymentSummaryQueryOptions {
  pageIndex?: number
  pageSize?: number
  sort?: string
  search?: string
  StartDate?: string
  EndDate?: string
}

export interface PaymentSummaryList {
  id?: number
  companyId?: number
  companyName: string
  totalPaymentAmount: number
  totalPayments: string
}

export type PaymentSummaryPaginator = PaginationResponse<PaymentSummaryList>
