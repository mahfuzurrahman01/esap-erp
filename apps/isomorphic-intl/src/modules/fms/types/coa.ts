import { AccountTypeList } from "./accounting-types"
import {
  CompanyList,
  CurrencyList,
  PaginationResponse,
  QueryOptions,
} from "./index"

export interface COAQueryOptions extends QueryOptions {
  pageIndex?: number
  pageSize?: number
  count?: number
  search?: string
  sort?: string
  accountTypeId?: string | number
  companyId?: number | string
  currencyId?: number | string
}

export interface COAList {
  id?: number
  accountName: string
  accountNameWithAbbr?: string | null
  accountNumber?: string | null
  accountingTypeId?: string | number | null
  accountingType?: AccountTypeList
  parentAccount?: COAList | null
  balanceMustBe?: string | null
  companyId: number
  company?: CompanyList | null
  currencyId: number
  currency?: CurrencyList | null
  taxRate?: string | null
  isDisabled?: boolean
  createdAt?: string
  updatedAt?: string
  actions?: string | null
}

export interface ParentAccount {
  id: string
  name: string
  root_type: string
  report_type: string
}

export interface ParentAccountQueryOptions extends QueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  orderBy?: string
  sortedBy?: string
}

export type COAPaginator = PaginationResponse<COAList>
