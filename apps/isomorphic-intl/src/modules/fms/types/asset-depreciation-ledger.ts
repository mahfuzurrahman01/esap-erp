import { PaginationResponse, QueryOptions } from "./index"

export interface AssetDepreciationLedgerQueryOptions extends QueryOptions {
  startDate?: string
  endDate?: string
  companyId?: number | string
  assetId?: number | string
  assetCategoryId?: number | string
  assetLocationId?: number | string
}

export interface AssetDepreciationLedgerList {
  sl: number
  assetDepreciationCode: string
  purchaseDate: string
  depreciationDate: string
  scheduleDate: string
  purchaseAmount: number
  depreciationAmount: number
  accumulatedDepreciationAmount: number
  companyName: string
  assetCategory: string
  assetLocation: string
}

export type AssetDepreciationLedgerPaginator =
  PaginationResponse<AssetDepreciationLedgerList>
