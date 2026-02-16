import {
  PaginationResponse,
} from "./index"

export interface BankStatementReportQueryOptions {
  pageIndex?: number
  pageSize?: number
  sort?: string
  search?: string
  StartDate?: string
  EndDate?: string
  bankAccountId?: string | number
  partyTypeId?: string | number
}

export interface BankStatementReportList {
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

export type BankStatementReportPaginator = PaginationResponse<BankStatementReportList>
