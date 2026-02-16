import {
  PaginationResponse,
} from "./index"

export interface MonthlyBankTransactionsQueryOptions {
  pageIndex?: number
  pageSize?: number
  sort?: string
  search?: string
  StartDate?: string
  EndDate?: string
  paymentTypeId?: string | number
  partyTypeId?: string | number
}

export interface MonthlyBankTransactionsList {
  id?: number
  accountName: string
  accountNumber: number
  accountType: string
  bankName: string
  company: string
  amount: string
  currency: string
  referenceNumber: string
  transactionDate: string
  transactionType: string
  status: string
  isActive: string
  actions: string
  totalBalance: number
}

export type MonthlyBankTransactionsPaginator = PaginationResponse<MonthlyBankTransactionsList>
