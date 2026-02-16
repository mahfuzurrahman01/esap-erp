import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface StockReplenishment {
  createdDate?: string
  updatedDate?: string
  id?: number
  inventoryId?: number
  sku?: string
  supplierId?: number
  supplierName?: string
  productId?: number
  productName?: string
  currentStock?: number
  replenishmentQty?: number
  replenishmentMethod?: string
  expectedDeliveryDate?: string
  status?: string
  approvalStatus?: string
}

export interface StockReplenishmentQueryOptions extends QueryOptions {
  productName?: string
  status?: string
}

export type StockReplenishmentPaginator = PaginatedResponse<StockReplenishment>
