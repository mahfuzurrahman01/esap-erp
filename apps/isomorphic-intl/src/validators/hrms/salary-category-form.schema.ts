import { z } from "zod"

import { messages } from "@/config/messages"

export const salaryCategoryFormSchema = z.object({
  salaryCategoryName: z.string().min(1, { message: messages.nameRequired }),
  code: z.string().min(1, { message: messages.codeRequired }),
  description: z.string().optional(),
  transactionType: z.enum(["Debit", "Credit"], {
    required_error: messages.transactionTypeRequired,
  }),
})

export type SalaryCategoryFormInput = z.infer<typeof salaryCategoryFormSchema>
