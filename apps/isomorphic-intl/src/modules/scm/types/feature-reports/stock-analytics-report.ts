import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface StockAnalyticsReport {
  id?: string
  sl?: number
  sku?: string
  productName?: string
  stockValuationMethod?: string
  quantity?: number
}

export interface StockAnalyticsReportQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
}

export type StockAnalyticsReportPaginator =
  PaginatedResponse<StockAnalyticsReport>
