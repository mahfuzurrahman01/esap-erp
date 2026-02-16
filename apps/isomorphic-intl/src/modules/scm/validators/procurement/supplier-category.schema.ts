import { z } from "zod"

import { messages } from "@/config/messages"

export const supplierCategorySchema = z.object({
  name: z.string().min(1, messages.nameIsRequired),
  description: z.string().min(1, messages.descriptionIsRequired),
})

export type SupplierCategorySchemaInput = z.infer<typeof supplierCategorySchema>
