import {
  BankAccountTypeList,
  BankList,
  CompanyList,
  CurrencyList,
  PaginationResponse,
} from "./index"

export interface BankAccountQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  companyId?: number | string
  bankAccountTypeId?: number | string
  partyType?: string
  isCompanyAccount?: boolean
  orderBy?: string
  sort?: string
}

export interface BankAccountList {
  id: number
  accountName: string
  bankId: number
  chartOfAccountId?: number | null
  accountNumber?: string
  bankName?: string
  bankAccountTypeId?: number
  bankAccountTypeName?: string
  entityTypeId?: number
  entityTypeName?: string
  companyId?: number
  bankAccountNumber?: string
  swiftNumber?: string
  routingNumber?: string
  iban?: string
  branchCode?: string
  partyType?: string
  supplierId?: number
  supplierName?: string
  customerId?: string
  customerName?: string
  employeeId?: number
  employeeName?: string
  isActive?: boolean
  isDefaultAccount?: boolean
  isCompanyAccount?: boolean | null
  actions?: string
  bankAccountType?: BankAccountTypeList
  bank?: BankList
  company?: CompanyList
  currencyId?: number
  currency?: CurrencyList | null
}

export type BankAccountPaginator = PaginationResponse<BankAccountList>
