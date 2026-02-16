import { z } from "zod"

import { messages } from "@/config/messages"

export const approvalLeaveSchema = z.object({
  id: z.number().optional(),
  status: z.string().min(1, messages.statusIsRequired),
})

export type ApprovalLeaveFormSchema = z.infer<typeof approvalLeaveSchema>
