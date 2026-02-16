import { z } from "zod"

import { messages } from "@/config/messages"

export const jobPositionFormSchema = z.object({
  id: z.number().optional(),
  jobPositionName: z
    .string()
    .min(1, { message: messages.jobPositionNameIsRequired }),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
  description: z.string().optional(),
})

// generate form types from zod validation schema
export type JobPositionFormInput = z.infer<typeof jobPositionFormSchema>

export type JobPositionPostData = z.infer<typeof jobPositionFormSchema>

export type JobPositionPutData = Partial<JobPositionPostData> & {
  id: number
}
