import { PaginationResponse, QueryOptions } from "./index"

export interface TaxTemplateTypesQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
}

export interface TaxTemplateTypesList {
  id?: number
  taxTemplateTypeName: string
}

export interface TaxTemplateTypesPaginator
  extends PaginationResponse<TaxTemplateTypesList> {}
