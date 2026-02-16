import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface PurchaseOrderTrends {
  id?: string
  sl?: number
  productName?: string
  totalQty?: number
  totalAmount?: number
}

export interface PurchaseOrderTrendsQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
}

export type PurchaseOrderTrendsPaginator = PaginatedResponse<PurchaseOrderTrends>
