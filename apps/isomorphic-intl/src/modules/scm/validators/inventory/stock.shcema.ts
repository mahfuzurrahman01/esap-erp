import { z } from "zod"

import { messages } from "@/config/messages"

// Zod validation schema for Stock
export const StockSchema = z.object({
  warehouseId: z.number().min(1, messages.warehouseIdIsRequired),
  productId: z.number().min(1, messages.productIsRequired),
  currentQuantity: z.number().min(1, messages.currentQuantityIsRequired),
  reorderLevel: z.number().min(1, messages.reorderLevelIsRequired),
  reorderQuantity: z.number().min(1, messages.reorderQuantityIsRequired),
  stockValuationMethod: z.string().min(1, messages.stockValuationMethodIsRequired),
  entryType: z.string().min(1, messages.entryTypeRequired),
  status: z.string().min(1, messages.statusIsRequired),
  unitStockValue: z.number().optional(),
  totalStockValue: z.number().optional(),
})

// generate form types from zod validation schema
export type StockFormInput = z.infer<typeof StockSchema>
