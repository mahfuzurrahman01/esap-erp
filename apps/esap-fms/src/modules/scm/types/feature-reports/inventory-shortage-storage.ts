import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface InventoryShortageStorage {
  id?: number
  sl?: number
  warehouse?: string
  sku?: string
  productName?: string
  status?: string
  reorderQuantity?: number
  actualQuantity?: number
}

export interface InventoryShortageStorageQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
  warehouse?: string
}

export type InventoryShortageStoragePaginator =
  PaginatedResponse<InventoryShortageStorage>
