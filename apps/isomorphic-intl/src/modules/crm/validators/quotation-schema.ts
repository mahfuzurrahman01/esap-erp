import { z } from "zod"

import { messages } from "@/config/messages"

const quotationEntrySchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  unitPrice: z.number().optional(),
  totalPrice: z.number().optional(),
  vat: z.number().optional(),
  tax: z.number().optional(),
  discount: z.number().optional(),
  total: z.number().optional(),
})

export const quotationFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, messages.thisFieldIsRequired),
  customerId: z.string().min(1, messages.thisFieldIsRequired),
  type: z.string().optional(),
  prefix: z.string().optional(),
  quotationNo: z.string().optional(),
  billingStreet: z.string().optional(),
  billingHouse: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingCountryId: z.any().optional(),
  billingZip: z.string().optional(),
  shippingStreet: z.string().optional(),
  shippingHouse: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingState: z.string().optional(),
  shippingCountryId: z.any().optional(),
  shippingZip: z.string().optional(),
  description: z.string().optional(),
  expiryDate: z.string().optional(),
  paymentTerms: z.string().optional(),
  courier: z.string().optional(),
  status: z.string().optional(),
  quotationDetails: z.array(quotationEntrySchema).optional(),
})

export type QuotationFormInput = z.infer<typeof quotationFormSchema>
