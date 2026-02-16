import { z } from "zod"

import { messages } from "@/config/messages"

export const attendanceFormSchema = z.object({
  employeeId: z.number().min(1, { message: messages.employeeIdIsRequired }),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  checkInMode: z.string().optional(),
  checkOutMode: z.string().optional(), // portal | attendance-machine
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

// generate form types from zod validation schema
export type AttendanceFormInput = z.infer<typeof attendanceFormSchema>

export type AttendancePostData = z.infer<typeof attendanceFormSchema>

export type AttendancePutData = Partial<AttendancePostData> & {
  id: number
}
