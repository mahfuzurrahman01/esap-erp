import { PaginationResponse } from "./index"

export interface AssetMaintenanceStatusQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface AssetMaintenanceStatusList {
  id?: number
  assetMaintenanceStatusName: string
  actions?: string
}

export type AssetMaintenanceStatusPaginator =
  PaginationResponse<AssetMaintenanceStatusList>
