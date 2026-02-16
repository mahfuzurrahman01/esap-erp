import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const budgetAgainstFormSchema = z.object({
  id: z.number().optional(),
  budgetAgainstName: z
    .string()
    .min(1, { message: messages.budgetAgainstNameRequired }),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type BudgetAgainstFormInput = z.infer<typeof budgetAgainstFormSchema>
