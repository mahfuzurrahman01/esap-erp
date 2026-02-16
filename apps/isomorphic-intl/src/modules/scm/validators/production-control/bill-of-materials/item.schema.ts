import { z } from "zod"

import { messages } from "@/config/messages"

export const ItemSchema = z.object({
  id: z.number().optional(),
  itemCode: z.string().min(1, messages.itemCodeIsRequired),
  itemName: z.string().min(1, messages.itemNameIsRequired),
  description: z.string().min(1, messages.descriptionIsRequired),
  unitPrice: z.number().min(1, messages.itemPriceIsRequired),
})

export type ItemFormInput = z.infer<typeof ItemSchema>
