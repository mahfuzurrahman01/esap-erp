import { z } from "zod"

export const StockAdjustmentSchema = z.object({
  productId: z.number().optional(),
  adjustmentType: z.number().optional(),
  quantity: z.number().optional(),
})

export type StockAdjustmentFormInput = z.infer<typeof StockAdjustmentSchema>
