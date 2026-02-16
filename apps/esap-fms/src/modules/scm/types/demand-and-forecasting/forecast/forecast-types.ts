import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Forecast {
  id?: number
  inventoryId?: number
  sku?: string
  productId?: number
  productName?: string
  forecastPeriod?: string
  forecastMethod?: string
  pastSalesData?: string
  historicalLeadTime?: string
  forecastedDemand?: string
  confidenceInterval?: number
  forecastAdjustments?: string
  seasonalityAdjustments?: string
  notes?: string
  createdDate?: string
  updatedDate?: string
}

export interface ForecastQueryOptions extends QueryOptions {
  sku?: string
  productName?: string
  forecastPeriod?: string
  pastSalesData?: string
  forecastMethod?: string
  approvalStatus?: string
}

export type ForecastPaginator = PaginatedResponse<Forecast>
