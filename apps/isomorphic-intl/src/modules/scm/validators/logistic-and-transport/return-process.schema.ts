import { z } from "zod";



import { messages } from "@/config/messages";





export const ReturnProcessSchema = z.object({
  productId: z.number().min(1, messages.productId),
  reasonForReturn: z.string().min(1, messages.reasonForReturn),
  quantityReturned: z.number().min(1, messages.quantityReturned),
  requestDate: z.string().min(1, messages.requestDate),
  returnStatus: z.string().optional(),
  approvalStatus: z.string().optional(),
  shipmentId: z.number().optional(),
})

export const UpdateReturnProcessSchema = z.object({
  productId: z.number().optional(),
  reasonForReturn: z.string().optional(),
  quantityReturned: z.number().optional(),
  requestDate: z.string().optional(),
  returnStatus: z.string().optional(),
  shipmentId: z.number().optional(),
})

export type ReturnProcessFormInput = z.infer<typeof ReturnProcessSchema>