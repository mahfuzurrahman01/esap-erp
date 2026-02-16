import { z } from "zod"

import { messages } from "@/config/messages"

export const StockReplenishmentApprovalSchema = z.object({
  approvalStatus: z.string().min(1, messages.approvalStatus),
  approvalDate: z.string().min(1, messages.approvalDate),
  approvalNotes: z.string().optional(),
})

export type StockReplenishmentApprovalFormInput = z.infer<
  typeof StockReplenishmentApprovalSchema
>
