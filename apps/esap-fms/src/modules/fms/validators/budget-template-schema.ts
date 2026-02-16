import { z } from "zod"

import { messages } from "@/config/messages"

export const budgetTemplateFormSchema = z.object({
  id: z.number().optional(),
  budgetDistributionName: z
    .string()
    .min(1, { message: messages.budgetDistributionNameRequired }),
  // budgetDistributionDetails: z.array(budgetTemplateDetailSchema),
})

export type BudgetTemplateFormInput = z.infer<typeof budgetTemplateFormSchema>
