import { PaginationResponse } from "./index"

export interface AccountTypeQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  orderBy?: string
  sort?: string
}

export interface AccountTypeList {
  id?: number
  accountingTypeName: string
  parentId?: number
  parent?: AccountTypeList
  actions?: string
}

export type AccountTypePaginator = PaginationResponse<AccountTypeList>
