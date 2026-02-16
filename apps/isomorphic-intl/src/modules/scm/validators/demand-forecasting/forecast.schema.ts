import { z } from "zod"

import { messages } from "@/config/messages"

export const ForecastSchema = z.object({
  inventoryId: z.number().min(1, messages.inventoryIdIsRequired),
  productId: z.number().optional(),
  forecastPeriod: z.string().min(1, messages.forecastPeriodIsRequired),
  forecastMethod: z.string().min(1, messages.forecastMethodIsRequired),
  pastSalesData: z.string().min(1, messages.pastSalesDataIsRequired),
  historicalLeadTime: z.string().min(1, messages.historicalLeadTimeIsRequired),
  forecastedDemand: z.string().min(1, messages.forecastedDemandIsRequired),
  confidenceInterval: z.number().optional(),
  forecastAdjustments: z.string().optional(),
  seasonalityAdjustments: z.string().optional(),
  notes: z.string().optional(),
})

export type ForecastFormInput = z.infer<typeof ForecastSchema>
