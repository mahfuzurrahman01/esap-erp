import { z } from "zod"

import { messages } from "@/config/messages"

export const approvalSchema = z.object({
  requestId: z.number().optional(),
  status: z.string().min(1, messages.statusIsRequired),
})

export type ApprovalFormSchema = z.infer<typeof approvalSchema>
