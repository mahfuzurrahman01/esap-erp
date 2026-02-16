import { z } from "zod";



import { messages } from "@/config/messages";





// Define Zod schema for stockTransferDetails
export const stockTransferDetailsSchema = z
  .object({
    inventoryId: z.number().optional(),
    productId: z.number().optional(),
    quantity: z.number().min(1, messages.quantityIsRequired),
    currentStock: z.number().min(1, messages.currentStockIsRequired),
  })
  .refine(
    (data) => {
      const quantity = Number(data.quantity) || 0
      const currentStock = Number(data.currentStock) || 0
      return quantity > 0 && quantity <= currentStock
    },
    {
      message:
        "Quantity must be greater than zero and cannot exceed current stock",
      path: ["quantity"],
    }
  )

// Define Zod schema for StockTransfer
export const stockTransferSchema = z.object({
  transferToWarehouseId: z
    .number()
    .min(1, messages.transferToWarehouseIdIsRequired),
  transferFromWarehouseId: z
    .number()
    .min(1, messages.transferFromWarehouseIdIsRequired),
  // status: z.string().optional(),
  transferDate: z.string().min(1, messages.transferDateIsRequired),
  stockTransferDetails: z.array(stockTransferDetailsSchema),
})

export type StockTransferFormInput = z.infer<typeof stockTransferSchema>