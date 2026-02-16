import { z } from "zod"

import { messages } from "@/config/messages"

export const salaryStructureFormSchema = z.object({
  salaryStructureName: z.string().min(1, { message: messages.nameRequired }),
  salaryStructureTypeId: z
    .number()
    .min(1, { message: messages.salaryStructureTypeRequired }),
  description: z.string().optional().nullable(),
  salaryRuleIds: z.array(z.number()).optional(),
})

export type SalaryStructureFormInput = z.infer<typeof salaryStructureFormSchema>

export type SalaryStructureCreateInput = SalaryStructureFormInput

export type SalaryStructureUpdateInput = SalaryStructureCreateInput & {
  id: number
}
