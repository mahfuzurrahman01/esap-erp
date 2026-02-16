import { PaginationResponse, QueryOptions } from "./index"

export interface FixedAssetRegisterQueryOptions extends QueryOptions {
  startDate?: string
  endDate?: string
  companyId?: number | string
  assetId?: number | string
  assetCategoryId?: number | string
  assetLocationId?: number | string
}

export interface FixedAssetRegisterList {
  sl: number
  assetCode: string
  assetName: string
  assetCategory: string
  status: string
  purchaseDate: string
  availableDate: string
  depreciationDate?: string
  grossPurchaseAmount: number
  assetValue: number
  location: string
  companyName: string
}

export type FixedAssetRegisterPaginator =
  PaginationResponse<FixedAssetRegisterList>
