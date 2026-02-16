import { z } from "zod"

export const leaveTypeFormSchema = z.object({
  id: z.number().optional(),
  leaveTypeName: z.string().min(1, { message: "Leave type name is required" }),
  description: z.string().optional(),
})

// generate form types from zod validation schema
export type LeaveTypeFormInput = z.infer<typeof leaveTypeFormSchema>

export type LeaveTypePostData = z.infer<typeof leaveTypeFormSchema>

export type LeaveTypePutData = Partial<LeaveTypePostData> & {
  id: number
}
