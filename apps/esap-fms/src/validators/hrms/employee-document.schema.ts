import * as z from "zod"

import { messages } from "@/config/messages"

export const employeeDocumentSchema = z.object({
  employeeId: z.number().optional(),
  documentName: z.string().min(1, { message: messages.nameIsRequired }),
  document: z.any().optional(),
})

export type EmployeeDocumentInputType = z.infer<typeof employeeDocumentSchema>
