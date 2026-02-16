import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const bankFormSchema = z.object({
  id: z.number().optional(),
  bankName: z.string().min(1, { message: messages.bankNameIsRequired }),
  bankWebsite: z.string().optional(),
  swiftCode: z.string().optional(),
  routingNumber: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
})

// generate form types from zod validation schema
export type BankFormInput = z.infer<typeof bankFormSchema>
