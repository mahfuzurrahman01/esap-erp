import {
  PaginationResponse,
} from "./index"

export interface DailyPaymentsQueryOptions {
  pageIndex?: number
  pageSize?: number
  sort?: string
  search?: string
  StartDate?: string
  EndDate?: string
}

export interface DailyPaymentsList {
  id?: number
  postingDate?: string
  totalAmount: number
  paymentCount: number
}

export type DailyPaymentsPaginator = PaginationResponse<DailyPaymentsList>
