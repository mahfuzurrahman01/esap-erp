import { z } from "zod"

import { messages } from "@/config/messages"

export const leaveAllocationSchema = z
  .object({
    id: z.number().optional(),
    employeeId: z.number().min(1, { message: messages.employeeIsRequired }),
    leaveTypeId: z
      .number({ message: messages.pleaseSelectLeaveType })
      .min(1, { message: messages.pleaseSelectLeaveType }),
    validFrom: z.string().min(1, { message: messages.pleaseSelectStartDate }),
    validTo: z.string().min(1, { message: messages.pleaseSelectEndDate }),
    totalDays: z.number().min(1, { message: messages.totalDaysIsRequired }),
    remainingDays: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.validFrom && data.validTo && data.validFrom > data.validTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: messages.startDateCannotBeGreaterThanEndDate,
      })
    }
  })

export type LeaveAllocationInput = z.infer<typeof leaveAllocationSchema>
export type LeaveAllocationPostData = Omit<LeaveAllocationInput, "id">
export type LeaveAllocationPutData = Partial<LeaveAllocationInput> & {
  id: number
}
