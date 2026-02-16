import { z } from "zod"

import { messages } from "@/config/messages"

export const salaryStructureTypeFormSchema = z.object({
  salaryStructureTypeName: z
    .string()
    .min(1, { message: messages.nameRequired }),
  country: z.string().min(1, { message: messages.countryIsRequired }),
})

export type SalaryStructureTypeFormInput = z.infer<
  typeof salaryStructureTypeFormSchema
>
