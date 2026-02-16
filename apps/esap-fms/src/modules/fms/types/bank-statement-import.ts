import {
  BankAccountList,
  CompanyList,
  CurrencyList,
  PaginationResponse,
} from "./index"

export interface BankStatementImportQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  bankAccountId?: number | string
  companyId?: number | string
  currencyId?: number | string
  sort?: string
}

export interface BankStatementDetailImport {
  transactionDate?: string
  amount?: number
  transactionType?: string
  referenceNumber?: string
  description?: string
}

export interface BankTransactionImport {
  id?: number
  bankTransactionCode?: number
}

export interface BankStatementImport {
  id?: number
  companyId: number
  company?: CompanyList | null
  bankAccountId?: number
  bankAccount?: BankAccountList | null
  currencyId?: number
  currency?: CurrencyList | null
  bankStatementDetails?: BankStatementDetailImport[]
  bankTransactions?: BankTransactionImport[]
  action?: string
  bsFile?: any
}

export type BankStatementImportPaginator =
  PaginationResponse<BankStatementImport>