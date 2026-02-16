import * as z from "zod"

import { messages } from "@/config/messages"

export const employmentTypeFormSchema = z.object({
  id: z.number().optional(),
  employmentTypeName: z.string().min(1, { message: messages.nameIsRequired }),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

export type EmploymentPostFormInput = z.infer<typeof employmentTypeFormSchema>
export type EmploymentPutDataType = Partial<EmploymentPostFormInput> & {
  id: number
}
