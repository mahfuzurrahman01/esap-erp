import { SalesOperationPlan } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"

export const defaultSalesOperationPlan: SalesOperationPlan = {
  id: 0,
  forecastId: 0,
  inventoryId: 0,
  productId: 0,
  salesDataIntegration: "",
  forecastPeriod: "",
  currentSalesData: 0,
  adjustedForecast: 0,
  plannedSalesTarget: 0,
  demandVariationPercentage: 0,
  approvalStatus: "",
}
