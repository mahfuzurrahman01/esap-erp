import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ForecastReviewAnalytics {
  id?: number
  sl?: number
  sku?: string
  productName?: string
  forecastPeriod?: string
  currentSalesData?: number
  plannedSalesTarget?: number
  demandVariationPercentage?: number
}

export interface ForecastReviewAnalyticsQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
  forecastPeriod?: string
}

export type ForecastReviewAnalyticsPaginator =
  PaginatedResponse<ForecastReviewAnalytics>
