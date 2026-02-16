import { z } from "zod"

export const FreightSchema = z.object({
  shipmentId: z.number().optional(),
  carrierId: z.number().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  routeStart: z.string().optional(),
  routeEnd: z.string().optional(),
  transitCost: z.number().optional(),
})

export type FreightFormInput = z.infer<typeof FreightSchema>
