import { z } from "zod"

import { messages } from "@/config/messages"

export const SalesOperationPlanSchema = z.object({
  forecastId: z.number().optional(),
  inventoryId: z.number().optional(),
  productId: z.number().optional(),
  salesDataIntegration: z.string().min(1, {
    message: messages.salesDataIntegrationIsRequired,
  }),
  forecastPeriod: z.string().min(1, {
    message: messages.forecastPeriodIsRequired,
  }),
  currentSalesData: z.number().min(1, {
    message: messages.currentSalesDataIsRequired,
  }),
  adjustedForecast: z.number().min(1, {
    message: messages.adjustedForecastIsRequired,
  }),
  plannedSalesTarget: z.number().min(1, {
    message: messages.plannedSalesTargetIsRequired,
  }),
  demandVariationPercentage: z.number().min(1, {
    message: messages.demandVariationPercentageIsRequired,
  }),
})

export type SalesOperationPlanFormInput = z.infer<
  typeof SalesOperationPlanSchema
>
