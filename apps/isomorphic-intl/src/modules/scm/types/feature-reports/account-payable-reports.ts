import { PaginatedResponse, QueryOptions } from "../common.types"

export interface AccountPayableReport {
  id?: number
  sl: number
  party: string
  currency: string
  payableAccount: string
  invoiceNo: string
  invoiceDate: string
  dueDate: string
  advancedAmount: number
  invoicedAmount: number
  paidAmount: number
  outstandingAmount: number
  totalAmountDue: number
}

export interface AccountPayableReportsQueryOptions extends QueryOptions {
  party?: string
  dueDate?: string
  payableAccount?: string
}

export type AccountPayableReportsPaginator =
  PaginatedResponse<AccountPayableReport>
