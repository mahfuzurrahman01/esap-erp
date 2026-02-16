import { PaginationResponse } from "./index"

export interface AssetLocationQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
}

export interface AssetLocationList {
  id?: number
  assetLocationName: string
  actions?: string
}

export type AssetLocationPaginator = PaginationResponse<AssetLocationList>
