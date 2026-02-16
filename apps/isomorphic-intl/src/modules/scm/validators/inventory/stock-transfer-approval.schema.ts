import { z } from "zod"

import { messages } from "@/config/messages"

export const StockTransferApprovalSchema = z.object({
  approvalStatus: z.string().min(1, messages.approvalStatusIsRequired),
  approvalDate: z.string().min(1, messages.approvalDateIsRequired),
  approvalNotes: z.string().optional(),
})

export type StockTransferApprovalFormInput = z.infer<
  typeof StockTransferApprovalSchema
>
