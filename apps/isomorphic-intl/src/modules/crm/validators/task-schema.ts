import { messages } from "@/config/messages"
import { z } from "zod"

export const taskFormSchema = z.object({
  id: z.string().optional(),
  subject: z.string().min(1, messages.thisFieldIsRequired),
  priority: z.string().optional(),
  ticketId: z.string().min(1, messages.thisFieldIsRequired),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  endDate: z.string().optional(),
  repeatDate: z.string().optional(),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  status: z.string().optional(),
  file: z.instanceof(File).nullable().optional(),
  reminder: z.boolean().optional(),
  campaignId: z.string().optional(),
  leadId: z.string().optional(),
  opportunityId: z.string().optional(),
  salesOrdersId: z.string().optional(),
  invoiceId: z.string().optional(),
  quotationId: z.string().optional(),
})

export type TaskCreationFormTypes = z.infer<typeof taskFormSchema>
