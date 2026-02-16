import {
  AssetCategoryList,
  AssetLocationList,
  CompanyList,
  PaginationResponse,
  QueryOptions,
} from "./index"

export interface AssetQueryOptions extends QueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
  assetCategoryId?: number | string
  assetLocationId?: number | string
  maintainerId?: number | string
  departmentId?: number | string
  departmentName?: string
  financeBookId?: number | string
  financeBookName?: string
  assetStatusId?: number | string
  assetStatusName?: string
}

export interface AssetList {
  id?: number
  assetName?: string | null
  assetSerialNumber?: string | null
  productId: number
  productName?: string | null
  companyId: number
  company?: CompanyList | null
  assetCategoryId: number
  assetCategory?: AssetCategoryList | null
  assetLocationId?: number | null
  assetLocation?: AssetLocationList | null
  assetOwnerName?: string | null
  maintainerId?: number | null
  maintainerName?: string | null
  departmentId?: number | null
  departmentName?: string | null
  isExistingAsset?: boolean | null
  isCompositeAsset?: boolean | null
  purchaseDate?: string | null
  purchaseReceiptId?: number | null
  purchaseReceiptNumber?: string | null
  purchaseInvoiceId?: number | null
  purchaseInvoiceNo?: string | null
  availableForUseDate: string | null
  grossPurchaseAmount: number | string | null
  assetQuantity: number | string | null
  isCalculatedDepreciation?: boolean | null
  openingAccumulatedDepreciation?: number | string | null
  openingNumberOfBookDepreciation?: number | string | null
  isFullyDepreciated?: boolean | null
  financeBookId?: number | null
  financeBookName?: string | null
  depreciationMethod?: string | null
  totalDepreciationPeriod?: number | string | null
  frequencyOfDepreciation?: number | string | null
  depreciationStartDate?: string | null
  expectedResidualValue?: number | string | null
  insurancePolicyNumber?: string | null
  insuranceCompanyName?: string | null
  insurancePolicyStartDate?: string | null
  insurancePolicyEndDate?: string | null
  insuranceAmount?: number | string | null
  isMaintenanceRequired?: boolean | null
  assetStatus?: string | null
  assetImageUrl?: string | null
  assetImageFile?: File | string | null
  actions?: string | null
}

export type AssetPaginator = PaginationResponse<AssetList>
