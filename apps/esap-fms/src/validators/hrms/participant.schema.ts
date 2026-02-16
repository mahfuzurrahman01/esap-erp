import { z } from "zod"

import { messages } from "@/config/messages"

const participantSchema = z.object({
  employeeId: z.number().min(1, { message: messages.employeeIsRequired }),
  attendanceStatus: z.string().optional(),
  feedbackStatus: z.string().optional(),
})

export const participantFormSchema = z.object({
  id: z.number().optional(),
  trainingProgramId: z.number().min(1, { message: messages.programRequired }),
  participants: z.array(z.number()).min(1, {
    message: messages.participantsRequired,
  }),
})

export type ParticipantFormInput = z.infer<typeof participantFormSchema>
