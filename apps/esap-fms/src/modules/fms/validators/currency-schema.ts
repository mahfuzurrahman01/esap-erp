import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const currencyFormSchema = z.object({
  id: z.number().optional(),
  currencyName: z.string().min(1, { message: messages.currency }),
  symbol: z.string().optional(),
  fraction: z.string().optional(),
  units: z.string().optional(),
  smallValue: z.string().optional(),
  numberFormat: z.string().optional(),
})

// generate form types from zod validation schema
export type CurrencyFormInput = z.infer<typeof currencyFormSchema>
