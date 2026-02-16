import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Stock {
  id?: number
  sku?: string
  productCode?: string
  warehouseId?: number
  warehouseName?: string
  productId?: number
  currentQuantity?: number
  reorderLevel?: number
  stockValuationMethod?: string
  productName?: string
  stockLocation?: string
  reorderQuantity?: number
  serialNumber?: string
  adjustmentType?: number
  entryType?: string
  quantity?: number
  unitStockValue?: number
  totalStockValue?: number
  status?: string
  createdDate?: string
  updatedDate?: string
}

export interface StockAdjustment {
  productId?: number
  adjustmentType?: number
  quantity?: number
}

export interface StockQueryOptions extends QueryOptions {
  productName?: string
  stockLocation?: string
  currentQuantity?: string
}

export type StockPaginator = PaginatedResponse<Stock>
