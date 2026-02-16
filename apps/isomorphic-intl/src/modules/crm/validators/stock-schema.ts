import { z } from "zod"

import { messages } from "@/config/messages"

export const stockFormSchema = z.object({
  id: z.string().optional(),
  productId: z.string().min(1, messages.thisFieldIsRequired),
  stockQuantity: z.number().min(1, messages.thisFieldIsRequired),
  warehouseId: z.string().min(1, messages.thisFieldIsRequired),
  status: z.string().optional(),
})

export type StockFormTypes = z.infer<typeof stockFormSchema>
