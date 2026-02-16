import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const zatcaCategoryFormSchema = z.object({
  id: z.number().optional(),
  zatcaCategoryName: z
    .string()
    .min(1, { message: messages.zatcaCategoryNameRequired }),
  actions: z.string().optional(),
})

// generate form types from zod validation schema
export type zatcaCategoryFormInput = z.infer<typeof zatcaCategoryFormSchema>
