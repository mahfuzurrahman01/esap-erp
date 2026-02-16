import { PaginationResponse } from "./index"

export interface AssetTransactionTypeQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface AssetTransactionTypeList {
  id?: number
  assetTransactionTypeName: string
  actions?: string
}

export type AssetTransactionTypePaginator =
  PaginationResponse<AssetTransactionTypeList>
