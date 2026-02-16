import { z } from "zod"

import { messages } from "@/config/messages"

export const ProductCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, messages.nameIsRequired),
  description: z.string().optional(),
  remarks: z.string().optional(),
  imageUrl: z.string().url().optional(),
})

export type ProductCategoryFormInput = z.infer<typeof ProductCategorySchema>
