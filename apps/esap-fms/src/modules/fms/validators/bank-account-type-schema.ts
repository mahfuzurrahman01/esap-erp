import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const bankAccountTypeFormSchema = z.object({
  id: z.number().optional(),
  bankAccountTypeName: z
    .string()
    .min(1, { message: messages.bankAccountTypeIsRequired }),
})

// generate form types from zod validation schema
export type BankAccountTypeFormInput = z.infer<typeof bankAccountTypeFormSchema>
