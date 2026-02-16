import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const accountTypeFormSchema = z.object({
  id: z.number().optional(),
  accountingTypeName: z
    .string()
    .min(1, { message: messages.accountTypeRequired }),
  parentId: z.number().optional(),
})

// generate form types from zod validation schema
export type AccountTypeFormInput = z.infer<typeof accountTypeFormSchema>
