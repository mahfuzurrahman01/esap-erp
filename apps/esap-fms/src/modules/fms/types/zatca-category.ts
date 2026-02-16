import { PaginationResponse, QueryOptions } from "./index"

export interface ZatcaCategoryQueryOptions extends QueryOptions {
  orderBy?: string
  sort?: string
}

export interface ZatcaCategoryList {
  id?: number
  zatcaCategoryName: string
  actions?: string
}

export interface ZatcaCategoryPaginator
  extends PaginationResponse<ZatcaCategoryList> {}
