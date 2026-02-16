import { z } from "zod"

import { messages } from "@/config/messages"

export const offDaySchema = z.object({
  id: z.number().optional(),
  offDayName: z.string().min(1, { message: messages.nameIsRequired }),
  leaveTypeId: z
    .number({ message: messages.pleaseSelectLeaveType })
    .min(1, { message: messages.pleaseSelectLeaveType }),
  dateFrom: z.string().min(1, { message: messages.pleaseSelectStartDate }),
  dateTo: z.string().min(1, { message: messages.pleaseSelectEndDate }),
  description: z.string().optional(),
})

export type OffDayFormInput = z.infer<typeof offDaySchema>
export type OffDayPostData = Omit<OffDayFormInput, "id">
export type OffDayPutData = Partial<OffDayFormInput> & { id: number }
