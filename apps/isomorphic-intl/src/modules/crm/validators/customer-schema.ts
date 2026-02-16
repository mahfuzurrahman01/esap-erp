import { z } from "zod"

import { messages } from "@/config/messages"

export const customerFormSchema = z.object({
  firstName: z.string().min(1, messages.thisFieldIsRequired),
  lastName: z.string().optional(),
  email: z.string().min(1, messages.thisFieldIsRequired),
  phone: z.number().min(1, messages.thisFieldIsRequired),
  street: z.string().optional(),
  house: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  description: z.string().optional(),
  accountNo: z.string().optional(),
  bankName: z.string().optional(),
  currencyId: z.number().min(1, messages.thisFieldIsRequired),
  paymentTerms: z.any().optional(),
  chartOfAccountId: z.number().optional(),
  company: z.any().optional(),
  country: z.number().min(1, messages.thisFieldIsRequired),
  photo: z.any().optional(),
  coverPhoto: z.any().optional(),
  nid: z.any().optional(),
  passport: z.any().optional(),
  residencePermitNo: z.any().optional(),
  drivingLicense: z.any().optional(),
})

export type CustomerFormTypes = z.infer<typeof customerFormSchema>
