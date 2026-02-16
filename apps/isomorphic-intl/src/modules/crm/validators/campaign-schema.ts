import { z } from "zod"

import { messages } from "@/config/messages"

const leadEntrySchema = z.object({
  id: z.string().optional(),
  leadId: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
})

export const campaignFormSchema = z.object({
  id: z.string().optional(),
  subject: z.string().min(1, messages.thisFieldIsRequired),
  company: z.string().min(1, messages.thisFieldIsRequired),
  service: z.string().min(1, messages.thisFieldIsRequired),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetedCost: z.any().optional(),
  primaryContact: z.string().min(1, messages.thisFieldIsRequired),
  source: z.string().min(1, messages.thisFieldIsRequired),
  type: z.string().min(1, messages.thisFieldIsRequired),
  status: z.string().optional(),
  attachment: z.any().optional(),
  leadDetails: z.array(leadEntrySchema).optional(),
})

export type CampaignCreationFormTypes = z.infer<typeof campaignFormSchema>
