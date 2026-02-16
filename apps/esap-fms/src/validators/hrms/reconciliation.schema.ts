import { z } from "zod"

import { messages } from "@/config/messages"

export const reconciliationFormSchema = z.object({
  id: z.number().optional(),
  status: z.string().optional(),
  attendanceId: z.number().min(0, { message: messages.employeeIdIsRequired }),
  requestedCheckOut: z.string().min(1, { message: messages.newTimeRequired }),
  reason: z
    .string()
    .min(1, { message: messages.reconciliationReasonIsRequired }),
  // will be adjusted later according to the requirement
})

// generate form types from zod validation schema
export type ReconciliationFormInput = z.infer<typeof reconciliationFormSchema>

export type ReconciliationPostData = ReconciliationFormInput

export type ReconciliationPutData = Partial<ReconciliationPostData> & {
  id: number
}
