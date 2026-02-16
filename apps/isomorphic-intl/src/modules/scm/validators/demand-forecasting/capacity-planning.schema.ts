import { z } from "zod"

import { messages } from "@/config/messages"

export const CapacityPlanningSchema = z.object({
  inventoryId: z.number().min(1, messages.inventoryIdIsRequired),
  productId: z.number().optional(),
  supplierCapacity: z.number().min(1, messages.supplierCapacityIsRequired),
  manufacturingCapacity: z
    .number()
    .min(1, messages.manufacturingCapacityIsRequired),
  warehouseCapacity: z.number().min(1, messages.warehouseCapacityIsRequired),
  plannedProductionDate: z.string().min(1, messages.plannedProductionDateIsRequired),
  plannedProductionQuantity: z.number().min(1, messages.plannedProductionQuantityIsRequired),
})

export type CapacityPlanningFormInput = z.infer<typeof CapacityPlanningSchema>
