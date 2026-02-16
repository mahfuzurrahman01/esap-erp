import { messages } from "@/config/messages"
import { z } from "zod"

export const billFormSchema = z.object({
  invoiceId: z.string().optional(),
  incomeCategory: z.string().optional(),
  customerId: z.string().optional(),
  issueDate: z.string().optional(),
  amount: z.number().min(1, messages.thisFieldIsRequired),
  paymentMethod: z.string().optional(),
  chartOfAccountId: z.any().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  note: z.string().optional(),
  file: z.any().optional(),
})

export type billFormTypes = z.infer<typeof billFormSchema>
