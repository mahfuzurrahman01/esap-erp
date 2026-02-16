import { z } from "zod"

import { messages } from "@/config/messages"

export const bankClearanceFormSchema = z.object({
  id: z.number().optional(),
  paymentStatus: z.string().optional(),
  bankClearenceDate: z.string().min(1, { message: messages.dateRequired }),
  chartOfAccountId: z.number().optional(),
  bankAccountId: z.number().optional(),
})

// generate form types from zod validation schema
export type BankClearanceFormInput = z.infer<typeof bankClearanceFormSchema>
