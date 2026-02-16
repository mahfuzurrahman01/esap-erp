import { PaginationResponse } from "./index"

export interface AssetMaintenanceRepetitionQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface AssetMaintenanceRepetitionList {
  id?: number
  assetMaintenanceRepetitionName: string
  actions?: string
}

export type AssetMaintenanceRepetitionPaginator =
  PaginationResponse<AssetMaintenanceRepetitionList>
