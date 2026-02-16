import { z } from "zod"

import { messages } from "@/config/messages"

export const meetingFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, messages.thisFieldIsRequired),
  location: z.string().optional(),
  meetingDate: z.string().optional(),
  meetingTime: z.string().min(1, messages.thisFieldIsRequired),
  repeatDate: z.string().optional(),
  repeatTime: z.string().optional(),
  relatedTo: z.string().min(1, messages.thisFieldIsRequired),
  description: z.string().optional(),
  participateType: z.string().optional(),
  participantIds: z.array(z.string()).min(1, messages.thisFieldIsRequired),
  reminder: z.boolean().optional(),
  repeat: z.boolean().optional(),
  campaignId: z.string().optional(),
  leadId: z.string().optional(),
  opportunityId: z.string().optional(),
  salesOrdersId: z.string().optional(),
  invoiceId: z.string().optional(),
  quotationId: z.string().optional(),
})

export type MeetingCreationFormTypes = z.infer<typeof meetingFormSchema>
