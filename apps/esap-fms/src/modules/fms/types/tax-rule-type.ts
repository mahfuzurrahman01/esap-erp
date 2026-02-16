import { PaginationResponse, QueryOptions } from "./index"

export interface TaxRuleTypeQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
}

export interface TaxRuleTypeList {
  id?: number
  taxRuleTypeName: string
}

export interface TaxRuleTypePaginator
  extends PaginationResponse<TaxRuleTypeList> {}
