import { z } from "zod"

import { messages } from "@/config/messages"

export const resumeSchema = z.object({
  id: z.number().optional(),
  resumeName: z.string().min(1, { message: messages.resumeNameIsRequired }),
  employeeId: z.number().optional(),
  startDate: z.union([z.string(), z.null()]),
  endDate: z.union([z.string(), z.null()]).optional(),
  description: z.string().optional(),
  resumeTypeId: z
    .number({ message: messages.resumeTypeIsRequired })
    .min(1, { message: messages.resumeTypeIsRequired }),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

export const addResumeSchema = resumeSchema.extend({
  resumeName: z.string().min(1, { message: messages.resumeNameIsRequired }),
  startDate: z.date({ message: messages.startDateIsRequired }),
  resumeTypeId: z
    .number({ message: messages.resumeTypeIsRequired })
    .min(1, { message: messages.resumeTypeIsRequired }),
})

export type ResumeFormInputType = z.infer<typeof resumeSchema>
