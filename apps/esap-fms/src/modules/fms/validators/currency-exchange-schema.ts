import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const currencyExchangeFormSchema = z.object({
  id: z.number().optional(),
  dateOfEstablishment: z.string().min(1, { message: messages.currencyDateRequired }),
  currencyFromId: z.number().min(1, {
    message: messages.currencyFromRequired,
  }),
  currencyToId: z.number().min(1, { message: messages.currencyToRequired }),
  exchangeRate: z.union([z.string(), z.number()]).optional(),
  isPurchase: z.boolean().optional(),
  isSelling: z.boolean().optional(),
})

// generate form types from zod validation schema
export type CurrencyExchangeFormInput = z.infer<
  typeof currencyExchangeFormSchema
>
