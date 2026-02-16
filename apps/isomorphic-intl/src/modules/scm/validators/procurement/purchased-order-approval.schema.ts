import { z } from "zod"

import { messages } from "@/config/messages"

export const purchasedOrderApprovalSchema = z.object({
  purchaseOrderId: z.number().optional(),
  approvedBy: z.string().optional(),
  approveNotes: z.string().optional(),
  approvalStatus: z.string().min(1, messages.approvalStatusIsRequired),
  approvedDate: z.string().min(1, messages.approvalDateIsRequired),
})

export type PurchasedOrderApprovalSchemaInput = z.infer<
  typeof purchasedOrderApprovalSchema
>
