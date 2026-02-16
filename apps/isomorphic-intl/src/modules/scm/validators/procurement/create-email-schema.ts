import { z } from "zod";



import { messages } from "@/config/messages";

export const ReplaySchema = z.object({
  supplierCollaborationId: z.number().optional(),
  to: z.string().email().optional(),
  messageBody: z.string().min(1, { message: messages.messageBody }),
  attachmentFile: z.any().optional(),
  imageFile: z.any().optional(),
})

export const MessageSchema = z.object({
  supplierId: z.number().min(1, { message: messages.supplierIdRequired }),
  to: z.string().email().optional(),
  category: z.string().optional(),
  subject: z.string().min(1, { message: messages.subjectRequired }),
  messageBody: z.string().min(1, { message: messages.messageBody }),
  attachmentFile: z.any().optional(),
  imageFile: z.any().optional(),
})



export type MessageTypeSchema = z.infer<typeof MessageSchema>