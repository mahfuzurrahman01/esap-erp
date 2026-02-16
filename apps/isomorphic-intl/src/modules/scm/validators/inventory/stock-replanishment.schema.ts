import { messages } from "@/config/messages"
import { z } from "zod"



export const StockReplenishmentSchema = z.object({
  inventoryId: z.number().min(1, messages.inventoryIdIsRequired),
  supplierId: z.number().min(1, messages.supplierIdIsRequired),
  productId: z.number().optional(),
  replenishmentQty: z.number().min(1, messages.replenishmentQtyIsRequired),
  replenishmentMethod: z.string().min(1, messages.replenishmentMethodIsRequired),
  expectedDeliveryDate: z.string().min(1, messages.expectedDeliveryDateIsRequired),
})

export type StockReplenishmentFormInput = z.infer<
  typeof StockReplenishmentSchema
>
