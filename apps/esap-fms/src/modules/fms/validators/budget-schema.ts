import { z } from "zod"

import { messages } from "@/config/messages"

const budgetDetailSchema = z.object({
  id: z.number(),
  budgetId: z.number().optional(),
  chartOfAccountId: z
    .number()
    .min(1, { message: messages.thisFieldIsRequired }),
  budgetAmount: z.number().min(1, { message: messages.thisFieldIsRequired }),
})

export const budgetFormSchema = z.object({
  id: z.number().optional(),
  budgetName: z.string().min(3, { message: messages.budgetNameRequired }),
  budgetAgainstId: z
    .number()
    .min(1, { message: messages.budgetAgainstNameRequired }),
  companyId: z.number().min(1, { message: messages.companyRequired }),
  fiscalYearId: z.number().min(1, { message: messages.fiscalYearRequired }),
  budgetDistributionId: z
    .number()
    .min(1, { message: messages.budgetDistributionRequired }),
  costCenterId: z.number().min(1, { message: messages.thisFieldIsRequired }),
  budgetDetails: z.array(budgetDetailSchema),
  action: z.string().optional(),
})

// generate form types from zod validation schema
export type BudgetFormInput = z.infer<typeof budgetFormSchema>
