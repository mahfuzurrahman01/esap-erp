import { z } from "zod"

import { messages } from "@/config/messages"

export const trainingSessionFormSchema = z.object({
  id: z.number().optional(),
  sessionName: z.string().min(1, { message: messages.nameRequired }),
  description: z.string().optional(),
  sessionDate: z.string().min(1, { message: messages.dateIsRequired }),
  duration: z.number().min(0.5, { message: messages.durationRequired }),
  status: z.enum(["Scheduled", "Completed", "Cancelled"], {
    required_error: messages.statusRequired,
  }),

  location: z.string().min(1, { message: messages.locationRequired }),
  trainingProgramId: z.number().min(1, { message: messages.programRequired }),
  trainerId: z.number().min(1, { message: messages.trainerRequired }),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
})

export type TrainingSessionFormInput = z.infer<typeof trainingSessionFormSchema>
