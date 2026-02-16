import * as z from "zod"

import { messages } from "@/config/messages"

export const employeeTypeFormSchema = z.object({
  id: z.number().optional(),
  employeeTypeName: z.string().min(1, { message: messages.nameIsRequired }),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

export type EmployeeTypeFormInput = z.infer<typeof employeeTypeFormSchema>

export type EmployeeTypePostData = EmployeeTypeFormInput
export type EmployeeTypePutData = Partial<EmployeeTypePostData> & { id: number }
