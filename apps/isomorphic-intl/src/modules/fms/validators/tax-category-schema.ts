import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const taxCategoryFormSchema = z.object({
  id: z.number().optional(),
  taxCategoryName: z
    .string()
    .min(1, { message: messages.taxCategoryNameRequired }),
  zatcaCategoryId: z.number().optional(),
  isActive: z.boolean().optional(),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type TaxCategoryFormInput = z.infer<typeof taxCategoryFormSchema>
