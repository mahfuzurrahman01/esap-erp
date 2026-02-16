import { z } from "zod"

import { messages } from "@/config/messages"

export const termsAndConditionsFormSchema = z.object({
  id: z.number().optional(),
  termsAndConditionName: z
    .string()
    .min(1, { message: messages.nameIsRequired }),
  isDisabled: z.boolean().default(false).optional(),
  isSelling: z.boolean().optional(),
  isBuying: z.boolean().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  actions: z.string().optional(),
})

export type TermsAndConditionsFormInput = z.infer<
  typeof termsAndConditionsFormSchema
>
