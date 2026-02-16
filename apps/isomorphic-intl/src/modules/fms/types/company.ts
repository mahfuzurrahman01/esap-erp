import {
  CountryList,
  CurrencyList,
  PaginationResponse,
  QueryOptions,
} from "./index"

export interface CompanyQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
  search?: string
  countryId?: number | string
  currencyId?: number | string
  dateOfEstablishment?: string
  sort?: string
  isDefault?: boolean
}

export interface CompanyList {
  id?: number
  companyName: string
  abbreviation?: string
  countryId: number
  country?: CountryList
  logoUrl?: string | null
  logo?: string | null
  currencyId?: number
  currency?: CurrencyList
  avatar?: string | null
  taxNo?: string | number | null
  domain?: string | null
  dateOfEstablishment: string | null
  parentCompany?: string | null
  dataOfIncorporation?: string | null
  companyLogo?: File
  companyDescription?: string | null
  phoneNumber?: string | null
  email?: string | null
  website?: string | null

  // Banking & Accounting related fields
  defaultBankAccountId?: number | null
  defaultPayableAccountId?: number | null
  defaultCashAccountId?: number | null
  defaultCostOfGoodsSoldAccountId?: number | null
  defaultReceivableAccountId?: number | null
  defaultIncomeAccountId?: number | null
  defaultExpenseAccountId?: number | null
  roundOffAccountId?: number | null
  roundOffCostCenterId?: number | null
  defaultDeferredRevenueAccountId?: number
  defaultDeferredExpenseAccountId?: number | null
  writeOffAccount?: number | null
  defaultPaymentDiscountAccountId?: number | null
  exchangeGainLossAccountId?: number | null
  unrealizedGainLossAccountId?: number | null
  defaultCostCenterId?: number | null
  unrealizedProfitLossAccountId?: number | null

  // Depreciation related fields
  accumulatedDepreciationAccount?: number
  depreciationExpenseAccount?: number
  gainLossAccountOnAssetsDisposal?: number
  assetsDepreciationCostCenter?: number
  capitalWorkInProgressAccount?: number
  assetValuationAccount?: number
  assetsReceivedButNotBilledAccount?: number

  // Sales & Purchase related fields
  defaultFinanceBook?: number | null
  buyingTerms?: string | null
  sellingTerms?: string | null
  monthlySalesTarget?: string | null
  warehouseSalesReturn?: string | null
  totalMonthlySales?: number | null
  creditLimit?: number | null

  // Inventory related fields
  isPerpetualInventory?: boolean | null
  isProvisionalAccounting?: boolean | null
  inventoryAccount?: string | null
  stockReceivedButNotBilledAccount?: string | null
  stockAdjustmentAccount?: string | null
  provisionalAccount?: string | null
  expansesIncludeInValuation?: string | null
  inTransitWarehouseAccount?: string | null
  operatingCostAccount?: string | null

  // Additional fields
  isEnabled?: boolean
  isDefault?: boolean
  isDisabled?: boolean
  createdAt?: string | null
  updatedAt?: string | null
  actions?: string | null
}

export type CompanyPaginator = PaginationResponse<CompanyList>

// You might also want to add a type for creating/updating a company
export type CreateCompanyInput = Omit<CompanyList, "id">
export type UpdateCompanyInput = Partial<CreateCompanyInput>
