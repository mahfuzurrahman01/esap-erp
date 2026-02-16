import { z } from "zod"

import { messages } from "@/config/messages"

export const leaveRequestFormSchema = z.object({
  id: z.number().optional(),
  employeeId: z
    .number()
    .min(1, { message: messages.employeeIsRequired })
    .optional(),
  leaveTypeId: z
    .number({ message: messages.pleaseSelectLeaveType })
    .min(1, { message: messages.pleaseSelectLeaveType }),
  startDate: z.string().min(1, { message: messages.pleaseSelectStartDate }),
  endDate: z.string().min(1, { message: messages.pleaseSelectEndDate }),
  status: z.string().optional(),
  description: z.string().optional(),
  duration: z.number(),
})

export type LeaveRequestFormInput = z.infer<typeof leaveRequestFormSchema>
export type LeaveRequestPostData = LeaveRequestFormInput
export type LeaveRequestPutData = Partial<LeaveRequestPostData> & {
  id: number
}
