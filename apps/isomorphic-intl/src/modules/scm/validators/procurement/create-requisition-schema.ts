import { z } from "zod"

import { messages } from "@/config/messages"

export const CreateRequisitionSchema = z.object({
  supplierId: z.number().min(1, messages.supplierIdRequired),
  companyId: z.number().min(1, messages.companyIdRequired),
  companyName: z.string().optional(),
  currencyId: z.number().min(1, messages.currencyIdRequired),
  currencyName: z.string().optional(),
  requestedBy: z.string().min(1, messages.requestedByRequired),
  requestedDate: z.string().min(1, messages.requestedDateRequired),
  paymentTermsId: z.number().min(1, messages.paymentTermsIdRequired),
  expectedDeliveryDate: z
    .string()
    .min(1, messages.expectedDeliveryDateRequired),
  projectName: z.string().optional(),
  billingStatus: z.string().optional(),
  priority: z.string().min(1, messages.priorityRequired),
  fiscalPosition: z.string().min(1, messages.fiscalPositionRequired),
  totalQuantity: z.number().nonnegative().optional(),
  reqAmount: z.number().nonnegative().optional(),
  documentFile: z.any().optional(),
  saveRequisitionItemDtos: z.array(z.any()).optional(),
})

export const UpdateRequisitionSchema = z.object({
  supplierId: z.number().optional(),
  companyId: z.number().optional(),
  companyName: z.string().optional(),
  currencyId: z.number().optional(),
  currencyName: z.string().optional(),
  requestedBy: z.string().optional(),
  requestedDate: z.string().optional(),
  paymentTermsId: z.number().optional(),
  expectedDeliveryDate: z.string().optional(),
  projectName: z.string().optional(),
  billingStatus: z.string().optional(),
  priority: z.string().optional(),
  fiscalPosition: z.string().optional(),
  totalQuantity: z.number().nonnegative().optional(),
  reqAmount: z.number().nonnegative().optional(),
  documentFile: z.any().optional(),
  updateRequisitionItemDtos: z.array(z.any()).optional(),
})

export type CreateRequisitionInput = z.infer<typeof CreateRequisitionSchema>

export type UpdateRequisitionInput = z.infer<typeof UpdateRequisitionSchema>
