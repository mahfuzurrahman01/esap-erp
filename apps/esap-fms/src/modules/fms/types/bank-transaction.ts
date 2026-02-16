import {
  BankAccountList,
  CompanyList,
  CurrencyList,
  PaginationResponse,
  QueryOptions,
} from "./index"

export interface BankTransactionQueryOptions extends QueryOptions {
  search?: string
  bankAccountId?: number | string
  companyId?: number | string
  status?: string
  sort?: string
  bankTransactionStatusId?: number
}

export interface BankTransactionList {
  id: number
  bankTransactionCode?: string
  bankAccountId: number
  bankAccount?: BankAccountList | null
  transactionType: string
  transactionDate: string
  amount: number | null
  status?: string
  bankTransactionStatusName?: string
  companyId: number
  company?: CompanyList | null
  currencyId: number
  currency?: CurrencyList | null
  referenceNumber?: string
  description?: string
  totalAllocatedAmount?: number
  totalUnAllocatedAmount?: number
  partyType?: string
  partyName?: string
  partyAccountNumber?: string | null
  partyIBAN?: string | null
  paymentEntries?: BankTransactionDetail[]
  action?: string
}

export interface BankTransactionDetail {
  id: number
  paymentType?: string | null
  paymentCode?: string | null
  allocatedAmount?: number | null
}

export interface BankTransactionPaginator
  extends PaginationResponse<BankTransactionList> {}
