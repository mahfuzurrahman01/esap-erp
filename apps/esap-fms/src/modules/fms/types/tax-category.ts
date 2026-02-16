import { PaginationResponse, QueryOptions, ZatcaCategoryList } from "./index"

export interface TaxCategoryQueryOptions extends QueryOptions {
  orderBy?: string
  sort?: string
}

export interface TaxCategoryList {
  id?: number
  taxCategoryName?: string
  zatcaCategoryId?: number
  zatcaCategory?: ZatcaCategoryList
  isActive?: boolean
  actions?: string
}

export interface TaxCategoryPaginator
  extends PaginationResponse<TaxCategoryList> {}
