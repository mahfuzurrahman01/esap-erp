import { z } from "zod"

import { messages } from "@/config/messages"

export const departmentFormSchema = z.object({
  id: z.number().optional(),
  departmentName: z
    .string()
    .min(1, { message: messages.departmentNameIsRequired }),
  color: z.string().optional(),
  managerId: z.number().nullable().optional(),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

// generate form types from zod validation schema
export type DepartmentFormInput = z.infer<typeof departmentFormSchema>

export type DepartmentPostData = z.infer<typeof departmentFormSchema>

export type DepartmentPutData = Partial<DepartmentPostData> & {
  id: number
}
