import { Forecast } from "@/modules/scm/types/demand-and-forecasting/forecast/forecast-types"

export const defaultForecast: Forecast = {
  inventoryId: 0,
  productId: 0,
  forecastPeriod: "",
  forecastMethod: "",
  pastSalesData: "",
  historicalLeadTime: "",
  forecastedDemand: "",
  confidenceInterval: 0,
  forecastAdjustments: "",
  seasonalityAdjustments: "",
  notes: "",
}
