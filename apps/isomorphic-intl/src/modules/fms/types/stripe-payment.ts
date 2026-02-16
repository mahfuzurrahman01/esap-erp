import { PaginationResponse } from "."

export interface StripePayment {
  id: number
  amount: number
  currency?: string
  paymentMethodId?: string
  receiptEmail?: string
  successURL: string
  cancelURL: string
}

export interface StripePaymentPaginator
  extends PaginationResponse<StripePayment> {}
