import { PaginationResponse, QueryOptions } from "./index"

export interface TaxTypeQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
}

export interface TaxTypeList {
  id?: number
  taxTypeName: string
}

export interface TaxTypePaginator extends PaginationResponse<TaxTypeList> {}
