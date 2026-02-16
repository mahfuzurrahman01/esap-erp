import { PaginationResponse } from "./index"

export interface AssetRepairStatusQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface AssetRepairStatusList {
  id?: number
  assetRepairStatusName: string
}

export type AssetRepairStatusPaginator = PaginationResponse<AssetRepairStatusList>
