import * as z from "zod"

import { messages } from "@/config/messages"

export const resumeTypeFormSchema = z.object({
  id: z.number().optional(),
  resumeTypeName: z.string().min(1, { message: messages.nameIsRequired }),
  description: z.string().optional(),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

export type ResumeTypeFormInput = z.infer<typeof resumeTypeFormSchema>
export type ResumeTypePutDataType = Partial<ResumeTypeFormInput> & {
  id: number
}
