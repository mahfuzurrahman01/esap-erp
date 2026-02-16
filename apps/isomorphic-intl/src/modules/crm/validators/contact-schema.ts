import { z } from "zod"

import { messages } from "@/config/messages"

export const contactFormSchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  subject: z.string().min(1, messages.thisFieldIsRequired),
  location: z.string().optional(),
  contactDate: z.string().optional(),
  contactTime: z.string().optional(),
  relatedTo: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  duration: z.string().optional(),
  file: z.any().optional(),
  campaignId: z.string().optional(),
  leadId: z.string().optional(),
  opportunityId: z.string().optional(),
  salesOrdersId: z.string().optional(),
  invoiceId: z.string().optional(),
  quotationId: z.string().optional(),
})

export type ContactCreationFormTypes = z.infer<typeof contactFormSchema>
