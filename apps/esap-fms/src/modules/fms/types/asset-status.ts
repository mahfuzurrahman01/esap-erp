import { PaginationResponse } from "./index"

export interface AssetStatusQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface AssetStatusList {
  id?: number
  assetStatusName: string
}

export type AssetStatusPaginator = PaginationResponse<AssetStatusList>
