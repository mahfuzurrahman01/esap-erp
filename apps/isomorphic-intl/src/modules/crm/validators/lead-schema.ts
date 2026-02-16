import { z } from "zod"

import { messages } from "@/config/messages"

export const leadFormSchema = z.object({
  campaignId: z.string().optional(),
  id: z.string().optional(),
  firstName: z.string().min(1, messages.thisFieldIsRequired),
  lastName: z.string().optional(),
  email: z
    .string()
    .email(messages.invalidEmail)
    .min(1, messages.thisFieldIsRequired),
  phone: z.string().min(1, messages.thisFieldIsRequired),
  address: z.string().optional(),
  customerId: z.string().optional(),
  company: z.string().optional(),
  owner: z.string().optional(),
  region: z.string().optional(),
  rating: z.number().optional(),
  cost: z.number().optional(),
  industry: z.string().min(1, messages.thisFieldIsRequired),
  title: z.string().min(1, messages.thisFieldIsRequired),
  satisfiestatus: z.number().optional(),
  description: z.string().optional(),
  status: z.string().min(1, messages.thisFieldIsRequired),
  street: z.string().optional(),
  house: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  countryId: z.any().optional(),
  fax: z.string().optional(),
  leadSource: z.string().optional(),
  website: z.string().optional(),
  noOfEmployees: z.any().optional(),
  annualRevenue: z.any().optional(),
  skypeId: z.string().optional(),
  secondaryEmail: z.string().optional(),
  twitter: z.string().optional(),
})

export type LeadFormTypes = z.infer<typeof leadFormSchema>
