import { z } from "zod"

import { messages } from "@/config/messages"

export const trainingProgramFormSchema = z.object({
  id: z.number().optional(),
  trainingProgramName: z.string().min(1, { message: messages.nameRequired }),
  description: z.string().optional(),
  startDate: z.string().min(1, { message: messages.startDateIsRequired }),
  endDate: z.string().min(1, { message: messages.endDateIsRequired }),
  status: z.enum(["Scheduled", "Completed", "Cancelled"], {
    required_error: messages.statusRequired,
  }),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
  companyName: z.string().min(1, { message: messages.companyIsRequired }),
  coordinatorId: z.number().min(1, { message: messages.coordinatorIsRequired }),
})

export type TrainingProgramFormInput = z.infer<typeof trainingProgramFormSchema>

export const trainingProgramQuerySchema = z.object({
  search: z.string().optional(),
  pageSize: z.number().optional(),
  pageIndex: z.number().optional(),
  status: z.enum(["Scheduled", "Completed", "Cancelled"]).optional(),
})

export type TrainingProgramQueryInput = z.infer<
  typeof trainingProgramQuerySchema
>
