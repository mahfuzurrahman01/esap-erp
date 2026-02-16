import {
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface MonthlyForecast {
  id?: number
  sl: number
  month: string
  forecastedDemand: number
  pastSalesData: number
}

export interface MonthlyForecastQueryOptions extends QueryOptions {
  forecastYear?: string
}

