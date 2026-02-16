import { z } from "zod"

import { messages } from "@/config/messages"

export const settingFormSchema = z.object({
  appCompanyName: z.string().min(1, messages.thisFieldIsRequired),
  defaultEmail: z
    .string()
    .email(messages.invalidEmail)
    .min(1, messages.thisFieldIsRequired),
  mobile: z.string().optional(),
  currency: z.any().optional(),
  street: z.string().optional(),
  house: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  defaultInvoiceTerms: z.string().optional(),
})

export type SettingFormTypes = z.infer<typeof settingFormSchema>
