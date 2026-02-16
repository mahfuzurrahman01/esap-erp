import { z } from "zod"

import { messages } from "@/config/messages"

export const trainingAttendanceFormSchema = z.object({
  id: z.number().optional(),
  sessionId: z.number().min(1, { message: messages.sessionIdIsRequired }),
  participantId: z
    .number()
    .min(1, { message: messages.participantIdIsRequired }),
  status: z.enum(["Present", "Absent"], {
    required_error: messages.statusRequired,
  }),
  attendanceDate: z
    .string()
    .min(1, { message: messages.attendanceDateIsRequired }),
})

export type TrainingAttendanceFormInput = z.infer<
  typeof trainingAttendanceFormSchema
>
