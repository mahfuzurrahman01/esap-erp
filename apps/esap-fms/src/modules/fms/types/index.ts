export * from "./coa"
export * from "./company"
export * from "./country"
export * from "./currency"
export * from "./currency-exchange"
export * from "./cost-center"
export * from "./journal-entry"
export * from "./budget"
export * from "./budget-template"
export * from "./tax-template"
export * from "./tax-rule"
export * from "./tax-rule-type"
export * from "./tax-category"
export * from "./tax-template-types"
export * from "./zatca-category"
export * from "./mode-of-payment"
export * from "./mode-of-payment-type"
export * from "./bank"
export * from "./bank-account"
export * from "./bank-account-types"
export * from "./asset"
export * from "./asset-category"
export * from "./asset-status"
export * from "./asset-location"
export * from "./asset-movement"
export * from "./asset-maintenance"
export * from "./asset-maintenance-status"
export * from "./asset-depreciation-schedule"
export * from "./asset-repair"
export * from "./terms-and-conditions"
export * from "./payment"
export * from "./transaction-payment-type"
export * from "./payment-request-type"
export * from "./payment-request"
export * from "./fiscal-year"
export * from "./zatca-category"
export * from "./bank-clearance"
export * from "./asset-movement-history"
export * from "./asset-repair-history"
export * from "./bank-reconciliation"

// Reports
export * from "./balance-sheet"
export * from "./cash-flow"
export * from "./fixed-asset-register"
export * from "./asset-depreciation-ledger"
export * from "./general-ledger"
export * from "./trial-balance"
export * from "./profit-and-loss"

// Dashboard
export * from "./income-expenses-profit"
export * from "./income-statement"
export * from "./top-five-companies-total-income"
export * from "./top-bank-account"
export * from "./top-bank-transactions"

export interface PaginationResponse<T> {
  pageIndex: number
  pageSize: number
  count: number
  data: T[]
}

export interface QueryOptions {
  language?: string
  search?: string
  pageIndex?: number
  pageSize?: number
}

export interface COAQueryOptions {
  pageIndex?: number
  pageSize?: number
  count?: number
  search?: string
  sort?: string
  accountTypeId?: string | number
  companyId?: number | string
  currencyId?: number | string
}
