import { z } from "zod"

import { messages } from "@/config/messages"

export const ReturnProcessApprovalSchema = z.object({
  approvalStatus: z.string().optional(),
  approvalDate: z.string().min(1, messages.approvalDate),
  approvalNotes: z.string().optional(),
})

export type ReturnProcessApprovalFormInput = z.infer<
  typeof ReturnProcessApprovalSchema
>
