import { COAList, PaginationResponse } from "./index"

export interface AssetCategoryQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
  companyId?: number
}

export interface AssetCategoryList {
  id?: number
  assetCategoryName: string
  fixedAssetAccountId: number
  fixedAssetAccount?: COAList | null
  actions?: string
}

export type AssetCategoryPaginator = PaginationResponse<AssetCategoryList>
