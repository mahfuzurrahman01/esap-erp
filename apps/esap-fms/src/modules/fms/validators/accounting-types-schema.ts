import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const accountingTypesFormSchema = z.object({
  id: z.number().optional(),
  accountingTypeName: z
    .string()
    .min(1, { message: messages.accountingTypeNameIsRequired }),
  accountingTypeCode: z.string().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type AccountingTypesFormInput = z.infer<typeof accountingTypesFormSchema>
