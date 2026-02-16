import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ProductInput {
  id?: number
  productCategoryId?: number
  itemUnitId?: number
  companyId?: number
  companyName?: string
  assetCategoryId?: number
  assetCategoryName?: string
  productCode?: string
  productName?: string
  productType?: string
  cost?: number
  isFixedAsset?: boolean
  purchasePrice?: number
  sellingPrice?: number
  purchaseTax?: number
  salesTax?: number
  discount?: number
  description?: string
  avatarFile?: string
  status?: boolean
}

export interface Product {
  createdDate?: string
  updatedDate?: string
  id?: number
  productCode?: string
  productName?: string
  productCategoryId?: number
  productCategoryName?: string
  productType?: string
  cost?: number
  isFixedAsset?: boolean
  assetCategoryId?: number
  assetCategoryName?: string
  purchasePrice?: number
  sellingPrice?: number
  purchaseTax?: number
  salesTax?: number
  discount?: number
  companyId?: number
  companyName?: string
  description?: string
  status?: boolean
  avatarFile?: string
  imageUrl?: string
  itemUnitId?: number
  itemUnitName?: string
}

export interface ProductQueryOptions extends QueryOptions {
  productCode?: string
  productName?: string
  productCategoryName?: string
  productType?: string
  isFixedAsset?: string
}

export type ProductPaginator = PaginatedResponse<Product>
