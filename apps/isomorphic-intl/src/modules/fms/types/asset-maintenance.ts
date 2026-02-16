import { AssetList, CompanyList, PaginationResponse } from "./index"

export interface AssetMaintenanceQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
}

export interface AssetMaintenanceTaskList {
  id?: number
  assetMaintenanceId?: number
  assetMaintenanceTaskName?: string
  maintenanceStatus?: string | null
  maintenanceRepetition?: string | null
  assignedToId?: number
  assignedToName?: string
  nextMaintenanceDate?: string
}

export interface AssetMaintenanceList {
  id?: number
  assetMaintenanceSerialNumber?: string
  assetId: number
  asset?: AssetList | null
  assetSerialNumber?: string | null
  companyId: number
  company?: CompanyList | null
  assetMaintenanceDetails?: AssetMaintenanceTaskList[]
  comments?: string
  actions?: string
}

export type AssetMaintenancePaginator = PaginationResponse<AssetMaintenanceList>
