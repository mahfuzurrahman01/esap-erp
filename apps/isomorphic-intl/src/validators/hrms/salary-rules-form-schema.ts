import { z } from "zod"

import { messages } from "@/config/messages"

export const salaryRuleFormSchema = z
  .object({
    salaryRuleName: z.string().min(1, { message: messages.nameRequired }),
    salaryCategoryId: z
      .number()
      .min(1, { message: messages.salaryCategoryRequired }),
    sequence: z.string().min(1, { message: messages.sequenceRequired }),
    computationType: z.enum(["FixedAmount", "Formula", "Percentage"] as const),
    amount: z.number().optional().nullable(),
    formula: z.string().optional().nullable(),
    isActive: z.boolean(),
    quantity: z.number().optional().nullable(),
    description: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.computationType === "FixedAmount") {
        return data.amount !== undefined && data.amount !== null
      }
      if (data.computationType === "Formula") {
        return (
          data.formula !== undefined &&
          data.formula !== null &&
          data.formula.length > 0
        )
      }
      return true
    },
    {
      message: messages.amountOrFormulaRequired,
      path: ["amount"],
    }
  )

export type SalaryRuleFormInput = z.infer<typeof salaryRuleFormSchema>
