import { z } from "zod"

import { messages } from "@/config/messages"

export const MaterialAvailabilityItemSchema = z.object({
  id: z.number().optional(),
  materialRequirementsPlanningId: z.number().optional(),
  inventoryId: z.number().optional(),
  itemId: z.number().optional(),
  itemUnitId: z.number().optional(),
  requiredQuantity: z.number().min(1, messages.quantityIsRequired),
  availableQuantity: z.number().min(1, messages.unitCostIsRequired),
  shortage: z.number().nonnegative().optional(),
  unitCost: z.number().nonnegative().optional(),
})

export const MaterialAvailabilitySchema = z.object({
  scheduledProductionStart: z.string().min(1, messages.scheduledFromIsRequired),
  scheduledProductionEnd: z.string().min(1, messages.scheduledToIsRequired),
  materialRequirementItems: z.array(z.any()).optional(),
})

export type MaterialAvailabilityFormInput = z.infer<
  typeof MaterialAvailabilitySchema
>
