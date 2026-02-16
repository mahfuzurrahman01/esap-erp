import { z } from "zod"

import { messages } from "@/config/messages"

export const productFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, messages.thisFieldIsRequired),
  description: z.string().optional(),
  code: z.string().min(1, messages.thisFieldIsRequired),
  actualPrice: z.number().min(1, messages.thisFieldIsRequired),
  salePrice: z.number().optional(),
  unitCost: z.number().min(1, messages.thisFieldIsRequired),
  vat: z.number().optional(),
  discount: z.number().optional(),
  categoryId: z.string().min(1, messages.thisFieldIsRequired),
  size: z.string().optional(),
  attributeIds: z.array(z.string()).min(1, messages.thisFieldIsRequired),
  thumbnail: z.instanceof(FileList).optional(),
})

export type ProductCreateFormTypes = z.infer<typeof productFormSchema>
