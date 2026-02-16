import { z } from "zod"

import { messages } from "@/config/messages"

export const leaveTypeSchema = z.object({
  id: z.number().optional(),
  leaveTypeName: z.string().min(1, { message: messages.nameIsRequired }),
  description: z.string().optional(),
})

export type LeaveTypePostData = z.infer<typeof leaveTypeSchema>
export type LeaveTypePutData = Partial<LeaveTypePostData>
