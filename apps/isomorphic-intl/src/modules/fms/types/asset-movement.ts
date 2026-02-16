import { AssetLocationList, CompanyList, PaginationResponse, AssetList } from "./index"

export interface AssetMovementQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  companyId?: number | string
}

export interface AssetMovementList {
  id?: number
  assetMovementSerialNumber?: string
  companyId: number
  company?: CompanyList | null
  transactionDate: string
  purposeOfMovement: string
  assetId: number
  asset?: AssetList | null
  assetSerialNumber?: string
  assetLocationId?: number
  assetLocation?: AssetLocationList | null
  fromEmployeeId?: number
  fromEmployeeName?: string
  toEmployeeId?: number
  toEmployeeName?: string
  targetedLocationId?: number
  targetedLocationName?: string
  actions?: string
}

export type AssetMovementPaginator = PaginationResponse<AssetMovementList>
