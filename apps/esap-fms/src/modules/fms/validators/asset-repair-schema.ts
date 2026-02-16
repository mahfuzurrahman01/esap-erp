import { z } from "zod"

import { messages } from "@/config/messages"

export const assetRepairFormSchema = z.object({
  id: z.number().optional(),
  assetRepairSerialNumber: z.string().optional(),
  assetId: z.number().min(1, {
    message: messages.assetIdRequired,
  }),
  companyId: z.number().min(1, {
    message: messages.companyIdIsRequired,
  }),
  failureDate: z.string().min(1, { message: messages.failureDateRequired }),
  completionDate: z.string().optional(),
  repairDate: z.string().optional(),
  purchaseInvoiceNo: z.string().min(1, {
    message: messages.purchaseInvoiceNumberRequired,
  }),
  expenseAccountId: z.number().min(1, {
    message: messages.expenseAccountIdRequired,
  }),
  repairCost: z.number().optional(),
  repairDescription: z.string().optional(),
  repairStatus: z.string(),
})

export type AssetRepairFormInput = z.infer<typeof assetRepairFormSchema>
